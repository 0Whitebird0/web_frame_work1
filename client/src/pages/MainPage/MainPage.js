import React from 'react';
import RecommendedRecipes from './RecommendedRecipes';
import Fridge from './Fridge';
import IngredientsList from './IngredientsList';

const MainPage = () => (
  <main className="p-8 pt-20">
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <div className="lg:col-span-1">
        <h2 className="text-xl font-bold mb-4 text-gray-800">Recommand</h2>
        <RecommendedRecipes />
      </div>
      <div className="lg:col-span-1">
        <Fridge />
      </div>
      <div className="lg:col-span-1">
        <IngredientsList />
      </div>
    </div>
  </main>
);

export default MainPage;
