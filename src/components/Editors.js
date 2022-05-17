import React, { useRef, useState } from "react";
import Editor from "./Editor";
import { LANGUAGES } from "../Languages";

const Editors = () => {
  const [startingX, setStartingX] = useState(0);
  const [startingY, setStartingY] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const leftDraggableBarRef = useRef(null);
  const rightDraggableBarRef = useRef(null);
  const leftEditorRef = useRef(null);
  const rightEditorRef = useRef(null);
  const centerEditorRef = useRef(null);

  const handleMouseDown = (e) => {
    setStartingX(e.clientX);
    setStartingY(e.clientY);
    setIsDragging(true);
  };

  const handleMouseMove = (e) => {
    if (isDragging) {
      const dx = e.clientX - startingX;
      if (dx < 0) {
        leftEditorRef.current.style.width = `${
          leftEditorRef.current.offsetWidth - 10
        }px`;
        leftDraggableBarRef.current.style.width = `${leftDraggableBarRef.current.offsetWidth}px`;
      }
    }
  };

  const handleMouseUp = (e) => {
    setIsDragging(false);
  };

  return (
    <div className="editor-container" onMouseUp={handleMouseUp}>
      <Editor language={LANGUAGES.HTML} myRef={leftEditorRef} />
      <div
        ref={leftDraggableBarRef}
        className="resize-bar"
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
      ></div>
      <Editor language={LANGUAGES.CSS} myRef={centerEditorRef} />
      <div
        ref={rightDraggableBarRef}
        className="resize-bar"
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
      ></div>
      <Editor language={LANGUAGES.JS} myRef={rightEditorRef} />
    </div>
  );
};

export default Editors;
