import { Route, Routes } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

import Home from "../pages/Home";
import Signup from "../pages/auth/Signup";
import Login from "../pages/auth/Login";
import { ProtectedRoute } from "../pages/auth/ProtectedRoute";
import CreateBook from "../pages/auth/CreateBook";
import BookDetails from "../pages/BookDetails";
import BookEdit from "../pages/auth/BookEdit";

import { AuthContextComponent } from "../contexts/authContext";

import NavBar from "./NavBar";
import { Footer } from "./Footer";
import "./App.css";

function App() {
  return (
    <AuthContextComponent>
      <NavBar />
      <Routes>
        <Route path="/" element={<ProtectedRoute component={Home} />} />
        <Route
          path="/create-book"
          element={<ProtectedRoute component={CreateBook} />}
        />
        <Route
          path="/book-edit/:bookId"
          element={<ProtectedRoute component={BookEdit} />}
        />
        <Route path="/book-details/:bookId" element={<BookDetails />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
      </Routes>
      <Footer />
    </AuthContextComponent>
  );
}

export default App;
