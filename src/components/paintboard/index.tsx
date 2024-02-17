"use client";
import { Shapes, ShapeType } from "@/types/shape";
import { useState } from "react";
import ToolButton from "../UI/ToolButton";
import useShapes from "@/hooks/useShapes";
import DrawnShapes from "./DrawnShapes";

const PaintBoard = () => {
  let downX = 0,
    downY = 0,
    upX = 0,
    upY = 0;
  const [selectedShape, setSelectedShape] = useState<Shapes>("square");
  const { shapes, initShapes, addShapes, clearShapes } = useShapes();

  return (
    <div>
      <div className="w-full flex">
        <div className="flex items-center">
          <div className="mx-2">DRAW</div>
          <ToolButton
            active={selectedShape === "square"}
            onClick={() => {
              setSelectedShape("square");
            }}
          >
            <div className="border-2 mx-2 h-full border-black" />
          </ToolButton>
          <ToolButton
            active={selectedShape === "circle"}
            onClick={() => {
              setSelectedShape("circle");
            }}
          >
            <div className="border-2 mx-2 h-full rounded-full border-black" />
          </ToolButton>
        </div>
        <div className="flex items-center">
          <div className="mx-2">MODIFY</div>
          <ToolButton active={false} onClick={() => {}}>
            이동
          </ToolButton>
          <ToolButton
            active={false}
            onClick={() => {
              clearShapes();
            }}
          >
            삭제
          </ToolButton>
        </div>
      </div>
      <main
        ref={initShapes}
        id="canvas"
        className="w-full h-screen overflow-hidden"
        onMouseDown={(e) => {
          downX = e.clientX;
          downY = e.clientY;
        }}
        onMouseUp={(e) => {
          upX = e.clientX;
          upY = e.clientY;
          const left = Math.min(upX, downX);
          const top = Math.min(upY, downY);
          const width = Math.abs(upX - downX);
          const height = Math.abs(upY - downY);

          if (width > 20 && height > 20) {
            addShapes({ left, top, width, height, shape: selectedShape });
          }
        }}
      >
        <DrawnShapes shapes={shapes} />
      </main>
    </div>
  );
};

export default PaintBoard;
