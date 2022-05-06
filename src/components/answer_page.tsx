import React from "react";
import { Link } from "react-router-dom";
import TextField from "@material-ui/core/TextField";
import waku from "./waku.svg";
import styles from "./answer_page.module.scss";
const AnswerPage = () => (
  <>
    answer
    <div className={styles.canvas}>
      <div className={styles.image}></div>
      <div className={styles.waku}>
        <img src={waku} alt="waku" />
      </div>
    </div>
    <form noValidate autoComplete="off">
      <TextField id="standard-basic" label="題名" />
    </form>
    <hr></hr>
    <Link to="/rooms/000000/1">仮次のページ</Link>
  </>
);
export default AnswerPage;
