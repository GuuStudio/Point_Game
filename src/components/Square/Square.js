import React, { useState, useEffect } from "react";
import clsx from "clsx";
import styles from "./Square.module.scss";
import ButtonNumber from "../ButtonNumber/ButtonNumber";
const Square = () => {
  const [buttons, setButtons] = useState([]);
  const [startNumber, setStartNumber] = useState(0);
  const [count, setCount] = useState(0);
  const [state, setState] = useState("pause");
  const [nextButton, setNextButton] = useState(1);
  const [result, setResult] = useState("LET'S PLAY");

  useEffect(() => {
    if (state === "play") {
      const timer = setInterval(() => {
        setCount((prevCount) => {
          if (prevCount < 10) {
            return prevCount + 0.1;
          } else {
            setNextButton(0);
            setState("lose");
            setResult("GAME OVER (Time out)");
            clearInterval(timer);
            return prevCount;
          }
        });
      }, 100);

      return () => clearInterval(timer);
    }
  }, [state]);
  useEffect(() => {
    setNextButton(1);
  }, [startNumber]);
  const handleRestart = () => {
    if (startNumber > 100) {
      setStartNumber(100);
    }
    if (startNumber > 0 && startNumber <= 100) {
      const newButtons = [];
      for (let i = 1; i <= startNumber; i++) {
        newButtons.push({
          style: {
            top: Math.random() * 450,
            left: Math.random() * 450,
          },
          value: i,
        });
      }
      setButtons(newButtons);
      setCount(0);
      setNextButton(1);
      setState("play");
      setResult("LET'S PLAY");
    }
  };
  const handleClickButton = (value) => {
    if (nextButton === Number(value)) {
      setNextButton(nextButton + 1);
    } else {
      setNextButton(0);
      setState("lose");
      setResult("GAME OVER");
    }

    if (nextButton === Number(startNumber)) {
      setResult("ALL CLEARED");
      setState("win");
    }
  };

  return (
    <div className={styles.container}>
      <div className={clsx(styles.square_header)}>
        <h2
          className={clsx({
            [styles.error]: state === "lose",
            [styles.success]: state === "win",
          })}
        >
          {result}
        </h2>
        <div className={clsx(styles.square_header_item)}>
          <p>Points:</p>
          <input
            type="number"
            value={startNumber}
            onChange={(e) => {
              setStartNumber(e.target.value);
            }}
          />
        </div>
        <div className={clsx(styles.square_header_item)}>
          <p>Time:</p>
          <p>{count > 0 ? Math.round(count * 10) / 10 : "0.0"}s</p>
        </div>
        <div className={clsx(styles.square_header_item)}>
          <button onClick={handleRestart}>Restart</button>
        </div>
      </div>
      <div className={clsx(styles.square)}>
        {buttons.map((button, index) => (
          <ButtonNumber
            nextButton={nextButton}
            button={button}
            handleClickButton={handleClickButton}
            key={index}
          />
        ))}
      </div>
    </div>
  );
};

export default Square;
