"use client";
import { Shapes } from "@/types/shape";
import { useState } from "react";
import useShapes from "@/hooks/useShapes";
import DrawnShapes from "./DrawnShapes";
import ToolBar from "./ToolBar";
import { Modes } from "@/types/mode";
import DrawEventComponent from "./DrawEventComponent";
import ModifyEventComponent from "./ModifyEventComponent";

const PaintBoard = (): JSX.Element => {
  const [shape, setShape] = useState<Shapes>("square");
  const [mode, setMode] = useState<Modes>("draw");
  const { drawnShapes, initShapes, addShapes, clearShapes, index, setIndex, moveShape } =
    useShapes();

  return (
    <div>
      <ToolBar
        mode={mode}
        setMode={setMode}
        clearShapes={clearShapes}
        shape={shape}
        setShape={setShape}
      />
      <div ref={initShapes} id="canvas" className="w-full h-screen overflow-hidden">
        {mode === "draw" && <DrawEventComponent shape={shape} addShapes={addShapes} />}
        <DrawnShapes shapes={drawnShapes} mode={mode} setIndex={setIndex} />
        {mode === "modify" && (
          <ModifyEventComponent
            selectedShape={drawnShapes[index]}
            index={index}
            moveShape={moveShape}
          />
        )}
      </div>
    </div>
  );
};

export default PaintBoard;
