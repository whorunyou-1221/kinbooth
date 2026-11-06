import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link } from 'react-router-dom';

const TopNav = () => {
  return (
    <Navbar expand="lg" className="navbar-custom shadow-sm mb-4">
      <Container>
        <Navbar.Brand as={Link} to="/" className="fw-bold fs-4 d-flex align-items-center gap-2">
          <img 
            src="/logo.png" 
            alt="KinBooth Logo" 
            style={{ width: '40px', height: '40px', objectFit: 'cover', borderRadius: '8px' }}
            onError={(e) => {
              e.target.style.display = 'none';
            }}
          />
          <span>KinBooth <span className="text-light opacity-75 fs-6">Enterprise</span></span>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <Nav.Link as={Link} to="/">Home</Nav.Link>
            <Nav.Link as={Link} to="/collage">Collage</Nav.Link>
            <Nav.Link as={Link} to="/savedphoto">Gallery</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default TopNav;
