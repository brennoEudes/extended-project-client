import React from "react";
import { useState, useEffect, useContext } from "react";
import { AuthContext } from "../contexts/authContext.js";
import { Button } from "react-bootstrap";

import api from "../apis/api";
import { Link, useNavigate } from "react-router-dom";

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
      {!isLoading && (
        <div className="text-center">
          <h1>See your special library and enjoy!</h1>
          <div className="d-flex flex-column align-items-center">
            <Link to="/create-book">
              <Button variant="primary">Create book</Button>{" "}
            </Link>
          </div>

          {books.map((currentBook) => {
            return (
              <div key={currentBook._id}>
                <img src={currentBook.coverImage} alt="coverImage" />
                <h2>{currentBook.title}</h2>
                <p>{currentBook.genre}</p>
                <p>
                  {" "}
                  <Link to={`/book-details/${currentBook._id}`}>
                    <Button variant="info">See Details</Button>{" "}
                  </Link>
                </p>
              </div>
            );
          })}

          <div className="d-flex flex-column align-items-center">
            <Button variant="danger" onClick={handleLoggout}>
              Exit
            </Button>{" "}
          </div>
        </div>
      )}
    </>
  );
}

export default Home;
