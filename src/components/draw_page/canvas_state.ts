import { assertNever } from "../../utils";
export type DrawPosition = {
  x: number;
  y: number;
};
export type PointData = {
  pos: DrawPosition;
  width: number;
};

export type ColorData = {
  r: number;
  g: number;
  b: number;
  a: number;
};

export type PenData = {
  width: number;
  color: ColorData;
};

export type LineData = {
  key: string;
  points: PointData[];
  pen: PenData;
};

export type State = {
  lines: LineData[];
  lineCount: number;
  drawing: PointData[];
  pen: PenData;
};

export type DrawingStartAction = {
  type: "DRAWING_START";
  payload: {
    pos: DrawPosition;
  };
};

export type DrawingMoveAction = {
  type: "DRAWING_MOVE";
  payload: {
    pos: DrawPosition;
  };
};

export type DrawingFinishAction = {
  type: "DRAWING_FINISH";
  payload: {};
};

export type PenChangeSizeAction = {
  type: "PEN_CHANGESIZE";
  payload: number;
};

export type UndoAction = {
  type: "UNDO";
  payload: number;
};

export type RedoAction = {
  type: "REDO";
  payload: number;
};

type DrawingAction = DrawingStartAction | DrawingMoveAction | DrawingFinishAction;
type HistoryAction = UndoAction | RedoAction;
export type Action = DrawingAction | PenChangeSizeAction | HistoryAction;

export const initialState = {
  lines: [],
  lineCount: 0,
  drawing: [],
  pen: {
    width: 16,
    color: { r: 0, g: 0, b: 0, a: 1 },
  },
};

export function reducer(state: State, action: Action): State {
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
          state.drawing.length === 0
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
          ...state.lines.slice(0, state.lineCount),
          {
            key: `LINE#${Math.random()}`,
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
