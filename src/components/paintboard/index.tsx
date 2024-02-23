"use client";
import { Shapes } from "@/types/shape";
import { useState } from "react";
import useShapes from "@/hooks/useShapes";
import DrawnShapes from "./DrawnShapes";
import * as ToolBar from "./ToolBar";
import { Modes } from "@/types/mode";
import DrawEventComponent from "./DrawEventComponent";
import ModifyEventComponent from "./ModifyEventComponent";
import Canvas from "./canvas";

const PaintBoard = (): JSX.Element => {
  const [shape, setShape] = useState<Shapes>("square");
  const [mode, setMode] = useState<Modes>("draw");
  const {
    drawnShapes,
    initShapes,
    addShapes,
    clearShapes,
    index,
    setIndex,
    moveShape,
    modifyShape,
  } = useShapes(mode);

  console.count("RERENDERING COUNT");

  const ToolClickHandler = (mode: Modes, shape?: Shapes) => () => {
    setMode(mode);
    if (shape !== undefined) {
      setShape(shape);
    }
  };

  const resetIndex = () => {
    setIndex(-1);
  };

  return (
    <div>
      <div className="w-full flex bg-black z-10">
        <div className="flex">
          <ToolBar.Draw mode={mode} ToolClickHandler={ToolClickHandler} shape={shape} />
          <ToolBar.Clear clearShapes={clearShapes} />
          <ToolBar.Modify
            mode={mode}
            ToolClickHandler={ToolClickHandler}
            index={index}
            modifyShape={modifyShape}
          />
        </div>
        <ToolBar.Download />
      </div>
      <Canvas initShapes={initShapes} onClickHandler={resetIndex}>
        <DrawnShapes shapes={drawnShapes} mode={mode} setIndex={setIndex} />
        {mode === "draw" && <DrawEventComponent shape={shape} addShapes={addShapes} />}
        {mode === "modify" && (
          <ModifyEventComponent
            selectedShape={drawnShapes[index]}
            index={index}
            moveShape={moveShape}
          />
        )}
      </Canvas>
    </div>
  );
};

export default PaintBoard;
