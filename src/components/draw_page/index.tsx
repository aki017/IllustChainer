import React, { useReducer, useEffect, useState } from "react";
import styles from "./draw_page.module.scss";
import { IconButton, Slider, Grid, LinearProgress } from "@material-ui/core";
import { Link } from "react-router-dom";
import { reducer, initialState } from "./canvas_state";
import PictCanvas from "./canvas";
import UndoIcon from "@material-ui/icons/Undo";
import RedoIcon from "@material-ui/icons/Redo";
import BrushIcon from "@material-ui/icons/Brush";
const DrawPage = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [startTime, setStartTime] = useState(Date.now());
  const [time, setTime] = useState(0);
  const seconds = ((time - startTime) / 1000) % 100;
  const percentage = ((30 - Math.min(30, seconds)) / 30) * 100;
  useEffect(() => {
    const timer = setInterval(() => setTime(Date.now()), 100);
    return () => clearInterval(timer);
  }, []);
  return (
    <>
      <div className={styles.main}>
        <div className={styles.name}>
          <div className={styles.label}>題名</div>
          <div className={styles.input}>
            <span>さつまいも</span>のイラスト
          </div>
        </div>
        <div className={styles.timer}>
          {percentage === 0 ? (
            <LinearProgress variant="query" className={styles.timerBar} />
          ) : (
            <LinearProgress
              variant="determinate"
              value={percentage}
              className={styles.timerBar}
            />
          )}
          {(30 - Math.min(30, seconds)) | 0}
        </div>
        <div className={styles.canvas}>
          <PictCanvas state={state} dispatch={dispatch} />
        </div>
        <div className={styles.buttons}>
          <Grid container>
            <Grid item>
              <IconButton
                aria-label="undo"
                onClick={() => dispatch({ type: "UNDO", payload: 1 })}
              >
                <UndoIcon />
              </IconButton>
            </Grid>
            <Grid item>
              <IconButton
                aria-label="redo"
                disabled={state.lineCount === state.lines.length}
                onClick={() => dispatch({ type: "REDO", payload: 1 })}
              >
                <RedoIcon />
              </IconButton>
            </Grid>
            <Grid item className={styles.pen}>
              <BrushIcon />
            </Grid>
            <Grid item xs className={styles.pen}>
              <Slider
                className={styles.slider}
                value={state.pen.width}
                step={1}
                min={10}
                max={92}
                onChange={(e, v) =>
                  dispatch({ type: "PEN_CHANGESIZE", payload: v as number })
                }
                aria-labelledby="input-slider"
              />
            </Grid>
            <Grid item className={styles.pen}>
              {state.pen.width}px
            </Grid>
          </Grid>
        </div>
      </div>

      <Link to="/rooms/000000/2">仮次のページ</Link>
      {/*<Transition hold={hold} enter={move} />*/}
    </>
  );
};

export default DrawPage;
