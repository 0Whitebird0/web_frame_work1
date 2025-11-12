import React from "react";
import "./css/AddRecipePage.css";
import ImageUploadBox from "./components/ImageUploadBox";
import CategorySelector from "./components/CategorySelector";



export default function AddRecipePage() {
  return (
    <main className="add-recipe-page">
      <section className="recipe-card">
        {/* 레시피 이름 */}
        <div className="form-group">
          <label>레시피 이름</label>
          <input
            type="text"
            placeholder="레시피 이름을 입력하세요"
            className="input-field"
          />
        </div>

        {/* 레시피 사진 */}
        <div className="form-group">
          <label>레시피 사진</label>
          <ImageUploadBox />
        </div>

        {/* 주성분 분류 */}
        <CategorySelector />


        {/* 요리법 */}
        <div className="form-group">
          <label>요리법</label>
          <textarea
            placeholder="예: 1. 재료 손질 → 2. 양념 → 3. 조리 순으로 입력하세요"
            className="textarea-field"
          />
        </div>

        {/* 하단 버튼 */}
        <div className="form-actions">
          <button className="cancel-btn">작성 취소</button>
          <button className="submit-btn">저장하기</button>
        </div>
      </section>
    </main>
  );
}
