import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { useAuth } from '../context/AuthContext';

const Nav = styled.nav`
  background-color: #333;
  color: white;
  padding: 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const NavLinks = styled.div`
  display: flex;
  gap: 1rem;
`;

const StyledLink = styled(Link)`
  color: white;
  text-decoration: none;
  &:hover {
    text-decoration: underline;
  }
`;

const Button = styled.button`
  background-color: #f44336;
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  cursor: pointer;
  border-radius: 4px;
`;

export default function Navigation() {
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();

  async function handleLogout() {
    try {
      await logout();
      navigate('/');
    } catch (error) {
      console.error('Failed to log out', error);
    }
  }

  return (
    <Nav>
      <StyledLink to="/">Photo Gallery</StyledLink>
      <NavLinks>
        {currentUser ? (
          <>
            <StyledLink to="/home">Home</StyledLink>
            <StyledLink to="/users">Users</StyledLink>
            <StyledLink to="/albums">Albums</StyledLink>
            <StyledLink to="/photos">Photos</StyledLink>
            <Button onClick={handleLogout}>Logout</Button>
          </>
        ) : (
          <>
            <StyledLink to="/login">Login</StyledLink>
            <StyledLink to="/signup">Sign Up</StyledLink>
          </>
        )}
      </NavLinks>
    </Nav>
  );
}