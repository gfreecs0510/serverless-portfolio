import React, { useState } from 'react';
import { Card, Dropdown, DropdownButton, Form } from 'react-bootstrap';

type AutoCompleteProps = {
  options: string[]; // Array of suggestions
};

const SearchFilters: React.FC<AutoCompleteProps> = ({ options }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredOptions, setFilteredOptions] = useState(options);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchTerm(value);

    // Filter options based on the search term
    const filtered = options.filter((option) =>
      option.toLowerCase().includes(value.toLowerCase())
    );
    setFilteredOptions(filtered);
  };

  return (
    <Card className="mt-4">
      <Card.Body>
        <Card.Title>Search Jobs</Card.Title>
        <Form>
          <Form.Group controlId="autocomplete">
            <Form.Label>Search for a Job</Form.Label>
            <Form.Control
              type="text"
              placeholder="Type to search..."
              value={searchTerm}
              onChange={handleSearchChange}
            />
            <DropdownButton
              align="end"
              variant="secondary"
              title="Select Job"
              className="w-100 mt-2"
              disabled={filteredOptions.length === 0}
            >
              {filteredOptions.map((option, index) => (
                <Dropdown.Item key={index} eventKey={index}>
                  {option}
                </Dropdown.Item>
              ))}
            </DropdownButton>
          </Form.Group>
        </Form>
      </Card.Body>
    </Card>
  );
};

export { SearchFilters };
