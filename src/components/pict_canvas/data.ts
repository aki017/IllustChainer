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
