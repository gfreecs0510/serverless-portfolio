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
  SiJavascript,
  SiLaravel,
  SiLooker,
  SiMariadb,
  SiMongodb,
  SiMysql,
  SiNodedotjs,
  SiPython,
  SiServerless,
  SiTypescript,
} from 'react-icons/si';

const mainStack = [
  { name: 'AWS', icon: <SiAmazonwebservices color="#FF9900" /> },
  { name: 'TypeScript', icon: <SiTypescript color="#3178C6" /> },
  { name: 'JavaScript', icon: <SiJavascript color="#F7DF1E" /> },
  { name: 'Node.js', icon: <SiNodedotjs color="#339933" /> },
  { name: 'Express', icon: <SiExpress color="#000000" /> },
  { name: 'PHP Laravel', icon: <SiLaravel color="#FF2D20" /> },
  { name: 'Python', icon: <SiPython color="#3776AB" /> },
  { name: 'Docker', icon: <SiDocker color="#2496ED" /> },
  { name: 'Looker', icon: <SiLooker color="#4053D6" /> },
  { name: 'DynamoDB', icon: <SiAmazondynamodb color="#4053D6" /> },
  { name: 'Serverless', icon: <SiServerless color="#005EB8" /> },
  { name: 'Elasticsearch', icon: <SiElasticsearch color="#005EB8" /> },
  { name: 'MariaDB', icon: <SiMariadb color="#003545" /> },
  { name: 'MySQL', icon: <SiMysql color="#4479A1" /> },
];

const minorStack = [
  { name: 'Go', icon: <SiGo color="#00ADD8" /> },
  { name: 'Gin', icon: <SiGin color="#00ADD8" /> },
  { name: 'C', icon: <SiC color="#00599C" /> },
  { name: 'C++', icon: <SiCplusplus color="#00599C" /> },
  { name: 'C#', icon: <SiCsharp color="#239120" /> },
  { name: 'MongoDB', icon: <SiMongodb color="#47A248" /> },
];

function Stacks() {
  return (
    <Container className="my-4">
      <Row className="justify-content-center">
        <Col md={8}>
          <Card className="shadow-sm p-3">
            <Card.Body>
              <Card.Title className="text-primary mb-4">Main Stacks</Card.Title>
              <Row className="mb-3">
                {mainStack.map((tech, index) => (
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
              <Card.Title className="text-secondary mt-4">Minor In</Card.Title>
              <Row>
                {minorStack.map((tech, index) => (
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
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default Stacks;
