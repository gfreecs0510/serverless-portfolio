import { FC, useState } from 'react';
import ReactPagination from 'react-bootstrap/Pagination';
import Dropdown from 'react-bootstrap/Dropdown';

type PaginationProps = {
  size: number;
  currentPage: number;
  totalPages: number;
  handlePageChange: (page: number) => Promise<void>;
  handleSizeChange: (size: number) => Promise<void>;
};

const Pagination: FC<PaginationProps> = ({
  currentPage,
  totalPages,
  size,
  handlePageChange,
  handleSizeChange,
}) => {
  const [loading, setLoading] = useState<boolean>(false);

  const onClick = (page: number) => {
    setLoading(true);

    handlePageChange(page)
      .then(() => {
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });
  };

  const onSizeChange = (page: number) => {
    setLoading(true);

    handleSizeChange(page)
      .then(() => {
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });
  };

  const renderItem = (
    label: string | number,
    page: number,
    isActive = false
  ) => (
    <ReactPagination.Item
      key={label}
      active={isActive}
      disabled={loading}
      onClick={() => !loading && onClick(page)}
    >
      {label}
    </ReactPagination.Item>
  );

  const renderBoundaryItem = (label: string, page: number) =>
    currentPage !== page && renderItem(label, page);

  const renderPageItems = () => {
    const pagesToShow = 5; // Fixed number of pages to show
    const startPage =
      currentPage + pagesToShow > totalPages
        ? Math.max(totalPages - pagesToShow + 1, 1) // Ensure we don't go below 1
        : currentPage;

    return Array.from(
      { length: Math.min(pagesToShow, totalPages) },
      (_, i) => startPage + i
    ).map((page) => renderItem(page, page, currentPage === page));
  };

  if (!loading) {
    return (
      <div className="d-flex flex-row justify-content-center align-items-right">
        <Dropdown
          onSelect={(selectedSize) => onSizeChange(Number(selectedSize))}
          style={{ marginRight: '10px' }}
        >
          <Dropdown.Toggle id="sizeSelect">Page Size: {size}</Dropdown.Toggle>
          <Dropdown.Menu>
            <Dropdown.Item eventKey={10}>10</Dropdown.Item>
            <Dropdown.Item eventKey={20}>20</Dropdown.Item>
            <Dropdown.Item eventKey={30}>30</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>

        <ReactPagination style={{ marginBottom: '10px' }}>
          {currentPage !== 1 && renderBoundaryItem('First', 1)}
          {currentPage !== 1 && renderBoundaryItem('Prev', currentPage - 1)}
          {renderPageItems()}
          {totalPages > currentPage &&
            renderBoundaryItem('Next', currentPage + 1)}
          {totalPages > currentPage && renderBoundaryItem('Last', totalPages)}
        </ReactPagination>
      </div>
    );
  }
};

export default Pagination;
