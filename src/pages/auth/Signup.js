import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../../apis/api";
import { Button } from "react-bootstrap";

function Signup(props) {
  const [state, setState] = useState({ name: "", password: "", email: "" });
  const [errors, setErrors] = useState({
    name: null,
    email: null,
    password: null,
  });

  const navigate = useNavigate();

  function handleChange(e) {
    setState({
      ...state,
      [e.currentTarget.name]: e.currentTarget.value,
    });
  }

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      const response = await api.post("/user/signup", state);
      setErrors({ name: "", password: "", email: "" });
      navigate("/login");
    } catch (err) {
      if (err.response) {
        console.error(err.response);
        return setErrors({ ...err.response.data.errors });
      }

      console.error(err);
    }
  }

  return (
    <div className="container">
      <div className="bookForm">
        <h1 className="bookFormHeader">Create your free account!</h1>
        <form className="bookFormFields" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="signupFormName">Name</label>
            <input
              type="text"
              name="name"
              id="signupFormName"
              value={state.name}
              error={errors.name}
              onChange={handleChange}
            />
          </div>

          <div>
            <label htmlFor="signupFormEmail">E-mail:</label>
            <input
              type="email"
              name="email"
              id="signupFormEmail"
              value={state.email}
              error={errors.email}
              onChange={handleChange}
            />
          </div>

          <div>
            <label htmlFor="signupFormPassword">Password:</label>
            <input
              type="password"
              name="password"
              id="signupFormPassword"
              value={state.password}
              error={errors.password}
              onChange={handleChange}
            />
          </div>

          <div>
          <div className="btn-actionsBook">
            {/* <button type="submit">Signup!</button> */}
            <Button type="submit" variant="success" size="lg">
              Create Account
            </Button>{" "}
            </div>

            <Link to="/login">
              Already have an account? Click here to login.
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Signup;
