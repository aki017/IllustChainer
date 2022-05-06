import React, { PropsWithoutRef } from "react";
import icons from "../icons";
import styles from "./icon.module.scss";

type Props = PropsWithoutRef<JSX.IntrinsicElements["div"]> & {
  type: number;
};

const Icon = (props: Props) => (
  <div className={styles.icon} {...props}>
    <img src={icons[props.type]} alt={`icon ${props.type}`} />
  </div>
);
export default Icon;
