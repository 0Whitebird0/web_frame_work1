
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

// Import fridge images
import fridgeTopLeft from '../../image/fridge_top_left.png';
import fridgeTopRight from '../../image/fridge_top_right.png';
import fridgeBottomLeft from '../../image/fridge_bottom_left.png';
import fridgeBottomRight from '../../image/fridge_bottom_right.png';
import fridgeOpenTopLeft from '../../image/fridge_open_top_left.png';
import fridgeOpenTopRight from '../../image/fridge_open_top_right.png';
import fridgeOpenBottomLeft from '../../image/fridge_open_bottom_left.png';
import fridgeOpenBottomRight from '../../image/fridge_open_bottom_right.png';

const Fridge = () => {
  const [doorOpen, setDoorOpen] = useState({
    topLeft: false,
    topRight: false,
    bottomLeft: false,
    bottomRight: false,
  });

  const toggleDoor = (door) => {
    setDoorOpen(prevState => ({
      ...prevState,
      [door]: !prevState[door],
    }));
  };

  return (
    <div className="flex flex-col items-center">
      <div className="grid grid-cols-2 gap-0 mb-4">
        <button onClick={() => toggleDoor('topLeft')}>
          <img src={doorOpen.topLeft ? fridgeOpenTopLeft : fridgeTopLeft} alt="Top Left" />
        </button>
        <button onClick={() => toggleDoor('topRight')}>
          <img src={doorOpen.topRight ? fridgeOpenTopRight : fridgeTopRight} alt="Top Right" />
        </button>
        <button onClick={() => toggleDoor('bottomLeft')}>
          <img src={doorOpen.bottomLeft ? fridgeOpenBottomLeft : fridgeBottomLeft} alt="Bottom Left" />
        </button>
        <button onClick={() => toggleDoor('bottomRight')}>
          <img src={doorOpen.bottomRight ? fridgeOpenBottomRight : fridgeBottomRight} alt="Bottom Right" />
        </button>
      </div>
      <div className="flex space-x-4">
        <Link to="/upload" className="bg-green-500 text-white py-2 px-6 rounded-lg hover:shadow-md hover:underline">
          사진 업로드
        </Link>
        <button className="bg-gray-200 text-gray-800 py-2 px-6 rounded-lg hover:shadow-md hover:underline">전체 식재료 보기</button>
      </div>
    </div>
  );
};

export default Fridge;
