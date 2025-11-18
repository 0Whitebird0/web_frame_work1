import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const RecommendedRecipes = () => {
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    // Django API 연동 전, 임시로 사용할 데이터 배열
    const temporaryRecipes = [
      {
        id: 1,
        name: '김치찌개',
        ingredients: ['돼지고기', '김치', '두부'],
      },
      {
        id: 2,
        name: '된장찌개',
        ingredients: ['된장', '애호박', '양파'],
      },
      {
        id: 3,
        name: '불고기',
        ingredients: ['소고기', '양파', '대파'],
      },
    ];
    setRecipes(temporaryRecipes);
  }, []);

  return (
    <div className="p-4 border rounded-lg shadow-sm bg-white">
      <div className="space-y-4">
        {recipes.length > 0 ? (
          recipes.map((recipe) => (
            <Link to={`/recipes/${recipe.id}`} key={recipe.id} className="flex items-center space-x-4 p-2 rounded-lg hover:bg-gray-100">
              <div className="w-24 h-24 bg-gray-300 rounded-lg"></div>
              <div>
                <h3 className="font-bold">{recipe.name}</h3>
                <ul className="text-sm text-gray-600">
                  {recipe.ingredients.map((ingredient, index) => (
                    <li key={index}>• {ingredient}</li>
                  ))}
                </ul>
              </div>
            </Link>
          ))
        ) : (
          <p className="text-gray-500">추천 레시피를 불러오는 중입니다...</p>
        )}
      </div>
    </div>
  );
};

export default RecommendedRecipes;