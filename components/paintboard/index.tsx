"use client";

const PaintBoard = () => {
  let downX = 0,
    downY = 0,
    upX = 0,
    upY = 0;

  return (
    <main
      id="canvas"
      className="w-full h-screen -z-10 overflow-hidden"
      onMouseDown={(e) => {
        downX = e.clientX;
        downY = e.clientY;
      }}
      onMouseUp={(e) => {
        upX = e.clientX;
        upY = e.clientY;

        const left = Math.min(upX, downX);
        const top = Math.min(upY, downY);
        const width = Math.abs(upX - downX);
        const height = Math.abs(upY - downY);

        let div = document.createElement("div");

        div.style.overflow = "hidden";
        div.style.position = "absolute";
        div.style.width = `${String(width)}px`;
        div.style.left = `${String(left)}px`;
        div.style.top = `${String(top)}px`;
        div.style.height = `${String(height)}px`;

        div.classList.add("circle");
        document.getElementById("canvas")?.append(div);
      }}
    ></main>
  );
};

export default PaintBoard;
