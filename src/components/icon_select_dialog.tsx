import React, { useState } from "react";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import icons from "../icons";
import Button from "@material-ui/core/Button";
import styles from "./icon_select_dialog.module.scss";
import Grid from "@material-ui/core/Grid";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";

type Props = {
  onClose: (s: number) => void;
  selectedValue: number;
  open: boolean;
};
const IconSelectDialog = (props: Props) => {
  const { onClose, selectedValue, open } = props;
  const [value, setValue] = useState(selectedValue);

  const handleClose = () => {
    onClose(value);
    return value !== -1;
  };

  const handleItemClick = (value: number) => {
    setValue(value);
  };

  return (
    <Dialog onClose={handleClose} aria-labelledby="simple-dialog-title" open={open} className={styles.dialog}>
      <DialogTitle id="simple-dialog-title">アイコン選択</DialogTitle>
      <DialogContent className={styles.grid}>
        <Grid container>
          {icons.map((icon, index) => (
            <Grid key={icon} container item xs={3}>
              <div className={`${styles.icon} ${value === index ? styles.on : ""}`} onClick={() => handleItemClick(index)}>
                <img src={icon} alt={icon} />
              </div>
            </Grid>
          ))}
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary" disabled={value === -1}>
          完了
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default IconSelectDialog;
