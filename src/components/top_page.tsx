import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import Button from "@material-ui/core/Button";
import styles from "./top.module.scss";
import { Transition } from "./transition";
import { range } from "../utils";

const TopPage = () => {
  const [dialog, setDialog] = useState(false);
  const [password, setPassword] = useState("");
  const [move, setMove] = useState(false);
  const history = useHistory();
  const redirect = (pw: string) => {
    setMove(true);
    setTimeout(() => {
      history.push(`/rooms/${pw}`);
    }, 600 + 50 * 9);
  };
  return (
    <div className={styles.top}>
      <div className={styles.hero} style={{ background: "url('//satyr.io/500x250')" }}>
        <div>ここにプレイ動画風説明みたいなあれ</div>
      </div>
      <div>
        <div className={styles.playButtonArea}>
          <Button onClick={() => setDialog(true)} variant="contained" color="primary">
            合言葉でプレイ
          </Button>
        </div>
        <div className={styles.playButtonArea}>
          <Button
            onClick={() => {
              redirect("000000");
            }}
            variant="contained"
          >
            ランダムプレイ
          </Button>
        </div>
      </div>
      <div className={styles.dialog} style={{ display: dialog ? "block" : "none" }}>
        <div className={styles.display}>
          <div>{password.substr(0, 1) || "*"}</div>
          <div>{password.substr(1, 1) || "*"}</div>
          <div>{password.substr(2, 1) || "*"}</div>
          <div>{password.substr(3, 1) || "*"}</div>
          <div>{password.substr(4, 1) || "*"}</div>
          <div>{password.substr(5, 1) || "*"}</div>
        </div>
        <div className={styles.buttons} style={{ display: password.length < 6 ? "block" : "none" }}>
          {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((i) => (
            <button key={i} disabled={password.length >= 6} onClick={() => setPassword(password + i)} className={styles.pwButton}>
              {i}
            </button>
          ))}
        </div>
        <div style={{ display: password.length < 6 ? "none" : "block" }}>
          <button className={styles.joinButton} onClick={() => redirect(password)}>
            参加
          </button>
        </div>
        <button disabled={password.length === 0} onClick={() => setPassword("")} className={styles.clearButton}>
          Reset
        </button>
      </div>
      <Transition exit={move} />
    </div>
  );
};
export default TopPage;
