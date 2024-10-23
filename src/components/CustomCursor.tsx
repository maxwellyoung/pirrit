"use client"; // Add this directive to mark as a client component

import { useState, useEffect } from "react";
import { motion } from "framer-motion";

export default function CustomCursor() {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [previewImage, setPreviewImage] = useState("");

  useEffect(() => {
    const updatePosition = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener("mousemove", updatePosition);

    return () => window.removeEventListener("mousemove", updatePosition);
  }, []);

  useEffect(() => {
    const handleMouseEnter = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.tagName === "IMG") {
        setIsHovering(true);
        setPreviewImage(target.getAttribute("src") || "");
      }
    };

    const handleMouseLeave = () => {
      setIsHovering(false);
      setPreviewImage("");
    };

    document.addEventListener("mouseenter", handleMouseEnter, true);
    document.addEventListener("mouseleave", handleMouseLeave, true);

    return () => {
      document.removeEventListener("mouseenter", handleMouseEnter, true);
      document.removeEventListener("mouseleave", handleMouseLeave, true);
    };
  }, []);

  return (
    <motion.div
      className="fixed top-0 left-0 pointer-events-none z-50"
      style={{
        x: position.x - 16,
        y: position.y - 16,
      }}
    >
      <motion.div
        className="w-8 h-8 bg-black rounded-full"
        initial={{ scale: 1 }}
        animate={{ scale: isHovering ? 3 : 1 }}
      />
      {isHovering && (
        <motion.img
          src={previewImage}
          alt="Preview"
          className="absolute top-1/2 left-1/2 w-24 h-24 object-cover rounded-full"
          style={{ x: "-50%", y: "-50%" }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        />
      )}
    </motion.div>
  );
}
