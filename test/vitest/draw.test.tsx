import { render, fireEvent } from "@testing-library/react";
import { act } from "react-dom/test-utils";
import PaintBoard from "@/components/paintboard";

describe("그리기", () => {
  test("사각형", () => {
    render(<PaintBoard />);
    const canvas = document.querySelector("#canvas div") as HTMLDivElement;

    const drawSquareButton = document.querySelectorAll(".toolButton")[0];
    const drawCircleButton = document.querySelectorAll(".toolButton")[1];

    expect(drawSquareButton.className).contain("border-black");
    expect(drawCircleButton.className).not.contain("border-black");

    fireEvent.mouseDown(canvas, { clientX: 100, clientY: 100 });
    fireEvent.mouseMove(canvas, { clientX: 200, clientY: 200 });
    fireEvent.mouseUp(canvas);

    const squares = document.querySelectorAll("#canvas .shape");
    expect(squares.length).toBe(1);
    const squareStyle = window.getComputedStyle(squares[0]);
    expect(squareStyle.border).toContain("2px solid black");
    expect(squareStyle.position).equals("absolute");
    expect(squareStyle.width).equals("100px");
    expect(squareStyle.height).equals("100px");
    expect(squareStyle.borderRadius).equals("0%");
  });
  test("동그라미", async () => {
    render(<PaintBoard />);
    // 동그라미 그리기 버튼의 활성화를 확인했으나,
    // 예상과 달리 사각형이 그려지는 문제 발생.
    const drawSquareButton = document.querySelectorAll(".toolButton")[0];
    const drawCircleButton = document.querySelectorAll(".toolButton")[1];
    act(() => {
      fireEvent.click(drawCircleButton);
    });
    expect(drawSquareButton.className).not.contain("border-black");
    expect(drawCircleButton.className).contain("border-black");

    const canvas = document.querySelector("#canvas div") as HTMLDivElement;

    fireEvent.mouseDown(canvas, { clientX: 100, clientY: 100 });
    fireEvent.mouseMove(canvas, { clientX: 200, clientY: 200 });
    fireEvent.mouseUp(canvas);

    const circles = document.querySelectorAll("#canvas .shape");
    expect(circles.length).toBe(1);
    const circleStyle = window.getComputedStyle(circles[0]);
    expect(circleStyle.border).toContain("2px solid black");
    // console.log(circleStyle);
    // expect(circleStyle.borderRadius).equals("9999%");
  });
});
function sleep(milliseconds: number) {
  return new Promise((resolve) => {
    setTimeout(resolve, milliseconds);
  });
}
