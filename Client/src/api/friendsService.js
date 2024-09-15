import axios from 'axios';

const API_URL = 'http://localhost:5000'; // Replace with your API URL

export const getFriends = async () => {
  try {
    const response = await axios.get(`${API_URL}/friends`);
    return response.data;
  } catch (error) {
    console.error('Error fetching friends:', error);
    throw error;
  }
};

export const searchUsers = async (query) => {
  try {
    const response = await axios.get(`${API_URL}/search`, { params: { query } });
    return response.data;
  } catch (error) {
    console.error('Error searching users:', error);
    throw error;
  }
};

export const sendFriendRequest = async (id) => {
  try {
    const response = await axios.post(`${API_URL}/friends/requests/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error sending friend request:', error);
    throw error;
  }
};

export const addFriend = async (friendId) => {
  try {
    const response = await axios.post(`${API_URL}/friends/add`, { friendId });
    return response.data;
  } catch (error) {
    console.error('Error adding friend:', error);
    throw error;
  }
};

export const acceptFriendRequest = async (friendId) => {
  try {
    const response = await axios.post(`${API_URL}/friends/accept`, { friendId });
    return response.data;
  } catch (error) {
    console.error('Error accepting friend request:', error);
    throw error;
  }
};

export const getFriendsAndRecommendations = async () => {
  try {
    const response = await axios.get(`${API_URL}/friends/recommendations`);
    return response.data;
  } catch (error) {
    console.error('Error fetching friends and recommendations:', error);
    throw error;
  }
};
