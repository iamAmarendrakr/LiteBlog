import { createRoot } from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router-dom";
import { myRoutes } from "./routes/Routing";

createRoot(document.getElementById("root")).render(
  <RouterProvider router={myRoutes} />
);
