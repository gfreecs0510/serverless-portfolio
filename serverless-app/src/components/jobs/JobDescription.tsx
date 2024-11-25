import { FC } from 'react'

const jdObject = {
  score: 85,
  country: 'United States',
  preference: ['Partial-Remote', 'On-Site'],
  work_type: ['Full-Time', 'Contract'],
  skills: [
    'JavaScript',
    'React',
    'Node.js',
    'AWS',
    'TypeScript',
    'Redux',
    'MongoDB',
    'PostgreSQL',
    'Docker',
    'Jest',
    'Cypress',
    'GraphQL',
    'Kubernetes',
  ],
  qualifications: `- Bachelor's degree in Computer Science, Engineering, or related field.
    - Proven experience in full-stack development.
    - Relevant certifications such as AWS Certified Developer or Kubernetes Administrator are a plus.
    - Strong problem-solving skills and attention to detail.
  `,
  max_salary: 100,
  responsibilities: `- Design and implement scalable web applications using modern frameworks and technologies.
    - Develop front-end user interfaces with React and ensure responsiveness and accessibility.
    - Build and maintain robust back-end APIs using Node.js and Express.
    - Integrate and optimize databases, including both relational and NoSQL solutions.
    - Ensure high code quality through testing (unit, integration, end-to-end) and code reviews.
    - Collaborate with designers, product managers, and other engineers to deliver user-focused features.
    - Participate in DevOps processes, including CI/CD and infrastructure management.
    - Continuously monitor and enhance application performance, security, and scalability.
    - Document processes, technical details, and project updates.
    - Mentor junior developers and foster a collaborative team environment.
  `,
  job_description: `We are looking for a highly skilled Full-Stack Developer to join our team at Tech Solutions Inc. The ideal candidate is a motivated self-starter with a proven track record in building scalable, high-performance applications. You will work on innovative projects using cutting-edge technologies in a dynamic and collaborative environment. 
    
    This role involves full-stack development responsibilities, including front-end, back-end, and database management. If you are passionate about technology and want to make a meaningful impact, we encourage you to apply.
  `,
  max_exp: 8,
  min_salary: 50,
  company: 'Tech Solutions Inc.',
  location: 'San Francisco, CA',
  job_title: 'Full-Stack Developer',
  min_exp: 3,
  benefits: [
    'Comprehensive health insurance (medical, dental, vision)',
    '401(k) retirement plan with company matching',
    'Generous PTO and holiday schedule',
    'Professional development opportunities (training, certifications)',
    'Flexible work options (partial remote, flexible hours)',
    'Relocation assistance (if applicable)',
    'Team-building events and wellness programs',
  ],
  soft_skills: [
    'Excellent communication and teamwork skills',
    'Strong attention to detail and organizational abilities',
    'Adaptability and a willingness to learn new tools and frameworks',
    'Ability to manage multiple tasks and meet deadlines',
  ],
  preferred_qualifications: `- Advanced knowledge of TypeScript.
    - Experience with Agile methodologies such as Scrum or Kanban.
    - Familiarity with DevOps tools like Terraform or Ansible.
    - Mobile development experience (React Native or Flutter).
    - Leadership experience in mentoring or managing technical teams.
  `,
  tools_and_technologies: [
    'Visual Studio Code',
    'Webpack',
    'Babel',
    'Git and GitHub',
    'JIRA',
    'Slack',
    'AWS services (EC2, Lambda, S3, DynamoDB)',
  ],
}

function renderDetails(term: string, description: string) {
  return (
    <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0 text-base">
      <dt className="font-medium text-base-content/90">{term}</dt>
      <dd className="mt-1  text-base-content/80 sm:col-span-2 sm:mt-0 whitespace-pre-line">
        {description}
      </dd>
    </div>
  )
}

const JobDescription: FC = () => {
  return (
    <div className="card border rounded-none shadow-md p-4 mr-10 mb-10">
      <div className="flex justify-between">
        <div className="flex flex-col">
          <h3 className="text-2xl font-semibold text-base-content/90">
            {jdObject.job_title}
          </h3>
          <p className="mt-1 max-w-full text-base-content/80">
            At {jdObject.company}
          </p>
        </div>
        <button className="btn btn-primary">APPLY</button>
      </div>
      <div className="mt-6 border-t border-base-content/25">
        <dl className="divide-y divide-base-content/25">
          {renderDetails(
            'Location',
            `${jdObject.country}, ${jdObject.location}`
          )}
          {renderDetails('Preference', jdObject.preference.join(', '))}
          {renderDetails('Work Type', jdObject.work_type.join(', '))}
          {renderDetails(
            'Salary',
            `${jdObject.min_salary}K USD - ${jdObject.max_salary}K USD`
          )}
          {renderDetails(
            'Working Experience',
            `${jdObject.min_exp}-${jdObject.max_exp} years`
          )}
          {renderDetails('Skills', jdObject.skills.join('\n'))}
          {renderDetails('Soft Skills', jdObject.soft_skills.join('\n'))}
          {renderDetails(
            'Tools and Technologies',
            jdObject.tools_and_technologies.join('\n')
          )}
          {renderDetails('Job Description', jdObject.job_description)}
          {renderDetails('Responsibilities', jdObject.responsibilities)}
          {renderDetails('Qualifications', jdObject.qualifications)}
          {renderDetails(
            'Preferred Qualifications',
            jdObject.preferred_qualifications
          )}
          {renderDetails('Benefits', jdObject.benefits.join('\n'))}
        </dl>
      </div>
    </div>
  )
}

export { JobDescription }
