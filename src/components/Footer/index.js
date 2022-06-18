import { useState, useRef, useEffect } from "react";
import Pause from "../../assets/pause.svg";
import Next from "../../assets/next.svg";
import Play from "../../assets/play.svg";
import Stop from "../../assets/stop.svg";
import Previous from "../../assets/previous.svg";
import "./style.css";

function Footer({ music, setMusic, arrMusics, play, setPlay }) {
  let { id, title, artist, url } = music;

  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const audioRef = useRef();
  const barRef = useRef();
  const animationRef = useRef();

  const handlePlay = () => {
    if (!url) {
      return;
    }

    setPlay(!play);

    if (!play) {
      audioRef.current.play();
      animationRef.current = requestAnimationFrame(whilePlaying);
    } else {
      audioRef.current.pause();
      cancelAnimationFrame(animationRef.current);
    }
  };

  const handleStop = () => {
    audioRef.current.pause();
    audioRef.current.currentTime = 0;
    setPlay(false);
  };

  const handleNext = () => {
    if (!url || id === arrMusics.length) {
      return;
    }

    let currentMusic = {};

    id++;

    currentMusic = arrMusics.find((element) => {
      return element.id === id;
    });

    setMusic(currentMusic);
    setPlay(false);
  };

  const handlePrev = () => {
    if (!url || id === 1) {
      return;
    }

    let currentMusic = {};

    id--;

    currentMusic = arrMusics.find((element) => {
      return element.id === id;
    });

    setMusic(currentMusic);
    setPlay(false);
  };

  useEffect(() => {
    const seconds = Math.floor(audioRef.current.duration);
    setDuration(seconds);
    barRef.current.max = seconds;
  }, [audioRef?.current?.loadedmetadata, audioRef?.current?.readyState]);

  const calculateTime = (secs) => {
    const minutes = Math.floor(secs / 60);
    const returnedMin = minutes < 10 ? `${minutes}` : `${minutes}`;
    const seconds = Math.floor(secs % 60);
    const returnedSec = seconds < 10 ? `0${seconds}` : `${seconds}`;
    return `${returnedMin}.${returnedSec}`;
  };

  const changeRange = () => {
    audioRef.current.currentTime = barRef.current.value;
    changePlayer();
  };

  const whilePlaying = () => {
    barRef.current.value = audioRef.current.currentTime;
    changePlayer();
    animationRef.current = requestAnimationFrame(whilePlaying);
  };

  const changePlayer = () => {
    barRef.current.style.setProperty(
      "--seek-width",
      `${(barRef.current.value / duration) * 100}%`
    );
    setCurrentTime(barRef.current.value);
  };

  return (
    <footer className="footer">
      <audio src={url} ref={audioRef} />

      <section className="footer__names">
        <h2 className="footer__music">{title}</h2>
        <span className="footer__author">{artist}</span>
      </section>

      <section className="footer__controls">
        <div className="footer__buttons">
          <img
            onClick={() => handleStop()}
            className="footer__img"
            src={Stop}
            alt="Stop"
          />
          <img
            onClick={() => handlePrev()}
            className="footer__img"
            src={Previous}
            alt="Previous"
          />
          <img
            onClick={() => handlePlay()}
            className="footer__img"
            src={play ? Pause : Play}
            alt="Pause e Play"
          />
          <img
            onClick={() => handleNext()}
            className="footer__img"
            src={Next}
            alt="Next"
          />
        </div>
        <div className="bar__progress">
          <span className="bar__time">
            {currentTime ? calculateTime(currentTime) : "0.00"}
          </span>
          <input
            type="range"
            min="0"
            max="100"
            defaultValue="0"
            ref={barRef}
            onChange={changeRange}
          />
          <span className="bar__time">
            {duration ? calculateTime(duration) : "0.00"}
          </span>
        </div>
      </section>
    </footer>
  );
}

export default Footer;
