import React, { useEffect, useRef, useState } from "react";
import Editor from "./Editor";
import { LANGUAGES } from "../Languages";

const Editors = () => {
  const [isDragging, setIsDragging] = useState(0);
  const leftDraggableBarRef = useRef(null);
  const rightDraggableBarRef = useRef(null);
  const leftEditorRef = useRef(null);
  const rightEditorRef = useRef(null);
  const centerEditorRef = useRef(null);
  const containerRef = useRef(null);

  let x;

  const handleMouseDownLeft = (e) => {
    x = e.clientX;
    setIsDragging(1);
  };

  const handleMouseDownRight = (e) => {
    x = e.clientX;
    setIsDragging(2);
  };

  const handleMouseMove = (e) => {
    if (isDragging === 0) return;
    const containerWidth = containerRef.current.offsetWidth;
    const barWidth = leftDraggableBarRef.current.offsetWidth;
    const leftBar = leftDraggableBarRef.current;
    const rightBar = rightDraggableBarRef.current;
    const center = centerEditorRef.current;
    const left = leftEditorRef.current;
    const right = rightEditorRef.current;
    x = e.clientX;
    if (isDragging === 1) {
      leftBar.style.position = "absolute";
      leftBar.style.left = x + "px";
      leftBar.style.backgroundColor = "black";
      leftBar.style.height = `${left.offsetHeight}px`;
      left.style.width = `${x}px`;
      left.style.flexGrow = "0";
      center.style.position = "absolute";
      center.style.left = `${left.offsetWidth + barWidth}px`;
      center.style.flexGrow = "0";
      center.style.right = `${
        (containerWidth - 2 * barWidth) / 3 + barWidth
      }px`;
      rightBar.style.position = "absolute";
      rightBar.style.left = `${
        left.offsetWidth + barWidth + center.offsetWidth
      }px`;
      rightBar.style.backgroundColor = "black";
      rightBar.style.height = `${left.offsetHeight}px`;
      right.style.position = "absolute";
      right.style.flexGrow = "0";
      right.style.left = `${
        left.offsetWidth + 2 * barWidth + center.offsetWidth
      }px`;
      right.style.width = `${
        containerWidth - 2 * barWidth - center.offsetWidth - left.offsetWidth
      }px`;
      return;
    }
    leftBar.style.position = "absolute";
    leftBar.style.left = x + "px";
    leftBar.style.backgroundColor = "black";
    leftBar.style.height = `${left.offsetHeight}px`;
    left.style.width = `${x}px`;
    left.style.flexGrow = "0";
    center.style.position = "absolute";
    center.style.left = `${left.offsetWidth + barWidth}px`;
    center.style.flexGrow = "0";
    center.style.right = `${(containerWidth - 2 * barWidth) / 3 + barWidth}px`;
    rightBar.style.position = "absolute";
    rightBar.style.left = `${
      left.offsetWidth + barWidth + center.offsetWidth
    }px`;
    rightBar.style.backgroundColor = "black";
    rightBar.style.height = `${left.offsetHeight}px`;
    right.style.position = "absolute";
    right.style.flexGrow = "0";
    right.style.left = `${
      left.offsetWidth + 2 * barWidth + center.offsetWidth
    }px`;
    right.style.width = `${
      containerWidth - 2 * barWidth - center.offsetWidth - left.offsetWidth
    }px`;
  };

  const handleMouseUp = (e) => {
    setIsDragging(false);
  };

  return (
    <div
      className="editor-container"
      onMouseUp={handleMouseUp}
      onMouseMove={handleMouseMove}
      ref={containerRef}
    >
      <Editor language={LANGUAGES.HTML} myRef={leftEditorRef} />
      <div
        ref={leftDraggableBarRef}
        className="resize-bar"
        onMouseDown={handleMouseDownLeft}
      ></div>
      <Editor language={LANGUAGES.CSS} myRef={centerEditorRef} />
      <div
        ref={rightDraggableBarRef}
        className="resize-bar"
        onMouseDown={handleMouseDownRight}
      ></div>
      <Editor language={LANGUAGES.JS} myRef={rightEditorRef} />
    </div>
  );
};

export default Editors;
