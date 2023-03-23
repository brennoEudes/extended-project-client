import React, { useState, useContext } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import api from "../../apis/api";
import { AuthContext } from "../../contexts/authContext";
import BookForm from "../../components/BookForm/style.modules.css";
import { Button } from "react-bootstrap";

function Login(props) {
  const authContext = useContext(AuthContext);

  const [state, setState] = useState({ password: "", email: "" });
  const [errors, setErrors] = useState({
    email: null,
    password: null,
  });

  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || "/";

  function handleChange(event) {
    setState({
      ...state,
      [event.currentTarget.name]: event.currentTarget.value,
    });
  }

  async function handleSubmit(event) {
    event.preventDefault();

    try {
      const response = await api.post("/user/login", state);
      console.log(response);

      authContext.setLoggedInUser({ ...response.data });

      //armazena os dados do usuário no frontend, evitando sucessivos logins.
      localStorage.setItem(
        "loggedInUser",
        JSON.stringify({ ...response.data })
      );
      setErrors({ password: "", email: "" });
      navigate(from, { replace: true });
    } catch (err) {
      console.error(err.response);
      setErrors({ ...err.response.data.errors });
    }
  }

  return (
    <div className="container">
      <div className="bookForm">
        <h1 className="bookFormHeader">Login</h1>
        <form className="bookFormFields" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="signupFormEmail">E-mail</label>
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
            <label htmlFor="signupFormPassword">Password</label>
            <input
              type="password"
              name="password"
              id="signupFormPassword"
              value={state.password}
              error={errors.password}
              onChange={handleChange}
            />
          </div>
          <div className="btn-actionsBook">
            <Button type="submit" variant="success" size="lg">
              Login
            </Button>{" "}
          </div>
          <div className="link-signup">
            <Link to="/signup">
              Don't have an account? Click here to signup!
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
