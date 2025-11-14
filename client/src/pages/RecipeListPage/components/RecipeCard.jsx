import React, { useState } from "react";
import "./../css/RecipeCard.css";
import { FaRegStar, FaStar } from "react-icons/fa"; // 별 아이콘

const RecipeCard = ({ data, onFavoriteToggle }) => {
  const [favorite, setFavorite] = useState(data.favorite || false);

  const toggleFavorite = () => {
    const newValue = !favorite;
    setFavorite(newValue);
    onFavoriteToggle(data.id, newValue); // 부모에게 알려주기
  };

  return (
    <div className="recipe-card">
      
      {/* 이미지 영역 */}
      <div className="recipe-card-img">
        {/* 즐겨찾기 별 */}
        <div className="favorite-icon" onClick={toggleFavorite}>
          {favorite ? <FaStar color="#f1c40f" /> : <FaRegStar />}
        </div>

        {/* Django 이미지 들어올 자리 */}
        {data.image ? (
          <img src={data.image} alt={data.name} />
        ) : (
          <div className="placeholder-img" />
        )}
      </div>

      {/* 텍스트 영역 */}
      <div className="recipe-card-info">
        <div className="recipe-name">{data.name}</div>
        <div className="recipe-ingredients">{data.ingredients}</div>
      </div>

    </div>
  );
};

export default RecipeCard;
