import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import ListGroup from 'react-bootstrap/ListGroup';

import { Job } from './SearchResultsList';

type JobDescriptionProps = {
  job: Job | null;
};

type JobDescription = {
  id: string;
  score: number;
  country: string;
  preference: string[]; // e.g., 'Partial-Remote', 'On-Site'
  work_type: string[]; // e.g., 'Full-Time', 'Contract'
  skills: string[]; // List of technical skills
  qualifications: string[]; // List of qualifications as a string array
  max_salary: number;
  responsibilities: string[]; // List of responsibilities in a formatted string
  job_description: string; // A description of the job in a string
  max_exp: number; // Max years of experience
  min_salary: number;
  company: string; // Company name
  location: string; // Job location
  job_title: string; // Job title
  min_exp: number; // Min years of experience
  benefits: string[]; // Benefits as a string
  preferred_qualifications: string[]; // List of preferred qualifications as a string array
  tools_and_technologies: string[]; // List of tools and technologies
};

const jdObject: JobDescription = {
  id: '123123',
  score: 85,
  country: 'United States',
  preference: ['Partial-Remote', 'On-Site'],
  work_type: ['Full-Time', 'Contract'],
  skills: ['JavaScript', 'React', 'Node.js'],
  qualifications: [
    "Bachelor's degree in Computer Science, Engineering, or related field",
    'Proven experience in full-stack development',
  ],
  max_salary: 100,
  responsibilities: [
    'Design and implement scalable web applications using modern frameworks and technologies',
  ],
  job_description: `We are looking for a highly skilled Full-Stack Developer to join our team at Tech Solutions Inc.`,
  max_exp: 8,
  min_salary: 50,
  company: 'Tech Solutions Inc.',
  location: 'San Francisco, CA',
  job_title: 'Full-Stack Developer',
  min_exp: 3,
  benefits: ['Comprehensive health insurance (medical, dental, vision)'],
  preferred_qualifications: [
    'Advanced knowledge of TypeScript',
    'Experience with Agile methodologies such as Scrum or Kanban',
  ],
  tools_and_technologies: ['Visual Studio Code', 'Webpack'],
};

function JobDescription(props: JobDescriptionProps) {
  const { job = null } = props;

  if (!job)
    return (
      <Card className="rounded-0" style={{ width: '100%' }}>
        <Card.Body>
          <Card.Title className="mt-4">No Jobs found at the moment</Card.Title>
        </Card.Body>
      </Card>
    );

  return (
    <Card className="rounded-0" style={{ width: '100%' }}>
      <Card.Header>
        <div className="d-flex justify-content-between align-items-center">
          <div>
            <h3>{job.job_title}</h3>
            <h5>At {job.company}</h5>
            <p>
              {job.country}, {job.location}
            </p>
          </div>
          <Button className="ms-auto" variant="primary" type="submit">
            Apply Now
          </Button>
        </div>
      </Card.Header>

      <Card.Body>
        <Card.Title className="mt-4">Work Type</Card.Title>
        <Card.Text>{jdObject.work_type.join(', ')}</Card.Text>

        <Card.Title className="mt-4">Preference</Card.Title>
        <Card.Text>{jdObject.preference.join(', ')}</Card.Text>

        <Card.Title className="mt-4">Salary</Card.Title>
        <Card.Text>
          Min Salary: ${jdObject.min_salary}k - Max Salary: $
          {jdObject.max_salary}k
        </Card.Text>

        <Card.Title className="mt-4">Experience</Card.Title>
        <Card.Text>
          {jdObject.min_exp} - {jdObject.max_exp} years of experience
        </Card.Text>

        <Card.Title className="mt-4">Job Description</Card.Title>
        <Card.Text className="mt-4">{jdObject.job_description}</Card.Text>

        <Card.Title className="mt-4">Responsibilities</Card.Title>
        <ListGroup>
          {jdObject.responsibilities.map((r, index) => (
            <ListGroup.Item key={index}>{r}</ListGroup.Item>
          ))}
        </ListGroup>

        <Card.Title className="mt-4">Qualifications</Card.Title>
        <ListGroup>
          {jdObject.qualifications.map((q, index) => (
            <ListGroup.Item key={index}>{q}</ListGroup.Item>
          ))}
        </ListGroup>

        <Card.Title className="mt-4">Preferred Qualifications</Card.Title>

        <ListGroup>
          {jdObject.preferred_qualifications.map((q, index) => (
            <ListGroup.Item key={index}>{q}</ListGroup.Item>
          ))}
        </ListGroup>

        <Card.Title className="mt-4">Skills</Card.Title>
        <ListGroup>
          {jdObject.skills.map((skill, index) => (
            <ListGroup.Item key={index}>{skill}</ListGroup.Item>
          ))}
        </ListGroup>

        <Card.Title className="mt-4">Tools and Technologies</Card.Title>
        <ListGroup>
          {jdObject.tools_and_technologies.map((t, index) => (
            <ListGroup.Item key={index}>{t}</ListGroup.Item>
          ))}
        </ListGroup>

        <Card.Title className="mt-4">Benefits</Card.Title>
        <ListGroup>
          {jdObject.benefits.map((b, index) => (
            <ListGroup.Item key={index}>{b}</ListGroup.Item>
          ))}
        </ListGroup>
      </Card.Body>
    </Card>
  );
}

export { JobDescription };
export type { JobDescriptionProps };
