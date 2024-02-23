import { render, fireEvent } from "@testing-library/react";
import PaintBoard from "../components/paintboard";

describe("이동", () => {
  test("이동 테스트", () => {
    render(<PaintBoard />);
    const canvas = document.querySelector("#canvas div") as HTMLDivElement;

    fireEvent.mouseDown(canvas, { clientX: 100, clientY: 100 });
    fireEvent.mouseMove(canvas, { clientX: 200, clientY: 200 });
    fireEvent.mouseUp(canvas);
    fireEvent.mouseDown(canvas, { clientX: 200, clientY: 200 });
    fireEvent.mouseMove(canvas, { clientX: 300, clientY: 300 });
    fireEvent.mouseUp(canvas);

    const beforeSquares = document.querySelectorAll("#canvas .shape");
    expect(beforeSquares.length).toBe(2);

    const modifyButton = document.querySelectorAll(".toolButton")[3];
    fireEvent.click(modifyButton);

    const shape1 = document.querySelectorAll("#canvas .shape")[0];
    fireEvent.click(shape1);

    const previewShape = document.querySelector("#SelectedShape") as HTMLDivElement;
    const previewShapeStyle = window.getComputedStyle(previewShape);
    console.log(previewShapeStyle.left);
    const shapeStyle1 = window.getComputedStyle(shape1);
    expect(shapeStyle1.left).equals(previewShapeStyle.left);
    expect(shapeStyle1.top).equals(previewShapeStyle.top);
    expect(shapeStyle1.width).equals(previewShapeStyle.width);
    expect(shapeStyle1.height).equals(previewShapeStyle.height);

    fireEvent.mouseDown(previewShape);
    fireEvent.mouseMove(previewShape, { clientX: 600, clientY: 1000 });
    fireEvent.mouseUp(previewShape);

    console.log(previewShapeStyle.left);
  });
});
