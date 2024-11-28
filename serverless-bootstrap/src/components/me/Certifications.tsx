import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';

const certifications = [
  {
    title: 'AWS Certified Cloud Practitioner',
    date: '2024/07/10 - 2027/07/10',
    link: 'https://www.credly.com/badges/7f5b747d-7d44-451d-b9cd-2d384c898764/linked_in?t=shs8i',
    image: `${import.meta.env.VITE_PUBLIC_URL}/aws.png`,
  },
  {
    title: 'JLPT N4 Passer',
    date: '2021/02',
    link: '#',
    image: `${import.meta.env.VITE_PUBLIC_URL}/jlpt.gif`,
  },
];

function Certifications() {
  return (
    <Container className="mt-5">
      <h2 className="text-left mb-4">Certifications</h2>
      <Row>
        {certifications.map((cert, index) => (
          <Col md={6} lg={4} key={index} className="mb-4">
            <Card className="shadow-sm">
              <Card.Img
                variant="top"
                src={cert.image}
                alt={cert.title}
                style={{
                  width: '100px',
                  height: '100px',
                  objectFit: 'contain',
                  margin: '10px auto',
                }}
              />
              <Card.Body>
                <Card.Title>
                  {cert.link !== '#' ? (
                    <a
                      href={cert.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{ color: 'blue', textDecoration: 'none' }}
                    >
                      {cert.title}
                    </a>
                  ) : (
                    cert.title
                  )}
                </Card.Title>
                <Card.Text>{cert.date}</Card.Text>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
}

export default Certifications;
