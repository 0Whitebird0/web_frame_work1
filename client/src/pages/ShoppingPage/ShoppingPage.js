// ...existing code...
import React, { useState, useMemo } from 'react';

const initialProducts = [
  { id: 1, name: '돼지고기', price: 9000, image: null },
  { id: 2, name: '표고버섯', price: 3000, image: null },
  { id: 3, name: '양파', price: 1500, image: null },
  { id: 4, name: '감자', price: 1200, image: null },
  { id: 5, name: '방울토마토', price: 4500, image: null },
];

function formatKRW(n) {
  return '₩' + n.toLocaleString('ko-KR');
}

const ShoppingPage = () => {
  const [products] = useState(initialProducts);
  const [query, setQuery] = useState('');
  const [cart, setCart] = useState([]); // {id, productId, qty}

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return products;
    return products.filter((p) => p.name.toLowerCase().includes(q));
  }, [products, query]);

  const addToCart = (productId) => {
    setCart((prev) => {
      const found = prev.find((c) => c.productId === productId);
      if (found) {
        return prev.map((c) => (c.productId === productId ? { ...c, qty: c.qty + 1 } : c));
      }
      return [{ id: Date.now(), productId, qty: 1 }, ...prev];
    });
  };

  const changeQty = (productId, delta) => {
    setCart((prev) =>
      prev
        .map((c) => (c.productId === productId ? { ...c, qty: Math.max(0, c.qty + delta) } : c))
        .filter((c) => c.qty > 0)
    );
  };

  const removeFromCart = (productId) => {
    setCart((prev) => prev.filter((c) => c.productId !== productId));
  };

  const cartItems = cart.map((c) => {
    const prod = products.find((p) => p.id === c.productId) || {};
    return { ...c, product: prod };
  });

  const totalPrice = cartItems.reduce((s, it) => s + (it.product.price || 0) * it.qty, 0);

  const handleBuy = () => {
    if (cartItems.length === 0) {
      alert('장바구니가 비어있습니다.');
      return;
    }
    // 실제 결제 로직은 사용자가 구현
    alert(`구매 처리: 총 ${formatKRW(totalPrice)}`);
    setCart([]);
  };

  return (
    <div className="p-8 pt-20">
      <div className="max-w-5xl mx-auto space-y-6">
        {/* 검색영역 */}
        <div className="bg-white p-4 rounded-lg border shadow-sm">
          {/* 가운데 정렬, 너비 축소, 둥근 입력 */}
          <div className="flex justify-center">
            <div className="w-72">
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="식재료 검색"
                className="w-full border rounded-full px-4 py-2 text-sm shadow-sm"
              />
            </div>
          </div>

          {/* 제품 리스트 */}
          <div className="mt-4 space-y-3">
            {filtered.map((p) => (
              <div key={p.id} className="flex items-center gap-4 p-3 border rounded">
                <div className="w-20 h-20 bg-gray-100 rounded-lg flex-shrink-0 flex items-center justify-center text-gray-400 overflow-hidden">
                  {/* 이미지 자리 (크기 확대) */}
                  이미지
                </div>

                <div className="flex-1">
                  <div className="font-medium">{p.name}</div>
                  <div className="text-sm text-gray-500">{formatKRW(p.price)}</div>
                </div>

                <div>
                  <button
                    onClick={() => addToCart(p.id)}
                    className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600 text-sm"
                  >
                    ADD TO CART
                  </button>
                </div>
              </div>
            ))}

            {filtered.length === 0 && (
              <div className="p-6 text-center text-gray-500 border rounded">검색 결과가 없습니다.</div>
            )}
          </div>
        </div>

        {/* 장바구니 요약 */}
        <div className="bg-white p-4 rounded-lg border shadow-sm">
          <h3 className="font-semibold mb-3">장바구니</h3>

          <div className="space-y-3">
            {cartItems.map((it) => (
              <div key={it.productId} className="flex items-center border rounded p-3">
                <div className="w-20 h-20 bg-gray-100 rounded-lg flex items-center justify-center text-gray-400 overflow-hidden">
                  {/* 이미지 자리 (크기 확대, 카드와 일치) */}
                  이미지
                </div>

                <div className="flex-1 px-4">
                  <div className="font-medium">{it.product.name}</div>
                  <div className="text-sm text-gray-500">{formatKRW(it.product.price)}</div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="inline-flex items-center border rounded">
                    <button onClick={() => changeQty(it.productId, -1)} className="px-2 py-1">[-]</button>
                    <div className="px-4 py-1">{it.qty}</div>
                    <button onClick={() => changeQty(it.productId, 1)} className="px-2 py-1">[+]</button>
                  </div>
                  <div className="w-28 text-right font-semibold">{formatKRW((it.product.price || 0) * it.qty)}</div>
                  <button onClick={() => removeFromCart(it.productId)} className="ml-3 text-xs text-red-600">삭제</button>
                </div>
              </div>
            ))}

            {cartItems.length === 0 && (
              <div className="p-4 text-center text-gray-500 border rounded">장바구니에 상품이 없습니다.</div>
            )}
          </div>

          <div className="mt-4 flex items-center justify-end gap-4">
            <div className="text-lg font-semibold">총 가격: {formatKRW(totalPrice)}</div>
            <button onClick={handleBuy} className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600">
              BUY NOW
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShoppingPage;
// ...existing code...