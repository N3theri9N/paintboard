import { ShapeType } from "@/types/shape";
import {
  deleteLocalStorageShapeData,
  getLocalStorageShapeData,
  setLocalStorageShapeData,
} from "@/util/LocalStorageDTO";
import { useCallback, useState } from "react";

const useShapes = () => {
  const [shapes, setShapes] = useState<ShapeType[]>([]);

  const initShapes = useCallback((node: HTMLDivElement) => {
    if (node == null) {
      return;
    }

    setShapes(getLocalStorageShapeData());
  }, []);

  const addShapes = (shapeData: ShapeType) => {
    const { left, top, width, height, shape } = shapeData;
    setShapes((prev) => {
      const newState = [...prev];
      newState.push({ left, top, width, height, shape });
      setLocalStorageShapeData(newState);
      return newState;
    });
  };

  const clearShapes = () => {
    setShapes([]);
    deleteLocalStorageShapeData();
  };

  return { shapes, initShapes, addShapes, clearShapes };
};

export default useShapes;
