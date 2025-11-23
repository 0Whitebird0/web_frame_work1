import React, { useState } from "react";
import "./../css/RecipeCard.css";
import { FaRegStar, FaStar } from "react-icons/fa";

const RecipeCard = ({ data, onFavoriteToggle }) => {
  // Django에서 내려준 초기 favorite 값
  const [favorite, setFavorite] = useState(data.favorite);

  const toggleFavorite = () => {
    // UI 즉시 반영
    setFavorite(!favorite);

    // Django API 호출 (팀원 방식)
    onFavoriteToggle(data.id);
  };

  return (
    <div className="recipe-card">
      
      {/* 이미지 영역 */}
      <div className="recipe-card-img">

        {/* 즐겨찾기 별 */}
        <div className="favorite-icon" onClick={toggleFavorite}>
          {favorite ? <FaStar color="#f1c40f" /> : <FaRegStar />}
        </div>

        {/* Django 이미지 */}
        {data.image ? (
          <img src={data.image} alt={data.name} />
        ) : (
          <div className="placeholder-img" />
        )}
      </div>

      {/* 텍스트 영역 */}
      <div className="recipe-card-info">
        <div className="recipe-name">{data.name}</div>

        {/* ingredients 표시 (너 디자인 유지) */}
        {data.ingredients && (
          <div className="recipe-ingredients">
            {Array.isArray(data.ingredients)
              ? data.ingredients.join(", ")
              : data.ingredients}
          </div>
        )}
      </div>

    </div>
  );
};

export default RecipeCard;
