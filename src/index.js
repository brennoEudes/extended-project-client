import React from "react";
import ReactDOM from "react-dom";
import App from "./components/App";
import { BrowserRouter } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';

ReactDOM.render(
  <React.Suspense>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.Suspense>,
  document.getElementById("root")
);
