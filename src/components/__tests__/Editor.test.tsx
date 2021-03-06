import { render } from "@testing-library/react";
import React from "react";
import Editor from "../Editor";
import LANGUAGES from "../../shared/Languages";
import Root from "../../Root";

describe("<Editor/>", function () {
  it("has a codemirror window", () => {
    const { container } = render(
      <Root>
        <Editor pos="1" hasBar={false} language={LANGUAGES["HTML"]} />
      </Root>
    );
  });
});
