import { ShapeType } from "@/types/shape";
import { useState } from "react";

const useShapes = () => {
  const [shapes, setShapes] = useState<ShapeType[]>([]);

  const addShapes = (shapeData: ShapeType) => {
    const { left, top, width, height, shape } = shapeData;
    setShapes((prev) => {
      const newState = [...prev];
      newState.push({ left, top, width, height, shape });
      return newState;
    });
  };

  const clearShapes = () => {
    setShapes([]);
  };

  return { shapes, addShapes, clearShapes };
};

export default useShapes;
