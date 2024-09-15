// src/components/FriendsList.js

import React, { useState, useEffect } from 'react';
import { getFriends } from '../api/friendsService.js';

const FriendsList = () => {
  const [friends, setFriends] = useState([]);

  useEffect(() => {
    const fetchFriends = async () => {
      try {
        const data = await getFriends();
        setFriends(data);
      } catch (error) {
        console.error('Error fetching friends:', error);
      }
    };

    fetchFriends();
  }, []);

  return (
    <div>
      <h2>Friends List</h2>
      <ul>
        {friends.map(friend => (
          <li key={friend._id}>{friend.username}</li>
        ))}
      </ul>
    </div>
  );
};

export default FriendsList;
