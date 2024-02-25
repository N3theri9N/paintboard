"use client";
import { Shapes } from "@/types/shape";
import { useCallback, useState } from "react";
import useShapes from "@/hooks/useShapes";
import DrawnShapes from "./DrawnShapes";
import * as ToolBar from "./ToolBar";
import { Modes } from "@/types/mode";
import DrawEventComponent from "./CanvasComp/DrawEventComponent";
import ModifyEventComponent from "./CanvasComp/ModifyEventComponent";
import Canvas from "./CanvasComp";

const PaintBoard = ({ initShape = "square" }: { initShape?: Shapes }): JSX.Element => {
  const [shape, setShape] = useState<Shapes>(initShape);
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

  // console.count("RERENDERING COUNT");

  const ToolClickHandler = useCallback(
    (mode: Modes, shape?: Shapes) => () => {
      setMode(mode);
      if (shape !== undefined) {
        setShape(shape);
      }
    },
    []
  );

  const resetIndex = useCallback(() => {
    setIndex(-1);
  }, []);

  return (
    <div>
      <div className="w-full flex bg-black z-10 justify-between" id="Toolbar">
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
