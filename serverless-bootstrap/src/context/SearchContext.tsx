import React, { createContext, ReactNode, useContext, useState } from 'react';
import {
  Aggregates,
  SearchJobRequestType,
  SearchResultJobRecord,
} from '../types/types';

type SearchContextType = {
  aggregates: Aggregates;
  jobs: SearchResultJobRecord[];
  size: number;
  from: number;
  totalJobs: number;
  searchRequestBody: SearchJobRequestType;
  setAggregates: React.Dispatch<React.SetStateAction<Aggregates>>;
  setJobs: React.Dispatch<React.SetStateAction<any[]>>;
  setFrom: React.Dispatch<React.SetStateAction<number>>;
  setTotalJobs: React.Dispatch<React.SetStateAction<number>>;
  setSearchRequestBody: React.Dispatch<
    React.SetStateAction<SearchJobRequestType>
  >;
  setSize: React.Dispatch<React.SetStateAction<number>>;
};

const defaultContext: SearchContextType = {
  aggregates: {
    countriesAndLocations: [],
    preferences: [],
    workTypes: [],
    salaries: [],
    workExperiences: [],
    industries: [],
    skills: [],
  },
  jobs: [],
  size: 10,
  from: 0,
  totalJobs: 0,
  searchRequestBody: {},
  setAggregates: () => {},
  setJobs: () => {},
  setFrom: () => {},
  setTotalJobs: () => {},
  setSearchRequestBody: () => {},
  setSize: () => {},
};

const SearchContext = createContext<SearchContextType>(defaultContext);

const SearchProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [aggregates, setAggregates] = useState<Aggregates>(
    defaultContext.aggregates
  );
  const [jobs, setJobs] = useState<SearchResultJobRecord[]>([]);
  const [size, setSize] = useState<number>(1);
  const [from, setFrom] = useState<number>(0);
  const [totalJobs, setTotalJobs] = useState<number>(0);
  const [searchRequestBody, setSearchRequestBody] =
    useState<SearchJobRequestType>({});

  return (
    <SearchContext.Provider
      value={{
        aggregates,
        jobs,
        size,
        from,
        totalJobs,
        searchRequestBody,
        setAggregates,
        setJobs,
        setFrom,
        setTotalJobs,
        setSearchRequestBody,
        setSize,
      }}
    >
      {children}
    </SearchContext.Provider>
  );
};

const useSearchContext = (): SearchContextType => {
  const context = useContext(SearchContext);
  if (!context) {
    throw new Error('useSearchContext must be used within a SearchProvider');
  }
  return context;
};

export { SearchContext, useSearchContext, SearchProvider };

export type { SearchContextType };
