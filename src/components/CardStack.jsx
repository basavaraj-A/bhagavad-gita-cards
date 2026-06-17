import { useState, useEffect, useRef } from "react";
import ShlokaCard from "./ShlokaCard";
import { useScreenSize } from "../hooks/useScreenSize";  // 👈 add

function CardStack({ shlokas, language, favorites, onToggleFavorite }) {
  const { isMobile } = useScreenSize();
  const [activeIndex, setActiveIndex] = useState(0);
  const [dragX, setDragX] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [showHint, setShowHint] = useState(() => {
    return localStorage.getItem("gita_swipe_hint") !== "hidden";
  });

  const startX = useRef(null);

  useEffect(() => {
    setActiveIndex(0);
    setDragX(0);
  }, [shlokas]);

  const swipeThreshold = 120;

  const goNext = () => {
    if (activeIndex < shlokas.length - 1) {
      setActiveIndex((prev) => prev + 1);
    }
  };

  const goPrev = () => {
    if (activeIndex > 0) {
      setActiveIndex((prev) => prev - 1);
    }
  };

  // ─── START ───
  const handleStart = (x) => {
    startX.current = x;
    setIsDragging(true);
  };

  // ─── MOVE ───
  const handleMove = (x) => {
    if (!isDragging || startX.current === null) return;
    setDragX(x - startX.current);
  };

  // ─── END ───
  const handleEnd = () => {
    setIsDragging(false);

    if (dragX > swipeThreshold) {
      goPrev();
    } else if (dragX < -swipeThreshold) {
      goNext();
    }

    setDragX(0);
    startX.current = null;
    setShowHint(false);
    localStorage.setItem("gita_swipe_hint", "hidden");
  };

  return (
    <div
      style={{ userSelect: "none", WebkitUserSelect: "none" }}
      draggable="false" // 👈 add
      onMouseDown={(e) => {
        e.preventDefault(); // 👈 add
        handleStart(e.clientX);
      }}
      onMouseMove={(e) => {
        e.preventDefault(); // 👈 add
        handleMove(e.clientX);
      }}
      onMouseUp={handleEnd}
      onMouseLeave={handleEnd}
      onTouchStart={(e) => handleStart(e.touches[0].clientX)}
      onTouchMove={(e) => handleMove(e.touches[0].clientX)}
      onTouchEnd={handleEnd}
    >
     <div style={{ position: "relative", height: isMobile ? "380px" : "450px" }}>  {/* 👈 update */}
        {[0, 1, 2].map((offset) => {
          const index = activeIndex + offset;
          if (index >= shlokas.length) return null;

          const isTop = offset === 0;

          return (
            <div
              key={shlokas[index]._id}
              style={{
                position: "absolute",
                top: offset * 12,
                left: 0,
                right: 0,
                display: "flex",
                justifyContent: "center",
                zIndex: 10 - offset,
                opacity: 1 - offset * 0.25,
                pointerEvents: isTop ? "auto" : "none",

                transform: isTop
                  ? `translateX(${dragX}px) rotate(${dragX * 0.05}deg)`
                  : `scale(${1 - offset * 0.04})`,

                transition: isDragging ? "none" : "transform 0.3s ease-out",
              }}
            >
              <ShlokaCard
                shloka={shlokas[index]}
                language={language}
                isFavorite={favorites.some((s) => s._id === shlokas[index]._id)}
                onToggleFavorite={onToggleFavorite}
              />
            </div>
          );
        })}
      </div>

      {showHint && (
        <p
          style={{
            textAlign: "center",
            fontSize: "12px",
            opacity: 0.4,
            marginTop: "8px",
          }}
        >
          Swipe left or right
        </p>
      )}
    </div>
  );
}

export default CardStack;
