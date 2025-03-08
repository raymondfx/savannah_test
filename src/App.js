// Remove the logo import since it's not being used
// import logo from './logo.svg';
import './App.css';
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import Navigation from './components/Navigation';

// Pages
import Landing from './pages/Landing';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Home from './pages/Home';
import Users from './pages/Users';
import UserDetail from './pages/UserDetail';
import Albums from './pages/Albums';
import AlbumDetail from './pages/AlbumDetail';
import Photos from './pages/Photos';
import PhotoDetail from './pages/PhotoDetail';

function App() {
  return (
    <Router>
      <AuthProvider>
        <Navigation />
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          
          {/* Protected Routes */}
          <Route path="/home" element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          } />
          
          <Route path="/users" element={
            <ProtectedRoute>
              <Users />
            </ProtectedRoute>
          } />
          
          <Route path="/users/:id" element={
            <ProtectedRoute>
              <UserDetail />
            </ProtectedRoute>
          } />
          
          <Route path="/albums" element={
            <ProtectedRoute>
              <Albums />
            </ProtectedRoute>
          } />
          
          <Route path="/albums/:id" element={
            <ProtectedRoute>
              <AlbumDetail />
            </ProtectedRoute>
          } />
          
          <Route path="/photos" element={
            <ProtectedRoute>
              <Photos />
            </ProtectedRoute>
          } />
          
          <Route path="/photos/:id" element={
            <ProtectedRoute>
              <PhotoDetail />
            </ProtectedRoute>
          } />
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;
