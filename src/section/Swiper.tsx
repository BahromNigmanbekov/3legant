import { useState, useEffect, useCallback, useRef } from "react";

import slide1 from "../assets/swiper/sw1.jpg";
import slide2 from "../assets/swiper/sw2.jpg";
import slide3 from "../assets/swiper/sw3.jpg";

interface Slide {
  src: string;
  alt: string;
}

const slides: Slide[] = [
  { src: slide1, alt: "Living room sofa – slide 1" },
  { src: slide2, alt: "Living room sofa – slide 2" },
  { src: slide3, alt: "Living room sofa – slide 3" },
];

const AUTO_PLAY_INTERVAL = 4000;

export default function Swiper() {
  const [current, setCurrent] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const total = slides.length;

  const goTo = useCallback(
    (index: number) => {
      if (isTransitioning) return;
      setIsTransitioning(true);
      setCurrent((index + total) % total);
      setTimeout(() => setIsTransitioning(false), 500);
    },
    [isTransitioning, total]
  );

  const prev = () => goTo(current - 1);
  const next = () => goTo(current + 1);

  useEffect(() => {
    timerRef.current = setTimeout(() => goTo(current + 1), AUTO_PLAY_INTERVAL);
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [current, goTo]);

  const touchStartX = useRef<number | null>(null);
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };
  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const diff = touchStartX.current - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 40) diff > 0 ? next() : prev();
    touchStartX.current = null;
  };

  return (
    <section
      className="relative w-full overflow-hidden bg-white select-none"
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      
      <div
        className="flex transition-transform duration-500 ease-in-out"
        style={{ transform: `translateX(-${current * 100}%)` }}
      >
        {slides.map((slide, i) => (
          <div
            key={i}
            className="
              relative min-w-full
              h-[300px]
              sm:h-[440px]
              md:h-[540px]
              lg:h-[640px]
              xl:h-[720px]
            "
          >
            <img
              src={slide.src}
              alt={slide.alt}
              className="w-full h-full object-cover object-center"
              draggable={false}
            />
          </div>
        ))}
      </div>

      
      <button
        onClick={prev}
        aria-label="Previous slide"
        className="
          absolute left-4 sm:left-7 top-1/2 -translate-y-1/2
          w-9 h-9 sm:w-11 sm:h-11
          rounded-full bg-white/90 backdrop-blur-sm
          shadow-[0_2px_14px_rgba(0,0,0,0.13)]
          flex items-center justify-center
          text-gray-800
          hover:bg-white hover:shadow-[0_4px_22px_rgba(0,0,0,0.18)]
          active:scale-95
          transition-all duration-200
          z-10
        "
      >
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <polyline points="15 18 9 12 15 6" />
        </svg>
      </button>

      
      <button
        onClick={next}
        aria-label="Next slide"
        className="
          absolute right-4 sm:right-7 top-1/2 -translate-y-1/2
          w-9 h-9 sm:w-11 sm:h-11
          rounded-full bg-white/90 backdrop-blur-sm
          shadow-[0_2px_14px_rgba(0,0,0,0.13)]
          flex items-center justify-center
          text-gray-800
          hover:bg-white hover:shadow-[0_4px_22px_rgba(0,0,0,0.18)]
          active:scale-95
          transition-all duration-200
          z-10
        "
      >
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <polyline points="9 18 15 12 9 6" />
        </svg>
      </button>

      
      <div className="absolute bottom-4 sm:bottom-5 left-1/2 -translate-x-1/2 flex items-center gap-[7px] z-10">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => goTo(i)}
            aria-label={`Go to slide ${i + 1}`}
            className={`
              rounded-full transition-all duration-300 ease-in-out
              ${
                i === current
                  ? "w-[22px] h-[6px] bg-white shadow-[0_1px_6px_rgba(0,0,0,0.35)]"
                  : "w-[6px] h-[6px] bg-white/55 hover:bg-white/85"
              }
            `}
          />
        ))}
      </div>
    </section>
  );
}