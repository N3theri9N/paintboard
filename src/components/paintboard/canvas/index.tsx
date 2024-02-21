import React, { ReactNode } from "react";

const Canvas = ({
  children,
  initShapes,
  onClickHandler,
}: {
  children: ReactNode;
  initShapes: (node: HTMLDivElement) => void;
  onClickHandler: (e: React.MouseEvent<HTMLDivElement>) => void;
}): JSX.Element => {
  return (
    <div
      ref={initShapes}
      id="canvas"
      className="w-full h-[calc(100vh-40px)] overflow-hidden"
      onClick={onClickHandler}
    >
      {children}
    </div>
  );
};
export default Canvas;
