import { render, fireEvent } from "@testing-library/react";
import PaintBoard from "@/components/paintboard";

describe("초기화", () => {
  test("초기화 버튼 클릭", () => {
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

    const clearButton = document.querySelectorAll(".toolButton")[2];
    fireEvent.click(clearButton);
    const afterSquares = document.querySelectorAll("#canvas .shape");
    expect(afterSquares.length).toBe(0);
  });
});
