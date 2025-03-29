import { animate, motion, useMotionValue, useTransform } from "framer-motion";
import 'swiper/css';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules'
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import NopeIcon from '../assets/icons/nope-icon.png'
import LikeIcon from '../assets/icons/like-icon.png'
import { useCallback, useEffect, useState } from "react";

import Nope from '../assets/icons/nope.png'
import Love from '../assets/icons/love.png'
import { UserType } from "../types";



interface SwipeItemProps extends UserType {
  index: number,
  setUsers: React.Dispatch<React.SetStateAction<UserType[]>>;
}

export default function SwipeItem({
  images,
  name,
  age,
  index,
  setUsers
}: SwipeItemProps) {

  const x = useMotionValue(0);
  const xInput = [-100, 0, 100]
  const opacityInput = [-100, 0, 100]
  const xRotate = useTransform(x, xInput, [-10, 0, 10])
  const opacity = useTransform(x, opacityInput, [0, 0, 1])
  const opacity2 = useTransform(x, opacityInput, [1, 0, 0])
  const [IsDragged, setIsDragged] = useState(false);
  
  const onLike = useCallback(() => {
    setUsers((prev) => prev.filter((_, i) => i !== index));
  }, [setUsers, index]);
  
  const onNope = useCallback(() => {
    setUsers((prev) => prev.filter((_, i) => i !== index));
  }, [setUsers, index]);

  useEffect(() => {
    const unsubscribe = x.on("change", (latest) => {
      if(!IsDragged){
        if (latest < -100) {
            onNope()
        } else if (latest > 100) {
            onLike();
        }
      }
    });
  
    return () => unsubscribe();
  }, [x, IsDragged, onLike, onNope]);
  
  return (
    <div style={{ zIndex: index }} className="h-dvh flex justify-center w-full absolute items-center">
      <motion.div className="flex justify-center bg-black/50 items-center w-full overflow-hidden h-full">
        <motion.div
          style={{ 
            x: x,
            rotate: xRotate,
          }} 
          drag="x"
          dragConstraints={{ left: 0, right: 0 }} 
          dragElastic={0.5}  
          dragTransition={{ bounceStiffness: 300, bounceDamping: 25 }}
          whileDrag={{ cursor: "grabbing" }}
          onDragStart={() => setIsDragged(true)}
          onDragEnd={() => setIsDragged(false)}
        >
          <div className="w-[400px] relative h-[600px]">
              <Swiper
                  spaceBetween={10}
                  slidesPerView={1}
                  className="h-full"
                  loop={true}
                  modules={[ Navigation, Pagination ]}
                  navigation={true}
                  allowTouchMove={false}
                  pagination={{
                    type: "custom",
                    renderCustom: function (_, current, total) {

                      const paginationDots = new Array(total).fill(null).map((_, index) => {
                        return `
                          <span class="w-full  h-[5px] rounded-full border border-white ${index === current - 1 ? 'bg-white' : 'bg-transparent'}">
                                
                          </span>
                        `;
                      });
                  

                      return `
                        <div class="w-full flex gap-1">
                          ${paginationDots.join('')}
                        </div>
                      `
                    },
                  }}
                >
                  {images.map((img: string, i: number) => 
                    <SwiperSlide
                      style={{
                        backgroundImage: `url(${img})`,
                        backgroundSize: 'cover',
                        backgroundRepeat: 'no-repeat',
                        backgroundColor: "black",
                        backgroundPosition: "center"
                      }}
                      key={i} className="!h-full flex justify-end items-end !relative !w-full"></SwiperSlide>
                  )}
              </Swiper>
              <motion.img src={NopeIcon} alt="nope" style={{ opacity: opacity2 }} className="absolute z-50 -rotate-45 w-[100px] h-[80px] top-5 left-5 text-white text-2xl font-bold"></motion.img>
              <motion.img src={LikeIcon} alt="like" style={{ opacity: opacity }} className="absolute z-50 rotate-45 top-5 right-5 w-[100px] h-[80px] text-white text-2xl font-bold"></motion.img>
              <div className="absolute flex flex-col justify-between px-2 py-2 gap-5 w-full z-50 bottom-0">
                  <div className="flex flex-col gap-1">
                    <h2 className="text-2xl font-bold text-white">{name} <span className="font-normal text-xl">{age}</span></h2>
                    <div className="text-gray-300 flex items-center gap-2">
                      <button className="px-4 py-1 text-sm border-gray-300 rounded-full border-1">Ceo</button>
                      <button className="px-4 py-1 text-sm border-gray-300 rounded-full border-1">Ragaca</button>
                      <button className="px-4 py-1 text-sm border-gray-300 rounded-full border-1">2</button>
                      <button className="px-4 py-1 text-sm border-gray-300 rounded-full border-1">13</button>
                    </div>
                  </div>
                  <div className="flex justify-evenly items-center">
                    <button onClick={() => animate(x, -150, { type: "spring", stiffness: 300, damping: 25, onComplete: () => animate(x, 0, { type: "spring", stiffness: 300, damping: 25 }), })} className="w-14 h-14 cursor-pointer rounded-full">
                        <img src={Nope} className="w-full h-full" alt="nope"/>
                    </button>
                    <button onClick={() => animate(x, 150, { type: "spring", stiffness: 300, damping: 25, onComplete: () => animate(x, 0, { type: "spring", stiffness: 300, damping: 25 }), })} className="w-14 h-14 cursor-pointer rounded-full">
                        <img src={Love} className="w-full h-full" alt="love"/>
                    </button>
                  </div>
              </div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  )
}
