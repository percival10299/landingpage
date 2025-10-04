"use client";

import { useEffect, useRef } from "react";

export default function Background() {
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const grid = gridRef.current;
    if (!grid) return;

    // 清除已有的符号
    grid.innerHTML = "";

    // 动态计算符号数量，确保填满屏幕
    const screenWidth = window.innerWidth;
    const screenHeight = window.innerHeight;
    const symbolSize = 60; // 符号容器大小
    const gap = 40; // 间距
    const padding = 20; // 内边距

    const cols = Math.floor(
      (screenWidth - padding * 2 + gap) / (symbolSize + gap)
    );
    const rows = Math.floor(
      (screenHeight - padding * 2 + gap) / (symbolSize + gap)
    );
    const total = cols * rows;

    // 创建加减号
    for (let i = 0; i < total; i++) {
      const div = document.createElement("div");
      div.classList.add("symbol");
      div.setAttribute("data-type", i % 2 === 0 ? "plus" : "minus");
      grid.appendChild(div);
    }

    const symbols = grid.querySelectorAll<HTMLDivElement>(".symbol");

    const rotateSymbols = (clientX: number, clientY: number) => {
      symbols.forEach((symbol) => {
        const rect = symbol.getBoundingClientRect();
        const x = rect.left + rect.width / 2;
        const y = rect.top + rect.height / 2;

        const dx = clientX - x;
        const dy = clientY - y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        const maxRotation = 720;
        const angle = Math.max(0, maxRotation - dist / 1.2);

        symbol.style.transform = `rotate(${angle}deg)`;
      });
    };

    const resetSymbols = () => {
      symbols.forEach((symbol) => {
        symbol.style.transform = "rotate(0deg)";
      });
    };

    // Desktop
    const handleMouseMove = (e: MouseEvent) => rotateSymbols(e.clientX, e.clientY);
    const handleMouseLeave = resetSymbols;

    // Mobile
    const handleTouchMove = (e: TouchEvent) => {
      const touch = e.touches[0];
      if (touch) {
        rotateSymbols(touch.clientX, touch.clientY);
      }
    };
    const handleTouchEnd = resetSymbols;

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseleave", handleMouseLeave);
    document.addEventListener("touchmove", handleTouchMove);
    document.addEventListener("touchend", handleTouchEnd);

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
      document.removeEventListener("touchmove", handleTouchMove);
      document.removeEventListener("touchend", handleTouchEnd);
    };
  }, []);


  return (
    <div className="chaos-container">
      <div ref={gridRef} className="chaos-grid"></div>
    </div>
  );
}
