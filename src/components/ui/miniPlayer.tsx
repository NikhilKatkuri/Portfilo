"use client";
import { useSuperContext } from "@/Context/SuperContext";
import { FC, useEffect, useState, MouseEvent } from "react";

const MiniPlayer: FC = () => {
  const { player } = useSuperContext();
  const [isDragging, setIsDragging] = useState(false);
  const [pos, setPos] = useState({
    x: typeof window !== "undefined" ? window.innerWidth - 400 : 0,
    y: typeof window !== "undefined" ? window.innerHeight - 250 : 0,
  });

  const [offset, setOffset] = useState({ x: 0, y: 0 });

  const handleMouseDown = (e: MouseEvent<HTMLDivElement>) => {
    setIsDragging(true);
    setOffset({
      x: e.clientX - pos.x,
      y: e.clientY - pos.y,
    });
  };

  const handleMouseMove = (e: MouseEvent | globalThis.MouseEvent) => {
    if (isDragging) {
      setPos({
        x: e.clientX - offset.x,
        y: e.clientY - offset.y,
      });
    }
  };

  const handleMouseUp = () => setIsDragging(false);

  useEffect(() => {
    if (isDragging) {
      document.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("mouseup", handleMouseUp);
    } else {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    }

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isDragging]);

  return player.is ? (
    <div
      style={{
        position: "fixed",
        left: `${pos.x}px`,
        top: `${pos.y}px`,
        cursor: "move",
      }}
      onMouseDown={handleMouseDown}
      className="bg-white p-3 rounded-md overflow-hidden shadow-xl z-[200]"
    >
      <iframe
        className="h-24 sm:h-36 md:h-52 aspect-video"
        src={
          player.url.length > 1
            ? `https://www.youtube.com/embed/${
                player.url.split("v=")[1]
              }?autoplay=1&mute=0&modestbranding=1&controls=0&showinfo=0&rel=0`
            : "https://www.youtube.com/embed/_yhBlE3D9cc?autoplay=1&mute=0&modestbranding=1&controls=0&showinfo=0&rel=0"
        }
        title="Mini Video Player"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        referrerPolicy="strict-origin-when-cross-origin"
        allowFullScreen
      />
    </div>
  ) : null;
};

export default MiniPlayer;
