import React, { useState, useEffect } from "react";
import clsx from "clsx";
import styles from "./SquareNew.module.scss";
import ButtonNumberNew from "../ButtonNumberNew/ButtonNumberNew";
import happy from "../../assets/image/firecracker.svg";
import sad from "../../assets/image/sad.svg";

const SquareNew = () => {
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
      setResult("You Win !!!");
      setState("win");
    }
  };

  return (
    <div className={styles.wrap}>
      <div className={styles.container}>
        <div className={clsx(styles.square)}>
          {buttons.map((button, index) => (
            <ButtonNumberNew
              nextButton={nextButton}
              button={button}
              handleClickButton={handleClickButton}
              key={index}
            />
          ))}
        </div>
        <div className={clsx(styles.square_header)}>
          {state === "win" && (
            <img width={200} height={200} src={happy} alt="happy" />
          )}
          {state === "lose" && (
            <img width={200} height={200} src={sad} alt="happy" />
          )}
          <h2
            className={clsx(styles.square_header_title, {
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
              max={100}
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
            <button
              className={clsx(styles.square_restart)}
              onClick={handleRestart}
            >
              Restart
            </button>
            {state !== "lose" &&
              state !== "win" &&
              (state === "play" ? (
                <button
                  className={clsx(styles.square_pause)}
                  onClick={() => setState("pause")}
                  disabled={state !== "play"}
                >
                  Stop
                </button>
              ) : (
                <button
                  className={clsx(styles.square_pause)}
                  onClick={() => setState("play")}
                  disabled={state !== "pause"}
                >
                  Play
                </button>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SquareNew;
