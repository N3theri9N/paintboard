import { ShapeAttributes, Shapes, ShapeType } from "@/types/shape";
import { MovingShapeDataCalculator } from "@/util/ShapeDataCalculator";
import React, { useEffect, useRef } from "react";
import styled from "styled-components";

const ShapeComponent = styled.div<{
  $top: number;
  $left: number;
  $width: number;
  $height: number;
  $shape: Shapes;
}>`
  cursor: move;
  border: solid red 2px;
  border-radius: ${(props) => (props.$shape === "circle" ? "9999%" : "0%")};
  position: absolute;
  height: ${(props) => props.$height}px;
  width: ${(props) => props.$width}px;
  top: ${(props) => props.$top}px;
  left: ${(props) => props.$left}px;
`;

const ModifyEventComponent = ({
  selectedShape,
  index,
  moveShape,
}: {
  selectedShape?: ShapeType;
  index: number;
  moveShape: (index: number, shapeData: ShapeType) => void;
}) => {
  useEffect(
    function changeMovingShape() {
      if (selectedShape === undefined) return;
      setMovingShape(selectedShape);
    },
    [selectedShape]
  );

  const movingShapeRef = useRef<HTMLDivElement>(null);

  const setMovingShape = ({ left, top }: ShapeAttributes) => {
    movingShapeRef.current?.setAttribute(
      "style",
      ` position: absolute;
        left: ${left}px;
        top: ${top}px;
        display: block;`
    );
  };

  if (selectedShape !== undefined) {
    const { top, left, width, height, shape } = selectedShape;

    const ShapeDataCalculator = new MovingShapeDataCalculator();
    return (
      <ShapeComponent
        onMouseDown={(e: React.MouseEvent<HTMLDivElement>) => {
          e.preventDefault();
          e.stopPropagation();
          ShapeDataCalculator.setOffset(e.nativeEvent.offsetX, e.nativeEvent.offsetY);
        }}
        onMouseMove={(e: React.MouseEvent<HTMLDivElement>) => {
          e.stopPropagation();
          if (e.buttons === 1) {
            const { left, top } = ShapeDataCalculator.calcShapeData(e.clientX, e.clientY);
            setMovingShape({ left, top, width, height });
          }
        }}
        onClick={(e: React.MouseEvent<HTMLDivElement>) => {
          e.stopPropagation();
          const { left, top } = ShapeDataCalculator.calcShapeData(e.clientX, e.clientY);
          const newState = { ...selectedShape, left, top };
          moveShape(index, newState);
        }}
        ref={movingShapeRef}
        id="SelectedShape"
        $top={top}
        $left={left}
        $width={width}
        $height={height}
        $shape={shape}
      />
    );
  }
  return <></>;
};
export default ModifyEventComponent;
