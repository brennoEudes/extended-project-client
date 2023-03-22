import React from "react";
import ReactDOM from "react-dom";
import App from "./components/App";
import { BrowserRouter } from "react-router-dom";

ReactDOM.render(
  <React.Suspense>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.Suspense>,
  document.getElementById("root")
);
