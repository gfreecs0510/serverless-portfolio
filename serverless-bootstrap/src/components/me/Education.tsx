import Container from 'react-bootstrap/Container';
import {
  VerticalTimeline,
  VerticalTimelineElement,
} from 'react-vertical-timeline-component';
import 'react-vertical-timeline-component/style.min.css';
import SchoolIcon from '@mui/icons-material/School';

const education = [
  {
    degree: 'MS Management Engineering',
    description: 'Undergraduate, 9 units left',
  },
  {
    degree: 'BS Computer Engineering',
    description: 'Completed',
  },
];

function TimeLine() {
  return (
    <VerticalTimeline lineColor="black">
      {education.map((e) => {
        return (
          <VerticalTimelineElement
            className="vertical-timeline-element--work"
            contentStyle={{ background: 'white', color: 'black' }}
            contentArrowStyle={{ borderRight: '7px solid  grey' }}
            date=""
            iconStyle={{ background: 'white', color: 'black' }}
            icon={<SchoolIcon />}
          >
            <h4 className="vertical-timeline-element-title">{e.degree}</h4>
            <p>
              <br />
              {e.description}
            </p>
          </VerticalTimelineElement>
        );
      })}
    </VerticalTimeline>
  );
}

function Education() {
  return (
    <Container className="mt-5">
      <h2 className="text-left">Education</h2>
      {TimeLine()}
    </Container>
  );
}
export default Education;
