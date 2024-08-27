import clsx from "clsx";
import styles from "./Layout.module.scss";
import Square from "../Square/Square";
import { useState } from "react";
import SquareNew from "../SquareNew/SquareNew";

const Layout = () => {
  const [state, setState] = useState("old");

  return (
    <div className={clsx(styles.container)}>
      <div>
        <select
          onChange={(e) => setState(e.target.value)}
          className={clsx(styles.select)}
        >
          <option value="old">Old</option>
          <option value="new">New</option>
        </select>
      </div>
      {state === "old" ? <Square /> : <SquareNew />}
    </div>
  );
};

export default Layout;
