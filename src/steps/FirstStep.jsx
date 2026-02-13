
import { useState } from "react";
import "./FirstStep.css";

export default function FirstStep({ onNext }) {
  const [answer, setAnswer] = useState('');



  if (!answer) {
    return (
      <div className="first-step">
        <h1>Приветики! Как ты?</h1>
        <div className="buttons">
          <button onClick={() => {
            setAnswer("Хорошо");
        
          }}>Хорошо</button>
          <button onClick={() => {
            setAnswer("Очень хорошо");
         
          }}>Очень хорошо</button>
          <button style={{background: 'black'}} onClick={() => {
            setAnswer("Плохо");
         
          }}>Плохо</button>
        </div>
      </div>
    );
  }

  if (answer === "Плохо") {
    return (
      <div className="first-step">
        <h1>В смысле плохо????? Значит, будем стараться тебя развеселить 😊</h1>
        <button onClick={() => onNext(answer)}>Давай попробуем</button>
      </div>
    );
  }

  return (
    <div className="first-step">
      <h1>Здорово, что {answer.toLowerCase()}! 😊 Я надеюсь, что сейчас будет еще лучше ✨</h1>
      <button onClick={() => onNext(answer)}>Ну давай посмотрим</button>
    </div>
  );
}
