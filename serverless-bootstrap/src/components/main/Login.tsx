import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Card from 'react-bootstrap/Card';

function Login() {
  return (
    <Card>
      <Card.Body>
        <Card.Title>Login</Card.Title>
        <Form className="p-4 border rounded">
          <Form.Group className="mb-3" controlId="username">
            <Form.Label>Email address</Form.Label>
            <Form.Control type="email" placeholder="Enter email" />
          </Form.Group>

          <Form.Group className="mb-3" controlId="password">
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" placeholder="Password" />
          </Form.Group>
          <div className="d-flex justify-content-between align-items-center">
            <Button variant="primary" type="submit">
              Login
            </Button>
            <Button variant="primary" type="submit">
              Forgot password?
            </Button>
          </div>
        </Form>
      </Card.Body>
    </Card>
  );
}
export { Login };
