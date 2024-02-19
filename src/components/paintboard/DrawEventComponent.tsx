import { ShapeAttributes } from "@/types/shape";
import { DrawingShapeDataCalculator } from "@/util/ShapeDataCalculator";
import { useRef } from "react";
import { DrawingShape } from "./DrawnShapes";

const DrawEventComponent = ({ shape, addShapes }: any) => {
  const previewRef = useRef<HTMLDivElement>(null);
  const shapeDataCalculator = new DrawingShapeDataCalculator();

  const setPreview = ({ left, top, width, height }: ShapeAttributes) => {
    previewRef.current?.setAttribute(
      "style",
      ` position: absolute;
        left: ${left}px;
        top: ${top}px;
        width: ${width}px;
        height: ${height}px;
        display: block;`
    );
  };

  return (
    <div
      className="w-full h-full"
      onMouseDown={(e) => {
        e.stopPropagation();
        shapeDataCalculator.setMouseDownPosition(e.clientX, e.clientY);
      }}
      onMouseMove={(e) => {
        e.preventDefault();
        if (e.buttons === 1) {
          // 왼쪽 마우스버튼을 클릭 중인 경우
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
          addShapes({ left, top, width, height, shape });
        }
      }}
    >
      <DrawingShape shape={shape} ref={previewRef} />
    </div>
  );
};

export default DrawEventComponent;
