import React from "react";
import { useState, useEffect } from "react";
import api from "../apis/api";
import { Link } from "react-router-dom";

function Home() {
  const [books, setBooks] = useState([]);

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchBook() {
      try {
        const response = await api.get("/book");
        setBooks([...response.data]);

        setIsLoading(false);
      } catch (err) {
        console.log(err);
      }
    }
    fetchBook();
  }, []);
console.log (books)
  return (
    <>
      {!isLoading && (
        <div className="text-center">
          <h1>Library</h1>
          <p>Read all books as posible! Enjoy!</p>
          <div className="d-flex flex-column align-items-center">
            <Link className="btn btn-lg btn-primary" to="/create-book">
              Create book!
            </Link>
          </div>

          {books.map((currentBook) => {
              return (
                <div key={currentBook._id}>
                <h2>{currentBook.title}</h2>
                <p>{currentBook.genre}</p>
                </div>
              )
            })}
        </div>
      )}
    </>
  );
}

export default Home;
