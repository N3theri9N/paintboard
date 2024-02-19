import ToolButton from "@/components/UI/ToolButton";
import { Modes } from "@/types/mode";
import { Shapes } from "@/types/shape";
import React, { Dispatch, SetStateAction } from "react";

const ToolBar = ({
  mode,
  setMode,
  clearShapes,
  shape,
  setShape,
}: {
  mode: Modes;
  setMode: Dispatch<SetStateAction<Modes>>;
  shape: Shapes;
  setShape: Dispatch<SetStateAction<Shapes>>;
  clearShapes: () => void;
}): JSX.Element => {
  return (
    <div className="w-full flex bg-black">
      <div className="flex items-center bg-white">
        <ToolButton
          active={mode === "draw" && shape === "square"}
          onClick={() => {
            setMode("draw");
            setShape("square");
          }}
        >
          <div className="border-2 mx-2 h-full border-black" />
        </ToolButton>
        <ToolButton
          active={mode === "draw" && shape === "circle"}
          onClick={() => {
            setMode("draw");
            setShape("circle");
          }}
        >
          <div className="border-2 mx-2 h-full rounded-full border-black" />
        </ToolButton>
        <ToolButton
          active={mode === "modify"}
          onClick={() => {
            setMode("modify");
          }}
        >
          선택
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
