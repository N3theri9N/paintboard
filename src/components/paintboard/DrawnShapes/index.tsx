import { Modes } from "@/types/mode";
import { Shapes, ShapeType } from "@/types/shape";
import clsx from "clsx";
import { Dispatch, forwardRef, SetStateAction } from "react";
import styled from "styled-components";

const ShapeComponent = styled.div<{
  $top: number;
  $left: number;
  $width: number;
  $height: number;
  $color?: string;
  $mode: Modes;
  $shape: Shapes;
}>`
  border: solid black 2px;
  pointer-events: ${(props) => (props.$mode === "modify" ? "auto" : "none")};
  border-radius: ${(props) => (props.$shape === "circle" ? "9999%" : "0%")};
  background-color: ${(props) => props.$color ?? ""};
  // opacity: ${(props) => (props.$color ? "80%" : "0%")};
  position: absolute;
  height: ${(props) => props.$height}px;
  width: ${(props) => props.$width}px;
  top: ${(props) => props.$top}px;
  left: ${(props) => props.$left}px;
  &:focus {
    display: none;
  }
`;

const DrawnShapes = ({
  shapes,
  mode,
  setIndex,
}: {
  shapes: ShapeType[];
  mode: Modes;
  setIndex: Dispatch<SetStateAction<number>>;
}) => {
  return (
    <>
      {shapes.map((item, idx) => {
        const { top, left, width, height, color, shape } = item;
        return (
          <ShapeComponent
            tabIndex={mode === "modify" ? 0 : undefined}
            onClick={(e: React.MouseEvent<HTMLDivElement>) => {
              e.stopPropagation();
              setIndex(idx);
            }}
            key={idx}
            $mode={mode}
            $top={top}
            $left={left}
            $width={width}
            $height={height}
            $color={color}
            $shape={shape}
          />
        );
      })}
    </>
  );
};

export const DrawingShape = forwardRef<HTMLDivElement, { shape: Shapes }>(
  ({ shape }, previewRef) => {
    return (
      <div
        ref={previewRef}
        className={clsx("w-0 h-0 bg-opacity-0 border-2 hidden border-black pointer-events-none", {
          "rounded-[100%]": shape === "circle",
        })}
      />
    );
  }
);

export default DrawnShapes;
