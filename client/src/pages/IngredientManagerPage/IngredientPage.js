// ...existing code...
import React, { useState, useMemo } from 'react';

const initialIngredients = [
  { id: 1, name: '방울토마토', category: '채소', amount: 2, expiryDays: 6 },
  { id: 2, name: '버섯', category: '채소', amount: 3, expiryDays: 2 },
  { id: 3, name: '양상추', category: '채소', amount: 3, expiryDays: 1 },
  { id: 4, name: '소고기', category: '육류', amount: 4, expiryDays: 10 },
  { id: 5, name: '돼지고기', category: '육류', amount: 4, expiryDays: 3 },
  { id: 6, name: '냉동만두', category: '냉동류', amount: 1, expiryDays: 180 },
  { id: 7, name: '우유', category: '유제품류', amount: 1, expiryDays: 2 },
];

const categories = ['전체', '채소', '육류', '냉동류', '유제품류', '유통기한 임박'];

const IngredientPage = () => {
  const [ingredients, setIngredients] = useState(initialIngredients);
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('전체');

  // 필터링 로직: '유통기한 임박'이면 expiryDays <= 4 아이템만, 그 외엔 카테고리/검색으로 필터링
  const filtered = useMemo(() => {
    if (category === '유통기한 임박') {
      return ingredients.filter(
        (it) =>
          (typeof it.expiryDays === 'number' && it.expiryDays <= 4) &&
          it.name.toLowerCase().includes(search.toLowerCase())
      );
    }

    return ingredients
      .filter((it) => (category === '전체' ? true : it.category === category))
      .filter((it) => it.name.toLowerCase().includes(search.toLowerCase()));
  }, [ingredients, search, category]);

  const changeAmount = (id, delta) => {
    setIngredients((prev) => prev.map((it) => (it.id === id ? { ...it, amount: Math.max(0, it.amount + delta) } : it)));
  };

  const remove = (id) => setIngredients((prev) => prev.filter((it) => it.id !== id));

  return (
    <div className="p-8 pt-20">
      {/* 상단 제목 중앙 배치 */}
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-4">
          <h1 className="text-xl font-semibold">재료 관리</h1>
        </div>

        {/* 우측 상단 버튼들 (기능 제거 - 사용자 구현 대기) */}
        <div className="flex justify-end gap-2 mb-4">
          <button className="bg-green-500 text-white px-3 py-1 rounded-md hover:bg-green-600" aria-label="새 재료 추가">
            새 재료 추가
          </button>
          <button className="border rounded-md px-3 py-1 hover:bg-gray-50" aria-label="이미지 업로드">
            🖼️
          </button>
        </div>

        {/* 검색 + 카테고리 (검색 넓게, 카테고리는 중앙 오른쪽) */}
        <div className="flex items-center gap-4 mb-4">
          <div className="flex-1">
            <input
              placeholder="재료 검색"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full border rounded px-4 py-2"
            />
          </div>

          <div className="w-64 text-right">
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="border rounded px-3 py-2 w-full"
            >
              {categories.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* 테이블: 유통기한 칸을 항상 왼쪽에 고정하여 헤더와 행 정렬 유지 */}
        <div className="bg-white rounded-lg border shadow-sm overflow-x-auto">
          <table className="w-full table-auto">
            <thead>
              <tr className="text-sm text-gray-600 border-b">
                {/* 항상 고정된 왼쪽 컬럼 (폭 고정). 선택 시에는 '남은일' 텍스트 표시, 아니면 빈 칸으로 자리 확보 */}
                <th className="px-4 py-3 text-left w-20">
                  {category === '유통기한 임박' ? '남은일' : ''}
                </th>
                <th className="px-4 py-3 text-left">재료명</th>
                <th className="px-4 py-3 text-left">카테고리</th>
                <th className="px-4 py-3 text-center">수량</th>
                <th className="px-4 py-3 text-center">작업</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((it) => (
                <tr key={it.id} className="text-sm border-b last:border-b-0">
                  {/* 항상 존재하는 left cell: 내용은 유통기한 임박 선택시에만 보여줌 */}
                  <td className="px-4 py-3">
                    {category === '유통기한 임박' ? (
                      <div className="text-sm text-red-600 font-semibold min-w-[56px] text-left">
                        {typeof it.expiryDays === 'number' ? `${it.expiryDays}일` : '-'}
                      </div>
                    ) : (
                      // 보이지 않는 플레이스홀더로 열 너비 유지
                      <div className="min-w-[56px]" />
                    )}
                  </td>

                  <td className="px-4 py-3">
                    <div className="font-medium">{it.name}</div>
                  </td>
                  <td className="px-4 py-3">{it.category}</td>
                  <td className="px-4 py-3 text-center">
                    <div className="inline-flex items-center border rounded">
                      <button onClick={() => changeAmount(it.id, -1)} className="px-2 py-1">[-]</button>
                      <div className="px-3 py-1">{it.amount}</div>
                      <button onClick={() => changeAmount(it.id, 1)} className="px-2 py-1">[+]</button>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-center">
                    <div className="flex justify-center gap-2">
                      <button className="bg-green-500 text-white px-3 py-1 rounded text-xs hover:bg-green-600">수정</button>
                      <button onClick={() => remove(it.id)} className="bg-red-500 text-white px-3 py-1 rounded text-xs hover:bg-red-600">삭제</button>
                    </div>
                  </td>
                </tr>
              ))}

              {filtered.length === 0 && (
                <tr>
                  <td colSpan="5" className="px-4 py-6 text-center text-gray-500">
                    결과가 없습니다.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default IngredientPage;
// ...existing code...