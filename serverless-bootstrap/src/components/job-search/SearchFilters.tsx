import { useState, useEffect } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import AutocompleteDropdown from '../custom/AutoCompleteDropdown';
import TagInput from '../custom/TagInput';

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

function SearchFilters() {
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

  return (
    <Card className="mb-4" style={{ width: '550px' }}>
      <Card.Header as="h5">Job Search Filters</Card.Header>
      <Card.Body>
        <Form>
          <Form.Group className="mb-3">
            <AutocompleteDropdown
              label="Country"
              options={countries}
              onSelect={(value) => setSelectedCountry(value)}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <AutocompleteDropdown
              label="Location"
              options={locations}
              enabled={locations && locations.length > 0}
              onSelect={(value) => setSelectedLocation(value)}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <AutocompleteDropdown
              label="Work Experience"
              options={workExperience}
              onSelect={(value) => setSelectedWorkExp(value)}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <TagInput label="Skills" options={skills} onTagsChange={() => {}} />
          </Form.Group>

          <Form.Group className="mb-3">
            <TagInput
              label="Work Type"
              options={workType}
              onTagsChange={() => {}}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <TagInput
              label="Preference"
              options={preference}
              onTagsChange={() => {}}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <TagInput
              label="Industries"
              options={industries}
              onTagsChange={() => {}}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Button type="submit" className="btn btn-primary">
              Submit
            </Button>
          </Form.Group>
        </Form>
      </Card.Body>
    </Card>
  );
}

export { SearchFilters };
