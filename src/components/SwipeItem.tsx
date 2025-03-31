import { motion, useMotionValue, useTransform } from "framer-motion";
import { useEffect, useState } from "react";
import NopeIcon from '../assets/icons/nope-icon.png';
import LikeIcon from '../assets/icons/like-icon.png';
import { UserType } from "../types";

interface SwipeItemProps extends UserType {
  index: number;
  onNope: (index: number) => void;
  onLike: (index: number) => void;
  trackX: ({ x, isDragged }: { x: number, isDragged: boolean }) => void;
}

export default function SwipeItem({ images, name, age, index, trackX, onNope, onLike }: SwipeItemProps) {
  const x = useMotionValue(0);
  const xInput = [-100, 0, 100];
  const xRotate = useTransform(x, xInput, [-10, 0, 10]);
  const opacity = useTransform(x, xInput, [0, 0, 1]);
  const opacity2 = useTransform(x, xInput, [1, 0, 0]);

  const [isDragged, setIsDragged] = useState(false);

  useEffect(() => {
    const unsubscribe = x.on("change", (latest) => {
      const trackData = {
        x: latest,
        isDragged: isDragged
      };
      
      trackX(trackData);
  
      if (!isDragged) {
        if (latest < -100) {
          onNope(index);
        } else if (latest > 100) {
          onLike(index);
        }
      }
    });
  
    return () => unsubscribe();
  }, [x, isDragged, onNope, onLike, index, trackX]);

  return (
    <div style={{ zIndex: index }} className="h-fit absolute flex justify-center w-fit items-center">
      <motion.div
        style={{ x, rotate: xRotate }}
        drag
        dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
        dragElastic={1}
        dragTransition={{ bounceStiffness: 300, bounceDamping: 25 }}
        whileDrag={{ cursor: "grabbing" }}
        transition={{ type: "spring", stiffness: 150, damping: 20 }}
        onDragStart={() => setIsDragged(true)}
        onDragEnd={() => setIsDragged(false)}
      >
        <div className="w-[400px] relative h-[600px]">
          <div
            style={{
              backgroundImage: `url(${images[0]})`,
              backgroundSize: 'cover',
              backgroundRepeat: 'no-repeat',
              backgroundColor: "black",
              backgroundPosition: "center"
            }}
            className="h-full flex justify-end items-end relative w-full"
          ></div>

          <motion.img src={NopeIcon} alt="nope" style={{ opacity: opacity2 }} className="absolute z-50 -rotate-45 w-[100px] h-[80px] top-5 left-5"></motion.img>
          <motion.img src={LikeIcon} alt="like" style={{ opacity }} className="absolute z-50 rotate-45 top-5 right-5 w-[100px] h-[80px]"></motion.img>

          <div className="absolute flex flex-col px-2 py-10 gap-5 w-full z-50 bottom-0">
            <div className="flex flex-col gap-1">
              <h2 className="text-2xl font-bold text-white">{name} <span className="font-normal text-xl">{age}</span></h2>
              <div className="text-gray-300 flex items-center gap-2">
                <button className="px-4 py-1 text-sm border-gray-300 rounded-full border-1">Ceo</button>
                <button className="px-4 py-1 text-sm border-gray-300 rounded-full border-1">Ragaca</button>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
