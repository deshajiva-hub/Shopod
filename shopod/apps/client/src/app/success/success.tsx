 "use client";

import Image from "next/image";
import { useEffect, useState } from "react";

const images = [
  "/Demoo.png",
  "/hye.png",
  "/jump.png",
  "/trolly.png",
];

export default function Success() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isDone, setIsDone] = useState(false);

  useEffect(() => {
    let index = 0;
    const timer = setInterval(() => {
      if (index >= images.length - 1) {
        clearInterval(timer);
        setIsDone(true);
        return;
      }
      index += 1;
      setActiveIndex(index);
    }, 650);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="min-h-screen px-6 py-12">
      <div className="mx-auto flex min-h-[80vh] max-w-4xl flex-col items-center justify-center gap-8 text-center">
        {!isDone ? (
          <div className="flex h-full w-full items-center justify-center rounded-2xl sm:h-full sm:w-full">
            <Image
              src={images[activeIndex]}
              alt="Loading item"
              width={112}
              height={112}
              className="h-24 w-24 object-contain sm:h-24 sm:w-24"
            />
          </div>
        ) : (
          <h1 className="text-3xl font-semibold text-[#262626] sm:text-4xl">
            Success
          </h1>
        )}
      </div>
    </div>
  );
}
