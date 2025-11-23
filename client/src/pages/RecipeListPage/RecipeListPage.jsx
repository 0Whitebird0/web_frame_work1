import React, { useState, useEffect } from "react";
import RecipeCategory from "./components/RecipeCategory";
import "./css/RecipeListPage.css";

const RecipeListPage = () => {
  const [recipes, setRecipes] = useState([]);
  const [search, setSearch] = useState("");

  // 🔥 로그인된 user_id 가져오기
  const userId = localStorage.getItem("user_id");

  // --------------------------------------------------------
  // 🔥 Django에서 레시피 데이터 가져오기
  // --------------------------------------------------------
  useEffect(() => {
    if (!userId) return; // user_id 없으면 로드하지 않음

    fetch(`http://localhost:8000/api/recipes/?user_id=${userId}`)
      .then((res) => res.json())
      .then((data) => {
        setRecipes(data.recipes || []); // 서버 응답이 없으면 빈 배열
      })
      .catch((err) => console.error("API Error:", err));
  }, [userId]);

  // --------------------------------------------------------
  // 🔥 즐겨찾기 Django + 프론트 업데이트
  // --------------------------------------------------------
  const toggleFavorite = (id) => {
    fetch(`http://localhost:8000/api/toggle_like/${id}/?user_id=${userId}`)
      .then(() => {
        setRecipes((prev) =>
          prev.map((item) =>
            item.id === id ? { ...item, favorite: !item.favorite } : item
          )
        );
      })
      .catch((err) => console.error("Toggle Error:", err));
  };

  // --------------------------------------------------------
  // 🔥 검색 필터
  // --------------------------------------------------------
  const filtered = recipes.filter((item) =>
    item.name.toLowerCase().includes(search.toLowerCase())
  );

  // --------------------------------------------------------
  // 🔥 즐겨찾기 우선 정렬
  // --------------------------------------------------------
  const sortByFavorite = (list) => {
    return [...list].sort((a, b) => {
      if (a.favorite === b.favorite) return a.id - b.id;
      return b.favorite - a.favorite; // favorite=true 먼저
    });
  };

  // --------------------------------------------------------
  // 🔥 카테고리별로 분리 (네 UI 구조 그대로)
  // --------------------------------------------------------
  const korean = sortByFavorite(filtered.filter((r) => r.category === "한식"));
  const western = sortByFavorite(filtered.filter((r) => r.category === "양식"));
  const japanese = sortByFavorite(filtered.filter((r) => r.category === "일식"));
  const chinese = sortByFavorite(filtered.filter((r) => r.category === "중식"));

  // --------------------------------------------------------
  // 🔥 UI 렌더링 (네 디자인 그대로)
  // --------------------------------------------------------
  return (
    <div className="recipe-list-container">

      {/* 검색 */}
      <div className="search-bar">
        <input
          placeholder="레시피 검색..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <span className="search-icon">🔍</span>
      </div>

      <RecipeCategory title="한식" items={korean} onFavoriteToggle={toggleFavorite} />
      <RecipeCategory title="양식" items={western} onFavoriteToggle={toggleFavorite} />
      <RecipeCategory title="일식" items={japanese} onFavoriteToggle={toggleFavorite} />
      <RecipeCategory title="중식" items={chinese} onFavoriteToggle={toggleFavorite} />

    </div>
  );
};

export default RecipeListPage;
