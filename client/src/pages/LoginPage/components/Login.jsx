import "./css/Login.css";
import { Link } from "react-router-dom";

export default function Login() {
  return (
    <section className="login-card">
      <h3 className="login-title">로그인</h3>
      <input className="login-input" placeholder="아이디" />
      <input className="login-input" placeholder="비밀번호" type="password" />
      <label className="login-remember">
        <input type="checkbox" /> 아이디 저장
      </label>
      <Link to="/home"><button className="login-btn">로그인</button></Link>
    </section>
  );
}
