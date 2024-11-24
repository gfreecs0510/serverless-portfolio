import { FC } from 'react'
import { Card } from '../core/Card'
import { Button } from '../core/Button'

const jdObject = {
  score: 85,
  avg_exp: 5,
  country: 'United States',
  role: 'Software Engineer',
  job_portal: 'LinkedIn',
  preference: ['Partial-Remote', 'On-Site'],
  work_type: 'Full-Time',
  skills: 'JavaScript, React, Node.js, AWS',
  qualifications: "Bachelor's degree in Computer Science or related field",
  max_salary: 150000,
  responsibilities:
    'Develop and maintain web applications, collaborate with cross-functional teams, write clean and efficient code.',
  job_description: `We are looking for a highly skilled Software Engineer to join our development team. The ideal candidate will have significant experience in building scalable web applications and a deep understanding of modern JavaScript frameworks, with a particular focus on React, Vue, or Angular. In addition to technical proficiency, we expect a strong track record of delivering complex projects on time, as well as the ability to work in a fast-paced environment.

Key Responsibilities:

	•	Design & Development: You will be responsible for the architecture, design, and development of scalable, secure, and efficient web applications. This includes both front-end and back-end work, so versatility in full-stack development is a must.
	•	Collaborate with Cross-Functional Teams: Work closely with product managers, designers, and other engineers to ensure the technical solutions align with business goals and end-user requirements.
	•	Code Quality: Maintain high code quality standards through rigorous testing, code reviews, and following best practices for design and implementation. You should be proficient in writing clean, modular, and maintainable code.
	•	Performance Optimization: Constantly monitor and optimize the performance of web applications, including improving load times, reducing server costs, and minimizing client-side resource consumption.
	•	Security: You must have a strong understanding of security principles and be able to integrate secure coding practices into your day-to-day work, ensuring our applications are free from vulnerabilities.
	•	Documentation: Create and maintain detailed documentation for all development processes, tools, and technologies, ensuring that the project’s codebase remains understandable and accessible to future developers.
	•	Mentoring: As a senior member of the team, you will be expected to mentor and guide junior engineers, helping to raise the skill level of the entire team.
	•	Continuous Learning: Stay up-to-date with the latest industry trends, best practices, and technologies. You should have a passion for learning and a willingness to adopt new methodologies and tools to improve your work.

Required Skills & Qualifications:

	•	Technical Proficiency: Expertise in JavaScript and modern JavaScript frameworks such as React, Angular, or Vue.js. You should also have hands-on experience with JavaScript ES6+ features and a strong understanding of state management patterns like Redux or Vuex.
	•	Backend Development: Solid experience with backend technologies such as Node.js, Express, and RESTful API development. Familiarity with server-side rendering is a plus.
	•	Databases: Experience working with both SQL (PostgreSQL, MySQL) and NoSQL databases (MongoDB, Redis). You should have a strong understanding of designing efficient database schemas and optimizing queries for performance.
	•	Version Control: Proficient in using Git for version control, understanding branching strategies and the importance of maintaining a clean commit history.
	•	Testing & CI/CD: Experience with writing unit tests and integration tests using frameworks like Jest, Mocha, or Cypress. You should also be familiar with CI/CD pipelines and automation tools to ensure smooth deployment processes.
	•	Containerization & Cloud Services: Knowledge of Docker and containerized environments, as well as experience working with cloud platforms such as AWS, Google Cloud, or Azure.
	•	Security Best Practices: Strong understanding of web security principles such as OAuth, JWT, CORS, SQL injection, XSS, and CSRF prevention.
	•	Soft Skills: Excellent communication skills, the ability to work independently and as part of a team, and the ability to clearly articulate technical solutions to non-technical stakeholders.
	•	Attention to Detail: This is non-negotiable. The ideal candidate must have an impeccable attention to detail, ensuring that code is written with precision and that the user experience is flawless.

Preferred Qualifications:

	•	Experience with TypeScript: Knowledge of TypeScript is highly preferred, as we utilize TypeScript across our codebase for better type safety and maintainability.
	•	Agile Methodologies: Experience working in an Agile environment, particularly with Scrum or Kanban methodologies. You should be comfortable participating in sprint planning, stand-ups, retrospectives, and other Agile ceremonies.
	•	DevOps Experience: Familiarity with DevOps practices, including continuous integration, continuous deployment, and infrastructure as code (Terraform, Ansible, etc.).
	•	Leadership: Previous experience in a leadership or senior engineering role where you had to make architectural decisions, mentor junior developers, or lead teams to achieve business objectives.
	•	Mobile Development: Experience with mobile-first design or mobile development (React Native or Flutter) is a plus, as our application is used across multiple platforms.

Educational Requirements:

	•	Degree: A bachelor’s degree in Computer Science, Engineering, or a related field is preferred. However, we value hands-on experience and problem-solving ability more than formal education.
	•	Certifications: Any relevant certifications in software development, cloud services (AWS, Google Cloud), or security (such as CISSP or CEH) are a bonus.

Work Environment:

	•	Location: This is a full-time, in-office position located in our headquarters in [City Name]. We value face-to-face collaboration, but remote work may be considered for the right candidate with the proper experience.
	•	Schedule: Full-time, with the expectation of availability during standard business hours. Occasional after-hours work may be required depending on project deadlines.
	•	Benefits: We offer a competitive salary and benefits package, including health insurance, 401(k), professional development opportunities, and flexible paid time off.

Application Process:

To apply, please submit your resume, a cover letter explaining why you’re a great fit for this role, and links to any relevant projects or GitHub repositories you’ve worked on. Applications without a cover letter will not be considered.`,
  max_exp: 8,
  min_salary: 90000,
  avg_salary: 100,
  company: 'Tech Solutions Inc.',
  location: 'San Francisco, CA',
  job_title: 'Full-Stack Developer',
  min_exp: 3,
}

const JobDescription: FC = () => {
  function generateDescription() {
    return `
    Country : ${jdObject.country}

    Location : ${jdObject.location}

    Average Working Experience : ${jdObject.avg_exp} years

    Average Salary (Annually) : $${jdObject.avg_salary}K

    Preference :${jdObject.preference.map((p) => ` ${p} `)}

    Work Type: ${jdObject.work_type}

    Skills : ${jdObject.skills}

    Qualifications : ${jdObject.qualifications}

    Responsibilities : ${jdObject.responsibilities}

    Job Description: ${jdObject.job_description}

    Job Portal: ${jdObject.job_portal}
    `
  }

  return (
    <div className="flex flex-col m-10 gap-10">
      <Card
        title={`${jdObject.job_title} at ${jdObject.company}`}
        description={generateDescription()}
      />
      <Button label="Apply now" />
    </div>
  )
}

export { JobDescription }
