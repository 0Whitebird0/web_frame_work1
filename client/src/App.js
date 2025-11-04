import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Header from './MainPage/Header';
import LoginPage from './LoginPage/LoginPage';
import MainPage from './MainPage/MainPage';
import UploadPage from './UploadIngredients/UploadPage';
import RecognizedIngredientsPage from './UploadIngredients/RecognizedIngredientsPage';
import AddRecipePage from './AddRecipePage/AddRecipePage';
import RecipeListPage from './RecipeListPage/RecipeListPage';
import IngredientPage from './IngredientManagerPage/IngredientPage';
import ShoppingPage from './ShoppingPage/ShoppingPage';
import ProfilePage from './ProfilePage/ProfilePage';
import RecipeDetailPage from './MainPage/RecipeDetailPage';

const AppContent = () => {
  const location = useLocation();
  const showHeader = location.pathname !== '/';

  return (
    <div className="bg-gray-50 min-h-screen">
      {showHeader && <Header />}
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/home" element={<MainPage />} />
        <Route path="/upload" element={<UploadPage />} />
        <Route path="/add-recipe" element={<AddRecipePage />} />
        <Route path="/recipe-list" element={<RecipeListPage />} />
        <Route path="/ingredient" element={<IngredientPage />} />
        <Route path="/shopping" element={<ShoppingPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/recipes/:recipeId" element={<RecipeDetailPage />} />
        <Route path="/recognized-ingredients" element={<RecognizedIngredientsPage />} />
      </Routes>
    </div>
  );
};

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;
