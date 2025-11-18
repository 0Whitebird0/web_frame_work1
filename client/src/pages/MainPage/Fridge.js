
import React from 'react';
import { Link } from 'react-router-dom';

const Fridge = () => {
  return (
    <div className="flex flex-col items-center">
      {/* Placeholder for the image area */}
      <div className="w-full h-64 bg-gray-200 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center text-gray-500 mb-4">
        <p>냉장고 사진</p>
      </div>
      <div className="flex space-x-4">
        <Link to="/upload" className="bg-green-500 text-white py-2 px-6 rounded-lg hover:shadow-md hover:underline">
          사진 업로드
        </Link>
        <button className="bg-gray-200 text-gray-800 py-2 px-6 rounded-lg hover:shadow-md hover:underline">전체 식재료 보기</button>
      </div>
      
      <div className="mt-8 w-full max-w-md">
        <h3 className="text-lg font-semibold mb-4">UI 예시</h3>
        <div className="space-y-4">
          {/* Radio Buttons */}
          <div className="flex items-center space-x-4">
            <p className="font-medium">라디오버튼</p>
            <label className="flex items-center">
              <input type="radio" name="radio-demo" className="form-radio" value="option1" />
              <span className="ml-2">예시1</span>
            </label>
            <label className="flex items-center">
              <input type="radio" name="radio-demo" className="form-radio" value="option2" />
              <span className="ml-2">예시2</span>
            </label>
          </div>

          {/* Checkbox */}
          <div className="flex items-center">
            <p className="font-medium">체크박스</p>
            <label className="flex items-center ml-4">
              <input type="checkbox" className="form-checkbox" />
              <span className="ml-2">예시3</span>
            </label>
          </div>

          {/* Text Input */}
          <div className="flex items-center">
            <p className="font-medium">입력창</p>
            <input
            type="text"
            className="mt-1 block w-full rounded-md border-red-500 shadow-sm focus:border-red-600 focus:ring focus:ring-red-300 focus:ring-opacity-50"
            placeholder="Enter some text"
            />

          </div>
        </div>
      </div>
    </div>
  );
};

export default Fridge;