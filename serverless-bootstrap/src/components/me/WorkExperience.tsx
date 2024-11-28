import Container from 'react-bootstrap/Container';
import {
  VerticalTimeline,
  VerticalTimelineElement,
} from 'react-vertical-timeline-component';
import 'react-vertical-timeline-component/style.min.css';
import WorkIcon from '@mui/icons-material/Work';

const workExp = [
  {
    title: 'Inactive',
    date: '2024/09 - Present',
    phrase: (
      <p>
        Studying, seeking opportunities. Here is my email gfreecs0510@gmail.com
      </p>
    ),
  },
  {
    title: 'Backend Developer',
    date: '3.2 years',
    phrase: <p>Typescript | PHP Laravel | Looker | AWS | Serverless</p>,
  },
  {
    title: 'Software Team Leader',
    date: '2.5 years',
    phrase: <p>C# Windows Application | MySQL | C# MVC</p>,
  },
  {
    title: 'Product Development Engineer',
    date: '5 months',
    phrase: <p>C | Android</p>,
  },
  {
    title: 'C Programmer',
    date: '1.5 years',
    phrase: <p>C</p>,
  },
];

function TimeLine() {
  return (
    <VerticalTimeline lineColor="black">
      {workExp.map((w) => {
        return (
          <VerticalTimelineElement
            className="vertical-timeline-element--work"
            contentStyle={{ background: 'white', color: 'black' }}
            contentArrowStyle={{ borderRight: '7px solid  grey' }}
            date={w.date}
            iconStyle={{ background: 'white', color: 'black' }}
            icon={<WorkIcon />}
          >
            <h4 className="vertical-timeline-element-title">{w.title}</h4>
            {w.phrase}
          </VerticalTimelineElement>
        );
      })}
    </VerticalTimeline>
  );
}

function WorkExperience() {
  return (
    <Container className="mt-5">
      <h2 className="text-left">Work Experience</h2>
      {TimeLine()}
    </Container>
  );
}

export default WorkExperience;
