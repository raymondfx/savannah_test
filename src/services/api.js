import axios from 'axios';

const API_URL = 'https://jsonplaceholder.typicode.com';

export const fetchUsers = async () => {
  const response = await axios.get(`${API_URL}/users`);
  return response.data;
};

export const fetchUser = async (id) => {
  const response = await axios.get(`${API_URL}/users/${id}`);
  return response.data;
};

export const fetchAlbums = async (userId = '') => {
  const url = userId ? `${API_URL}/users/${userId}/albums` : `${API_URL}/albums`;
  const response = await axios.get(url);
  return response.data;
};

export const fetchAlbum = async (id) => {
  const response = await axios.get(`${API_URL}/albums/${id}`);
  return response.data;
};

// Add error handling for photo URLs
export const fetchPhotos = async (albumId = '') => {
  try {
    const url = albumId ? `${API_URL}/albums/${albumId}/photos` : `${API_URL}/photos`;
    const response = await axios.get(url);
    
    // Ensure all photo URLs are valid
    return response.data.map(photo => ({
      ...photo,
      // Use a fallback image if the original URL fails to load
      thumbnailUrl: photo.thumbnailUrl || 'https://via.placeholder.com/150',
      url: photo.url || 'https://via.placeholder.com/600/92c952'
    }));
  } catch (error) {
    console.error('Error fetching photos:', error);
    return [];
  }
};

export const fetchPhoto = async (id) => {
  const response = await axios.get(`${API_URL}/photos/${id}`);
  return response.data;
};