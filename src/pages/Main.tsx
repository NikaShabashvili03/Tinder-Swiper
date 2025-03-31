import { useEffect, useState } from "react";
import SwipeItem from "../components/SwipeItem";
import { UserType } from "../types";
import Nope from '../assets/icons/nope.png';
import Love from '../assets/icons/love.png';
import { motion } from "framer-motion";

const initialUsers: UserType[] = [
  {
    images: ['https://picsum.photos/400/600', 'https://picsum.photos/400/601', 'https://picsum.photos/400/602'],
    name: "Nika",
    age: 21
  },
  {
    images: ['https://picsum.photos/400/603', 'https://picsum.photos/400/604', 'https://picsum.photos/400/605'],
    name: "Jake",
    age: 35
  },
  {
    images: ['https://picsum.photos/400/606', 'https://picsum.photos/400/607', 'https://picsum.photos/400/608'],
    name: "Nope",
    age: 50
  }
];


export default function Main() {
  const [users, setUsers] = useState<UserType[]>(initialUsers);
  const [currentIndex, setCurrentIndex] = useState(users.length - 1);
  const [xValue, setXValue] = useState({ x: 0, isDragged: false });

  useEffect(() => {
    setCurrentIndex(users.length - 1);
  }, [users]);

  const handleSwipe = (index: number) => {
    setUsers((prev) => prev.filter((_, i) => i !== index));
    setXValue({ x: 0, isDragged: false })
  };

  const handleTrackX = ({ x, isDragged }: { x: number, isDragged: boolean }) => {
    setXValue({
      x: x,
      isDragged: isDragged
    });
  };

  const getButtonStyleByX = (isNope: boolean) => {
    if (isNope && xValue.x < -100) {
      return "w-20 h-20 !flex"; 
    } else if (!isNope && xValue.x > 100) {
      return "w-20 h-20 !flex";
    }
    return "w-14 h-14"; 
  };

  const getButtonStyleByDragged = () => {
    if ((xValue.x < 0 || xValue.x > 0) && xValue.isDragged){
      return "hidden"
    }else {
      return "flex"
    }
  }


  return (
    <div className="flex justify-center overflow-hidden bg-black items-center relative h-dvh">
      {users.length <= 0 ? (
        <div className="text-2xl flex gap-5 flex-col">
          <h2 className="font-bold text-white">No More Swipes Today...</h2>
          <button className="text-white cursor-pointer" onClick={() => setUsers(initialUsers)}>Load More..</button>
        </div>
      ) : (
        <div className="flex flex-col relative justify-center items-center">
          {users.map(({ images, name, age }, index) => (
            <SwipeItem
              key={index}
              index={index}
              images={images}
              name={name}
              age={age}
              onLike={handleSwipe}
              onNope={handleSwipe}
              trackX={handleTrackX} 
            />
          ))}
          <div className="text-white mt-[600px] w-[400px] absolute z-50 flex justify-evenly items-center">
            <motion.button
              onClick={() => handleSwipe(currentIndex)}
              className={`cursor-pointer rounded-full ${getButtonStyleByX(true)} ${getButtonStyleByDragged()}`}
            >
              <img src={Nope} className="w-full h-full" alt="nope" />
            </motion.button>
            <motion.button
              onClick={() => handleSwipe(currentIndex)}
              className={`cursor-pointer rounded-full ${getButtonStyleByX(false)} ${getButtonStyleByDragged()}`}
            >
              <img src={Love} className="w-full h-full" alt="love" />
            </motion.button>
          </div>
        </div>
      )}
    </div>
  );
}
