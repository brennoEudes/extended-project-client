import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";
import style from "./style.modules.css";

function NavBar() {
  return (
    <>
    <div className="navBar">
    <h1>Special Library 📚</h1>
      <Link to="/">
        <Button variant="outline-light">My Library</Button>{" "}
      </Link>
    </div>
    </>
  );
}

export default NavBar;