import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext.jsx';

const Home = () => {
  const { user, logout } = useContext(AuthContext);
  const [friends, setFriends] = useState([]);

  useEffect(() => {
    const fetchFriends = async () => {
      if (user) {
        const { data } = await axios.get('/api/friends/list', {
          withCredentials: true,
        });
        setFriends(data);
      }
    };
    fetchFriends();
  }, [user]);

  if (!user) {
    return <div>Please log in to see your friends list.</div>;
}

return (
  <div>
    <h1>Friends List</h1>
    <button onClick={logout}>Logout</button>
    <ul>
      {friends.map(friend => (
        <li key={friend._id}>{friend.username}</li>
      ))}
    </ul>
  </div>
);
};

export default Home;

