import { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Offcanvas from 'react-bootstrap/Offcanvas';
import Accordion from 'react-bootstrap/Accordion';
import FormLabel from 'react-bootstrap/FormLabel';
import AutocompleteDropdown from '../custom/AutoCompleteDropdown';
import TagInput from '../custom/TagInput';
import CheckBoxes from '../custom/CheckBoxes';
import RadioBoxes from '../custom/RadioBoxes';

type SearchFiltersSideBarProps = {
  test?: boolean;
};

const countriesAndCitiesObj: any = {
  USA: ['New York', 'Texas'],
  'United Kingdom': ['London', 'Manchester'],
  Japan: ['Tokyo', 'Osaka'],
};

const workExperienceObj: any = {
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
};

const skillsList = ['Java', 'C', 'C++'];

const workTypeList = ['Full-time', 'Part-time', 'Contract'];

const preferencesList = ['On-Site', 'Hybrid', 'Remote'];

const salaryObj: any = {
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
};

const industriesList: string[] = [
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
];

function SearchFiltersSideBar(props: SearchFiltersSideBarProps) {
  const [show, setShow] = useState(true);

  const [countries] = useState<string[]>(Object.keys(countriesAndCitiesObj));
  const [locations, setLocations] = useState<string[]>([]);
  const [workExperiences] = useState<string[]>(Object.keys(workExperienceObj));
  const [salaries] = useState<string[]>(Object.keys(salaryObj));

  const [country, setCountry] = useState<string>('');
  const [location, setLocation] = useState<string>('');
  const [workExperience, setWorkExperience] = useState<string>('');
  const [workTypes, setWorkTypes] = useState<string[]>([]);
  const [preferences, setPreferences] = useState<string[]>([]);
  const [skills, setSkills] = useState<string[]>([]);
  const [industries, setIndustries] = useState<string[]>([]);
  const [salary, setSalary] = useState<string>('');

  useEffect(() => {
    setLocations(countriesAndCitiesObj[country] ?? []);
  }, [country]);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  //TODO: now i need to call the API :)
  const handleSubmit = () => {
    const body: any = {
      country: country,
      location: location,
      work_type: workTypes,
      preferencesList: preferences,
      skillsList: skills,
      industries: industries,
    };
    if (workExperience) {
      body.min_exp = workExperienceObj[workExperience].min_exp;
      body.max_exp = workExperienceObj[workExperience].max_exp;
    }
    if (salary) {
      body.min_salary = salaryObj[salary].min_salary;
      body.max_salary = salaryObj[salary].max_salary;
    }
    handleClose();
  };

  const renderCountries = () => {
    return (
      <Accordion.Item eventKey="country">
        <Accordion.Header>Country: {country}</Accordion.Header>
        <Accordion.Body>
          <AutocompleteDropdown
            id="countries"
            options={countries}
            value={country}
            setValue={setCountry}
          />
        </Accordion.Body>
      </Accordion.Item>
    );
  };

  const renderLocations = () => {
    return (
      <Accordion.Item eventKey="location">
        <Accordion.Header>Location: {location}</Accordion.Header>
        <Accordion.Body>
          {locations && locations.length > 0 ? (
            <AutocompleteDropdown
              id="locations"
              options={locations}
              value={location}
              setValue={setLocation}
            />
          ) : (
            <FormLabel>Please select countries first</FormLabel>
          )}
        </Accordion.Body>
      </Accordion.Item>
    );
  };

  const renderWorkExperiences = () => {
    return (
      <Accordion.Item eventKey="work_exp">
        <Accordion.Header>Work Experience: {workExperience}</Accordion.Header>
        <Accordion.Body>
          <RadioBoxes
            id="workExperiences"
            options={workExperiences}
            selectedValue={workExperience}
            setSelectedValue={setWorkExperience}
          />
        </Accordion.Body>
      </Accordion.Item>
    );
  };

  const renderWorkTypes = () => {
    return (
      <Accordion.Item eventKey="work_type">
        <Accordion.Header>Work Type: {workTypes.join(',')}</Accordion.Header>
        <Accordion.Body>
          <CheckBoxes
            id="workTypeList"
            options={workTypeList}
            checkedItems={workTypes}
            setCheckedItems={setWorkTypes}
          ></CheckBoxes>
        </Accordion.Body>
      </Accordion.Item>
    );
  };

  const renderPreferences = () => {
    return (
      <Accordion.Item eventKey="preferencesList">
        <Accordion.Header>
          Preferences: {preferences.join(',')}
        </Accordion.Header>
        <Accordion.Body>
          <CheckBoxes
            id="preferences"
            options={preferencesList}
            checkedItems={preferences}
            setCheckedItems={setPreferences}
          ></CheckBoxes>
        </Accordion.Body>
      </Accordion.Item>
    );
  };

  const renderSkills = () => {
    return (
      <Accordion.Item eventKey="skill">
        <Accordion.Header>Skills: {skills.length}</Accordion.Header>
        <Accordion.Body>
          <TagInput
            id="skills"
            options={skillsList}
            tags={skills}
            setTags={setSkills}
          />
        </Accordion.Body>
      </Accordion.Item>
    );
  };

  const renderIndustries = () => {
    return (
      <Accordion.Item eventKey="industry">
        <Accordion.Header>Industries: {industries.length}</Accordion.Header>
        <Accordion.Body>
          <TagInput
            id="industries"
            options={industriesList}
            tags={industries}
            setTags={setIndustries}
          />
        </Accordion.Body>
      </Accordion.Item>
    );
  };

  const renderSalary = () => {
    return (
      <Accordion.Item eventKey="salary">
        <Accordion.Header>Monthly Salary: {salary}</Accordion.Header>
        <Accordion.Body>
          <RadioBoxes
            id="salaries"
            options={salaries}
            selectedValue={salary}
            setSelectedValue={setSalary}
          />
        </Accordion.Body>
      </Accordion.Item>
    );
  };
  return (
    <>
      <div
        className={`vertical-tab ${show ? 'hidden' : ''}`}
        onClick={handleShow}
      >
        <FormLabel>Filters</FormLabel>
      </div>

      <Offcanvas show={show} onHide={handleClose}>
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Search Jobs</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <Accordion
            alwaysOpen
            defaultActiveKey={[
              'country',
              'location',
              'work_exp',
              'skill',
              'work_type',
              'preferencesList',
              'industry',
              'salary',
            ]}
          >
            {renderCountries()}
            {renderLocations()}
            {renderWorkExperiences()}
            {renderSalary()}
            {renderSkills()}
            {renderWorkTypes()}
            {renderPreferences()}
            {renderIndustries()}
          </Accordion>
          <Button
            type="submit"
            className="btn btn-primary mt-4 allign-center"
            onClick={handleSubmit}
          >
            Submit
          </Button>
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
}

export default SearchFiltersSideBar;
