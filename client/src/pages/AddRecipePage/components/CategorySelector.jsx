import React from "react";

export default function CategorySelector() {
  return (
    <div className="form-group">
      <label>주성분 분류</label>
      <div className="checkbox-group">
        <label><input type="checkbox" /> 육류</label>
        <label><input type="checkbox" /> 채소</label>
        <label><input type="checkbox" /> 해산물</label>
      </div>
    </div>
  );
}
