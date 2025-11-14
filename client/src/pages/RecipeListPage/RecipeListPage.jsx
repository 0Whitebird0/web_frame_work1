import React, { useState, useEffect } from "react";
import RecipeCategory from "./components/RecipeCategory";
import "./css/RecipeListPage.css";

const RecipeListPage = () => {
  const [recipes, setRecipes] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
  const dummy = [
    // -------------------- 한식 --------------------
    { id: 1, name: "김치찌개", category: "한식", ingredients: "김치, 돼지고기", favorite: false },
    { id: 2, name: "된장찌개", category: "한식", ingredients: "된장, 두부", favorite: false },
    { id: 3, name: "불고기", category: "한식", ingredients: "소고기, 양파", favorite: false },
    { id: 4, name: "비빔밥", category: "한식", ingredients: "야채, 고추장, 밥", favorite: false },

    // -------------------- 양식 --------------------
    { id: 5, name: "파스타", category: "양식", ingredients: "면, 소스", favorite: false },
    { id: 6, name: "스테이크", category: "양식", ingredients: "소고기", favorite: false },
    { id: 7, name: "피자", category: "양식", ingredients: "치즈, 도우", favorite: false },
    { id: 8, name: "리조또", category: "양식", ingredients: "쌀, 크림", favorite: false },

    // -------------------- 일식 --------------------
    { id: 9, name: "초밥", category: "일식", ingredients: "밥, 생선", favorite: false },
    { id: 10, name: "돈카츠", category: "일식", ingredients: "돼지고기", favorite: false },
    { id: 11, name: "라멘", category: "일식", ingredients: "면, 육수", favorite: false },
    { id: 12, name: "우동", category: "일식", ingredients: "면, 어묵", favorite: false },
    ];

    setRecipes(dummy);
  }, []);

  // ⭐ 즐겨찾기 업데이트
  const toggleFavorite = (id, newValue) => {
    setRecipes((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, favorite: newValue } : item
      )
    );
  };

  // 검색
  const filtered = recipes.filter((item) =>
    item.name.toLowerCase().includes(search.toLowerCase())
  );

  // 즐겨찾기 → 맨 위로 정렬
  const sortByFavorite = (list) => {
  return [...list].sort((a, b) => {
    if (a.favorite === b.favorite) {
      return a.id - b.id; // 기본 정렬 (id순)
    }
    return b.favorite - a.favorite; // 즐겨찾기 먼저
  });
};

  const korean = sortByFavorite(filtered.filter((r) => r.category === "한식"));
  const western = sortByFavorite(filtered.filter((r) => r.category === "양식"));
  const japanese = sortByFavorite(filtered.filter((r) => r.category === "일식"));

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
    </div>
  );
};

export default RecipeListPage;
