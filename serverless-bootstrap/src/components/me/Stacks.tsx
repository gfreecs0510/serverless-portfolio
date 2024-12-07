import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import {
  SiAmazondynamodb,
  SiAmazonwebservices,
  SiC,
  SiCplusplus,
  SiCsharp,
  SiDocker,
  SiElasticsearch,
  SiExpress,
  SiGin,
  SiGo,
  SiLaravel,
  SiLooker,
  SiMariadb,
  SiMysql,
  SiNodedotjs,
  SiPython,
  SiServerless,
  SiTypescript,
  SiJavascript,
  SiReact,
  SiReactbootstrap,
  SiPhp,
  SiBitbucket,
} from 'react-icons/si';

type StackAndLogos = {
  name: string;
  icon: any;
};

const frontEnd: StackAndLogos[] = [
  { name: 'React', icon: <SiReact color="#FF9900" /> },
  { name: 'React-Bootstrap', icon: <SiReactbootstrap color="#FF9900" /> },
];

const backEnd: StackAndLogos[] = [
  { name: 'Node.js', icon: <SiNodedotjs color="#339933" /> },
  { name: 'Express', icon: <SiExpress color="#000000" /> },
  { name: 'PHP Laravel', icon: <SiLaravel color="#FF2D20" /> },
];

const mainLanguages: StackAndLogos[] = [
  { name: 'TypeScript', icon: <SiTypescript color="#3178C6" /> },
  { name: 'JavaScript', icon: <SiJavascript color="#3178C6" /> },
];

const minorLanguages: StackAndLogos[] = [
  { name: 'PHP', icon: <SiPhp color="#3776AB" /> },
  { name: 'Python', icon: <SiPython color="#3776AB" /> },
  { name: 'Go', icon: <SiGo color="#00ADD8" /> },
  { name: 'Gin', icon: <SiGin color="#00ADD8" /> },
  { name: 'C', icon: <SiC color="#00599C" /> },
  { name: 'C++', icon: <SiCplusplus color="#00599C" /> },
  { name: 'C#', icon: <SiCsharp color="#239120" /> },
];

const others: StackAndLogos[] = [
  { name: 'Bitbucket', icon: <SiBitbucket color="#FF9900" /> },
  { name: 'AWS', icon: <SiAmazonwebservices color="#FF9900" /> },
  { name: 'Docker', icon: <SiDocker color="#2496ED" /> },
  { name: 'Looker', icon: <SiLooker color="#4053D6" /> },
  { name: 'DynamoDB', icon: <SiAmazondynamodb color="#4053D6" /> },
  { name: 'Serverless', icon: <SiServerless color="#005EB8" /> },
  { name: 'Elasticsearch', icon: <SiElasticsearch color="#005EB8" /> },
  { name: 'MariaDB', icon: <SiMariadb color="#003545" /> },
  { name: 'MySQL', icon: <SiMysql color="#4479A1" /> },
];

function renderCards(title: string, stack: StackAndLogos[]) {
  return (
    <>
      <Card.Title className="text-primary mb-4">{title}</Card.Title>
      <Row className="mb-3">
        {stack.map((tech, index) => (
          <Col
            xs={6}
            sm={4}
            md={3}
            className="mb-3 d-flex align-items-center"
            key={index}
          >
            <span style={{ fontSize: '1.5rem', marginRight: '8px' }}>
              {tech.icon}
            </span>
            <span>{tech.name}</span>
          </Col>
        ))}
      </Row>
    </>
  );
}
function Stacks() {
  return (
    <Container className="my-4">
      <Row className="justify-content-center">
        <Col md={8}>
          <Card className="shadow-sm p-3">
            <Card.Body>
              {renderCards('Frontend', frontEnd)}
              {renderCards('Backend', backEnd)}
              {renderCards('Main Programming Language', mainLanguages)}
              {renderCards('Minor', minorLanguages)}
              {renderCards('Cloud and other services', others)}
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default Stacks;
