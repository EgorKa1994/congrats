import useSound from "use-sound";
import { useEffect, useState } from 'react';
import soundFile from "../assets/sound/1.mp3"; // импортируем mp3
import "./FifthStep.css";

export default function FifthStep({ onNext }) {
  const [showButton, setShowButton] = useState(false);
  
  // useSound возвращает функцию play и объект для управления
  const [play, { stop }] = useSound(soundFile, { volume: 1 });

  // запускаем звук при монтировании компонента
  useEffect(() => {
    play();

    // Показываем кнопку через 12 секунд
    const timer = setTimeout(() => {
      setShowButton(true);
    }, 12000);

    // при размонтировании останавливаем звук и очищаем таймер
    return () => {
      stop();
      clearTimeout(timer);
    };
  }, [play, stop]);

  return (
    <div className="fifth-step">
      <h1>Ты знаешь 🎵</h1>
      <p className="fifth-text">Эта восхитительная открытка еще и звуковая!</p>
      <p className="fifth-text">Поэтому предлагаю тебе включить звук погромче 🔊</p>
      {showButton && (
        <button onClick={() => onNext("FifthStep")}>Вот это класс!</button>
      )}
    </div>
  );
}