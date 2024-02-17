"use client";
import { Shapes } from "@/types/shape";
import { useRef, useState } from "react";
import useShapes from "@/hooks/useShapes";
import DrawnShapes, { DrawingShape } from "./DrawnShapes";
import ToolBar from "./ToolBar";
import { ShapeDataCalculator } from "@/util/ShapeDataCalculator";

const PaintBoard = (): JSX.Element => {
  const [selectedShape, setSelectedShape] = useState<Shapes>("square");
  const { shapes, initShapes, addShapes, clearShapes } = useShapes();

  const previewRef = useRef<HTMLDivElement>(null);

  const setPreview = ({
    left,
    top,
    width,
    height,
  }: {
    left: number;
    top: number;
    width: number;
    height: number;
  }) => {
    previewRef.current?.setAttribute(
      "style",
      `
        position: absolute;
        left: ${left}px;
        top: ${top}px;
        width: ${width}px;
        height: ${height}px;
        display: block;`
    );
  };

  const shapeDataCalculator = new ShapeDataCalculator();
  return (
    <div>
      <ToolBar
        selectedShape={selectedShape}
        setSelectedShape={setSelectedShape}
        clearShapes={clearShapes}
      />
      <div
        ref={initShapes}
        id="canvas"
        className="w-full h-screen overflow-hidden"
        onMouseDown={(e) => {
          e.stopPropagation();
          shapeDataCalculator.setMouseDownPosition(e.clientX, e.clientY);
        }}
        onMouseMove={(e) => {
          e.preventDefault();
          if (e.buttons === 1) {
            // 왼쪽 마우스버튼을 클릭 했을 경우
            setPreview(shapeDataCalculator.calcShapeData(e.clientX, e.clientY));
          }
        }}
        onMouseUp={(e) => {
          const { left, top, width, height } = shapeDataCalculator.calcShapeData(
            e.clientX,
            e.clientY
          );
          previewRef.current?.style.setProperty("display", "none");

          if (width > 20 && height > 20) {
            addShapes({ left, top, width, height, shape: selectedShape });
          }
        }}
      >
        <DrawingShape shape={selectedShape} ref={previewRef} />
        <DrawnShapes shapes={shapes} />
      </div>
    </div>
  );
};

export default PaintBoard;
