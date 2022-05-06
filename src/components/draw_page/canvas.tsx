import React, { useMemo } from "react";
import interpolate from "../../interpolate";
import { PenData, PointData, Action, State } from "./canvas_state";

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

type Props = {
  state: State;
  dispatch: React.Dispatch<Action>;
};
const PictCanvas = (props: Props) => {
  const { state, dispatch } = props;
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
  );
};

export default PictCanvas;
