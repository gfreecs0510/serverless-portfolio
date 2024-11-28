import { FC } from 'react'

type SearchResultProps = {
  title: string
  company: string
  location: string
  work_style: string[]
}

const dummy: SearchResultProps[] = [
  {
    title: 'Senior Software Engineer At TechLabs',
    company: 'Tech Labs.',
    location: 'San Francisco, CA',
    work_style: ['Hybrid', 'Full-Remote'],
  },
  {
    title: 'Software Engineer',
    company: 'Tech Solutions Inc.',
    location: 'San Francisco, CA',
    work_style: ['Hybrid', 'Full-Remote'],
  },
  {
    title: 'Product Manager',
    company: 'Innovatech Corp.',
    location: 'New York, NY',
    work_style: ['Hybrid', 'Full-Remote'],
  },
  {
    title: 'Data Analyst',
    company: 'Analytics Plus',
    location: 'Seattle, WA',
    work_style: ['Hybrid', 'Full-Remote'],
  },
  {
    title: 'UX Designer',
    company: 'DesignLab',
    location: 'Austin, TX',
    work_style: ['Hybrid', 'Full-Remote'],
  },
  {
    title: 'Cloud Architect',
    company: 'Cloudify',
    location: 'Chicago, IL',
    work_style: ['Hybrid', 'Full-Remote'],
  },
  {
    title: 'DevOps Engineer',
    company: 'NextGen Solutions',
    location: 'Boston, MA',
    work_style: ['Hybrid', 'Full-Remote'],
  },
  {
    title: 'Marketing Specialist',
    company: 'BrandBoosters',
    location: 'Los Angeles, CA',
    work_style: ['Hybrid', 'Full-Remote'],
  },
  {
    title: 'Cybersecurity Expert',
    company: 'SecureIT',
    location: 'Washington, DC',
    work_style: ['Hybrid', 'Full-Remote'],
  },
  {
    title: 'AI Researcher',
    company: 'DeepMind Labs',
    location: 'Palo Alto, CA',
    work_style: ['Hybrid', 'Full-Remote'],
  },
  {
    title: 'Content Writer',
    company: 'StoryMakers',
    location: 'Portland, OR',
    work_style: ['Hybrid', 'Full-Remote'],
  },
]

function RenderCard(props: SearchResultProps) {
  return (
    <div className="card border rounded-none shadow-md p-4 max-w-[350px]">
      <div className="card-body">
        <h5
          className="card-title mb-0 truncate max-w-[350px]"
          title={props.title}
        >
          {props.title}
        </h5>
        <div
          className="text-base-content/50 mb-6 truncate max-w-[350px]"
          title={props.company}
        >
          {props.company}
        </div>
        <p
          className="mb-4 truncate max-w-[350px]"
          title={`${props.location} (${props.work_style.join(',')})`}
        >
          {props.location} ({props.work_style.join(',')})
        </p>
      </div>
    </div>
  )
}

function RenderSearchCount() {
  return (
    <div className="card border rounded-none shadow-md p-4 max-w-[350px]">
      <div className="card-body text-left">
        <h5 className="card-title mb-0 truncate max-w-[350px]">
          Search Results: 1m+
        </h5>
        <p className="mb-4 truncate">10 jobs tailored to your profile.</p>
      </div>
    </div>
  )
}

function RenderCardList(props: SearchResultProps[]) {
  return (
    <div className="flex flex-col">
      {props.map((searchResult) => {
        return RenderCard(searchResult)
      })}
    </div>
  )
}

const SearchResult: FC = () => {
  return (
    <div className="flex flex-col">
      {RenderSearchCount()}
      {RenderCardList(dummy)}
    </div>
  )
}

export { SearchResult, SearchResultProps }
