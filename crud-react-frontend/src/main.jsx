import React from "react";
import { HelmetProvider } from "react-helmet-async";

import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Users from "./components/Users.jsx";
import Home from "./components/Home.jsx";
import UpdateUser from "./components/UpdateUser.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App></App>,
    children: [
      {
        path: "/",
        element: <Home></Home>,
      },
      {
        path: "/users",
        element: <Users></Users>,
        loader: () => fetch("http://localhost:5001/users"),
      },
      {
        path: "/update/:id",
        element: <UpdateUser></UpdateUser>,
        loader: ({ params }) =>
          fetch(`http://localhost:5001/users/${params.id}`),
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <HelmetProvider>
      <RouterProvider router={router} />
    </HelmetProvider>
  </React.StrictMode>
);
