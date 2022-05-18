import React, { useEffect, useRef, useState } from "react";
import Editor from "./Editor";
import { LANGUAGES } from "../Languages";

const Editors = () => {
  const [isDragging, setIsDragging] = useState(0);
  const [rightWidth, setRightWidth] = useState(0);
  const [leftWidth, setLeftWidth] = useState(0);
  const [containerWidth, setContainerWidth] = useState(0);
  const [leftStart, setLeftStart] = useState(0);
  const [rightStart, setRightStart] = useState(0);
  const leftRef = useRef(null);
  const centerRef = useRef(null);
  const rightRef = useRef(null);
  const containerRef = useRef(null);

  useEffect(() => {});

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
      <Editor language={LANGUAGES.HTML} ref={leftRef} />
      {/*<div className="editor-full-with-bar" ref={centerRef}>*/}
      {/*  <div*/}
      {/*    className="resize-bar"*/}
      {/*    onMouseDown={handleMouseDownLeft}*/}
      {/*    ref={leftBarRef}*/}
      {/*  ></div>*/}
      <Editor
        language={LANGUAGES.CSS}
        hasBar={true}
        handleMouseDown={handleMouseDownLeft}
        myRef={centerRef}
      />
      {/*</div>*/}
      {/*<div className="editor-full-with-bar" ref={rightRef}>*/}
      {/*  <div*/}
      {/*    className="resize-bar"*/}
      {/*    onMouseDown={handleMouseDownRight}*/}
      {/*    ref={rightBarRef}*/}
      {/*  ></div>*/}
      <Editor
        language={LANGUAGES.JS}
        hasBar={true}
        handleMouseDown={handleMouseDownRight}
        myRef={rightRef}
      />
      {/*</div>*/}
    </div>
  );
};

export default Editors;
