import React, { useContext, useState } from "react";

import styles from "./footer.module.scss";
import IconSelectDialog from "../icon_select_dialog";
import { Player } from "../../definitions";
import { ChangableRow } from "../ChangableRow";
import TextInputDialog from "../TextInputDialog";

type Props = {
  player: Player;
  status: string;
  onChange?: (player: Player) => void;
};
const Footer = ({ player, status, onChange }: Props) => {
  const [openIconDialog, setOpenIconDialog] = useState(false);
  const [nameDialog, setNameDialog] = useState(false);
  const editable = onChange != null;
  const toggleStatus = () => {
    if (onChange == null) {
      return;
    }

    if (player.name === "") {
      setNameDialog(true);
    } else if (player.icon == -1) {
      setOpenIconDialog(true);
    } else {
      onChange({ ...player, ready: !player.ready });
    }
  };
  return (
    <div className={styles.footer}>
      <div className={styles.row}>
        <div className={[styles.info, player.ready ? styles.ready : styles.pending].join(" ")}>
          {player.ready ? "準備完了" : "待機中"}({status})
        </div>

        <ChangableRow
          player={player}
          onIconClick={() => (editable ? setOpenIconDialog(true) : null)}
          onNameClick={() => (editable ? setNameDialog(true) : null)}
          onStatusClick={() => (editable ? toggleStatus() : null)}
        />
      </div>
      <IconSelectDialog
        selectedValue={player.icon}
        open={openIconDialog}
        onClose={(icon) => {
          setOpenIconDialog(false);
          onChange?.({ ...player, icon });
        }}
      />

      <TextInputDialog
        open={nameDialog}
        title="名前を設定"
        defaultValue={player.name}
        onChange={(name) => {
          onChange?.({ ...player, name });
          setNameDialog(false);
        }}
      />
    </div>
  );
};
/*

      <div className={rowStyles.row}>{myself.name || "NO NAME"}</div>
      
      */
export default Footer;
