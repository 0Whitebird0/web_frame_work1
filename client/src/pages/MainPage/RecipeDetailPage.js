import React from 'react';
import { useParams, Link } from 'react-router-dom';

function RecipeDetailPage() {
  const { recipeId } = useParams();

  // Placeholder data - in a real app, you would fetch this based on recipeId
  const recipe = {
    name: `레시피 ${recipeId}`,
    ingredients: [
      '당근 2개', '양배추 1개', '양파 1개',
      '고등어 2마리', '오이 2개', '물 100ml',
      '...'
    ],
    instructions: [
      '냄비에 물을 끓인다.',
      '끓는 물에 당근을 넣는다.',
      '...'
    ]
  };

  return (
    <div className="p-8 pt-4 w-full h-full bg-white">
      <div className="p-6 border-b relative">
        <h1 className="text-2xl font-bold text-center">{recipe.name}</h1>
        <Link 
          to="/home" 
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-800 text-2xl"
        >
          &times;
        </Link>
      </div>
      <div className="p-6">
        <div className="w-full h-64 bg-gray-200 rounded-lg flex items-center justify-center text-gray-500 mb-6">
          이미지
        </div>
        
        <div className="mb-6">
          <h2 className="text-lg font-semibold mb-2">[재료]</h2>
          <ul className="grid grid-cols-3 gap-x-4 list-disc list-inside">
            {recipe.ingredients.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        </div>

        <div>
          <h2 className="text-lg font-semibold mb-2">[요리법]</h2>
          <div className="space-y-2">
            {recipe.instructions.map((step, index) => (
              <p key={index}>{step}</p>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default RecipeDetailPage;
