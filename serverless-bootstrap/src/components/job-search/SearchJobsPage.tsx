import { FC, useEffect } from 'react';
import SearchFiltersSideBar from './SearchFiltersSideBar';
import { useSearchContext } from '../../context/SearchContext';

type SearchJobsPageProps = {
  test?: boolean;
};

const SearchJobsPage: FC<SearchJobsPageProps> = () => {
  const {
    setCountriesAndCitiesObject,
    setWorkExperiencesObject,
    setSalaryObject,
    setSkillsList,
    setWorkTypeList,
    setPreferencesList,
    setIndustriesList,
  } = useSearchContext();

  useEffect(() => {
    setCountriesAndCitiesObject({
      USA: ['New York', 'Texas'],
      'United Kingdom': ['London', 'Manchester'],
      Japan: ['Tokyo', 'Osaka'],
    });

    setWorkExperiencesObject({
      '0 to 3 years': {
        min: 0,
        max: 3,
      },
      '3 to 6 years': {
        min: 3,
        max: 6,
      },
      '7 - 10 years': {
        min: 7,
        max: 10,
      },
      '10+ years': {
        min: 10,
        max: 99,
      },
    });

    setSalaryObject({
      '<1k USD': {
        min: 0,
        max: 1,
      },
      '1k-3k USD': {
        min: 1,
        max: 3,
      },
      '3k-7k USD': {
        min: 3,
        max: 7,
      },
      '7k-20k USD': {
        min: 7,
        max: 20,
      },
    });

    setSkillsList(['Java', 'C', 'C++']);
    setWorkTypeList(['Full-time', 'Part-time', 'Contract']);
    setPreferencesList(['On-Site', 'Hybrid', 'Remote']);
    setIndustriesList([
      'Information Technology',
      'Banking',
      'Healthcare',
      'Education',
      'Retail',
      'Manufacturing',
      'Finance',
      'Telecommunications',
      'Construction',
      'Hospitality',
    ]);
  }, []);
  return (
    <div className="w-100">
      <SearchFiltersSideBar />
    </div>
  );
};

export default SearchJobsPage;
