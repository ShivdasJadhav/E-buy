import { Outlet } from "react-router-dom";
import Navigation from "./pages/Auth/Navigation";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const App = () => {
  return (
    <div className="no-scrollbar w-full h-screen overflow-auto">
      <ToastContainer />
      <Navigation />
      <main>
        <Outlet />
      </main>
    </div>
  );
};

export default App;
