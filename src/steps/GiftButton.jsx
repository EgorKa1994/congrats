import { useEffect, useRef, useState } from "react";
import "./GiftButton.css";

export default function GiftButton({ handleDownloadPDF, showMessage }) {
  const ESCAPE_TIME = 20;
  const SAFE_PADDING = 10;

  const [secondsLeft, setSecondsLeft] = useState(ESCAPE_TIME);
  const isEscaping = secondsLeft > 0;

  const buttonRef = useRef(null);
  const [position, setPosition] = useState({ x: 100, y: 100 });

  // таймер
  useEffect(() => {
    if (!isEscaping) return;

    const interval = setInterval(() => {
      setSecondsLeft((s) => s - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [isEscaping]);

  // логика побега
  useEffect(() => {
    if (!isEscaping) return;

    const handleMouseMove = (e) => {
      const btn = buttonRef.current;
      if (!btn) return;

      const rect = btn.getBoundingClientRect();

      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      const distance = Math.hypot(e.clientX - centerX, e.clientY - centerY);

      if (distance < 120) {
        const maxX =
          window.innerWidth - rect.width - SAFE_PADDING;
        const maxY =
          window.innerHeight - rect.height - SAFE_PADDING;

        const x = Math.max(
          SAFE_PADDING,
          Math.random() * maxX
        );
        const y = Math.max(
          SAFE_PADDING,
          Math.random() * maxY
        );

        setPosition({ x, y });
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [isEscaping]);

  return (
    <button
      ref={buttonRef}
      className="gift-button"
      style={
        showMessage
          ? {
              position: "fixed",
              left: "100px",
              bottom: "50px",
              transform: "translate(-50%, -50%)",
              zIndex: 1000,
            }
          : isEscaping
          ? {
              position: "fixed",
              left: `${position.x}px`,
              top: `${position.y}px`,
              zIndex: 1000,
            }
          : {}
      }
      onClick={handleDownloadPDF}
    >
      Подарок 🎁
    </button>
  );
}
