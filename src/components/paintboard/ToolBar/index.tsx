import ToolButton from "@/components/UI/ToolButton";
import { Modes, ModifyMethods } from "@/types/mode";
import { Shapes } from "@/types/shape";
import html2canvas from "html2canvas";
import React, { ChangeEvent, ReactNode, useRef } from "react";

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
        <div data-testid="draw-square" className="border-2 mx-2 h-full border-black" />
      </ToolButton>
      <ToolButton
        active={mode === "draw" && shape === "circle"}
        onClick={ToolClickHandler("draw", "circle")}
      >
        <div data-testid="draw-circle" className="border-2 mx-2 h-full rounded-full border-black" />
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
  const colorRef = useRef<HTMLInputElement>(null);
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
          className="h-10 w-10"
          onChange={(e: ChangeEvent<HTMLInputElement>) => {
            // 컬러 파레트 드래그 중에도 리랜더링이 발생하여 비제어 컴포넌트로 전환
            // modifyShape.color(e.target.value);
          }}
          ref={colorRef}
        />
        <ToolButton
          onClick={() => {
            if (colorRef.current !== null) {
              modifyShape.color(colorRef.current.value);
            }
          }}
        >
          색 적용
        </ToolButton>
      </div>
    </>
  );
};

export const Download = () => {
  const downloadButtonHandler = () => {
    let canvasDivElement = document.getElementById("canvas") as HTMLDivElement;
    html2canvas(canvasDivElement).then((canvas: HTMLCanvasElement) => {
      const link = document.createElement("a");
      link.href = canvas.toDataURL("image/jpg");
      link.download = `image_${Math.ceil(Math.random() * 1000000)}.jpg`;
      link.click();
    });
  };
  return (
    <WhiteBackground>
      <ToolButton onClick={downloadButtonHandler}>다운로드</ToolButton>
    </WhiteBackground>
  );
};

const WhiteBackground = ({ children }: { children: ReactNode }) => {
  return <div className="flex items-center bg-white">{children}</div>;
};
