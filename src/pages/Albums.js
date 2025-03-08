import React, { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { fetchAlbums, fetchPhotos } from '../services/api';

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

const AlbumGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 1.5rem;
`;

const AlbumCard = styled(Link)`
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

const AlbumThumbnails = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-template-rows: repeat(2, 1fr);
  height: 200px;
`;

const Thumbnail = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const AlbumContent = styled.div`
  padding: 1rem;
`;

const AlbumTitle = styled.h3`
  margin: 0;
  font-size: 1.1rem;
`;

export default function Albums() {
  // Add new loading state for search
  const [isSearching, setIsSearching] = useState(false);
  
  const [albums, setAlbums] = useState([]);
  const [allAlbums, setAllAlbums] = useState([]); // Store all albums
  const [albumPreviews, setAlbumPreviews] = useState({});
  const [loading, setLoading] = useState(true);
  const [initialLoading, setInitialLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState(''); // Add search state

  // Separate data fetching from filtering
  useEffect(() => {
    async function loadAlbums() {
      try {
        const albumsData = await fetchAlbums();
        setAllAlbums(albumsData); // Store all albums
        setAlbums(albumsData);
        
        // Fetch preview photos for each album
        const previewsObj = {};
        for (const album of albumsData.slice(0, 20)) { // Limit to first 20 albums for performance
          const photos = await fetchPhotos(album.id);
          // Get up to 4 photos for the preview
          previewsObj[album.id] = photos.slice(0, 4);
        }
        
        setAlbumPreviews(previewsObj);
        setLoading(false);
        setInitialLoading(false);
      } catch (error) {
        console.error('Error fetching albums:', error);
        setLoading(false);
        setInitialLoading(false);
      }
    }
    
    loadAlbums();
  }, []); // Only run once on component mount

  // Separate effect for filtering based on search term
  // Modify the search effect
  useEffect(() => {
    if (!initialLoading) {
      setIsSearching(true);
      const timeoutId = setTimeout(() => {
        const filteredAlbums = searchTerm.trim() === '' 
          ? allAlbums 
          : allAlbums.filter(album => 
              album.title.toLowerCase().includes(searchTerm.toLowerCase())
            );
        
        setAlbums(filteredAlbums);
        setIsSearching(false);
      }, 300); // Add 300ms debounce delay
        
      return () => clearTimeout(timeoutId);
    }
  }, [searchTerm, allAlbums, initialLoading]);

  // Add missing search handler
  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  // Add data-testid attributes to key elements
  return (
    <Container>
      <Title>Albums</Title> {/* Add back the heading */}
      <SearchInput 
        type="text" 
        placeholder="Search albums by title..." 
        value={searchTerm}
        onChange={handleSearch}
        data-testid="search-input"
      />
      
      {/* Update loading and empty states */}
      {isSearching ? (
        <p data-testid="search-loading">Searching albums...</p>
      ) : albums.length === 0 ? (
        <p data-testid="no-results-message">No albums found matching your search.</p>
      ) : (
        <AlbumGrid>
          {albums.map(album => (
            // Add data-testid to album cards
            <AlbumCard 
              key={album.id} 
              to={`/albums/${album.id}`}
              data-testid="album-card"
            >
              <AlbumThumbnails>
                {albumPreviews[album.id] ? (
                  albumPreviews[album.id].map((photo, index) => (
                    <Thumbnail key={photo.id} src={photo.thumbnailUrl} alt="" />
                  ))
                ) : (
                  // Placeholder thumbnails if photos aren't loaded yet
                  Array(4).fill(0).map((_, index) => (
                    <Thumbnail 
                      key={index} 
                      src="https://via.placeholder.com/150/cccccc" 
                      alt="" 
                    />
                  ))
                )}
              </AlbumThumbnails>
              <AlbumContent>
                <AlbumTitle>{album.title}</AlbumTitle>
              </AlbumContent>
            </AlbumCard>
          ))}
        </AlbumGrid>
      )}
    </Container>
  );
}