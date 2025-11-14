import React, { useState } from "react";
import ImageUploadBox from "./ImageUploadBox";
import IngredientSelector from "./IngredientSelector";

export default function AddRecipeForm() {
  const [menuName, setMenuName] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [ingredients, setIngredients] = useState({
    meat: [],
    vegetable: [],
  });
  const [recipeText, setRecipeText] = useState("");

  const handleSubmit = () => {
    alert("레시피 저장 완료!");
  };

  return (
    <div className="add-recipe-card">
      <h2 className="add-recipe-header">메뉴 추가</h2>

      {/* 메뉴 이름 (한 줄 구성) */}
      <div className="form-row">
        <label className="input-label">메뉴 이름</label>
        <input
          className="input-box"
          placeholder="예: 김치찌개, 된장찌개 등"
          value={menuName}
          onChange={(e) => setMenuName(e.target.value)}
        />
      </div>

      {/* 메뉴 사진 (다음 줄에) */}
      <div className="form-row-block">
        <label className="input-label">메뉴 사진</label>
        <ImageUploadBox file={imageFile} setFile={setImageFile} />
      </div>

      {/* 구성 재료 */}
      <div className="form-row-block">
        <IngredientSelector
          ingredients={ingredients}
          setIngredients={setIngredients}
        />
      </div>

      {/* 요리법 */}
      <div className="form-row-block">
        <label className="input-label">요리법</label>
        <textarea
          className="textarea-box"
          placeholder="예: 1. 재료 손질 → 2. 양념 배합 → 3. 조리"
          value={recipeText}
          onChange={(e) => setRecipeText(e.target.value)}
        />
      </div>

      {/* 버튼 */}
      <div className="btn-area">
        <div className="btn-center">
         <button className="btn-submit" onClick={handleSubmit}>
           레시피 저장
         </button>
        </div>

      <div className="btn-right">
       <button className="btn-cancel">취소</button>
       </div>
      </div>
    </div>
  );
}
