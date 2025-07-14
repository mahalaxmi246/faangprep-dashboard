import React from 'react';
import { Navbar, Nav, Container, Button } from 'react-bootstrap';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const NavbarComponent = ({ isDarkMode, toggleDarkMode }) => {
  const { user, logout } = useAuth();
  const location = useLocation();

  const navItems = [
    { path: '/', label: 'Dashboard', icon: '📊' },
    { path: '/dsa-tracker', label: 'DSA Tracker', icon: '🧮' },
    { path: '/system-design', label: 'System Design', icon: '🏗️' },
    { path: '/resume-checklist', label: 'Resume Checklist', icon: '📄' },
    { path: '/mock-interviews', label: 'Mock Interviews', icon: '🎤' },
    { path: '/roadmap', label: 'Roadmap', icon: '🗺️' },
  ];

  return (
    <Navbar expand="lg" className={`${isDarkMode ? 'navbar-dark bg-dark' : 'navbar-light bg-white'} shadow-sm`} sticky="top">
      <Container fluid>
        <Navbar.Brand as={Link} to="/" className="fw-bold fs-4">
           FAANG Prep Hub
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            {navItems.map((item) => (
              <Nav.Link
                key={item.path}
                as={Link}
                to={item.path}
                className={location.pathname === item.path ? 'active fw-bold' : ''}
              >
                <span className="me-2">{item.icon}</span>
                {item.label}
              </Nav.Link>
            ))}
          </Nav>
          <div className="d-flex align-items-center gap-2">
            <span className="text-muted small">Welcome, {user?.name || user?.email}</span>
            <Button
              variant={isDarkMode ? 'outline-light' : 'outline-dark'}
              size="sm"
              onClick={toggleDarkMode}
            >
              {isDarkMode ? '☀️' : '🌙'}
            </Button>
            <Button
              variant="outline-danger"
              size="sm"
              onClick={logout}
            >
              Logout
            </Button>
          </div>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavbarComponent;