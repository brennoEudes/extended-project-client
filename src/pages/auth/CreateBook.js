import { useState } from "react";
import api from "../../apis/api";
import { useNavigate } from "react-router-dom";


function CreateBook() {
  const [form, setForm] = useState({ title: "", genre: "" });
  const navigate = useNavigate();

  // esse "e" ao invés de "event", pode ser um problema?
  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit (e) {
    e.preventDefault()

    try {
        api.post("/book", form);
        navigate("/");

    } catch (err) {
        console.log (err)
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

        <h2>coverImage!</h2>

        <button>Create book!</button>
      </form>
    </>
  );
}

export default CreateBook;
