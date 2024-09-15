// src/components/Recommendations.js

import React, { useState, useEffect } from 'react';
import { getFriendsAndRecommendations } from '../api/friendsService';

const Recommendations = () => {
  const [friends, setFriends] = useState([]);
  const [recommendations, setRecommendations] = useState([]);

  useEffect(() => {
    const fetchFriendsAndRecommendations = async () => {
      try {
        const data = await getFriendsAndRecommendations();
        setFriends(data.friends);
        setRecommendations(data.recommendations);
      } catch (error) {
        console.error('Error fetching friends and recommendations:', error);
      }
    };

    fetchFriendsAndRecommendations();
  }, []);

  return (
    <div>
      <h2>Friends and Recommendations</h2>
      <h3>Friends</h3>
      <ul>
        {friends.map(friend => (
          <li key={friend._id}>{friend.username}</li>
        ))}
      </ul>
      <h3>Recommendations</h3>
      <ul>
        {recommendations.map(rec => (
          <li key={rec._id}>{rec.username}</li>
        ))}
      </ul>
    </div>
  );
};

export default Recommendations;
