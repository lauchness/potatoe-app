import React, { useState, useRef } from "react";
import { useSpring, animated as a } from "react-spring";
import translations from "./translations";
import dancingTato from "./dancing-tato.gif";
import "./App.css";

const calc = (x, y) => [x - window.innerWidth / 2, y - window.innerHeight / 2];
const translate = (x, y) => `translate3d(${x / 2}px,0,0)`;

function App() {
  const indexRef = useRef(0);
  const languages = Object.keys(translations);

  console.log(languages);

  const [currentLanguage, setCurrentLangauge] = useState(languages[0]);

  const handleClickEvent = e => {
    if (indexRef.current === languages.length - 1) {
      indexRef.current = 0;
    } else {
      indexRef.current = indexRef.current + 1;
    }
    setCurrentLangauge(languages[indexRef.current]);
  };

  const [mouseSpring, setMouseSpring] = useSpring(() => ({
    xy: [0, 0],
    config: { mass: 10, tension: 550, friction: 40 }
  }));

  return (
    <div
      className="App"
      onMouseMove={({ clientX: x, clientY: y }) =>
        setMouseSpring({ xy: calc(x, y) })
      }
    >
      <div className="sentence">{translations[currentLanguage].sentence}</div>
      <button
        className="change-language"
        type="button"
        onClick={handleClickEvent}
      >
        {translations[currentLanguage].button}
      </button>
      <a.div
        className="potatoe"
        style={{
          transform: mouseSpring.xy.interpolate(translate)
        }}
      >
        <img src={dancingTato} alt="Dancing potatoe" />
      </a.div>
    </div>
  );
}

export default App;
