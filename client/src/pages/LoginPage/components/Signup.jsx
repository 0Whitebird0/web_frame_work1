import { Link } from "react-router-dom";
import "./css/Signup.css";

export default function Signup() {
  return (
    <section className="signup-card">
      <h3 className="signup-title">회원가입</h3>

      {/* 폼 본문 */}
      <div className="signup-body">
        <label className="signup-label">
          이름
          <input className="signup-input" placeholder="홍길동" />
        </label>

        <label className="signup-label">
          주소
          <input className="signup-input" placeholder="서울특별시 ..." />
        </label>

        <label className="signup-label">
          ID
          <input className="signup-input" placeholder="아이디" />
        </label>

        <label className="signup-label">
          PW
          <input className="signup-input" type="password" placeholder="비밀번호" />
        </label>

        <div className="signup-fieldset">
          <div className="signup-legend">알레르기</div>
          <div className="signup-checkboxes">
            <label><input type="checkbox" /> 우유</label>
            <label><input type="checkbox" /> 땅콩</label>
            <label><input type="checkbox" /> 새우</label>
            <label><input type="checkbox" /> 달걀</label>
            <label><input type="checkbox" /> 생선</label>
            <label><input type="checkbox" /> 밀</label>
          </div>
        </div>

        <div className="signup-fieldset">
          <div className="signup-legend">식단</div>
          <div className="signup-radios">
            <label><input type="radio" name="diet" /> 비건이 아닙니다</label>
            <label><input type="radio" name="diet" /> 비건입니다</label>
          </div>
        </div>
      </div>

      {/* 하단 액션 */}
      <div className="signup-actions">
        <button className="signup-btn">next</button>
        <div className="signup-bottom">
          <span>이미 계정이 있으신가요?</span>
          <Link to="/login">로그인</Link>
        </div>
      </div>
    </section>
  );
}
