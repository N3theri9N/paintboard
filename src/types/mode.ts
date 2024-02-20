import { ShapeType } from "./shape";

export type Modes = "draw" | "modify";

export type ModifyMethods = {
  invoke: () => {
    targetShape: ShapeType;
    remainShapes: ShapeType[];
  };
  top: () => void;
  forward: () => void;
  backward: () => void;
  bottom: () => void;
  delete: () => void;
};
