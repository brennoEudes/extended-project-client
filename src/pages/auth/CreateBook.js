import { useState } from "react";
import api from "../../apis/api";
import { useNavigate } from "react-router-dom";
import BookForm from "../../components/BookForm/style.modules.css";
import { Button } from "react-bootstrap";

function CreateBook() {
  const [form, setForm] = useState({
    title: "",
    author: "",
    synopsis: "",
    releaseYear: 0,
    genre: "",
    coverImage: "",
  });

  const [img, setImg] = useState("");

  const navigate = useNavigate();

  function handleChange(event) {
    setForm({ ...form, [event.target.name]: event.target.value });
  }

  function handleImage(event) {
    setImg(event.target.files[0]);
  }

  async function handleUploadImage(event) {
    try {
      const uploadData = new FormData();

      uploadData.append("picture", img);

      const response = await api.post("/book/upload-image", uploadData);
      return response.data.url;
    } catch (err) {
      console.log(err);
    }
  }

  async function handleSubmit(event) {
    event.preventDefault();

    try {
      let imgUrl = await handleUploadImage();

      if (imgUrl === undefined) {
        imgUrl =
          "https://res.cloudinary.com/dptsbfvan/image/upload/v1679533946/pictures/file_nqffuu.png";
      }

      console.log(imgUrl);
      const response = api.post("/book/create-book", {
        ...form,
        coverImage: imgUrl,
      });
      console.log(response);
      navigate("/");
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <>
      <div className="container">
        <div className="bookForm">
          <h1 className="bookFormHeader">Create a book!</h1>
          <form className="bookFormFields" onSubmit={handleSubmit}>
            <label>Title:</label>
            <input
              type="text"
              required
              name="title"
              value={form.title}
              onChange={handleChange}
            />
            <label>Author:</label>
            <input
              type="text"
              required
              name="author"
              value={form.author}
              onChange={handleChange}
            />
            <label>Synopsis:</label>
            <input
              type="text"
              required
              name="synopsis"
              value={form.synopsis}
              onChange={handleChange}
            />
            <label>Release Year:</label>
            <input
              type="Number"
              required
              name="releaseYear"
              value={form.releaseYear}
              onChange={handleChange}
            />
            <label>Genre:</label>
            <input
              type="text"
              required
              name="genre"
              value={form.genre}
              onChange={handleChange}
            />

            <label>Cover Image:</label>
            <input
              type="file"
              name="coverImage"
              value={form.coverImage}
              onChange={handleImage}
            />
            <div className="btn-actionsBook">
              <Button type="submit" variant="primary" size="lg">
                Create book
              </Button>{" "}
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default CreateBook;
