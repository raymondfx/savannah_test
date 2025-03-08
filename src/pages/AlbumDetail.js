import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import styled from 'styled-components';
import { fetchAlbum, fetchPhotos, fetchUser } from '../services/api';

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

const AlbumHeader = styled.div`
  margin-bottom: 2rem;
`;

const Title = styled.h1`
  margin-bottom: 0.5rem;
`;

const UserLink = styled(Link)`
  color: #2196f3;
  text-decoration: none;
  
  &:hover {
    text-decoration: underline;
  }
`;

const PhotoGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 1rem;
`;

const PhotoCard = styled(Link)`
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

const PhotoImage = styled.img`
  width: 100%;
  height: 200px;
  object-fit: cover;
`;

const PhotoContent = styled.div`
  padding: 1rem;
`;

const PhotoTitle = styled.h3`
  margin: 0;
  font-size: 0.9rem;
  color: #666;
`;

export default function AlbumDetail() {
  const { id } = useParams();
  const [album, setAlbum] = useState(null);
  const [photos, setPhotos] = useState([]);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadAlbumData() {
      try {
        const albumData = await fetchAlbum(id);
        setAlbum(albumData);
        
        const [photosData, userData] = await Promise.all([
          fetchPhotos(id),
          fetchUser(albumData.userId)
        ]);
        
        setPhotos(photosData);
        setUser(userData);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching album data:', error);
        setLoading(false);
      }
    }
    
    loadAlbumData();
  }, [id]);

  if (loading) {
    return <Container>Loading album...</Container>;
  }

  if (!album) {
    return <Container>Album not found</Container>;
  }

  return (
    <Container>
      <BackLink to="/albums">&larr; Back to Albums</BackLink>
      
      <AlbumHeader>
        <Title>{album.title}</Title>
        {user && (
          <div>
            By <UserLink to={`/users/${user.id}`}>{user.name}</UserLink>
          </div>
        )}
      </AlbumHeader>
      
      <PhotoGrid>
        {photos.map(photo => (
          <PhotoCard key={photo.id} to={`/photos/${photo.id}`}>
            <PhotoImage src={photo.thumbnailUrl} alt={photo.title} />
            <PhotoContent>
              <PhotoTitle>{photo.title}</PhotoTitle>
            </PhotoContent>
          </PhotoCard>
        ))}
      </PhotoGrid>
    </Container>
  );
}