import React from "react";
import styles from "./transition.module.scss";
import icon from "./transition.png";

type Props = {
  enter?: boolean;
  exit?: boolean;
  hold?: boolean;
};

export const Transition = (props: Props) => {
  const className = [styles.anim];
  if (props.enter) {
    className.push(styles.enter);
  }
  if (props.exit) {
    className.push(styles.exit);
  }
  if (props.hold) {
    className.push(styles.hold);
  }

  return (
    <div className={className.join(" ")}>
      {Array.from({ length: 10 }).map((_, i) => (
        <div key={i} />
      ))}
      <img className={styles.icon} src={icon} alt="icon" />
    </div>
  );
};
