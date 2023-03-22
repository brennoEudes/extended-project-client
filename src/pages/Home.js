import React from "react";
import { useState, useEffect } from "react";
import api from "../apis/api";
import { Link } from "react-router-dom";

function Home() {

const [books, setBooks] = useState([]);

useEffect (() => {
  async function fetchBook() {
    try {

      const response = await api.get("/book");
      setBooks(...response.data);

    } catch (err) {
      console.log (err);
    }
  }
fetchBook();
}, []);



  return (
    <div className="text-center">
      <h1>Library</h1>
      <p>Read all books as posible! Enjoy!</p>
      <div className="d-flex flex-column align-items-center">
        <Link className="btn btn-lg btn-primary" to="/auth/signup">
          Create book!
        </Link>
      </div>


      {books.map ((currentBook) => {
        return <h2>{currentBook.title}</h2>
      })}
    </div>
  );
}

export default Home;
