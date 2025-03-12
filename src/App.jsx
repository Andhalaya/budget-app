import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext"; // Import AuthProvider
import Login from "./pages/login/Login"; // Login/Register form
import Home from "./pages/home/Home"; // Home page component
import ProtectedRoute from "./components/ProtectedRoute"; // Import ProtectedRoute
import './App.css'
import { ThemeProvider } from "./context/ThemeContext";

function App() {
  return (
    <AuthProvider>
      <ThemeProvider>
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            }
          />
        </Routes>
      </Router>
      </ThemeProvider>
    </AuthProvider>
  );
}

export default App;