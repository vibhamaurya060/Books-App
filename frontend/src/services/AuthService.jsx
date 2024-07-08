import axios from 'axios';

const API_URL = 'https://books-app-tkcq.onrender.com/users';

const register = async (formData) => {
  try {
    const response = await axios.post(`${API_URL}/register`, formData);
    return response.data;
  } catch (error) {
    throw error;
  }
};

const login = async (credentials) => {
  try {
    const response = await axios.post(`${API_URL}/login`, credentials);
    return response.data; 
  } catch (error) {
    throw error;
  }
};

const getUserData = async (token) => {
  try {
   
    const response = await axios.get(`${API_URL}/login`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data; 
  } catch (error) {
    throw error;
  }
};



export default { register, login, getUserData };
