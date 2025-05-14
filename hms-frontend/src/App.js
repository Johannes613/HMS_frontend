// https://github.com/Johannes613/HMS_frontend.git
import './App.css';
import { Route, Routes } from "react-router-dom";
import "./App.css";
import HomePage from "./pages/home/HomePage";
import Dashboard from "./pages/tools-dashboard/DashboardSetUp";

function App() {
  return (
    <div className="App">
       <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/dashboard/*" element={<Dashboard />} /> 
      </Routes>
     
    </div>
  );
}

export default App;
