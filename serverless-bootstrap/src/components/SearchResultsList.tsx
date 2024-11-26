import Card from 'react-bootstrap/Card';

type Job = {
  id: string;
  job_title: string;
  company: string;
  country: string;
  location: string;
  work_type: string[];
};

type SearchResultsListProps = {
  jobs: Job[];
  onClick: (job: Job | null) => void;
};

function renderJobCard(job: Job, onClick: (job: Job) => void) {
  return (
    <Card
      className="clickableCard rounded-0"
      style={{ width: '450px' }}
      onClick={() => onClick(job)}
    >
      <Card.Header>{job.job_title}</Card.Header>
      <Card.Body>
        <Card.Title>At {job.company}</Card.Title>
        <Card.Text>
          Location: {job.country}, {job.location}
        </Card.Text>
        <Card.Text>Work type: {job.work_type.join(', ')}</Card.Text>
      </Card.Body>
    </Card>
  );
}

function SearchResultsLists(props: SearchResultsListProps) {
  return (
    <div className="d-flex flex-column justify-content-center align-items-center ">
      {props.jobs.map((job) => {
        return renderJobCard(job, props.onClick);
      })}
    </div>
  );
}

export { SearchResultsLists };
export type { Job, SearchResultsListProps };
