import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

function Footer() {
  return (
    <footer className="bg-dark text-light py-4">
      <Container>
        <Row>
          <Col className="text-center">
            <h5>Contact</h5>
            <ul className="list-unstyled">
              <li>Email: gfreecs0510@gmail.com</li>
            </ul>
            <ul className="list-unstyled">
              <li>
                <a
                  href="https://www.linkedin.com/in/al-lara-072602206/"
                  className="text-light me-2"
                >
                  LinkedIn
                </a>
              </li>
              <li>
                <a
                  href="https://github.com/gfreecs0510"
                  className="text-light me-2"
                >
                  GitHub
                </a>
              </li>
            </ul>
          </Col>
        </Row>
        <Row className="pt-3">
          <Col className="text-center">
            <p>
              &copy; {new Date().getFullYear()} Alejandro Lara. All rights
              reserved.
            </p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
}

export { Footer };
