import { ShapeType } from "@/types/shape";
import {
  deleteLocalStorageShapeData,
  getLocalStorageShapeData,
  setLocalStorageShapeData,
} from "@/util/LocalStorageDTO";
import { useCallback, useState } from "react";

const useShapes = () => {
  const [drawnShapes, setDrawnShapes] = useState<ShapeType[]>([]);
  const [index, setIndex] = useState<number>(-1);

  const initShapes = useCallback((node: HTMLDivElement) => {
    if (node == null) {
      return;
    }

    setDrawnShapes(getLocalStorageShapeData());
  }, []);

  const addShapes = (shapeData: ShapeType) => {
    const { left, top, width, height, shape } = shapeData;
    setDrawnShapes((prev) => {
      const newState = [...prev];
      newState.push({ left, top, width, height, shape });
      setLocalStorageShapeData(newState);
      return newState;
    });
  };

  const moveShape = (index: number, shapeData: ShapeType) => {
    setDrawnShapes((prev) => {
      const newState = [...prev];
      newState[index] = shapeData;
      setLocalStorageShapeData(newState);
      return newState;
    });
  };

  const clearShapes = () => {
    setDrawnShapes([]);
    deleteLocalStorageShapeData();
  };

  return { drawnShapes, initShapes, addShapes, moveShape, clearShapes, index, setIndex };
};

export default useShapes;
