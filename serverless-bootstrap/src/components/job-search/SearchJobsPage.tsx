import { FC, useEffect, useState } from 'react';
import SearchFiltersSideBar from './SearchFiltersSideBar';
import { useSearchContext } from '../../context/SearchContext';
import axios from 'axios';
import { Spinner } from 'react-bootstrap'; // Import the Spinner component from React Bootstrap
import ErrorPage from '../main/Error';
import AxiosError from '../../classes/AxiosError';

type SearchJobsPageProps = {
  test?: boolean;
};

const SearchJobsPage: FC<SearchJobsPageProps> = () => {
  const {
    setRoles,
    setCountriesAndLocationsObject,
    setWorkExperiencesObject,
    setSalaryObject,
    setSkillsList,
    setWorkTypeList,
    setPreferencesList,
    setIndustriesList,
  } = useSearchContext();

  const [isError, setIsError] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(true);

  const fetchFilters = async () => {
    try {
      const response = await axios.get('http://localhost:3000/jobs/filters', {
        headers: { Accept: 'application/json' },
      });

      const data = response.data;

      setRoles(data.roles);
      setCountriesAndLocationsObject(data.countriesAndLocations);
      setWorkExperiencesObject(data.workExperiences);
      setSalaryObject(data.salaries);
      setSkillsList(data.skills);
      setWorkTypeList(data.workType);
      setPreferencesList(data.preferences);
      setIndustriesList(data.industries);
      setLoading(false);
    } catch (error) {
      const axiosError = new AxiosError(error);
      setIsError(true);
      setLoading(false);
      setErrorMessage((axiosError as any).message || 'exception handled');
    }
  };

  useEffect(() => {
    fetchFilters();
  }, []);

  return (
    <div className="w-100">
      {!isError && (
        <SearchFiltersSideBar loading={loading} setLoading={setLoading} />
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
