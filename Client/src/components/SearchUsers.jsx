// src/components/SearchUsers.js

import React, { useState } from 'react';
import { searchUsers } from '../api/friendsService';

const SearchUsers = () => {
  const [query, setQuery] = useState('');
  const [users, setUsers] = useState([]);

  const handleSearch = async () => {
    try {
      const data = await searchUsers(query);
      setUsers(data);
    } catch (error) {
      console.error('Error searching users:', error);
    }
  };

  return (
    <div>
      <h2>Search Users</h2>
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search by username"
      />
      <button onClick={handleSearch}>Search</button>
      <ul>
        {users.map(user => (
          <li key={user._id}>{user.username}</li>
        ))}
      </ul>
    </div>
  );
};

export default SearchUsers;
