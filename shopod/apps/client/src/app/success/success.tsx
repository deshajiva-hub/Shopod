"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

const images = [
  "/sit.png",
  "/bag.png",
  "/Demoo.png",
  "/trolly.png",
  "/hye.png",
  "/jump.png",
  "/snacks.png",

];

interface SuccessProps {
  onComplete?: () => void;
}

export default function Success({ onComplete }: SuccessProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isDone, setIsDone] = useState(false);

  useEffect(() => {
    let index = 0;
    const timer = setInterval(() => {
      if (index >= images.length - 1) {
        clearInterval(timer);
        setIsDone(true);
        if (onComplete) {
          setTimeout(onComplete, 500); // Small delay before redirect
        }
        return;
      }
      index += 1;
      setActiveIndex(index);
    }, 650);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="min-h-screen px-6 py-12 bg-[radial-gradient(circle_at_top_left,#ffffff_0%,#f4f1fb_45%,#f6f6fb_100%)]">
      <div className="mx-auto flex min-h-[80vh] max-w-4xl flex-col items-center justify-center gap-8 text-center">
        {!isDone && (
          <div className="flex h-full w-full flex-col items-center justify-center gap-6 rounded-2xl sm:h-full sm:w-full">
            <Image
              src={images[activeIndex]}
              alt="Loading item"
              width={250}
              height={250}
              className="h-64 w-64 object-contain sm:h-80 sm:w-80"
            />

          </div>
        )}
      </div>
    </div>
  );
}
