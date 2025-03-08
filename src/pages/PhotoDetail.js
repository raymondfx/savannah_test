import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import styled from 'styled-components';
import { fetchPhoto, fetchAlbum, fetchUser } from '../services/api';

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

const PhotoContainer = styled.div`
  background-color: white;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  margin-bottom: 2rem;
`;

const PhotoImage = styled.img`
  width: 100%;
  max-height: 600px;
  object-fit: contain;
  background-color: #f5f5f5;
`;

const PhotoContent = styled.div`
  padding: 1.5rem;
`;

const Title = styled.h1`
  margin: 0 0 1rem 0;
`;

const MetaInfo = styled.div`
  margin-bottom: 1rem;
  color: #666;
`;

const MetaLink = styled(Link)`
  color: #2196f3;
  text-decoration: none;
  
  &:hover {
    text-decoration: underline;
  }
`;

export default function PhotoDetail() {
  const { id } = useParams();
  const [photo, setPhoto] = useState(null);
  const [album, setAlbum] = useState(null);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadPhotoData() {
      try {
        const photoData = await fetchPhoto(id);
        setPhoto(photoData);
        
        const albumData = await fetchAlbum(photoData.albumId);
        setAlbum(albumData);
        
        const userData = await fetchUser(albumData.userId);
        setUser(userData);
        
        setLoading(false);
      } catch (error) {
        console.error('Error fetching photo data:', error);
        setLoading(false);
      }
    }
    
    loadPhotoData();
  }, [id]);

  if (loading) {
    return <Container>Loading photo...</Container>;
  }

  if (!photo) {
    return <Container>Photo not found</Container>;
  }

  return (
    <Container>
      <BackLink to={album ? `/albums/${album.id}` : '/photos'}>
        &larr; Back to {album ? 'Album' : 'Photos'}
      </BackLink>
      
      <PhotoContainer>
        <PhotoImage src={photo.url} alt={photo.title} />
        <PhotoContent>
          <Title>{photo.title}</Title>
          
          <MetaInfo>
            {album && (
              <div>
                Album: <MetaLink to={`/albums/${album.id}`}>{album.title}</MetaLink>
              </div>
            )}
            
            {user && (
              <div>
                User: <MetaLink to={`/users/${user.id}`}>{user.name}</MetaLink>
              </div>
            )}
          </MetaInfo>
        </PhotoContent>
      </PhotoContainer>
    </Container>
  );
}