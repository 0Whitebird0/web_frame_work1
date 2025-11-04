import React from 'react';
import { Link } from 'react-router-dom';
import { textStyles, buttonStyles } from '../styles/theme';

function LoginPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="p-8 bg-white rounded-lg shadow-md text-center">
        <h1 className={textStyles.pageTitle}>로그인 페이지입니다</h1>
        <Link to="/upload">
          <button className={buttonStyles.primary}>
            사진 업로드
          </button>
        </Link>
      </div>
    </div>
  );
}

export default LoginPage;