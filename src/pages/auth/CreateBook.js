import { useState } from "react";
import api from "../../apis/api";
import { useNavigate } from "react-router-dom";

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
    const uploadData = new FormData();

    uploadData.append("picture", img);

    const response = await api.post("/book/upload-image", uploadData);
    return response.data.url;
  }

  async function handleSubmit(event) {
    event.preventDefault();

    try {
      const imgUrl = await handleUploadImage();

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
      <h1>Create a book!</h1>
      <form onSubmit={handleSubmit}>
        <label>Title:</label>
        <input
          type="text"
          required="true"
          name="title"
          value={form.title}
          onChange={handleChange}
        />
        <label>Author:</label>
        <input
          type="text"
          required="true"
          name="author"
          value={form.author}
          onChange={handleChange}
        />
        <label>Synopsis:</label>
        <input
          type="text"
          required="true"
          name="synopsis"
          value={form.synopsis}
          onChange={handleChange}
        />
        <label>Release Year:</label>
        <input
          type="Number"
          required="true"
          name="releaseYear"
          value={form.releaseYear}
          onChange={handleChange}
        />
        <label>Genre:</label>
        <input
          type="text"
          required="true"
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

        <h2>coverImage!</h2>

        <button type="submit">Create book!</button>
      </form>
    </>
  );
}

export default CreateBook;
