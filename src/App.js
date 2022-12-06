import { RouterProvider } from "react-router-dom";
import "./App.css";
import { routes } from "./Routes/Router";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  console.log(process.env.REACT_APP_SERVER_URL);
  return (
    <div className="App">
      <RouterProvider router={routes}></RouterProvider>
      <ToastContainer />
    </div>
  );
}

export default App;
