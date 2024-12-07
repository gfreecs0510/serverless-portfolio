import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Image from 'react-bootstrap/Image';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import GitHubIcon from '@mui/icons-material/GitHub';

function ProfilePicture() {
  const handleRedirect = (url: string) => {
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <Container className="my-4 text-center">
      <Row className="justify-content-center">
        <Col xs={12} md={6} lg={4}>
          <Image
            src={'/al.jpg'}
            alt="Your Name"
            roundedCircle
            fluid
            style={{ width: '100%', maxWidth: '200px' }}
          />
          <h3 className="mt-3">Alejandro Lara</h3>
          <p>Full Stack/Backend developer</p>
          <p>Email: gfreecs0510@gmail.com</p>
          <div className="d-flex justify-content-center mt-3">
            <LinkedInIcon
              onClick={() =>
                handleRedirect('https://www.linkedin.com/in/al-lara-072602206/')
              }
              style={{
                color: '#0A66C2',
                fontSize: '2rem',
                cursor: 'pointer',
                margin: '0 10px',
              }}
            />
            <GitHubIcon
              onClick={() => handleRedirect('https://github.com/gfreecs0510')}
              style={{
                color: '#171515',
                fontSize: '2rem',
                cursor: 'pointer',
                margin: '0 10px',
              }}
            />
            <a
              href="/resume.pdf"
              download="Al Lara.pdf"
              className="btn btn-primary"
            >
              Resume
            </a>
          </div>
        </Col>
      </Row>
    </Container>
  );
}

export default ProfilePicture;
