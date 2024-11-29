import React, { createContext, ReactNode, useContext, useState } from 'react';

type ObjectWithStringArrayVal = { [key: string]: string[] };
type ObjectMinMax = {
  [key: string]: { min: number; max: number };
};

type SearchContextType = {
  countriesAndCitiesObject: ObjectWithStringArrayVal;
  workExperiencesObject: ObjectMinMax;
  salaryObject: ObjectMinMax;
  skillsList: string[];
  workTypeList: string[];
  preferencesList: string[];
  industriesList: string[];
  setCountriesAndCitiesObject: React.Dispatch<
    React.SetStateAction<ObjectWithStringArrayVal>
  >;
  setWorkExperiencesObject: React.Dispatch<React.SetStateAction<ObjectMinMax>>;
  setSalaryObject: React.Dispatch<React.SetStateAction<ObjectMinMax>>;
  setSkillsList: React.Dispatch<React.SetStateAction<string[]>>;
  setWorkTypeList: React.Dispatch<React.SetStateAction<string[]>>;
  setPreferencesList: React.Dispatch<React.SetStateAction<string[]>>;
  setIndustriesList: React.Dispatch<React.SetStateAction<string[]>>;
};

const defaultContext: SearchContextType = {
  countriesAndCitiesObject: {},
  workExperiencesObject: {},
  salaryObject: {},
  skillsList: [],
  workTypeList: [],
  preferencesList: [],
  industriesList: [],
  setCountriesAndCitiesObject: () => {},
  setWorkExperiencesObject: () => {},
  setSalaryObject: () => {},
  setSkillsList: () => {},
  setWorkTypeList: () => {},
  setPreferencesList: () => {},
  setIndustriesList: () => {},
};

const SearchContext = createContext<SearchContextType>(defaultContext);

const SearchProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [countriesAndCitiesObject, setCountriesAndCitiesObject] =
    useState<ObjectWithStringArrayVal>({});
  const [workExperiencesObject, setWorkExperiencesObject] =
    useState<ObjectMinMax>({});
  const [salaryObject, setSalaryObject] = useState<ObjectMinMax>({});
  const [skillsList, setSkillsList] = useState<string[]>([]);
  const [workTypeList, setWorkTypeList] = useState<string[]>([]);
  const [preferencesList, setPreferencesList] = useState<string[]>([]);
  const [industriesList, setIndustriesList] = useState<string[]>([]);

  return (
    <SearchContext.Provider
      value={{
        countriesAndCitiesObject,
        workExperiencesObject,
        salaryObject,
        skillsList,
        workTypeList,
        preferencesList,
        industriesList,
        setCountriesAndCitiesObject,
        setWorkExperiencesObject,
        setSalaryObject,
        setSkillsList,
        setWorkTypeList,
        setPreferencesList,
        setIndustriesList,
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

export type { SearchContextType, ObjectWithStringArrayVal, ObjectMinMax };
