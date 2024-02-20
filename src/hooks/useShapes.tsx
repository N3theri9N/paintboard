import { Modes } from "@/types/mode";
import { ShapeType } from "@/types/shape";
import {
  deleteLocalStorageShapeData,
  getLocalStorageShapeData,
  setLocalStorageShapeData,
} from "@/util/LocalStorageDTO";
import { useCallback, useEffect, useState } from "react";

const useShapes = (mode: Modes) => {
  const [drawnShapes, setDrawnShapes] = useState<ShapeType[]>([]);
  const [index, setIndex] = useState<number>(-1);

  const initShapes = useCallback((node: HTMLDivElement) => {
    if (node == null) {
      return;
    }
    setDrawnShapes(getLocalStorageShapeData());
  }, []);

  const resetIndex = () => {
    if (index !== -1) {
      setIndex(-1);
    }
  };

  // 그리기 모드일때 index 초기화
  useEffect(() => {
    if (mode === "draw") resetIndex();
  }, [mode]);

  useEffect(() => {
    setLocalStorageShapeData(drawnShapes);
  }, [drawnShapes]);

  const addShapes = (shapeData: ShapeType) => {
    const { left, top, width, height, shape } = shapeData;
    setDrawnShapes((prev) => {
      const newState = [...prev];
      newState.push({ left, top, width, height, shape });
      return newState;
    });
  };

  const clearShapes = () => {
    setDrawnShapes([]);
    deleteLocalStorageShapeData();
  };

  const modifyShape = {
    invoke: () => {
      const targetShape = drawnShapes[index];
      const remainShapes = [...drawnShapes];
      remainShapes.splice(index, 1);
      return { targetShape, remainShapes };
    },
    top: () => {
      const { targetShape, remainShapes } = modifyShape.invoke();
      const toIndex = drawnShapes.length - 1;
      setIndex(toIndex);
      const newState = [...remainShapes, targetShape];
      setDrawnShapes(newState);
    },
    forward: () => {
      const { targetShape, remainShapes } = modifyShape.invoke();
      const toIndex = Math.min(index + 1, drawnShapes.length - 1);
      setIndex(toIndex);
      const newState = [
        ...remainShapes.slice(0, toIndex),
        targetShape,
        ...remainShapes.slice(toIndex),
      ];
      setDrawnShapes(newState);
    },
    backward: () => {
      const { targetShape, remainShapes } = modifyShape.invoke();
      const toIndex = Math.max(index - 1, 0);
      setIndex(toIndex);
      const newState = [
        ...remainShapes.slice(0, toIndex),
        targetShape,
        ...remainShapes.slice(toIndex),
      ];
      setDrawnShapes(newState);
    },
    bottom: () => {
      const { targetShape, remainShapes } = modifyShape.invoke();
      const toIndex = 0;
      setIndex(toIndex);
      const newState = [targetShape, ...remainShapes];
      setDrawnShapes(newState);
    },
    delete: () => {
      const remainShapes = [...drawnShapes];
      remainShapes.splice(index, 1);
      resetIndex();
      setDrawnShapes(remainShapes);
    },
  };

  const moveShape = (index: number, shapeData: ShapeType) => {
    setDrawnShapes((prev) => {
      const newState = [...prev];
      newState[index] = shapeData;
      return newState;
    });
  };

  return {
    drawnShapes,
    initShapes,
    addShapes,
    moveShape,
    clearShapes,
    index,
    setIndex,
    modifyShape,
  };
};

export default useShapes;
