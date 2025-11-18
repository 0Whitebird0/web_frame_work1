import React, { useState, useEffect } from 'react';

const ShoppingPage = () => {
  // Mock data for products
  const allProducts = [
    { id: 1, name: '돼지고기', price: 9000 },
    { id: 2, name: '표고버섯', price: 3000 },
    { id: 3, name: '소고기', price: 12000 },
    { id: 4, name: '양파', price: 2000 },
    { id: 5, name: '대파', price: 1500 },
  ];

  // Mock data for cart items
  const cartItems = [
    { id: 1, name: '돼지고기', price: 9000, quantity: 2 },
    { id: 2, name: '표고버섯', price: 3000, quantity: 1 },
  ];

  const [searchQuery, setSearchQuery] = useState('');
  const [filteredProducts, setFilteredProducts] = useState(allProducts);

  useEffect(() => {
    const lowercasedQuery = searchQuery.toLowerCase();
    const filtered = allProducts.filter(product =>
      product.name.toLowerCase().includes(lowercasedQuery)
    );
    setFilteredProducts(filtered);
  }, [searchQuery, allProducts]);

  const totalPrice = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);

  return (
    <div className="p-8 pt-20 max-w-4xl mx-auto">
      {/* Search Bar */}
      <div className="mb-8 flex justify-center">
        <div className="relative w-full max-w-md">
          <input
            type="text"
            placeholder="식재료 검색"
            className="w-full py-2 pl-4 pr-10 border rounded-full focus:outline-none focus:ring-2 focus:ring-green-500"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <svg className="absolute right-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
          </svg>
        </div>
      </div>

      {/* Product List */}
      <div className="bg-white p-6 rounded-lg shadow-md mb-8 max-h-96 overflow-y-auto">
        <div className="space-y-4">
          {filteredProducts.map(product => (
            <div key={product.id} className="flex items-center justify-between p-2 border-b">
              <div className="flex items-center space-x-4">
                <input type="checkbox" className="form-checkbox h-5 w-5" />
                <div className="w-16 h-16 bg-gray-200 rounded-lg"></div>
                <div>
                  <p className="font-semibold">{product.name}</p>
                  <p className="text-gray-600">₩ {product.price.toLocaleString()}</p>
                </div>
              </div>
              <button className="bg-green-500 text-white text-sm font-bold py-2 px-4 rounded-lg hover:bg-green-600">
                ADD TO CART
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Current Cart */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-bold mb-4">Current Cart</h2>
        <div className="space-y-4">
          {cartItems.map(item => (
            <div key={item.id} className="flex items-center justify-between p-2 border rounded-lg">
              <div className="flex items-center space-x-4">
                <input type="checkbox" className="form-checkbox h-5 w-5" />
                <div className="w-16 h-16 bg-gray-200 rounded-lg"></div>
                <div>
                  <p className="font-semibold">{item.name}</p>
                  <p className="text-gray-600">₩ {item.price.toLocaleString()}</p>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                  <button className="font-bold">[-]</button>
                  <span>{item.quantity}</span>
                  <button className="font-bold">[+]</button>
                </div>
                <p className="font-semibold w-24 text-right">{(item.price * item.quantity).toLocaleString()}원</p>
              </div>
            </div>
          ))}
        </div>
        <div className="flex justify-end items-center mt-6 pt-4 border-t">
          <p className="text-xl font-bold">Total Price: ₩{totalPrice.toLocaleString()}</p>
          <button className="bg-green-600 text-white font-bold py-2 px-6 rounded-lg ml-4 hover:bg-green-700">
            BUY NOW
          </button>
        </div>
      </div>
    </div>
  );
};

export default ShoppingPage;
