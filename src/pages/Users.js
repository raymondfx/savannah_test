import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { fetchUsers } from '../services/api';

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
`;

const Title = styled.h1`
  margin-bottom: 2rem;
`;

const UserGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 1.5rem;
`;

const UserCard = styled(Link)`
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

const UserName = styled.h2`
  margin: 0 0 0.5rem 0;
  font-size: 1.25rem;
`;

const UserInfo = styled.div`
  margin-bottom: 0.5rem;
  color: #666;
`;

const UserCompany = styled.div`
  font-style: italic;
  color: #888;
`;

export default function Users() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadUsers() {
      try {
        const data = await fetchUsers();
        setUsers(data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching users:', error);
        setLoading(false);
      }
    }
    
    loadUsers();
  }, []);

  if (loading) {
    return <Container>Loading users...</Container>;
  }

  return (
    <Container>
      <Title>Users</Title>
      <UserGrid>
        {users.map(user => (
          <UserCard key={user.id} to={`/users/${user.id}`}>
            <UserName>{user.name}</UserName>
            <UserInfo>@{user.username}</UserInfo>
            <UserInfo>{user.email}</UserInfo>
            <UserInfo>{user.phone}</UserInfo>
            <UserCompany>{user.company.name}</UserCompany>
          </UserCard>
        ))}
      </UserGrid>
    </Container>
  );
}