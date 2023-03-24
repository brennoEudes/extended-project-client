import React from "react";
import { useState, useEffect, useContext } from "react";
import { AuthContext } from "../contexts/authContext.js";
import { Button } from "react-bootstrap";

import api from "../apis/api";
import { Link, useNavigate } from "react-router-dom";
import "../components/BookForm/style.modules.css";

function Home() {
  const [books, setBooks] = useState([]);

  const navigate = useNavigate();

  const { setLoggedInUser } = useContext(AuthContext);

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

  console.log(books);

  function handleLoggout() {
    localStorage.removeItem("loggedInUser");
    setLoggedInUser(null);
    navigate("/login");
  }

  return (
    <>
      <div className="homeHeader">
        <h1>See our special library and enjoy!</h1>
        <div className="home-btn">
          <Link to="/create-book">
            <Button variant="primary">Create book</Button>{" "}
          </Link>
          <Button variant="outline-danger" onClick={handleLoggout}>
            Exit
          </Button>{" "}
        </div>
      </div>

      {!isLoading && (
        <div className="homeAll">
          {books.map((currentBook) => {
            return (
              <div className="homeCard" key={currentBook._id}>
                <img src={currentBook.coverImage} alt="coverImage" />
                <h2>Title: {currentBook.title}</h2>
                <p>Gender: {currentBook.genre}</p>
                <p>
                  {" "}
                  <Link to={`/book-details/${currentBook._id}`}>
                    <Button variant="info">See Details</Button>{" "}
                  </Link>
                </p>
              </div>
            );
          })}
        </div>
      )}
    </>
  );
}

export default Home;
