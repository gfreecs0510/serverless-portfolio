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
import { Spinner } from 'react-bootstrap';
import axios from 'axios';

type SearchFiltersSideBarProps = {
  loading: boolean;
  setLoading: Dispatch<SetStateAction<boolean>>;
};

function SearchFiltersSideBar(props: SearchFiltersSideBarProps) {
  const { loading, setLoading } = props;
  const [show, setShow] = useState(true);
  const {
    countriesAndLocationsObject,
    workExperiencesObject,
    salaryObject,
    workTypeList,
    preferencesList,
    skillsList,
    industriesList,
    roles,
  } = useSearchContext();

  const [role, setRole] = useState<string>('');
  const [country, setCountry] = useState<string>('');
  const [location, setLocation] = useState<string>('');
  const [workExperience, setWorkExperience] = useState<string>('');
  const [workTypes, setWorkTypes] = useState<string[]>([]);
  const [preferences, setPreferences] = useState<string[]>([]);
  const [skills, setSkills] = useState<string[]>([]);
  const [industries, setIndustries] = useState<string[]>([]);
  const [salary, setSalary] = useState<string>('');
  const locations = countriesAndLocationsObject[country] ?? [];

  useEffect(() => {
    setLocation('');
  }, [country]);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const fetchJobSearchResults = async () => {
    const response = await axios.post('http://localhost:3000/jobs/search', {
      headers: { Accept: 'application/json' },
    });

    console.log(response);
  };

  const handleSubmit = () => {
    setLoading(true);
    handleClose();

    fetchJobSearchResults().then(() => {
      setLoading(false);
    });
  };

  const renderRoles = () => {
    return (
      <Accordion.Item eventKey="role">
        <Accordion.Header>Role: {role}</Accordion.Header>
        <Accordion.Body>
          <AutoCompleteTextField
            id="role"
            options={roles}
            value={role}
            setValue={setRole}
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
            options={Object.keys(countriesAndLocationsObject)}
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
            options={Object.keys(workExperiencesObject)}
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
            options={Object.keys(salaryObject)}
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
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
}

export default SearchFiltersSideBar;
