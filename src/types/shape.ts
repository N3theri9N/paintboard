export type Shapes = "square" | "circle";

export type ShapeAttributes = {
  width: number;
  left: number;
  top: number;
  height: number;
};

export type ShapeType = {
  shape: Shapes;
} & ShapeAttributes;
