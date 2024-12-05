import { useState, useEffect, Dispatch, SetStateAction } from 'react';
import Button from 'react-bootstrap/Button';
import Offcanvas from 'react-bootstrap/Offcanvas';
import Accordion from 'react-bootstrap/Accordion';
import FormLabel from 'react-bootstrap/FormLabel';
import TagInput from '../custom/TagInput';
import CheckBoxes from '../custom/CheckBoxes';
import RadioBoxes from '../custom/RadioBoxes';
import AutoCompleteTextField from '../custom/AutoCompleteTextField';
import { useSearchContext } from '../../context/SearchContext';
import { Form, Spinner } from 'react-bootstrap';
import { SearchJobRequestType } from '../../types/types';

type SearchFiltersSideBarProps = {
  loading: boolean;
  setLoading: Dispatch<SetStateAction<boolean>>;
  handleJobSearch: (requestBody: SearchJobRequestType) => void;
};

function SearchFiltersSideBar(props: SearchFiltersSideBarProps) {
  const { loading, handleJobSearch } = props;
  const [show, setShow] = useState(true);
  const { aggregates, size } = useSearchContext();

  const [role, setRole] = useState<string>('');
  const [country, setCountry] = useState<string>('');
  const [location, setLocation] = useState<string>('');
  const [workExperience, setWorkExperience] = useState<string>('');
  const [workTypes, setWorkTypes] = useState<string[]>([]);
  const [preferences, setPreferences] = useState<string[]>([]);
  const [skills, setSkills] = useState<string[]>([]);
  const [industries, setIndustries] = useState<string[]>([]);
  const [salary, setSalary] = useState<string>('');
  const countries = getCountries();
  const locations = getLocation();

  function getCountries() {
    return aggregates.countriesAndLocations.map((c) => c.key);
  }

  function getLocation() {
    if (country)
      return aggregates.countriesAndLocations
        .find((c) => c.key === country)!
        .locations.map((l) => l.key);
    else return [];
  }

  useEffect(() => {
    setLocation('');
  }, [country]);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const fetchJobSearchResults = () => {
    try {
      const body: SearchJobRequestType = {
        preferences,
        skills,
        industries,
        description: [],
        size,
      };
      if (country) {
        body.country = country;
      }

      if (location) {
        body.location = location;
      }

      if (role) {
        body.role = role;
      }

      if (salary !== '') {
        const salaryObject = aggregates.salaries.find((i) => i.key === salary);
        body.minSalary = salaryObject?.from ?? 0;
        body.maxSalary = salaryObject?.to ?? 0;
      }

      if (workExperience != '') {
        const workExpObject = aggregates.workExperiences.find(
          (i) => i.key === workExperience
        );
        body.minExp = workExpObject?.from ?? 0;
        body.maxSalary = workExpObject?.to ?? 0;
      }
      handleJobSearch(body);
    } catch (error) {}
  };

  const handleSubmit = () => {
    handleClose();
    fetchJobSearchResults();
  };

  const renderRoles = () => {
    return (
      <Accordion.Item eventKey="role">
        <Accordion.Header>Role: {role}</Accordion.Header>
        <Accordion.Body>
          <Form.Control
            id="role"
            type="text"
            autoComplete="off"
            onChange={(e) => setRole(e.target.value)}
            value={role}
            placeholder="Enter role"
          />
        </Accordion.Body>
      </Accordion.Item>
    );
  };

  const renderCountries = () => {
    return (
      <Accordion.Item eventKey="country">
        <Accordion.Header>Country: {country}</Accordion.Header>
        <Accordion.Body>
          <AutoCompleteTextField
            id="country"
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
            <AutoCompleteTextField
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
            options={aggregates.workExperiences.map((c) => c.key)}
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
            options={aggregates.workTypes.map((c) => c.key)}
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
            options={aggregates.preferences.map((c) => c.key)}
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
            options={aggregates.skills.map((s) => s.key)}
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
            options={aggregates.industries.map((s) => s.key)}
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
            options={aggregates.salaries.map((s) => s.key)}
            selectedValue={salary}
            setSelectedValue={setSalary}
          />
        </Accordion.Body>
      </Accordion.Item>
    );
  };

  const renderFilters = () => {
    try {
      return (
        <>
          <Accordion
            alwaysOpen
            defaultActiveKey={[
              'role',
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
            {renderRoles()}
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
        </>
      );
    } catch (err) {
      console.log(err);
    }
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
        <Offcanvas.Header>
          <Offcanvas.Title>Search Jobs</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          {loading && (
            <div
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                backgroundColor: 'rgba(255, 255, 255, 0.7)',
                zIndex: 10,
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <Spinner animation="border" role="status" />
            </div>
          )}
          {renderFilters()}
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
}

export default SearchFiltersSideBar;
