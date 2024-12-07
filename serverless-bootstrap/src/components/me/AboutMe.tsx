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
            I am actively pursuing remote Full Stack/Backend developer roles.
          </p>
          <p>
            Based in Tokyo, I bring expertise in building scalable and efficient
            AWS serverless applications, complemented by in-depth knowledge of
            Looker as both a developer and a user. I also hold an AWS
            certification and possess extensive experience with various AWS
            services.
          </p>
          <p>
            I am recognized for my strong Japanese work ethic, adaptability, and
            rapid problem-solving abilities, all underscored by a collaborative
            mindset and a good sense of humor. As a proven leader and team
            player, I excel at driving project success while fostering a
            positive and productive environment.
          </p>
        </Col>
      </Row>
    </Container>
  );
}

export default AboutMe;
