// src/pages/AddIngredientPage/RecognizedIngredientsPage.jsx
import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import AddIngredientDialog from './components/AddIngredientDialog';
import './css/RecognizedIngredientsPage.css';

// 문자열  숫자 / 단위 분리
const parseAmount = (amount) => {
  if (!amount) return { quantity: 1, unit: '' };

  const text = String(amount).trim();
  const match = text.match(/(\d+(?:\.\d+)?)(.*)/); // 숫자 + 나머지

  if (!match) {
    return { quantity: 1, unit: text };
  }

  const quantity = parseFloat(match[1]);
  const unit = match[2].trim();

  return {
    quantity: isNaN(quantity) ? 1 : quantity,
    unit,
  };
};

const RecognizedIngredientsPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const initialItems = (location.state?.items || []).map((item) => {
    const { quantity, unit } = parseAmount(item.amount);
    return {
      ...item,
      quantity,
      unit,
    };
  });

  const [items, setItems] = useState(initialItems);

  const decreaseAmount = (index) => {
    setItems((prev) =>
      prev.map((item, i) =>
        i === index
          ? { ...item, quantity: Math.max(1, item.quantity - 1) }
          : item
      )
    );
  };

  const increaseAmount = (index) => {
    setItems((prev) =>
      prev.map((item, i) =>
        i === index
          ? { ...item, quantity: item.quantity + 1 }
          : item
      )
    );
  };

  const handleAddFromDialog = (selectedIngredients) => {
    if (!selectedIngredients || selectedIngredients.length === 0) {
      setIsDialogOpen(false);
      return;
    }

    const newItems = selectedIngredients.map((ing) => ({
      ingredient_id: ing.ingredient_id,
      ingredient_name: ing.ingredient_name,
      ingredient_img: ing.ingredient_img || null,
      quantity: 1,
      unit: ing.unit || '',
    }));

    setItems((prev) => [...prev, ...newItems]);
    setIsDialogOpen(false);
  };

  return (
    <div className="recognized-page">
      <div className="recognized-container">
        <h2 className="recognized-title">인식된 재료 목록</h2>

        {/* 스크롤 추가 */}
        <div className="ingredient-list scroll-area">
          {items.map((item, idx) => (
            <div key={idx} className="ingredient-card">
              <div className="ingredient-image-wrapper">
                {item.ingredient_img ? (
                  <img
                    src={item.ingredient_img}
                    alt={item.ingredient_name}
                    className="ingredient-image"
                  />
                ) : (
                  '이미지'
                )}
              </div>

              <div className="ingredient-name">
                {item.ingredient_name}
              </div>

              <div className="ingredient-quantity-row">
                <button
                  onClick={() => decreaseAmount(idx)}
                  className="quantity-button"
                >
                  -
                </button>

                <span className="quantity-text">
                  {item.quantity}
                  {item.unit}
                </span>

                <button
                  onClick={() => increaseAmount(idx)}
                  className="quantity-button"
                >
                  +
                </button>
              </div>
            </div>
          ))}

          {/* 수동 추가 카드 */}
          <button
            type="button"
            onClick={() => setIsDialogOpen(true)}
            className="ingredient-card add-card"
          >
            <div className="ingredient-image-wrapper">
              <span className="add-card-icon">+</span>
            </div>
            <div className="add-card-text">재료 추가</div>
          </button>
        </div>

        <div className="recognized-actions">
          <button
            onClick={() => navigate('/upload')}
            className="recognized-btn recognized-btn--gray"
          >
            재료 다시 인식
          </button>

          <Link to="/home" className="recognized-btn-link">
            <button className="recognized-btn recognized-btn--green">
              재료 인식 완료
            </button>
          </Link>
        </div>
      </div>

      {isDialogOpen && (
        <AddIngredientDialog
          onClose={() => setIsDialogOpen(false)}
          onConfirm={handleAddFromDialog}
        />
      )}
    </div>
  );
};

export default RecognizedIngredientsPage;
