import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { fetchPhotos } from '../services/api';

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
`;

const Title = styled.h1`
  margin-bottom: 2rem;
`;

// Add search container
const SearchContainer = styled.div`
  margin-bottom: 2rem;
`;

const SearchInput = styled.input`
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 1rem;
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

const LoadMoreButton = styled.button`
  background-color: #2196f3;
  color: white;
  border: none;
  padding: 0.75rem 1.5rem;
  border-radius: 4px;
  font-weight: bold;
  cursor: pointer;
  margin: 2rem auto;
  display: block;
  
  &:hover {
    background-color: #0d8bf2;
  }
  
  &:disabled {
    background-color: #cccccc;
    cursor: not-allowed;
  }
`;

export default function Photos() {
  const [photos, setPhotos] = useState([]);
  const [allPhotos, setAllPhotos] = useState([]); // Store all photos
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState(''); // Add search state
  const photosPerPage = 20;

  useEffect(() => {
    async function loadPhotos() {
      try {
        const data = await fetchPhotos();
        setAllPhotos(data); // Store all photos
        // Get first page of photos
        setPhotos(data.slice(0, photosPerPage));
        setLoading(false);
      } catch (error) {
        console.error('Error fetching photos:', error);
        setLoading(false);
      }
    }
    
    loadPhotos();
  }, []);

  // Add search effect
  useEffect(() => {
    if (allPhotos.length > 0) {
      if (searchTerm.trim() === '') {
        // If search is empty, show paginated results
        setPhotos(allPhotos.slice(0, page * photosPerPage));
      } else {
        // Filter photos by title
        const filtered = allPhotos.filter(photo => 
          photo.title.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setPhotos(filtered.slice(0, page * photosPerPage));
      }
    }
  }, [searchTerm, allPhotos, page]);

  async function loadMorePhotos() {
    try {
      setLoading(true);
      const data = await fetchPhotos();
      const nextPhotos = data.slice(0, (page + 1) * photosPerPage);
      setPhotos(nextPhotos);
      setPage(page + 1);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching more photos:', error);
      setLoading(false);
    }
  }

  // Add search handler
  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    setPage(1); // Reset to first page when searching
  };

  if (loading && photos.length === 0) {
    return <Container>Loading photos...</Container>;
  }

  return (
    <Container>
      <Title>Photos</Title>
      
      {/* Add search input */}
      <SearchContainer>
        <SearchInput 
          type="text" 
          placeholder="Search photos by title..." 
          value={searchTerm}
          onChange={handleSearch}
        />
      </SearchContainer>
      
      {photos.length === 0 && !loading ? (
        <p>No photos found matching your search.</p>
      ) : (
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
      )}
      
      {/* Only show load more if not searching or if there are more results */}
      {(searchTerm === '' || photos.length < allPhotos.filter(photo => 
        photo.title.toLowerCase().includes(searchTerm.toLowerCase())
      ).length) && (
        <LoadMoreButton 
          onClick={loadMorePhotos} 
          disabled={loading}
        >
          {loading ? 'Loading...' : 'Load More'}
        </LoadMoreButton>
      )}
    </Container>
  );
}