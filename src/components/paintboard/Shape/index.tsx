import { Shapes } from "@/types/shape";
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
