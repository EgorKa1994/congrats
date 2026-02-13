import { useEffect, useState } from "react";
import FirstStep from './steps/FirstStep'
import SecondStep from './steps/SecondStep'
import ThirdStep from './steps/ThirdStep'
import FourthStep from './steps/FourthStep'
import FifthStep from './steps/FifthStep'
import SixthStep from './steps/SixthStep'
import SeventhStep from './steps/SeventhStep'
import EighthStep from './steps/EighthStep'
import "./App.css";

function getRandom(min, max) {
  return Math.random() * (max - min) + min;
}

export default function App() {
  const [step, setStep] = useState(0);
  const [hearts, setHearts] = useState([]);
  const [firstStepAnswer, setFirstStepAnswer] = useState('')
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    if (isMobile) {
      return;
    }

    // создаём много сердец один раз
    const totalHearts = 80;
    const newHearts = Array.from({ length: totalHearts }).map((_, i) => ({
      id: i,
      left: getRandom(0, 95),
      size: getRandom(30, 100),
      rotate: getRandom(-60, 60),
      duration: getRandom(6, 12),
      delay: getRandom(0, 6),
      sway: getRandom(-25, 25),
    }));
    setHearts(newHearts);

    // Переход на следующий шаг через 12 секунд
    const timer = setTimeout(() => setStep(1), 12000);
    return () => clearTimeout(timer);
  }, [isMobile]);

  // Когда переходим на шаг 4, пересоздаём сердечки для новой анимации
  useEffect(() => {
    if (step === 4) {
      const totalHearts = 80;
      const newHearts = Array.from({ length: totalHearts }).map((_, i) => ({
        id: i,
        left: getRandom(0, 95),
        size: getRandom(30, 100),
        rotate: getRandom(-60, 60),
        duration: getRandom(6, 12),
        delay: getRandom(0, 6),
        sway: getRandom(-25, 25),
      }));
      setHearts(newHearts);
    }
  }, [step]);

  const handleNext = (answer) => {
    setFirstStepAnswer(answer)
    setStep(step + 1)
  };

  return (
    <div className="hearts-wrapper">
      {/* Сердечки */}
      {!isMobile && step !== 4 && step !== 8 && hearts.map((heart) => (
        <img
          key={heart.id}
          src="/heart.png"
          className="heart"
          style={{
            left: `${heart.left}%`,
            width: heart.size,
            height: heart.size,
            animationDelay: `${heart.delay}s`,
            animationDuration: `${heart.duration}s`,
            transform: `rotate(${heart.rotate}deg)`,
            "--sway": `${heart.sway}px`,
          }}
          alt="heart"
        />
      ))}
      {!isMobile && step === 4 && hearts.map((heart) => (
        <img
          key={heart.id}
          src="/heart.png"
          className="heart"
          style={{
            left: `${heart.left}%`,
            width: heart.size,
            height: heart.size,
            animationDelay: `${heart.delay}s`,
            animationDuration: `${heart.duration}s`,
            transform: `rotate(${heart.rotate}deg)`,
            "--sway": `${heart.sway}px`,
          }}
          alt="heart"
        />
      ))}

      {isMobile && step === 0 && (
        <div className="mobile-message">
          <p>Нет-нет, с телефона я ничего тебе показывать не буду 😊</p>
          <p>Давай с компа открывай! 💻</p>
        </div>
      )}
  
      {step === 1 && (
        <FirstStep onNext={handleNext} />
      )}
      {step === 2 && (
        <SecondStep onNext={handleNext} />
      )}
      {step === 3 && (
        <ThirdStep onNext={handleNext} />
      )}
      {step === 4 && (
        <FourthStep onNext={handleNext} />
      )}
      {step === 5 && (
        <FifthStep onNext={handleNext} />
      )}
      {step === 6 && (
        <SixthStep onNext={handleNext} />
      )}
      {step === 7 && (
        <SeventhStep onNext={handleNext} />
      )}
      {step === 8 && (
        <EighthStep onNext={handleNext} />
      )}
    </div>
  );
}
