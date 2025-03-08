import { useAuth } from "../../context/AuthContext";
import LoginForm from "./LoginForm";

function Login() {
  const { login } = useAuth();

  return (
    <div className="">
      <LoginForm />
      <button onClick={login} className="">
        Sign in with Google
      </button>
    </div>
  );
}

export default Login;
