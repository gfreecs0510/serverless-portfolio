import { FC, useEffect, useState } from 'react';
import SearchFiltersSideBar from './SearchFiltersSideBar';
import { useSearchContext } from '../../context/SearchContext';
import axios from 'axios';
import Spinner from 'react-bootstrap/Spinner'; // Import the Spinner component from React Bootstrap
import ErrorPage from '../main/Error';
import AxiosError from '../../classes/AxiosError';
import JobList from './JobList';
import Pagination from '../custom/Pagination';
import { SearchJobRequestType, SearchJobResponseType } from '../../types/types';

const SearchJobsPage: FC = () => {
  const {
    jobs,
    setAggregates,
    totalJobs,
    size,
    from,
    searchRequestBody,
    setSearchRequestBody,
    setJobs,
    setTotalJobs,
    setFrom,
    setSize,
  } = useSearchContext();

  const [isError, setIsError] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    fetchFilters();
    setJobs([]);
    setSearchRequestBody({});
    setSize(10);
    setFrom(0);
  }, []);

  const fetchFilters = async () => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_SERVERLESS_URL}/jobs/search`,
        {},
        {
          headers: { Accept: 'application/json' },
        }
      );

      if (response.status !== 200) {
        throw new AxiosError({
          status: response.status,
          message: response.data?.message,
          isAxiosError: true,
        });
      }

      const { filters }: SearchJobResponseType = response.data;
      setAggregates(filters);
      setLoading(false);
    } catch (error) {
      const axiosError = new AxiosError(error);
      setIsError(true);
      setLoading(false);
      setErrorMessage((axiosError as any).message || 'exception handled');
    }
  };

  const fetchJobs = async (requestBody: SearchJobRequestType) => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_SERVERLESS_URL}/jobs/search`,
        requestBody,
        {
          headers: { Accept: 'application/json' },
        }
      );

      if (response.status !== 200) {
        throw new AxiosError({
          status: response.status,
          message: response.data.message ?? '',
          isAxiosError: true,
        });
      }

      const { total, result, from } = response.data as SearchJobResponseType;

      setTotalJobs(total);
      setJobs(result);
      setFrom(from);
      setLoading(false);
    } catch (err) {
      const axiosError = new AxiosError(err);
      setLoading(false);
      setIsError(true);
      setErrorMessage((axiosError as any).message || 'exception handled');
    }
  };

  const handleJobSearch = (requestBody: SearchJobRequestType) => {
    setLoading(true);
    setJobs([]);
    setSize(10);
    setFrom(0);
    fetchJobs(requestBody);
    setSearchRequestBody(requestBody);
  };

  const handlePageChange = async (page: number) => {
    setLoading(true);
    setFrom(page - 1);
    setJobs([]);
    await fetchJobs({
      ...searchRequestBody,
      from: page - 1,
      size,
    });
  };

  const handleSizeChange = async (size: number) => {
    setLoading(true);
    setFrom(0);
    setSize(size);
    setJobs([]);
    await fetchJobs({
      ...searchRequestBody,
      size,
      from: 0,
    });
  };

  const renderPagination = () => {
    if (totalJobs > 0) {
      const currentPage = from + 1; //index by zero
      const totalPages = Math.floor(totalJobs / size);
      return (
        <Pagination
          size={size}
          handleSizeChange={handleSizeChange}
          currentPage={currentPage}
          totalPages={totalPages}
          handlePageChange={handlePageChange}
        />
      );
    }
  };

  return (
    <div className="w-100 d-flex flex-column justify-content-center align-items-center">
      {!isError && (
        <>
          <SearchFiltersSideBar
            loading={loading}
            setLoading={setLoading}
            handleJobSearch={handleJobSearch}
          />
          <JobList jobs={jobs} />
          {!loading && renderPagination()}
          <div className="mb-4" />
        </>
      )}
      {loading && (
        <div
          className="d-flex justify-content-center align-items-center"
          style={{ height: '100vh' }}
        >
          <Spinner animation="border" variant="primary" />
        </div>
      )}
      {isError && <ErrorPage errorMessage={errorMessage} />}
    </div>
  );
};
export default SearchJobsPage;
