import React, { useState, useEffect } from "react";
import axios from "axios";

const Book = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchBooks = async () => {
    try {
      setLoading(true);
      const response = await axios.get("https://books-app-tkcq.onrender.com/books", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`, // Replace with your actual JWT token retrieval logic
        },
      });
      setBooks(response.data); // Assuming your API responds with an array of books directly
      setLoading(false);
    } catch (error) {
      console.error("fetchBooks Error:", error.message);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBooks();
  }, []); // Fetch books once when component mounts

  return (
    <div style={{marginLeft:"100px"}}>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <ul>
          {books.map((book) => (
            <li key={book._id}>
              <strong>Title:</strong> {book.title} <br />
              <strong>Author:</strong> {book.author} <br />
              <strong>Price:</strong> {book.price} <br />
              <strong>Genre:</strong> {book.genre} <br />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Book;
