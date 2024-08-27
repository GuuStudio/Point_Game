import clsx from "clsx";
import styles from "./ButtonNumberNew.module.scss";
import { useEffect, useState } from "react";

export default function ButtonNumberNew({
  nextButton,
  button,
  handleClickButton,
}) {
  const [state, setState] = useState(false);
  useEffect(() => {
    setState(false);
  }, [button]);
  function handleSetState() {
    if (nextButton === button.value) {
      setState(true);
    }
  }
  return (
    <button
      value={button.value}
      className={clsx(styles.button, { [styles.none]: state })}
      style={{
        top: `${button.style.top}px`,
        left: `${button.style.left}px`,
      }}
      onClick={(e) => {
        handleSetState();
        handleClickButton(e.target.value);
      }}
      disabled={state}
    >
      {button.value}
    </button>
  );
}
