import { Route, Routes } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

import Home from "../pages/Home";
import Signup from "../pages/auth/Signup";
import Login from "../pages/auth/Login";
import ProtectedRoute from "../pages/auth/ProtectedRoute";
import CreateBook from "../pages/auth/CreateBook";
import BookDetails from "../pages/BookDetails";
import BookEdit from "../pages/auth/BookEdit";

import { AuthContextComponent } from "../contexts/authContext";

function App() {
  return (
    <AuthContextComponent>
      <Routes>
        <Route path="/" element={<ProtectedRoute component={Home} />} />
        <Route path="/create-book" element={<ProtectedRoute component={CreateBook} />} />
        <Route path="/book-edit" element={<ProtectedRoute component={BookEdit} />} />
        <Route path="/book-details" element={< BookDetails />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </AuthContextComponent>
  );
}

export default App;
