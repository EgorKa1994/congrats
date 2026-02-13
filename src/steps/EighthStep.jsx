import useSound from "use-sound";
import { useEffect } from 'react';
import soundFile from "../assets/sound/vmeste-navsegda.mp3";
import "./EighthStep.css";

export default function EighthStep({ onNext }) {
  const [play, { stop }] = useSound(soundFile, { volume: 1 });

  useEffect(() => {
    play();

    return () => {
      stop();
    };
  }, [play, stop]);

  return (
    <div className="eighth-step">
      <img src="/mary.jpg" alt="Mary" className="mary-image" />
      <div className="hearts-container">
        <img src="/heart.png" alt="heart" className="big-heart" />
        <img src="/heart.png" alt="heart" className="big-heart" />
        <img src="/heart.png" alt="heart" className="big-heart" />
      </div>
      <p className="date-signature">14.02.2026</p>
    </div>
  );
}
