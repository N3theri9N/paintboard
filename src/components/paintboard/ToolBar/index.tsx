import ToolButton from "@/components/UI/ToolButton";
import { Shapes } from "@/types/shape";
import React, { Dispatch, SetStateAction } from "react";

const ToolBar = ({
  selectedShape,
  setSelectedShape,
  clearShapes,
}: {
  selectedShape: Shapes;
  setSelectedShape: Dispatch<SetStateAction<Shapes>>;
  clearShapes: () => void;
}): JSX.Element => {
  return (
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
  );
};

export default ToolBar;
