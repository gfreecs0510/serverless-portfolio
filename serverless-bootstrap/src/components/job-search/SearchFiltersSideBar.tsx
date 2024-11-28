import { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Offcanvas from 'react-bootstrap/Offcanvas';
import Accordion from 'react-bootstrap/Accordion';
import FormLabel from 'react-bootstrap/FormLabel';
import AutocompleteDropdown from '../custom/AutoCompleteDropdown';
import TagInput from '../custom/TagInput';

type SearchFiltersSideBarProps = {
  test?: boolean;
};

const countryCities: any = {
  USA: ['New York', 'Texas'],
  'United Kingdom': ['London', 'Manchester'],
  Japan: ['Tokyo', 'Osaka'],
};

const workExperienceObject: any = {
  '0 to 3': {
    min: 0,
    max: 3,
  },
  '3 to 6': {
    min: 3,
    max: 6,
  },
  '7 - 10': {
    min: 7,
    max: 10,
  },
  '10+': {
    min: 10,
  },
};

const skills = ['Java', 'C', 'C++'];

const workType = ['Full-time', 'Part-time', 'Contract'];

const preference = ['On-Site', 'Hybrid', 'Remote'];

const industries: string[] = [
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
  const [show, setShow] = useState(false);

  const [countries, setCountries] = useState<string[]>([]);
  const [locations, setLocations] = useState<string[]>([]);
  const [workExperience, setWorkExperience] = useState<string[]>([]);
  const [selectedCountry, setSelectedCountry] = useState<string>('');
  const [selectedLocation, setSelectedLocation] = useState<string>('');
  const [selectedWorkExp, setSelectedWorkExp] = useState<string>('');

  useEffect(() => {
    setCountries(Object.keys(countryCities));
    setWorkExperience(Object.keys(workExperienceObject));
  }, []);

  useEffect(() => {
    setLocations(countryCities[selectedCountry] ?? []);
  }, [selectedCountry]);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

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
          <Offcanvas.Title>Search Filters</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <Accordion
            defaultActiveKey={['0', '1', '2', '3', '4', '5', '6']}
            alwaysOpen
          >
            <Accordion.Item eventKey="0">
              <Accordion.Header>Country</Accordion.Header>
              <Accordion.Body>
                <AutocompleteDropdown
                  options={countries}
                  onSelect={(value) => setSelectedCountry(value)}
                />
              </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey="1">
              <Accordion.Header>Location</Accordion.Header>
              <Accordion.Body>
                <AutocompleteDropdown
                  options={locations}
                  enabled={locations && locations.length > 0}
                  onSelect={(value) => setSelectedLocation(value)}
                />
              </Accordion.Body>
            </Accordion.Item>

            <Accordion.Item eventKey="2">
              <Accordion.Header>Work Experience</Accordion.Header>
              <Accordion.Body>
                <AutocompleteDropdown
                  options={workExperience}
                  onSelect={(value) => setSelectedWorkExp(value)}
                />
              </Accordion.Body>
            </Accordion.Item>

            <Accordion.Item eventKey="3">
              <Accordion.Header>Skills</Accordion.Header>
              <Accordion.Body>
                <TagInput options={skills} onTagsChange={() => {}} />
              </Accordion.Body>
            </Accordion.Item>

            <Accordion.Item eventKey="4">
              <Accordion.Header>Work Type</Accordion.Header>
              <Accordion.Body>
                <TagInput options={workType} onTagsChange={() => {}} />
              </Accordion.Body>
            </Accordion.Item>

            <Accordion.Item eventKey="5">
              <Accordion.Header>Preference</Accordion.Header>
              <Accordion.Body>
                <TagInput options={preference} onTagsChange={() => {}} />
              </Accordion.Body>
            </Accordion.Item>

            <Accordion.Item eventKey="6">
              <Accordion.Header>Industries</Accordion.Header>
              <Accordion.Body>
                <TagInput options={industries} onTagsChange={() => {}} />
              </Accordion.Body>
            </Accordion.Item>
          </Accordion>
          <Button
            type="submit"
            className="btn btn-primary mt-4 allign-center"
            onClick={handleClose}
          >
            Submit
          </Button>
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
}

export default SearchFiltersSideBar;
