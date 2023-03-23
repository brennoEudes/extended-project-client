import { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import api from "../../apis/api";

import Button from "react-bootstrap/Button";

function BookDetails () {

    const params = useParams();
    const navigate = useNavigate();
    const [detail, setDetail] = useState({});
  
    useEffect(() => {
      async function fetchDetail() {
        try {
          const response = await api.get(`/book/:bookId/${params.detailId}`);
          console.log(response);
          setDetail(response.data.data.attributes);
        } catch (err) {
          console.log(err);
        }
      }
      fetchDetail();
    }, []);
  
    async function handleDelete() {
      try {
        const response = await api.delete(`/book/:bookId/${params.detailId}`);
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
            <p>Genre: {detail.aceleration}</p>
            <p>Cover Image: {detail.coverImage}</p>

            <div className="">
              <div className="">
                <Link to={`/book-edit/${params.detailId}`}>
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