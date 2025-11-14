import React from "react";
import "../css/IngredientSelector.css";

export default function IngredientSelector({ ingredients, setIngredients }) {
  // 체크박스 토글
  const toggle = (category, item) => {
    const selected = ingredients[category] || [];   // ← 여기만 수정됨!

    const updated = selected.includes(item)
      ? selected.filter((v) => v !== item)
      : [...selected, item];

    setIngredients({
      ...ingredients,
      [category]: updated,
    });
  };

  // 카테고리별 재료 목록
  const data = {
    신선식품: ["고추장", "감자", "대파", "양파", "마늘", "마늘", "마늘", "마늘", "마늘", "마늘", "마늘", "마늘", "마늘", "마늘", "마늘", "마늘", "마늘", "마늘", "마늘", "마늘", "마늘", "마늘"],
    유제품: ["계란", "요거트", "버터"],
    냉동: ["소고기", "목살", "새우"],
    냉동식품: ["냉동만두", "팝콘치킨", "바밤바"],
  };

  return (
    <div className="section-box">
      <p className="section-title">구성 재료</p>

      {Object.keys(data).map((category) => (
        <div key={category} className="category-group">
          <p className="category-title">{category}</p>

          <div className="scroll-x-box">
            {data[category].map((item) => (
              <label key={item} className="ingredient-item">
                <input
                  type="checkbox"
                  checked={ingredients[category]?.includes(item)}
                  onChange={() => toggle(category, item)}
                />
                <span>{item}</span>
              </label>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
