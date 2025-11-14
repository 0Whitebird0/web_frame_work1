import React, { useState } from "react";
import "../css/ImageUploadBox.css";

export default function ImageUploadBox({ file, setFile }) {
  const [preview, setPreview] = useState(null);

  const handleSelect = (e) => {
    const f = e.target.files[0];
    if (f) {
      setFile(f);
      setPreview(URL.createObjectURL(f)); // 이미지 URL 생성
    }
  };

  return (
    <label className="upload-container">
      <div className="upload-box dynamic">
        {preview ? (
            <img src={preview} alt="preview" className="upload-preview-auto" />
        ) : (
    <>
      <span className="upload-icon">📷</span>
      <span className="upload-text">이미지 업로드</span>
    </>
    )}
    </div>

      <input
        type="file"
        accept="image/*"
        hidden
        onChange={handleSelect}
      />
    </label>
  );
}
