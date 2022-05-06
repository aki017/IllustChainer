import React, { useState } from "react";
import { Player } from "../definitions";
import styles from "./row.module.scss";
import readyIcon from "./ready.svg";
import pendingIcon from "./pending.svg";
import Icon from "./icon";
import ButtonBase from "@material-ui/core/ButtonBase";
import { classes } from "../utils";
import TextField from "@material-ui/core/TextField";
type Props = {
  player: Player;
  onIconClick?: () => void;
  onNameClick?: () => void;
  onStatusClick?: () => void;
};
export const ChangableRow = (props: Props) => {
  const { player, onIconClick, onNameClick, onStatusClick } = props;

  return (
    <div key={player.name} className={styles.row}>
      <div className={styles.icon}>
        <Icon type={player.icon} onClick={onIconClick} />
      </div>
      <ButtonBase focusRipple className={styles.main} onClick={() => onNameClick?.()}>
        <div className={styles.text}>{player.name || "未設定"}</div>
      </ButtonBase>
      <div className={classes(styles.status, player.ready ? styles.ready : styles.pending)} onClick={onStatusClick}>
        <img className={styles.statusIcon} src={player.ready ? readyIcon : pendingIcon} alt={player.ready ? "ready" : "pending"} />
      </div>
    </div>
  );
};
