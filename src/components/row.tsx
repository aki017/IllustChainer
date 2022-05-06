import React from "react";
import { Player } from "../definitions";
import styles from "./row.module.scss";
import readyIcon from "./ready.svg";
import pendingIcon from "./pending.svg";
import Icon from "./icon";
import ButtonBase from "@material-ui/core/ButtonBase";
import { classes } from "../utils";
type Props = {
  player: Player;
};
export const Row = ({ player }: Props) => {
  return (
    <div key={player.name} className={styles.row}>
      <Icon type={player.icon} />
      <div className={styles.main}>
        <div className={styles.text}>{player.name || "未設定"}</div>
      </div>
      <div className={classes(styles.status, player.ready ? styles.ready : styles.pending)}>
        <img className={styles.statusIcon} src={player.ready ? readyIcon : pendingIcon} alt={player.ready ? "ready" : "pending"} />
      </div>
    </div>
  );
};
