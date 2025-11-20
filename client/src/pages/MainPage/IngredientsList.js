// ...existing code...
import React from 'react';

const sectionsData = {
  1: [
    { name: '토마토', amount: '2개' },
    { name: '양파', amount: '1개' },
    { name: '상추', amount: '한 줌' },
    { name: '오이', amount: '1개' },
    { name: '토마토', amount: '2개' },
    { name: '양파', amount: '1개' },
    { name: '상추', amount: '한 줌' },
    { name: '오이', amount: '1개' },
    { name: '토마토', amount: '2개' },
    { name: '양파', amount: '1개' },
    { name: '상추', amount: '한 줌' },
    { name: '오이', amount: '1개' },
  ],
  2: [
    { name: '우유', amount: '1L' },
    { name: '버터', amount: '100g' },
    { name: '요거트', amount: '2개' },
  ],
  3: [
    { name: '닭가슴살', amount: '300g' },
    { name: '소금', amount: '약간' },
    { name: '후추', amount: '약간' },
  ],
  4: [
    { name: '사과', amount: '2개' },
    { name: '바나나', amount: '3개' },
    { name: '포도', amount: '한 줌' },
  ],
};

const IngredientsList = ({ selectedSection = null }) => {
  // 전체(각 칸)일 때 기본 박스 높이 (추천 레시피 카드와 비슷한 크기)
  const sectionHeightClass = 'h-24';
  // 단일 선택일 때 커진 스크롤뷰 높이
  const singleHeightClass = 'h-96';

  const renderList = (list) => (
    <ul className="space-y-2">
      {list.map((ing, index) => (
        <li key={index} className="flex justify-between text-gray-700">
          <span>• {ing.name}</span>
          <span>{ing.amount}</span>
        </li>
      ))}
    </ul>
  );

  if (selectedSection) {
    return (
      <div>
        <div className="mb-2 font-medium">{selectedSection}번 칸</div>
        {/* 선택된 칸은 더 큰 높이로 보여주어 스크롤이 넉넉함 */}
        <div className={`${singleHeightClass} overflow-y-auto p-3 bg-white rounded border`}>
          {renderList(sectionsData[selectedSection] || [])}
        </div>
      </div>
    );
  }

  // 선택 없음: 4개의 칸을 각각 스크롤 가능한 박스로 보여줌 (기본 높이)
  return (
    <div className="space-y-3">
      {[1, 2, 3, 4].map((key) => (
        <div key={key}>
          <div className="mb-2 font-medium">{`${key}번 칸`}</div>
          <div className={`${sectionHeightClass} overflow-y-auto p-3 bg-white rounded border`}>
            {renderList(sectionsData[key] || [])}
          </div>
        </div>
      ))}
    </div>
  );
};

export default IngredientsList;
// ...existing code...