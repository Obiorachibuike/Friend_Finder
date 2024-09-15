// src/components/AddFriend.js
import React from 'react';
import { sendFriendRequest } from '../api/friendsService';

const AddFriend = ({ userId }) => {
  const handleAddFriend = async () => {
    try {
      await sendFriendRequest(userId);
      alert('Friend request sent');
    } catch (error) {
      console.error('Error sending friend request:', error);
    }
  };

  return (
    <button onClick={handleAddFriend}>Send Friend Request</button>
  );
};

export default AddFriend;
