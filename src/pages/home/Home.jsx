import { useAuth } from "../../context/AuthContext"; // Adjust path if necessary
import { useNavigate } from "react-router-dom";
import Transactions from "../transactions/Transactions";

export default function Home() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate("/login"); // Ensure redirection after logout
  };

  return (
    <div>
      <h1>Welcome, {user?.email}!</h1>
      <button onClick={handleLogout}>Logout</button>
      <Transactions />
    </div>
  );
}
