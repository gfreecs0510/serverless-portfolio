import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import { CharacterReference } from '../me/CharacterReference';
import { Portfolio } from '../me/Portfolio';
import { Link } from 'react-router-dom';

const navComponentMapping = [
  {
    nav: 'Portfolio',
    component: Portfolio,
    path: '/portfolio',
  },
  {
    nav: 'Character Reference',
    component: CharacterReference,
    path: '/character-reference',
  },
];

function Header() {
  return (
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container>
        <Navbar.Brand as={Link} to="/">
          About Me
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            {navComponentMapping.map((item) => (
              <Nav.Link as={Link} to={item.path} key={item.nav}>
                {item.nav}
              </Nav.Link>
            ))}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export { Header };
