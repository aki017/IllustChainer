import React, { useState } from "react";
import styles from "./chat.module.scss";

const message = (i: number, message: string) => (
  <div key={i} className={styles.messageBox}>
    <div className={styles.icon}>
      <img src="//satyr.io/300x300" alt="icon" />
    </div>
    <div className={styles.message}>{message}</div>
    <div className={styles.info}></div>
  </div>
);

const Chat = () => {
  const [messages, setMessages] = useState(["hello", "world"]);
  const [input, setInput] = useState("");
  const [ready, setReady] = useState(false);
  return (
    <div>
      <h1>chat221</h1>
      {messages.map((m, i) => message(i, m))}

      <div className={styles.footer}>
        <div className={styles.icons}>
          {[1, 2, 3, 4, 5].map(i => (
            <div key={i} className={[styles.icon, styles[i % 2 === 0 ? "on" : "off"]].join(" ")}>
              <img src="//satyr.io/300x300" alt="icon" />
            </div>
          ))}
        </div>
        <div className={styles.input}>
          <input type="text" value={input} onChange={e => setInput(e.target.value)} placeholder="メッセージを入力してください" />
          <input
            type="button"
            onClick={() => {
              if (input.length === 0) {
                return;
              }
              setInput("");
              setMessages([...messages, input]);
            }}
            value="送信"
          />
        </div>
        <div className={[styles.ready, styles[ready ? "on" : "off"]].join(" ")} onClick={() => setReady(!ready)}>
          {ready ? "準備完了" : "待機"}
        </div>
      </div>
    </div>
  );
};
export default Chat;
