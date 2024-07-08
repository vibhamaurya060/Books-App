import axios from 'axios';

const API_URL = 'https://books-app-tkcq.onrender.com';

const bookService = {
  getBooks: async () => {
    try {
      const response = await axios.get(`${API_URL}/books`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('accessToken')}`
        }
      });
      return response.data; // Assuming your backend responds with an array of books
    } catch (error) {
      throw error;
    }
  },

  createBook: async (title, author, price, genre) => {
    try {
      const response = await axios.post(`${API_URL}/books`, {
        title: title,
        author: author,
        price: price,
        genre: genre
      }, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('accessToken')}`
        }
      });
      return response.data; // Assuming your backend responds with a message
    } catch (error) {
      throw error;
    }
  },

  updateBook: async (bookId, title, author, price, genre) => {
    try {
      const response = await axios.patch(`${API_URL}/books/${bookId}`, {
        title: title,
        author: author,
        price: price,
        genre: genre
      }, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('accessToken')}`
        }
      });
      return response.data; // Assuming your backend responds with a message
    } catch (error) {
      throw error;
    }
  },

  deleteBook: async (bookId) => {
    try {
      const response = await axios.delete(`${API_URL}/books/${bookId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('accessToken')}`
        }
      });
      return response.data; // Assuming your backend responds with a message
    } catch (error) {
      throw error;
    }
  },
};

export default bookService;
