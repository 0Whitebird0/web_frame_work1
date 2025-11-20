// ...existing code...
import React, { useState } from 'react';
import RecommendedRecipes from './RecommendedRecipes';
import Fridge from './Fridge';
import IngredientsList from './IngredientsList';

const sample = [
  { id: 1, name: '김치찌개', description: '매콤하고 깊은 맛의 김치찌개. 돼지고기와 두부가 어우러진 한국 전통 찌개입니다.' },
  { id: 2, name: '된장찌개', description: '구수한 된장 베이스에 호박과 감자가 들어가 담백한 맛을 내는 찌개.' },
  { id: 3, name: '불고기', description: '달콤 짭짤한 양념이 배인 소고기 볶음. 밥과 함께 먹기 좋은 대표 한식.' },
];

const MainPage = () => {
  const [selectedSection, setSelectedSection] = useState(null);

  return (
    <main className="p-8 pt-20">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        {/* 추천 레시피 (왼쪽) */}
        <div className="lg:col-span-1">
          <h2 className="text-lg font-bold mb-4 text-gray-800">추천 레시피</h2>
          <div className="p-4 border rounded-lg shadow-sm bg-white">
          
            <div className="divide-y">
              {sample.map((r) => (
                <div key={r.id} className="last:border-b-0">
                  <RecommendedRecipes id={r.id} name={r.name} description={r.description} />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* 냉장고 이미지(중앙) */}
        <div className="lg:col-span-1">
          <div className="p-4 border rounded-lg shadow-sm bg-white">
            <Fridge onSelectSection={setSelectedSection} selectedSection={selectedSection} />
          </div>
        </div>

        {/* 재료 목록(우측) - 제목과 버튼을 카드 밖에 배치 */}
        <div className="lg:col-span-1">
          <div className="flex items-center justify-between mb-2">
            <h2 className="text-lg font-bold text-gray-800">
              {selectedSection ? `${selectedSection}번 재료목록` : '전체 재료목록'}
            </h2>
            <button
              onClick={() => setSelectedSection(null)}
              className="ml-4 bg-blue-500 text-white px-3 py-1 rounded-md hover:bg-blue-600"
            >
              전체 식재료 보기
            </button>
          </div>

          <div className="p-4 border rounded-lg shadow-sm bg-white">
            <IngredientsList selectedSection={selectedSection} />
          </div>
        </div>
      </div>
    </main>
  );
};

export default MainPage;
// ...existing code...