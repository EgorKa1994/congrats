import { useState } from "react";
import "./FourthStep.css";

export default function FourthStep({ onNext }) {
  const [clicked, setClicked] = useState(false);
  const [wordIndex, setWordIndex] = useState(0);

  const words = [
    "восхитительная",
    "прекрасная",
    "изумительная",
    "чудесная",
    "замечательная",
    "потрясающая",
    "необыкновенная",
    "сногсшибательная",
    "великолепная",
    "очаровательная",
    'божественная'
  ];

  const handlePressButton = () => {
    if (wordIndex < words.length - 1) {
      setWordIndex(wordIndex + 1);
    } else {
      setClicked(true);
    }
  };

  if (clicked) {
    return (
      <div className="fourth-step">
        <h1>Открытка 💝</h1>
        <p className="fourth-text">С Днем Святого Валентина!</p>
        <button onClick={() => onNext("FourthStep")}>Дальше</button>
      </div>
    );
  }

  return (
    <div className="fourth-step">
      <h1>Ладно, это был увлекательный аттракцион 🎢</h1>
      <p className="fourth-text">
        Но конечно же, эта   <span className="highlight-word">{words[wordIndex]}</span> 
         {wordIndex < words.length - 1 ? (
        <button className="press-button" onClick={handlePressButton}>Нажми меня</button>
      ) : (
        <button className="press-button" disabled>Ну все, харэ 😄</button>
      )}
      <span className="highlight-word-card">открытка.</span>
      </p>
     
      <p className="fourth-text">Была создана с целью поздравить мою малышку с Днем Святого Валентина. 💌</p>
      <button className="next-button" onClick={() => onNext("FourthStep")} disabled={wordIndex === 0}>Ого, как неожиданно!</button>
    </div>
  );
}
