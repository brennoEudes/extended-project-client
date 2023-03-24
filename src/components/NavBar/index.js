import { useContext } from "react";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";
import { AuthContext } from "../../contexts/authContext";
import style from "./style.modules.css";

function NavBar() {
  const { loggedInUser } = useContext(AuthContext);
  console.log(loggedInUser);

  return (
    <>
      <div className="navBar">
        <h1>Special Library 📚</h1>
        <div className="navBar-btn">
          {loggedInUser ? (
            <>
            <p>Olá, {loggedInUser.user.name}.</p> 
          <Link to="/">
            <Button variant="outline-light">Home</Button>{" "}
          </Link>
            </>
          )
          :  <Link to="/login">
            <Button variant="outline-light">Login</Button>{" "}
          </Link>}
        </div>
      </div>
    </>
  );
}

export default NavBar;
