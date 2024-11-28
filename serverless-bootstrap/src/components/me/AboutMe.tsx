import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

function AboutMe() {
  return (
    <Container className="mt-5">
      <Row>
        <Col>
          <h2 className="text-left">About Me</h2>
          <p>
            With 7.5 years of experience in software development and leadership,
            I am actively seeking backend development opportunities in Japan and
            internationally. I specialize in building AWS serverless
            applications.
          </p>
        </Col>
      </Row>
    </Container>
  );
}

export default AboutMe;
