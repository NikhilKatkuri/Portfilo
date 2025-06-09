"use client";

import { useSuperContext } from "@/Context/SuperContext";
import { FC, useEffect, useState, useCallback } from "react";


const MiniPlayer: FC = () => {
  const { player } = useSuperContext(); // Remove type argument
  const [isDragging, setIsDragging] = useState(false);
  const [pos, setPos] = useState({ x: 50, y: 50 });
  const [offset, setOffset] = useState({ x: 0, y: 0 });

  // Handle mouse down
  const handleMouseDown = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
    setOffset({
      x: e.clientX - pos.x,
      y: e.clientY - pos.y,
    });
  }, [pos]);

  // Handle mouse move (use globalThis.MouseEvent for DOM compatibility)
  const handleMouseMove = useCallback(
    (e: globalThis.MouseEvent) => {
      if (!isDragging) return;
      const newX = e.clientX - offset.x;
      const newY = e.clientY - offset.y;

      // Constrain position within viewport
      const maxX = window.innerWidth - 300; // Adjust based on player width
      const maxY = window.innerHeight - 200; // Adjust based on player height
      setPos({
        x: Math.max(0, Math.min(newX, maxX)),
        y: Math.max(0, Math.min(newY, maxY)),
      });
    },
    [isDragging, offset]
  );

  // Handle mouse up
  const handleMouseUp = useCallback(() => {
    setIsDragging(false);
  }, []);

  // Handle touch start
  const handleTouchStart = useCallback(
    (e: React.TouchEvent<HTMLDivElement>) => {
      e.preventDefault();
      const touch = e.touches[0];
      setIsDragging(true);
      setOffset({
        x: touch.clientX - pos.x,
        y: touch.clientY - pos.y,
      });
    },
    [pos]
  );

  // Handle touch move
  const handleTouchMove = useCallback(
    (e: globalThis.TouchEvent) => {
      if (!isDragging) return;
      const touch = e.touches[0];
      const newX = touch.clientX - offset.x;
      const newY = touch.clientY - offset.y;

      // Constrain position within viewport
      const maxX = window.innerWidth - 300; // Adjust based on player width
      const maxY = window.innerHeight - 200; // Adjust based on player height
      setPos({
        x: Math.max(0, Math.min(newX, maxX)),
        y: Math.max(0, Math.min(newY, maxY)),
      });
    },
    [isDragging, offset]
  );

  // Handle touch end
  const handleTouchEnd = useCallback(() => {
    setIsDragging(false);
  }, []);

  // Add and clean up event listeners for both mouse and touch
  useEffect(() => {
    if (isDragging) {
      window.addEventListener("mousemove", handleMouseMove);
      window.addEventListener("mouseup", handleMouseUp);
      window.addEventListener("touchmove", handleTouchMove);
      window.addEventListener("touchend", handleTouchEnd);
    } else {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
      window.removeEventListener("touchmove", handleTouchMove);
      window.removeEventListener("touchend", handleTouchEnd);
    }

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
      window.removeEventListener("touchmove", handleTouchMove);
      window.removeEventListener("touchend", handleTouchEnd);
    };
  }, [isDragging, handleMouseMove, handleMouseUp, handleTouchMove, handleTouchEnd]);

  // Extract YouTube video ID from URL
  const extractVideoId = (url?: string): string | null => {
    if (!url) {
      console.warn("No URL provided for video player");
      return null;
    }
    const regex =
      /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&\n?#]+)/;
    const match = url.match(regex);
    const id = match ? match[1] : null;
    console.log("Extracted video ID:", id);
    return id;
  };

  if (!player.is) return null;

  const videoId = extractVideoId(player.url);
  if (!videoId) return null; // Don't render if no valid video ID

  return (
    <div
      onMouseDown={handleMouseDown}
      onTouchStart={handleTouchStart}
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      onTouchMove={handleTouchMove as any} // Type assertion for React touch event
      onTouchEnd={handleTouchEnd}
      style={{
        position: "fixed",
        left: pos.x,
        top: pos.y,
        cursor: isDragging ? "grabbing" : "grab",
        touchAction: "none",
        userSelect: "none",
      }}
      className="bg-white p-3 rounded-md overflow-hidden shadow-xl z-[200]"
    >
      <iframe
        className="w-full h-36 sm:h-36 md:h-52 aspect-video"
        src={`https://www.youtube.com/embed/${videoId}?autoplay=1&mute=0&modestbranding=1&controls=0&rel=0`}
        title="Mini Video Player"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        referrerPolicy="strict-origin-when-cross-origin"
        allowFullScreen
      />
    </div>
  );
};

export default MiniPlayer;