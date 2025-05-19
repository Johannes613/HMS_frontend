// https://github.com/Johannes613/HMS_frontend.git
import "./App.css";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import HomePage from "./pages/home/HomePage";
import Dashboard from "./pages/tools-dashboard/DashboardSetUp";
import { useUserContext } from "./context/userContext";
import SignUp from "./components/home-components/signIn/SignUp/SignUp";

function App() {
  // get logged in user from user context
  const { user } = useUserContext();
  console.log("user", user);
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/dashboard/*" element={<Dashboard />} />
      </Routes>
    </div>
  );
}

export default App;
