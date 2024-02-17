import { ShapeType } from "@/types/shape";
import styled from "styled-components";

const ShapeComponent = styled.div<{
  $top: number;
  $left: number;
  $width: number;
  $height: number;
  $shape: "circle" | "square";
}>`
  border: solid black 2px;
  border-radius: ${(props) => (props.$shape === "circle" ? "9999%" : "0%")};
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

const DrawnShapes = ({ shapes }: { shapes: ShapeType[] }) => {
  return (
    <>
      {shapes.map((item, idx) => {
        const { top, left, width, height, shape } = item;
        return (
          <ShapeComponent
            tabIndex={0}
            key={idx}
            $top={top}
            $left={left}
            $width={width}
            $height={height}
            $shape={shape}
          />
        );
      })}
    </>
  );
};

export default DrawnShapes;
