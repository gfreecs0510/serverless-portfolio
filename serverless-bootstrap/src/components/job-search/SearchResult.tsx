import { JobDescription } from './JobDescription';
import { SearchResultsLists, Job } from './SearchResultsList';
import { useState } from 'react';

let dummy: Job[] = [
  {
    id: '1',
    job_title: 'Software Developer',
    company: 'Dell',
    country: 'USA',
    location: 'New York',
    work_type: ['Remote', 'Hybrid'],
  },
  {
    id: '2',
    job_title: 'Frontend Developer',
    company: 'Google',
    country: 'USA',
    location: 'San Francisco',
    work_type: ['Remote', 'In-office'],
  },
  {
    id: '3',
    job_title: 'Backend Developer',
    company: 'Microsoft',
    country: 'USA',
    location: 'Redmond',
    work_type: ['Hybrid'],
  },
  {
    id: '4',
    job_title: 'Product Manager',
    company: 'Amazon',
    country: 'USA',
    location: 'Seattle',
    work_type: ['In-office'],
  },
  {
    id: '5',
    job_title: 'UX/UI Designer',
    company: 'Airbnb',
    country: 'USA',
    location: 'San Francisco',
    work_type: ['Remote'],
  },
];

function SearchResult() {
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);

  return (
    <div className="container-fluid d-flex">
      <div className="col-4 d-flex flex-column align-items-start">
        <SearchResultsLists jobs={dummy} onClick={setSelectedJob} />
      </div>

      <div className="col-8">
        <JobDescription job={selectedJob} />
      </div>
    </div>
  );
}

export { SearchResult };
