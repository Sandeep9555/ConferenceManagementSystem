import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/ConferenceList";
import Navbar from "./components/Navbar";
import Conferences from "./pages/Conferences";
import Feedback from "./pages/Feedback";
import Loginpage from "./pages/Loginpage";
import Register from "./pages/Register";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/conferences" element={<Conferences />} />
        <Route path="/feedback" element={<Feedback />} />
        <Route path="/login" element={<Loginpage />} />
        <Route path="/register" element={<Register />} />
        {/* Add more routes as needed */}
      </Routes>
    </Router>
  );
}

export default App;
