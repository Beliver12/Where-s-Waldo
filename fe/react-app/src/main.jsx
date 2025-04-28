import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import App from "./App.jsx";
import LeaderBoard from "./routes/LeaderBoard.jsx";
import Play from "./routes/Play.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/play",
    element: <Play />,
  },
  {
    path: "/play/leaderBoard",
    element: <LeaderBoard />,
  },
  {
    path: "/leaderBoard",
    element: <LeaderBoard />,
  },
]);

createRoot(document.getElementById("root")).render(
 
    <RouterProvider router={router} />
 
);
