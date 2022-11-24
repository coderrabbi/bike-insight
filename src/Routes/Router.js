import { createBrowserRouter } from "react-router-dom";
import Navbar from "../components/Common/Navbar/Navbar";

export const routes = createBrowserRouter([
  { path: "/", component: <Navbar /> },
]);
