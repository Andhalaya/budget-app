import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext"; 

export default function ProtectedRoute({ children }) {
  const { user } = useAuth();
  const navigate = useNavigate();

  return user ? children : navigate("/login");
}
