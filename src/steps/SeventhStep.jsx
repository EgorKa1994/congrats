import useSound from "use-sound";
import { useEffect, useState } from 'react';
import soundFile from "../assets/sound/potseluy.mp3";
import GiftButton from "./GiftButton";
import "./SeventhStep.css";

export default function SeventhStep({ onNext }) {
  const [showMessage, setShowMessage] = useState(false);
  const [play, { stop }] = useSound(soundFile, { volume: 1 });

  useEffect(() => {
    play();

    return () => {
      stop();
    };
  }, [play, stop]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowMessage(true);
    }, 20000);
    return () => clearTimeout(timer);
  }, []);

  const handleDownloadPDF = () => {
    const link = document.createElement('a');
    link.href = '/4485.9765.3292.5696.pdf';
    link.download = '4485.9765.3292.5696.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    onNext("SeventhStep");
  };

  return (
    <>
      <div className="seventh-step">
        <h1>Прими, пожалуйста, этот небольшой подарок и буську 💝</h1>
        <img src="/photo.jpg" alt="Gift" className="gift-image" />
        {showMessage && <p className="escape-message">Ну все-все, она уже не будет убегать 😊</p>}
      </div>
      <div className="gift-button-container">
        <GiftButton handleDownloadPDF={handleDownloadPDF} showMessage={showMessage} />
      </div>
    </>
  );
}
