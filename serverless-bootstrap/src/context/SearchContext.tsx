import React, { createContext, ReactNode, useContext, useState } from 'react';

type ObjectWithStringArrayVal = { [key: string]: string[] };
type ObjectMinMax = {
  [key: string]: { min: number; max: number };
};

type SearchContextType = {
  countriesAndLocationsObject: ObjectWithStringArrayVal;
  workExperiencesObject: ObjectMinMax;
  salaryObject: ObjectMinMax;
  skillsList: string[];
  workTypeList: string[];
  preferencesList: string[];
  industriesList: string[];
  roles: string[];
  setCountriesAndLocationsObject: React.Dispatch<
    React.SetStateAction<ObjectWithStringArrayVal>
  >;
  setWorkExperiencesObject: React.Dispatch<React.SetStateAction<ObjectMinMax>>;
  setSalaryObject: React.Dispatch<React.SetStateAction<ObjectMinMax>>;
  setSkillsList: React.Dispatch<React.SetStateAction<string[]>>;
  setWorkTypeList: React.Dispatch<React.SetStateAction<string[]>>;
  setPreferencesList: React.Dispatch<React.SetStateAction<string[]>>;
  setIndustriesList: React.Dispatch<React.SetStateAction<string[]>>;
  setRoles: React.Dispatch<React.SetStateAction<string[]>>;
};

const defaultContext: SearchContextType = {
  countriesAndLocationsObject: {},
  workExperiencesObject: {},
  salaryObject: {},
  skillsList: [],
  workTypeList: [],
  preferencesList: [],
  industriesList: [],
  roles: [],
  setCountriesAndLocationsObject: () => {},
  setWorkExperiencesObject: () => {},
  setSalaryObject: () => {},
  setSkillsList: () => {},
  setWorkTypeList: () => {},
  setPreferencesList: () => {},
  setIndustriesList: () => {},
  setRoles: () => {},
};

const SearchContext = createContext<SearchContextType>(defaultContext);

const SearchProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [countriesAndLocationsObject, setCountriesAndLocationsObject] =
    useState<ObjectWithStringArrayVal>({});
  const [workExperiencesObject, setWorkExperiencesObject] =
    useState<ObjectMinMax>({});
  const [salaryObject, setSalaryObject] = useState<ObjectMinMax>({});
  const [skillsList, setSkillsList] = useState<string[]>([]);
  const [workTypeList, setWorkTypeList] = useState<string[]>([]);
  const [preferencesList, setPreferencesList] = useState<string[]>([]);
  const [industriesList, setIndustriesList] = useState<string[]>([]);
  const [roles, setRoles] = useState<string[]>([]);

  return (
    <SearchContext.Provider
      value={{
        countriesAndLocationsObject,
        workExperiencesObject,
        salaryObject,
        skillsList,
        workTypeList,
        preferencesList,
        industriesList,
        roles,
        setCountriesAndLocationsObject,
        setWorkExperiencesObject,
        setSalaryObject,
        setSkillsList,
        setWorkTypeList,
        setPreferencesList,
        setIndustriesList,
        setRoles,
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
