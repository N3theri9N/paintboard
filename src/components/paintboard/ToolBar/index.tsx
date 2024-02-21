import ToolButton from "@/components/UI/ToolButton";
import { Modes, ModifyMethods } from "@/types/mode";
import { Shapes } from "@/types/shape";
import React, { ChangeEvent, ReactNode } from "react";

export const Draw = ({
  mode,
  shape,
  ToolClickHandler,
}: {
  mode: Modes;
  shape: Shapes;
  ToolClickHandler: (mode: Modes, shape?: Shapes) => () => void;
}) => {
  return (
    <WhiteBackground>
      <ToolButton
        active={mode === "draw" && shape === "square"}
        onClick={ToolClickHandler("draw", "square")}
      >
        <div className="border-2 mx-2 h-full border-black" />
      </ToolButton>
      <ToolButton
        active={mode === "draw" && shape === "circle"}
        onClick={ToolClickHandler("draw", "circle")}
      >
        <div className="border-2 mx-2 h-full rounded-full border-black" />
      </ToolButton>
    </WhiteBackground>
  );
};

export const Clear = ({ clearShapes }: { clearShapes: () => void }) => {
  return (
    <WhiteBackground>
      <ToolButton onClick={clearShapes}>초기화</ToolButton>
    </WhiteBackground>
  );
};

export const Modify = ({
  mode,
  index,
  ToolClickHandler,
  modifyShape,
}: {
  mode: Modes;
  index: number;
  ToolClickHandler: (mode: Modes) => () => void;
  modifyShape: ModifyMethods;
}) => {
  return (
    <>
      <WhiteBackground>
        <ToolButton active={mode === "modify"} onClick={ToolClickHandler("modify")}>
          수정
        </ToolButton>
      </WhiteBackground>
      <div
        className={`${
          index < 0 ? "pointer-events-none cursor-auto bg-gray-500 text-gray-400" : " bg-white"
        } flex bg-white`}
      >
        <ToolButton onClick={modifyShape.top}>맨앞으로</ToolButton>
        <ToolButton onClick={modifyShape.forward}>앞으로</ToolButton>
        <ToolButton onClick={modifyShape.backward}>뒤로</ToolButton>
        <ToolButton onClick={modifyShape.bottom}>맨뒤로</ToolButton>
        <ToolButton onClick={modifyShape.delete}>지우기</ToolButton>
        <input
          type="color"
          onChange={(e: ChangeEvent<HTMLInputElement>) => {
            modifyShape.color(e.target.value);
          }}
        />
      </div>
    </>
  );
};

const WhiteBackground = ({ children }: { children: ReactNode }) => {
  return <div className="flex items-center bg-white">{children}</div>;
};
