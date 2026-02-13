import { useState } from "react";
import "./SecondStep.css";

export default function SecondStep({ onNext }) {
  const [answer, setAnswer] = useState('');
  const [beliefAnswer, setBeliefAnswer] = useState('');
  const [smileys, setSmileys] = useState([]);

  const today = new Date();
  const dateStr = today.toLocaleDateString('ru-RU', { year: 'numeric', month: 'long', day: 'numeric' });

  const handleSmileClick = (response) => {
    // Создаем прыгающие смайлики
    const newSmileys = Array.from({ length: 8 }).map((_, i) => ({
      id: Math.random(),
      emoji: ['😄', '😊', '😆', '🤣'][Math.floor(Math.random() * 4)],
      left: Math.random() * 80 + 10,
      delay: i * 0.1,
    }));
    setSmileys(newSmileys);

  };

  if (!answer) {
    return (
      <div className="second-step">
        <h1>Слушай, а сегодня обычный день или какой-то специфический? 📅</h1>
        <div className="buttons">
          <button onClick={() => {
            setAnswer("Обычный день");
          }}>Обычный день</button>
          <button onClick={() => {
            setAnswer("Необычный день");
          }}>Необычный день</button>
        </div>
      </div>
    );
  }

  if (beliefAnswer) {
    const beliefText = beliefAnswer === "Верю"
      ? "Да я знаю, что ты не поверила 😏 зачем ты нажала кнопку верю. Вот тебе доказательства 😎"
      : "Вот тебе доказательства 😊";

    return (
      <div className="second-step">
        <h1>{beliefText}</h1>
        <img src="/it.png" alt="Evidence" className="step-image large-image" />
        <div className="proof-row">
          <p className="proof-question">P.S. Прикольные трусы, правда? 😄</p>
          <button className="small-button" onClick={() => handleSmileClick("Да")}>Да</button>
          <button className="small-button" onClick={() => handleSmileClick("Нет")}>Нет</button>
        </div>
        <div className="buttons">
          <button onClick={() => onNext(beliefAnswer)}>Окей, теперь верю</button>
        </div>
        {smileys.map(smiley => (
          <div
            key={smiley.id}
            className="floating-smiley"
            style={{
              left: `${smiley.left}%`,
              animationDelay: `${smiley.delay}s`,
            }}
          >
            {smiley.emoji}
          </div>
        ))}
      </div>
    );
  }

  const title = answer === "Необычный день" 
    ? "Да, все верно. Сегодня же день компьютерщика. 🎉"
    : "Но как же это обычный день? Это же день компьютерщика! 💻✨";

  return (
    <div className="second-step">
      <h1>{title}</h1>
      <img src="/aitishnik-2.webp" alt="IT specialist" className="step-image" />
      <p className="question">Веришь?</p>
      <div className="buttons">
        <button onClick={() => {
          setBeliefAnswer("Верю");
        }}>Верю</button>
        <button onClick={() => {
          setBeliefAnswer("Не верю");
        }}>Не верю</button>
      </div>
    </div>
  );
}
