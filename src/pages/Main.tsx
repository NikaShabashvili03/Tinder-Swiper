import { useState } from "react";
import SwipeItem from "../components/SwipeItem";
import { UserType } from "../types";


const initialUsers = [
  {
    images: [
      'https://picsum.photos/400/600',
      'https://picsum.photos/400/601',
      'https://picsum.photos/400/602'
    ],
    name: "Nika",
    age: 21
  },
  {
    images: [
      'https://picsum.photos/400/603',
      'https://picsum.photos/400/604',
      'https://picsum.photos/400/605'
    ],
    name: "Jake",
    age: 35
  },
  {
    images: [
      'https://picsum.photos/400/606',
      'https://picsum.photos/400/607',
      'https://picsum.photos/400/608'
    ],
    name: "Nope",
    age: 50
  }
]


export default function Main() {
  const [users, setUsers] = useState<UserType[]>(initialUsers)
  return (
    <div className="flex justify-center bg-black/50 items-center relative h-dvh">
        {users.length <= 0 ? (
            <div className="text-2xl flex gap-5 flex-col">
              <h2 className="font-bold text-white">No More Swipes Today...</h2>
              <button className="text-white cursor-pointer" onClick={() => setUsers(initialUsers)}>Load More..</button>
            </div>
        ) : 
          users.map(({ images, name, age }, index) => (
            <SwipeItem setUsers={setUsers} key={index} index={index} images={images} name={name} age={age}/>
          ))
        }
    </div>
  );
}
