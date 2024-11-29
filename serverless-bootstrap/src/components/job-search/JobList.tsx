import React from 'react';
import { Container, Card, Badge, Button } from 'react-bootstrap';

const jobData = [
  {
    id: 'job-1',
    role: 'Software Engineer',
    company: 'TechCorp',
    country: 'USA',
    location: 'San Francisco',
    workTypes: ['Full-time', 'Remote'],
  },
  {
    id: 'job-2',
    role: 'Data Analyst',
    company: 'Data Solutions Inc.',
    country: 'Canada',
    location: 'Toronto',
    workTypes: ['Part-time', 'On-Site'],
  },
  {
    id: 'job-3',
    role: 'Frontend Developer',
    company: 'Webify',
    country: 'United Kingdom',
    location: 'London',
    workTypes: ['Full-time', 'Hybrid'],
  },
  {
    id: 'job-4',
    role: 'Backend Developer',
    company: 'CloudWorks',
    country: 'Germany',
    location: 'Berlin',
    workTypes: ['Full-time', 'On-Site'],
  },
];

const JobList = () => {
  return (
    <Container fluid="md" className="mt-4 mb-4">
      {jobData.map((job) => (
        <Card className="mb-4 shadow-sm" key={job.id}>
          <Badge
            bg="success"
            className="position-absolute top-0 end-0 m-2"
            style={{ fontSize: '1rem', padding: '0.5em 1em' }}
          >
            10.0
          </Badge>

          <Card.Body>
            <Card.Title>{job.role}</Card.Title>
            <Card.Subtitle className="mb-2 text-muted">
              {job.location}, {job.country}
            </Card.Subtitle>
            <Card.Text>
              <strong>Experience:</strong> 0 - 3 years
              <br />
              <strong>Salary:</strong> $1k - $3k
              <br />
            </Card.Text>
            <Card.Text>
              <strong>Work Types:</strong>{' '}
              {job.workTypes.map((type, index) => (
                <Badge bg="info" key={index} className="me-1">
                  {type}
                </Badge>
              ))}
            </Card.Text>
            <Card.Text>
              <strong>Skills:</strong>{' '}
              {['C', 'C++', 'C#','C', 'C++', 'C#','C', 'C++', 'C#','C', 'C++', 'C#','C', 'C++', 'C#','C', 'C++', 'C#','C', 'C++', 'C#','C', 'C++', 'C#','C', 'C++', 'C#','C', 'C++', 'C#','C', 'C++', 'C#','C', 'C++', 'C#','C', 'C++', 'C#','C', 'C++', 'C#','C', 'C++', 'C#','C', 'C++', 'C#','C', 'C++', 'C#','C', 'C++', 'C#','C', 'C++', 'C#','C', 'C++', 'C#','C', 'C++', 'C#','C', 'C++', 'C#','C', 'C++', 'C#','C', 'C++', 'C#'].map((type, index) => (
                <Badge bg="dark" key={index} className="me-1">
                  {type}
                </Badge>
              ))}
            </Card.Text>
            <Card.Text>
              <strong>Work Types:</strong>{' '}
              {['Full-time', 'Contract'].map((type, index) => (
                <Badge bg="secondary" key={index} className="me-1">
                  {type}
                </Badge>
              ))}
            </Card.Text>
          </Card.Body>
          <Card.Footer>
            <Button variant="primary">More Details</Button>
          </Card.Footer>
        </Card>
      ))}
    </Container>
  );
};

export default JobList;
