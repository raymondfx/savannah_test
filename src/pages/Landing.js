import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
  text-align: center;
`;

const Hero = styled.div`
  background-color: #f5f5f5;
  padding: 4rem 2rem;
  border-radius: 8px;
  margin-bottom: 2rem;
`;

const Title = styled.h1`
  font-size: 2.5rem;
  margin-bottom: 1rem;
`;

const Subtitle = styled.p`
  font-size: 1.2rem;
  color: #666;
  margin-bottom: 2rem;
`;

const Button = styled(Link)`
  display: inline-block;
  background-color: #4caf50;
  color: white;
  padding: 0.75rem 1.5rem;
  text-decoration: none;
  border-radius: 4px;
  font-weight: bold;
  margin: 0 0.5rem;
`;

export default function Landing() {
  return (
    <Container>
      <Hero>
        <Title>Welcome to Photo Gallery</Title>
        <Subtitle>
          Explore a collection of photos from users around the world.
        </Subtitle>
        <div>
          <Button to="/login">Login</Button>
          <Button to="/signup" style={{ backgroundColor: '#2196f3' }}>
            Sign Up
          </Button>
        </div>
      </Hero>
      
      <div>
        <h2>Features</h2>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '2rem' }}>
          <div>
            <h3>Browse Users</h3>
            <p>Discover content from different users</p>
          </div>
          <div>
            <h3>Explore Albums</h3>
            <p>View curated collections of photos</p>
          </div>
          <div>
            <h3>View Photos</h3>
            <p>Enjoy high-quality images</p>
          </div>
        </div>
      </div>
    </Container>
  );
}