import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { fetchUsers, fetchAlbums, fetchPhotos } from '../services/api';

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
`;

const Title = styled.h1`
  margin-bottom: 2rem;
`;

const Greeting = styled.div`
  background-color: #f5f5f5;
  padding: 1.5rem;
  border-radius: 8px;
  margin-bottom: 2rem;
`;

const StatsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.5rem;
  margin-bottom: 2rem;
`;

const StatCard = styled.div`
  background-color: white;
  border-radius: 8px;
  padding: 1.5rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  text-align: center;
`;

const StatNumber = styled.div`
  font-size: 2.5rem;
  font-weight: bold;
  margin-bottom: 0.5rem;
  color: #2196f3;
`;

const StatLabel = styled.div`
  color: #666;
`;

const RecentSection = styled.div`
  margin-bottom: 2rem;
`;

const SectionTitle = styled.h2`
  margin-bottom: 1rem;
  border-bottom: 1px solid #eee;
  padding-bottom: 0.5rem;
`;

const ItemGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 1rem;
`;

const ItemCard = styled(Link)`
  text-decoration: none;
  color: inherit;
  background-color: white;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s;
  
  &:hover {
    transform: translateY(-5px);
  }
`;

const ItemImage = styled.img`
  width: 100%;
  height: 150px;
  object-fit: cover;
`;

const ItemContent = styled.div`
  padding: 1rem;
`;

const ItemTitle = styled.h3`
  margin: 0;
  font-size: 1rem;
`;

export default function Home() {
  const { currentUser } = useAuth();
  const [stats, setStats] = useState({ users: 0, albums: 0, photos: 0 });
  const [recentPhotos, setRecentPhotos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const [users, albums, photos] = await Promise.all([
          fetchUsers(),
          fetchAlbums(),
          fetchPhotos()
        ]);
        
        setStats({
          users: users.length,
          albums: albums.length,
          photos: photos.length
        });
        
        // Get 8 recent photos
        setRecentPhotos(photos.slice(0, 8));
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setLoading(false);
      }
    }
    
    fetchData();
  }, []);

  if (loading) {
    return <Container>Loading...</Container>;
  }

  return (
    <Container>
      <Greeting>
        <Title>Welcome, {currentUser.email}</Title>
        <p>Explore photos, albums, and users from our collection.</p>
      </Greeting>
      
      <StatsContainer>
        <StatCard>
          <StatNumber>{stats.users}</StatNumber>
          <StatLabel>Users</StatLabel>
        </StatCard>
        <StatCard>
          <StatNumber>{stats.albums}</StatNumber>
          <StatLabel>Albums</StatLabel>
        </StatCard>
        <StatCard>
          <StatNumber>{stats.photos}</StatNumber>
          <StatLabel>Photos</StatLabel>
        </StatCard>
      </StatsContainer>
      
      <RecentSection>
        <SectionTitle>Recent Photos</SectionTitle>
        <ItemGrid>
          {recentPhotos.map(photo => (
            <ItemCard key={photo.id} to={`/photos/${photo.id}`}>
              <ItemImage src={photo.thumbnailUrl} alt={photo.title} />
              <ItemContent>
                <ItemTitle>{photo.title}</ItemTitle>
              </ItemContent>
            </ItemCard>
          ))}
        </ItemGrid>
      </RecentSection>
    </Container>
  );
}