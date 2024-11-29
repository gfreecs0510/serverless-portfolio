import { FC } from 'react';
import { Container, Row, Col } from 'react-bootstrap';

const ErrorPage: FC<{ errorMessage?: string; onRetry?: () => void }> = ({
  errorMessage = 'Oops! Something went wrong.',
}) => {
  return (
    <Container className="d-flex justify-content-center align-items-center vh-100">
      <Row className="text-center">
        <Col>
          <h1 className="display-4 text-danger">Error</h1>
          <p className="lead">{errorMessage}</p>
          <p className="text-muted">ごめなさい</p>
        </Col>
      </Row>
    </Container>
  );
};

export default ErrorPage;
