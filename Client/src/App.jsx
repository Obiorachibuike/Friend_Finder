import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Header from "./components/Header";
import { AuthProvider } from "./context/AuthContext";
import Home from "./components/Home";

function App() {
  // const [token, setToken] = useState('');
  return (
    <AuthProvider>
      <Router>
        <>
          <Header />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Signup />} />
          </Routes>
        </>
      </Router>
    </AuthProvider>
  );
}

export default App;
