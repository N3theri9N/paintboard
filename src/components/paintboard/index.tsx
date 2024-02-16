"use client";
import styled from "styled-components";
import { Shapes, ShapeType } from "@/types/shape";
import { useState } from "react";
import ToolButton from "../UI/ToolButton";

const Square = styled.div<{ $top: number; $left: number; $width: number; $height: number }>`
  border: solid black 2px;
  position: absolute;
  height: ${(props) => props.$height}px;
  width: ${(props) => props.$width}px;
  top: ${(props) => props.$top}px;
  left: ${(props) => props.$left}px;
  &:focus {
    outline: none;
    box-shadow: 0px 0px 5px blue;
  }
`;

const Circle = styled.div<{ $top: number; $left: number; $width: number; $height: number }>`
  border: solid black 2px;
  border-radius: 9999%;
  position: absolute;
  height: ${(props) => props.$height}px;
  width: ${(props) => props.$width}px;
  top: ${(props) => props.$top}px;
  left: ${(props) => props.$left}px;
  &:focus {
    outline: none;
    box-shadow: 0px 0px 5px blue;
  }
`;

const PaintBoard = () => {
  let downX = 0,
    downY = 0,
    upX = 0,
    upY = 0;
  const [selectedShape, setSelectedShape] = useState<Shapes>("square");
  const [shapes, setShapes] = useState<ShapeType[]>([]);

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
      </div>
      <main
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
          console.log(width, height);
          if (width > 20 && height > 20) {
            setShapes((prev) => {
              const newState = [...prev];
              newState.push({ left, top, width, height, shape: selectedShape });
              return newState;
            });
          }
        }}
      >
        {shapes.map((item, idx) => {
          switch (item.shape) {
            case "circle":
              return (
                <Circle
                  tabIndex={0}
                  key={idx}
                  $top={item.top}
                  $width={item.width}
                  $height={item.height}
                  $left={item.left}
                />
              );
            case "square":
              return (
                <Square
                  tabIndex={0}
                  key={idx}
                  $top={item.top}
                  $width={item.width}
                  $height={item.height}
                  $left={item.left}
                />
              );
          }
        })}
      </main>
    </div>
  );
};

export default PaintBoard;
