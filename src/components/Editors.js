import React, { useRef, useState } from "react";
import Editor from "./Editor";
import { LANGUAGES } from "../shared/Languages";

const Editors = () => {
  const [isDragging, setIsDragging] = useState(0);
  const [rightWidth, setRightWidth] = useState(0);
  const [leftWidth, setLeftWidth] = useState(0);
  const [containerWidth, setContainerWidth] = useState(0);
  const [leftStart, setLeftStart] = useState(0);
  const [rightStart, setRightStart] = useState(0);
  const [chosenLanguages, setChosenLanguages] = useState([
    LANGUAGES.HTML,
    LANGUAGES.CSS,
    LANGUAGES.JS,
  ]);
  const leftRef = useRef(null);
  const centerRef = useRef(null);
  const rightRef = useRef(null);
  const containerRef = useRef(null);

  const handleMouseDownLeft = () => {
    setIsDragging(1);
    setRightWidth(rightRef.current.getBoundingClientRect().width);
    setRightStart(centerRef.current.getBoundingClientRect().right);
    setContainerWidth(containerRef.current.getBoundingClientRect().width);
  };

  const handleMouseDownRight = () => {
    setIsDragging(2);
    setLeftWidth(leftRef.current.getBoundingClientRect().width);
    setLeftStart(centerRef.current.getBoundingClientRect().left);
    setContainerWidth(containerRef.current.getBoundingClientRect().width);
  };

  const handleMouseMove = (e) => {
    if (isDragging === 0) return;

    const x = e.clientX;
    if (isDragging === 1) {
      centerRef.current.style.width = `${rightStart - x}px`;
      rightRef.current.style.width = `${rightWidth}px`;
      leftRef.current.style.width = `${
        containerWidth -
        rightRef.current.clientWidth -
        centerRef.current.clientWidth
      }px`;
      return;
    }
    if (isDragging === 2) {
      centerRef.current.style.width = `${x - leftStart}px`;
      leftRef.current.style.width = `${leftWidth}px`;
      rightRef.current.style.width = `${
        containerWidth -
        leftRef.current.clientWidth -
        centerRef.current.clientWidth
      }px`;
    }
  };

  const handleMouseUp = () => {
    setIsDragging(0);
  };

  return (
    <div
      className="editor-container"
      onMouseUp={handleMouseUp}
      onMouseMove={handleMouseMove}
      ref={containerRef}
    >
      <Editor language={chosenLanguages[0]} ref={leftRef} />
      <Editor
        language={chosenLanguages[1]}
        hasBar={true}
        handleMouseDown={handleMouseDownLeft}
        ref={centerRef}
      />
      <Editor
        language={chosenLanguages[2]}
        hasBar={true}
        handleMouseDown={handleMouseDownRight}
        ref={rightRef}
      />
    </div>
  );
};

export default Editors;
