import React, { useState, useEffect, useContext } from "react";
import { Transition } from "./transition";
import { randomInt } from "../utils";
import styles from "./room.module.scss";
import { Link } from "react-router-dom";
import IconSelectDialog from "./icon_select_dialog";
import { Player } from "../definitions";
import MyselfContext from "./MyselfContext";
import { Row } from "./row";
import Footer from "./layout/footer";
const templateNames = [
  "エクレア",
  "カカオ",
  "カヌレ",
  "キャンディ",
  "クッキー",
  "グミ",
  "クリーム",
  "コロネ",
  "サブレ",
  "シフォン",
  "シャーベット",
  "シュガー",
  "ジュレ",
  "ショコラ",
  "シロップ",
  "タルト",
  "チップ",
  "チョコ",
  "ティラミス",
  "トルテ",
  "ハニー",
  "バニラ",
  "パンナコッタ",
  "ビスケ",
  "ブリュレ",
  "プリン",
  "マカロン",
  "マフィン",
  "ムース",
  "メーブル",
  "モンブラン",
  "ラスク",
];

const RoomPage = () => {
  const [state, setState] = useState(1);
  const [players, setPlayers] = useState<Player[]>([]);
  const [myself, setMyself] = useContext(MyselfContext);

  useEffect(() => {
    setTimeout(() => setState(2), 2000);
    setTimeout(() => setState(3), 2000 + 600 + 50 * 9);
    //setState(3);
  }, []);

  useEffect(() => {
    let start = 4000;
    let next: Player[] = [];
    let names = [...templateNames].sort((a, b) => Math.random() - 0.5);
    for (let i = 0; i < Math.random() * 4 + 20; i++) {
      start += Math.random() * 3000;
      next.push({ icon: randomInt(0, 16), name: names.pop() || "", ready: false });
      const v = [...next];
      setTimeout(() => setPlayers(v), start);
    }

    for (let i = 0; i < next.length; i++) {
      start += Math.random() * 1000;

      while (true) {
        const r = randomInt(0, next.length);
        if (!next[r].ready) {
          next[r] = {
            ...next[r],
            ready: true,
          };
          break;
        }
      }
      const v = [...next];
      setTimeout(() => setPlayers(v), start);
    }
    //    setTimeout(() => setState(2), 2000);
  }, []);
  return (
    <>
      <div className={styles.rows}>
        {players.map((player) => (
          <div key={player.name} className={styles.row}>
            <Row player={player} />
          </div>
        ))}
        <Link to="/rooms/000000/1">仮次のページ</Link>
      </div>
      <div className={styles.footer}>
        <Footer player={myself} onChange={setMyself} status={`${[...players, myself].filter((p) => p.ready).length}/${[...players, myself].length}`} />
      </div>
      <Transition hold={state === 1} enter={state === 2} />
    </>
  );
};
export default RoomPage;
