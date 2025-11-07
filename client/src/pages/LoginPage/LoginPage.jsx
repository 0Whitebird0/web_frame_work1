import Commercial from "./components/Commercial";
import Login from "./components/Login";
import { Link } from "react-router-dom";
import "./css/LoginPage.css";

export default function LoginPage() {
  return (
    <div className="login-wrap">
      <Commercial className="panel" />
      <div className="auth-col">
        <Login />
        <div className="signup-link">
          <Link to="/signup">회원가입</Link>
        </div>
      </div>
    </div>
  );
}
