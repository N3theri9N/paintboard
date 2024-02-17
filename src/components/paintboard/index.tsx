"use client";
import { Shapes } from "@/types/shape";
import { useRef, useState } from "react";
import ToolButton from "../UI/ToolButton";
import useShapes from "@/hooks/useShapes";
import DrawnShapes, { DrawingShape } from "./DrawnShapes";

const PaintBoard = () => {
  let downX = 0,
    downY = 0,
    upX = 0,
    upY = 0;
  const [selectedShape, setSelectedShape] = useState<Shapes>("square");
  const { shapes, initShapes, addShapes, clearShapes } = useShapes();

  const previewRef = useRef<HTMLDivElement>(null);

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
      <div
        ref={initShapes}
        id="canvas"
        className="w-full h-screen overflow-hidden"
        onMouseDown={(e) => {
          e.stopPropagation();
          downX = e.clientX;
          downY = e.clientY;
        }}
        onMouseMove={(e) => {
          e.preventDefault();
          if (e.buttons === 1) {
            // 왼쪽 마우스버튼을 클릭 했을 경우
            const currentX = e.clientX;
            const currentY = e.clientY;
            const left = Math.min(currentX, downX);
            const top = Math.min(currentY, downY);
            const width = Math.abs(currentX - downX);
            const height = Math.abs(currentY - downY);

            previewRef.current?.style.setProperty("position", "absolute");
            previewRef.current?.style.setProperty("left", `${left}px`);
            previewRef.current?.style.setProperty("top", `${top}px`);
            previewRef.current?.style.setProperty("width", `${width}px`);
            previewRef.current?.style.setProperty("height", `${height}px`);
            previewRef.current?.style.setProperty("display", "block");
          }
        }}
        onMouseUp={(e) => {
          upX = e.clientX;
          upY = e.clientY;
          const left = Math.min(upX, downX);
          const top = Math.min(upY, downY);
          const width = Math.abs(upX - downX);
          const height = Math.abs(upY - downY);
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
