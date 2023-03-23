import { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import api from "../../apis/api";

import Button from "react-bootstrap/Button";

function BookDetails () {

    const params = useParams();
    const navigate = useNavigate();
    const [detail, setDetail] = useState({});

    console.log(params)
  
    useEffect(() => {
      async function fetchDetail() {
        try {
          const response = await api.get(`/book/${params.bookId}`);
          console.log(response);
          setDetail(response.data);
        } catch (err) {
          console.log(err);
        }
      }
      fetchDetail();
    }, []);
  
    async function handleDelete() {
      try {
        const response = await api.delete(`/book/${params.bookId}`);
        console.log(response);
        navigate("/");
      } catch (err) {
        console.log(err);
      }
    }

    return (
        <>
            <h1>Book Details</h1>

            <div className="container">
        <div className="">
        <img className="" src={detail.image} alt={detail.name} />
          <h1 className="">{detail.name}</h1>
          <div className="">
            <p>Title: {detail.title}</p>
            <p>Author: {detail.author}</p>
            <p>Synopsis: {detail.synopsis}</p>
            <p>Release Year: {detail.releaseYear}</p>
            <p>Genre: {detail.genre}</p>
            <img src={detail.coverImage} alt="coverImage" />

            <div className="">
              <div className="">
                <Link to={`/book-edit/${detail._id}`}>
                  <Button variant="warning">Edit</Button>{" "}
                </Link>
                <Button onClick={handleDelete} variant="danger">
                  Delete
                </Button>{" "}
              </div>
            </div>
          </div>
        </div>
      </div>
        </>
    )
}

export default BookDetails;