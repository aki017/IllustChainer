import React, { useState, useMemo, useReducer } from "react";
import interpolate from "../../interpolate";
import styles from "./canvas.module.scss";
import { LineData, PenData, PointData, DrawPosition } from "./data";
import { capture } from "./capture";

function assertNever(x: never): never {
  throw new Error("Unexpected value. Should have been never.");
}

function getPos(x: number, y: number, rect: DOMRect) {
  return {
    x: (x - rect.left) / rect.width,
    y: (y - rect.top) / rect.height,
  };
}

function renderLine(key: string, pen: PenData, line: PointData[]) {
  if (line.length === 0) {
    return null;
  }
  var points =
    line.length > 2
      ? Array.from({ length: line.length * 10 }).map((_, i) => {
          const num = Math.floor(i / 10);
          let out = Math.min(num, line.length - num);
          let degree = Math.min(3, out + 1);
          return interpolate(
            i / (line.length * 10),
            degree,
            line.map((p) => [p.pos.x, p.pos.y])
          );
        })
      : line.map((p) => [p.pos.x, p.pos.y]);
  return (
    <path
      key={key}
      fill="transparent"
      stroke="#2d2d2d"
      strokeWidth={pen.width}
      strokeLinecap="round"
      d={`M${points[0][0] * 600},${points[0][1] * 600} ` + points.map((p) => `L${p[0] * 600},${p[1] * 600}`).join(" ")}
    />
  );
}

export type State = {
  lines: LineData[];
  lineCount: number;
  drawing: PointData[];
  pen: PenData;
};

type DrawingStartAction = {
  type: "DRAWING_START";
  payload: {
    pos: DrawPosition;
  };
};

type DrawingMoveAction = {
  type: "DRAWING_MOVE";
  payload: {
    pos: DrawPosition;
  };
};

type DrawingFinishAction = {
  type: "DRAWING_FINISH";
  payload: {};
};

type PenChangeSizeAction = {
  type: "PEN_CHANGESIZE";
  payload: number;
};

type UndoAction = {
  type: "UNDO";
  payload: number;
};

type RedoAction = {
  type: "REDO";
  payload: number;
};

type DrawingAction = DrawingStartAction | DrawingMoveAction | DrawingFinishAction;
type HistoryAction = UndoAction | RedoAction;
type Action = DrawingAction | PenChangeSizeAction | HistoryAction;

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case "DRAWING_START":
      return {
        ...state,

        drawing: [
          {
            pos: action.payload.pos,
            width: 1,
          },
        ],
      };
    case "DRAWING_MOVE":
      return {
        ...state,

        drawing:
          state.drawing.length == 0
            ? []
            : [
                ...state.drawing,
                {
                  pos: action.payload.pos,
                  width: 1,
                },
              ],
      };
    case "DRAWING_FINISH":
      return {
        ...state,
        lines: [
          ...state.lines,
          {
            key: `LINE#${state.lines.length}`,
            pen: state.pen,
            points: state.drawing,
          },
        ],
        lineCount: state.lineCount + 1,
        drawing: [],
      };
    case "PEN_CHANGESIZE":
      return {
        ...state,
        pen: {
          ...state.pen,
          width: action.payload,
        },
      };
    case "UNDO":
      return {
        ...state,
        lineCount: state.lineCount - 1,
      };
    case "REDO":
      return {
        ...state,
        lineCount: state.lineCount + 1,
      };
    default:
      assertNever(action);
  }
}

type Square = {
  kind: "square";
  size: number;
};
type Rectangle = {
  kind: "rectangle";
  width: number;
  height: number;
};
type Shape = DrawingAction | PenChangeSizeAction | HistoryAction;

//function reducer(state: State, action: Action): State {

const initialState = {
  lines: [],
  lineCount: 0,
  drawing: [],
  pen: {
    width: 16,
    color: { r: 0, g: 0, b: 0, a: 1 },
  },
};

const PictCanvas = () => {
  const [state, dispatch] = useReducer<React.Reducer<State, Action>>(reducer, initialState);

  const svgRef = React.createRef<SVGSVGElement>();

  const dispatchDraw = (type: "DRAWING_START" | "DRAWING_MOVE" | "DRAWING_FINISH", x: number, y: number, e: Element) => {
    dispatch({
      type: type,
      payload: {
        pos: getPos(x, y, e.getBoundingClientRect()),
      },
    });
  };

  const drawStart = (x: number, y: number, e: Element) => dispatchDraw("DRAWING_START", x, y, e);
  const drawMove = (x: number, y: number, e: Element) => dispatchDraw("DRAWING_MOVE", x, y, e);
  const drawFinish = (x: number, y: number, e: Element) => dispatchDraw("DRAWING_FINISH", x, y, e);

  return (
    <>
      <div className={styles.main}>
        <svg
          ref={svgRef}
          onTouchStart={(e) => drawStart(e.touches[0].clientX, e.touches[0].clientY, e.currentTarget)}
          onTouchMove={(e) => drawMove(e.touches[0].clientX, e.touches[0].clientY, e.currentTarget)}
          onTouchEnd={(e) => drawFinish(0, 0, e.currentTarget)}
          onMouseDown={(e) => drawStart(e.clientX, e.clientY, e.currentTarget)}
          onMouseMove={(e) => drawMove(e.clientX, e.clientY, e.currentTarget)}
          onMouseUp={(e) => drawFinish(e.clientX, e.clientY, e.currentTarget)}
          width="100%"
          viewBox="0 0 600 600"
        >
          {renderLine("drawing", state.pen, state.drawing)}
          {useMemo(() => state.lines.slice(0, state.lineCount).map((l) => renderLine(l.key, l.pen, l.points)), [state.lines, state.lineCount])}
        </svg>
        <div className={styles.buttons}>
          <button onClick={() => (svgRef.current != null ? capture(svgRef.current) : null)}>保存</button>
          <button onClick={() => dispatch({ type: "UNDO", payload: 1 })}>戻る</button>
          <button disabled={state.lineCount === state.lines.length} onClick={() => dispatch({ type: "REDO", payload: 1 })}>
            進む
          </button>
          <div className={styles.penInfo}>
            <label htmlFor="penSize">幅: {state.pen.width}px</label>
            <input
              className={styles.penSize}
              type="range"
              min="1"
              max="60"
              value={state.pen.width}
              onChange={(v) => dispatch({ type: "PEN_CHANGESIZE", payload: v.target.valueAsNumber })}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default PictCanvas;
