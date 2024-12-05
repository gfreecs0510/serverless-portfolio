import { Container, Card, Badge, Button, Collapse } from 'react-bootstrap';
import { useState } from 'react';
import { SearchResultJobRecord } from '../../types/types';

type JobListProps = {
  jobs: SearchResultJobRecord[];
};

const JobList = (props: JobListProps) => {
  const [openJobId, setOpenJobId] = useState<string | null>(null);

  const handleToggle = (id: string) => {
    setOpenJobId(openJobId === id ? null : id); // Toggle collapse on button click
  };

  return (
    <Container fluid="md" className="mt-4">
      {props.jobs.map((job) => (
        <Card className="mb-4 shadow-sm" key={job.id}>
          <Badge
            bg="success"
            className="position-absolute top-0 end-0 m-2"
            style={{ fontSize: '1rem', padding: '0.5em 1em' }}
          >
            Score: {job.score}
          </Badge>

          <Card.Body>
            <Card.Title>{job.role}</Card.Title>
            <Card.Subtitle className="mb-2 text-muted">
              At {job.company}
            </Card.Subtitle>
            <Card.Subtitle className="mb-2 text-muted">
              {job.location}, {job.country}
            </Card.Subtitle>
            <Card.Text>
              <strong>Experience:</strong> {job.minExp} - {job.maxExp} years
              <br />
              <strong>Salary:</strong> ${job.minSalary} - ${job.maxSalary}
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
              {job.skills.map((skill, index) => (
                <Badge bg="dark" key={index} className="me-1">
                  {skill}
                </Badge>
              ))}
            </Card.Text>
            <Card.Text>
              <strong>Industries:</strong>{' '}
              {job.industries.map((industry, index) => (
                <Badge bg="secondary" key={index} className="me-1">
                  {industry}
                </Badge>
              ))}
            </Card.Text>
            <Collapse in={openJobId === job.id}>
              <div>
                <Card.Text>
                  <strong>Description:</strong> {job.description}
                </Card.Text>
                <Button>Apply</Button>
              </div>
            </Collapse>
          </Card.Body>
          <Card.Footer>
            <Button
              variant="outline-primary"
              onClick={() => handleToggle(job.id)}
            >
              {openJobId === job.id ? 'Show less' : 'Show Description'}
            </Button>
          </Card.Footer>
        </Card>
      ))}
    </Container>
  );
};

export default JobList;
