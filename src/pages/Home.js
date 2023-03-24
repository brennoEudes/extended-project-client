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

  // const { LoggedInUser } = useContext(AuthContext);
  // console.log (LoggedInUser) p/ver quais dados estão vindo

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

  // {loggedInUser.user ? (<p>{loggedInUser.user.name}</p>) :  <link>login</link>}

  return (
    <>
      <div className="homeHeader">
        <h1>See our special library and enjoy!</h1>
        <Link to="/create-book">
          <Button variant="primary">Create book</Button>{" "}
        </Link>
        <Button variant="outline-danger" onClick={handleLoggout}>
          Exit
        </Button>{" "}
      </div>

      {!isLoading && (
        <div className="homeCard">
          {books.map((currentBook) => {
            return (
              <div key={currentBook._id}>
                <img src={currentBook.coverImage} alt="coverImage"/>
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
