// src/components/FriendRequest.js

import React, { useState } from 'react';
import { sendFriendRequest, acceptFriendRequest } from '../api/friendsService';

const FriendRequest = () => {
  const [friendId, setFriendId] = useState('');

  const handleSendRequest = async () => {
    try {
      const response = await sendFriendRequest(friendId);
      alert(response.message);
    } catch (error) {
      console.error('Error sending friend request:', error);
    }
  };

  const handleAcceptRequest = async () => {
    try {
      const response = await acceptFriendRequest(friendId);
      alert(response.message);
    } catch (error) {
      console.error('Error accepting friend request:', error);
    }
  };

  return (
    <div>
      <h2>Friend Requests</h2>
      <input
        type="text"
        value={friendId}
        onChange={(e) => setFriendId(e.target.value)}
        placeholder="Friend ID"
      />
      <button onClick={handleSendRequest}>Send Friend Request</button>
      <button onClick={handleAcceptRequest}>Accept Friend Request</button>
    </div>
  );
};

export default FriendRequest;
