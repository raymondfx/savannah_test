import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import styled from 'styled-components';
import { fetchUser, fetchAlbums } from '../services/api';

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
`;

const BackLink = styled(Link)`
  display: inline-block;
  margin-bottom: 1rem;
  color: #2196f3;
  text-decoration: none;
  
  &:hover {
    text-decoration: underline;
  }
`;

const UserProfile = styled.div`
  background-color: white;
  border-radius: 8px;
  padding: 2rem;
  margin-bottom: 2rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const UserName = styled.h1`
  margin: 0 0 1rem 0;
`;

const UserInfoGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 1.5rem;
`;

const InfoSection = styled.div`
  margin-bottom: 1rem;
`;

const InfoTitle = styled.h3`
  margin: 0 0 0.5rem 0;
  color: #666;
  font-size: 0.9rem;
  text-transform: uppercase;
`;

const InfoContent = styled.div`
  font-size: 1.1rem;
`;

const SectionTitle = styled.h2`
  margin-bottom: 1rem;
  border-bottom: 1px solid #eee;
  padding-bottom: 0.5rem;
`;

const AlbumGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 1rem;
`;

const AlbumCard = styled(Link)`
  text-decoration: none;
  color: inherit;
  background-color: white;
  border-radius: 8px;
  padding: 1.5rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s;
  
  &:hover {
    transform: translateY(-5px);
  }
`;

const AlbumTitle = styled.h3`
  margin: 0;
  font-size: 1.1rem;
`;

export default function UserDetail() {
  const { id } = useParams();
  const [user, setUser] = useState(null);
  const [albums, setAlbums] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadUserData() {
      try {
        const [userData, albumsData] = await Promise.all([
          fetchUser(id),
          fetchAlbums(id)
        ]);
        
        setUser(userData);
        setAlbums(albumsData);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching user data:', error);
        setLoading(false);
      }
    }
    
    loadUserData();
  }, [id]);

  if (loading) {
    return <Container>Loading user data...</Container>;
  }

  if (!user) {
    return <Container>User not found</Container>;
  }

  return (
    <Container>
      <BackLink to="/users">&larr; Back to Users</BackLink>
      
      <UserProfile>
        <UserName>{user.name}</UserName>
        
        <UserInfoGrid>
          <InfoSection>
            <InfoTitle>Username</InfoTitle>
            <InfoContent>@{user.username}</InfoContent>
          </InfoSection>
          
          <InfoSection>
            <InfoTitle>Email</InfoTitle>
            <InfoContent>{user.email}</InfoContent>
          </InfoSection>
          
          <InfoSection>
            <InfoTitle>Phone</InfoTitle>
            <InfoContent>{user.phone}</InfoContent>
          </InfoSection>
          
          <InfoSection>
            <InfoTitle>Website</InfoTitle>
            <InfoContent>{user.website}</InfoContent>
          </InfoSection>
        </UserInfoGrid>
        
        <InfoSection>
          <InfoTitle>Address</InfoTitle>
          <InfoContent>
            {user.address.street}, {user.address.suite}<br />
            {user.address.city}, {user.address.zipcode}
          </InfoContent>
        </InfoSection>
        
        <InfoSection>
          <InfoTitle>Company</InfoTitle>
          <InfoContent>
            <strong>{user.company.name}</strong><br />
            {user.company.catchPhrase}<br />
            {user.company.bs}
          </InfoContent>
        </InfoSection>
      </UserProfile>
      
      <SectionTitle>Albums by {user.name}</SectionTitle>
      
      {albums.length === 0 ? (
        <p>No albums found for this user.</p>
      ) : (
        <AlbumGrid>
          {albums.map(album => (
            <AlbumCard key={album.id} to={`/albums/${album.id}`}>
              <AlbumTitle>{album.title}</AlbumTitle>
            </AlbumCard>
          ))}
        </AlbumGrid>
      )}
    </Container>
  );
}