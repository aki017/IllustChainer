import { PointData, DrawPosition } from "./data";

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
  payload: {
    pos: DrawPosition;
  };
};

type Action = DrawingStartAction | DrawingMoveAction | DrawingFinishAction;

export type State = {
  points: PointData[];
};

export function reducer(state: State, action: Action) {
  switch (action.type) {
    case "DRAWING_START":
      return {
        ...state,

        points: [],
      };
    case "DRAWING_MOVE":
      return {
        ...state,

        points: [action.payload.pos, ...state.points],
      };
    case "DRAWING_FINISH":
      return {
        ...state,

        points: [],
      };
    default:
      throw new Error();
  }
}
