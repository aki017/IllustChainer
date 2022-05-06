import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import TextField from "@material-ui/core/TextField";
import DialogActions from "@material-ui/core/DialogActions";
import Button from "@material-ui/core/Button";
import { useState, ReactChildren } from "react";
import React from "react";
import ScopedCssBaseline from "@material-ui/core/ScopedCssBaseline";

type Props = {
  title?: string;
  defaultValue?: string;
  onChange?: (text: string) => void;
  children?: string;
  open: boolean;
};

const TextInputDialog = ({ title, children, defaultValue, onChange, open }: Props) => {
  const [value, setValue] = useState("");
  return (
    <ScopedCssBaseline>
      <Dialog open={open} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">{title}</DialogTitle>
        <DialogContent>
          <DialogContentText>{children}</DialogContentText>
          <TextField autoFocus margin="dense" id="name" fullWidth defaultValue={defaultValue} value={value} onChange={(v) => setValue(v.target.value)} />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => onChange?.(value)} color="primary">
            キャンセル
          </Button>
          <Button onClick={() => onChange?.(value)} color="primary">
            決定
          </Button>
        </DialogActions>
      </Dialog>
    </ScopedCssBaseline>
  );
};

export default TextInputDialog;
