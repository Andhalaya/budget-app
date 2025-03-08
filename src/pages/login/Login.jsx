import { useAuth } from "../../context/AuthContext";
import LoginForm from "./LoginForm";

function Login() {
  const { login } = useAuth();

  return (
    <div className="">
      <LoginForm />
    </div>
  );
}

export default Login;
