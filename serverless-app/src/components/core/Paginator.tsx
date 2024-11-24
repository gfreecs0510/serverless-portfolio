import { FC } from 'react'
import { CoreComponent } from '../../types/CoreComponent.type'

type PaginatorProps = CoreComponent & {
  pages: number[] // List of page numbers
  currentPage: number // Current page for active state
  onPageChange: (page: number) => void // Callback to handle page change
  totalPages: number // Total number of pages
}

const Paginator: FC<PaginatorProps> = ({
  pages,
  currentPage,
  onPageChange,
  totalPages,
}) => {
  return (
    <nav className="flex items-center gap-x-1">
      {/* Horizontal scroll container */}
      <div className="flex flex-wrap gap-x-1 overflow-x-auto scrollbar-thin">
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="btn btn-text btn-square"
        >
          Previous
        </button>

        {/* Render the page number buttons */}
        {pages.map((page, index) => (
          <button
            key={index}
            type="button"
            className={`btn btn-text btn-square w-auto px-3 ${
              currentPage === page ? 'text-bg-primary' : ''
            }`}
            onClick={() => onPageChange(page)}
          >
            {page}
          </button>
        ))}

        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="btn btn-text btn-square"
        >
          Next
        </button>
      </div>
    </nav>
  )
}

export { Paginator, PaginatorProps }
