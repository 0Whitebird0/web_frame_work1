import React from 'react';

const IngredientPage = () => {
  // Mock data for ingredients
  const ingredients = [
    { id: 1, name: '방울토마토', category: '채소', quantity: 2 },
    { id: 2, name: '버섯', category: '채소', quantity: 3 },
    { id: 3, name: '양상추', category: '채소', quantity: 3 },
    { id: 4, name: '소고기', category: '육류', quantity: 4 },
    { id: 5, name: '돼지고기', category: '육류', quantity: 4 },
  ];

  return (
    <div className="p-8 pt-20 max-w-4xl mx-auto">
      <div className="bg-white p-6 rounded-lg shadow-md">
        <div className="relative mb-6">
            <h1 className="text-2xl font-bold text-center">재료 관리</h1>
            <div className="absolute top-0 right-0 flex space-x-2">
                <button className="bg-green-500 text-white text-sm font-bold py-2 px-4 rounded-lg hover:bg-green-600">
                새 재료 추가
                </button>
                <button className="bg-gray-200 text-gray-800 py-2 px-4 rounded-lg hover:bg-gray-300">
                {/* Placeholder for image icon */}
                <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                </svg>
                </button>
            </div>
        </div>

        <div className="flex justify-center mb-6">
          <div className="border p-4 rounded-lg text-center">
            <p className="text-gray-600">품절 임박</p>
            <p className="text-3xl font-bold text-red-500">7</p>
          </div>
        </div>

        <div className="flex justify-between items-center mb-6 space-x-4">
          <div className="relative flex-grow">
            <input
              type="text"
              placeholder="재료 검색"
              className="w-full py-2 pl-10 pr-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            />
            <svg className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
            </svg>
          </div>
          <select className="py-2 px-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500">
            <option>카테고리 전체</option>
            <option>채소</option>
            <option>육류</option>
          </select>
          <select className="py-2 px-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500">
            <option>정렬: 이름순</option>
            <option>정렬: 수량순</option>
          </select>
        </div>

        {/* Ingredient List */}
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white">
            <thead>
              <tr className="border-b">
                <th className="p-3 text-left text-sm font-semibold text-gray-600">Select</th>
                <th className="p-3 text-left text-sm font-semibold text-gray-600">재료명</th>
                <th className="p-3 text-left text-sm font-semibold text-gray-600">카테고리</th>
                <th className="p-3 text-left text-sm font-semibold text-gray-600">수량</th>
                <th className="p-3 text-left text-sm font-semibold text-gray-600">작업</th>
              </tr>
            </thead>
            <tbody>
              {ingredients.map(ingredient => (
                <tr key={ingredient.id} className="border-b hover:bg-gray-50">
                  <td className="p-3">
                    <input type="radio" name="select-ingredient" className="form-radio h-4 w-4" />
                  </td>
                  <td className="p-3">{ingredient.name}</td>
                  <td className="p-3">{ingredient.category}</td>
                  <td className="p-3">
                    <div className="flex items-center space-x-2">
                      <button className="font-bold">[-]</button>
                      <span>{ingredient.quantity}</span>
                      <button className="font-bold">[+]</button>
                    </div>
                  </td>
                  <td className="p-3 flex space-x-2">
                    <button className="bg-green-500 text-white text-xs py-1 px-3 rounded-lg hover:bg-green-600">수정</button>
                    <button className="bg-red-500 text-white text-xs py-1 px-3 rounded-lg hover:bg-red-600">삭제</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default IngredientPage;
