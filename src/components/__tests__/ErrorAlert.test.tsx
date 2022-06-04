import { fireEvent, render, screen } from "@testing-library/react";
import Root from "../../Root";
import Editor from "../Editor";
import LANGUAGES from "../../shared/Languages";
import React from "react";
import renderer, { act } from "react-test-renderer";

describe("<ErrorAlert />", () => {
  it("shows red exclamation mark when there is an error in the javascript code", () => {
    render(
      <Root initialState={{ srcDoc: { js: "console.log(a)" } }}>
        <Editor pos={"3"} hasBar={true} language={LANGUAGES.JS} />
      </Root>
    );

    expect(screen.getByText("!")).toBeInTheDocument();
  });

  it("does not show red exclamation mark when there are no errors in the javascript code", () => {
    render(
      <Root initialState={{ srcDoc: { js: "console.log(1)" } }}>
        <Editor pos={"3"} hasBar={true} language={LANGUAGES.JS} />
      </Root>
    );

    expect(screen.queryByText("!")).not.toBeInTheDocument();
  });

  it("alerts the right message after clicking on exclamation mark: javascript", () => {
    render(
      <Root initialState={{ srcDoc: { js: "console.log(a)" } }}>
        <Editor pos={"3"} hasBar={true} language={LANGUAGES.JS} />
      </Root>
    );

    const alertMock = jest.spyOn(window, "alert").mockImplementation();
    fireEvent.click(screen.getByText("!"));
    expect(alertMock).toBeCalledWith("a is not defined");
  });

  it("shows red exclamation mark when there is an error in the typescript code", async () => {
    let component;
    await act(async () => {
      component = renderer.create(
        <Root
          initialState={{
            srcDoc: {
              js: `const b: number = 10
            console.log(a)`,
            },
            languages: { languages: "HTML+CSS+TS" },
          }}
        >
          <Editor pos={"3"} hasBar={true} language={LANGUAGES.TS} />
        </Root>
      );
    });

    expect(component.toJSON()).toMatchSnapshot();
  });

  it("does not show red exclamation mark when there are no errors in the typescript code", async () => {
    let component;
    await act(async () => {
      component = renderer.create(
        <Root
          initialState={{
            srcDoc: {
              js: `const b: number = 10
            console.log(b)`,
            },
            languages: { languages: "HTML+CSS+TS" },
          }}
        >
          <Editor pos={"3"} hasBar={true} language={LANGUAGES.TS} />
        </Root>
      );
    });

    expect(component.toJSON()).toMatchSnapshot();
  });

  it("alerts the right message after clicking on exclamation mark: typescript", async () => {
    let component;
    await act(async () => {
      component = renderer.create(
        <Root
          initialState={{
            srcDoc: {
              js: `const b: number = 10
            console.log(a)`,
            },
            languages: { languages: "HTML+CSS+TS" },
          }}
        >
          <Editor pos={"3"} hasBar={true} language={LANGUAGES.TS} />
        </Root>
      );
    });

    const alertMock = jest.spyOn(window, "alert").mockImplementation();
    const button = await component.root.findByProps({
      className: "error-wrap",
    });
    button.props.onClick();

    expect(alertMock).toBeCalledWith("a is not defined");
  });
});
