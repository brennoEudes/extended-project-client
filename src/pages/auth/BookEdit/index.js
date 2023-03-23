import { useState, useEffect } from "react";
import api from "../../../apis/api";
import { useNavigate, useParams} from "react-router-dom";
import Button from "react-bootstrap/Button";
import BookForm from "../../../components/BookForm/style.modules.css";

function BookEdit() {
  const [book, setBook] = useState({
    title: "",
    author: "",
    synopsis: "",
    releaseYear: 0,
    genre: "",
    coverImage: "",
  });

  useEffect(() => {
    async function fetchSale() {
      try {
        const response = await api.get(`/book/${params.bookId}`);
        console.log(response);

        setBook(response.data);
      } catch (err) {
        // console.log(err);
      }
    }

    fetchSale();
  }, []);

  const navigate = useNavigate();
  const params = useParams();

  function handleChange(event) {
    //console.log(event.target)
    setBook({ ...book, [event.target.name]: event.target.value });
    //console.log(sale)
  }
  async function handleSubmit(event) {
    try {
      event.preventDefault();
      await api.put(`/book/${params.bookId}`, {...book});

      navigate("/");
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <>
      <div className="container">
        <div className="bookForm">
          <h1 className="bookFormHeader">Edit your book!</h1>

          <form className="bookFormFields" onSubmit={handleSubmit}>
            <label htmlFor="input-title">Title:</label>
            <input
              id="input-title"
              type="text"
              name="title"
              value={book.title}
              onChange={handleChange}
            />
            <label htmlFor="input-author">Author:</label>
            <input
              id="input-author"
              type="text"
              name="author"
              value={book.author}
              onChange={handleChange}
            />
            <label htmlFor="input-synopsis">Synopsis:</label>
            <input
              id="input-synopsis"
              type="text"
              name="synopsis"
              value={book.synopsis}
              onChange={handleChange}
            />
            <label htmlFor="input-releaseYear">Release Year:</label>
            <input
              id="input-releaseYear"
              type="number"
              name="releaseYear"
              value={book.releaseYear}
              onChange={handleChange}
            />
            <label htmlFor="input-genre">Genre:</label>
            <input
              id="input-genre"
              type="text"
              name="genre"
              value={book.genre}
              onChange={handleChange}
            />
            <label htmlFor="input-coverImage">Cover Image (link):</label>
            <input
              id="input-coverImage"
              type="text"
              name="coverImage"
              value={book.coverImage}
              onChange={handleChange}
            />
            <div className="btn-actionsBook">
              <Button type="submit" variant="primary" size="lg">
                Save
              </Button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default BookEdit;
