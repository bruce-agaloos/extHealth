import * as React from "react";
import * as ReactDOM from "react-dom/client";
import {
  createHashRouter,
  RouterProvider,
} from "react-router-dom";

import Root from "./layout/root";
import ErrorPage from "./layout/error";
import StartPage from "./layout/startPage";
import Pages from "./layout/pages";
import FinalPage from "./layout/finalPage";

const router = createHashRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <StartPage />,
      },
      {
        path: "pages/:id",
        element: <Pages />,
      },
      {
        path: "finalPage",
        element: <FinalPage />,
      },
    ],
  },
]);


const container = document.createElement("div");
container.id = "root"; 
document.body.appendChild(container);
ReactDOM.createRoot(container).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);