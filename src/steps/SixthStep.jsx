import useSound from "use-sound";
import { useEffect, useState } from 'react';
import soundFile from "../assets/sound/nejnii.mp3"; // импортируем mp3
import "./SixthStep.css";

export default function SixthStep({ onNext }) {
  const [showButton, setShowButton] = useState(false);
  const [showDynamicText, setShowDynamicText] = useState(false);
  const [adjectiveIndex, setAdjectiveIndex] = useState(0);
  const [showGiftButton, setShowGiftButton] = useState(false);

  const adjectives = [
    "милую 💕",
    "красивую 😍",
    "неумеющую считать 🤷‍♀️",
    "добрую 😇",
    "нежную 🥰",
    "иногда злую 😠",
    "колеблющуюся 🤔",
    "немножко ленивую 😴",
    "умную 🧠",
    "очаровательную ✨",
    "иногда психованную 😤",
    "сеньориту системного анализа 👩‍💼",
    "да просто такую, какая ты есть 💖"
  ];
  
  // useSound возвращает функцию play и объект для управления
  const [play, { stop }] = useSound(soundFile, { volume: 1 });

  // запускаем звук при монтировании компонента
  useEffect(() => {
    play();

    // Показываем динамический текст через 5 секунд
    const textTimer = setTimeout(() => {
      setShowDynamicText(true);
    }, 5000);

    // Показываем кнопку через 12 секунд
    const buttonTimer = setTimeout(() => {
      setShowButton(true);
    }, 12000);

    // при размонтировании останавливаем звук и очищаем таймеры
    return () => {
      stop();
      clearTimeout(textTimer);
      clearTimeout(buttonTimer);
    };
  }, [play, stop]);

  // Меняем прилагательное каждые 3 секунды
  useEffect(() => {
    if (!showDynamicText) return;

    const adjectiveTimer = setInterval(() => {
      setAdjectiveIndex((prevIndex) => (prevIndex + 1) % adjectives.length);
    }, 3000);

    return () => clearInterval(adjectiveTimer);
  }, [showDynamicText, adjectives.length]);

  // Показываем кнопку подарка, когда дошли до последнего прилагательного
  useEffect(() => {
    if (adjectiveIndex === adjectives.length - 1 && showDynamicText) {
      setShowGiftButton(true);
    }
  }, [adjectiveIndex, showDynamicText, adjectives.length]);

  return (
    <div className="sixth-step">
      {!showDynamicText && <h1>Упс...Это была техническая неисправность. А еще хочу сказать...</h1>}
      {showDynamicText && (
        <div>
          <h1 className="dynamic-text">Люблю тебя такую</h1>
          <h2 className="adjective-text"><span className="adjective">{adjectives[adjectiveIndex]}</span></h2>
        </div>
      )}
      {showGiftButton && (
        <button className="gift-button" onClick={() => onNext("SixthStep")}>Хочу подарок!</button>
      )}
    </div>
  );
}
