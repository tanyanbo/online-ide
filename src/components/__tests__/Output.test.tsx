import React from "react";
import renderer from "react-test-renderer";
import Root from "../../Root";
import Output from "../Output";

describe("<Output />", () => {
  it("renders correct html", () => {
    const component = renderer.create(
      <Root initialState={{ srcDoc: { html: "<h1>Hello World!</h1>" } }}>
        <Output />
      </Root>
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("renders correct css", () => {
    const component = renderer.create(
      <Root
        initialState={{
          srcDoc: {
            css: `.first {
                    color: green;
                  }`,
          },
        }}
      >
        <Output />
      </Root>
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("renders correct js", () => {
    const component = renderer.create(
      <Root initialState={{ srcDoc: { js: "console.log(10);" } }}>
        <Output />
      </Root>
    );

    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("renders everything correctly with language: js", () => {
    const component = renderer.create(
      <Root
        initialState={{
          srcDoc: {
            html: '<h1 class="first">Hello world</h1>',
            css: `.first {
                  color: green;
                  }`,
            js: 'document.querySelector(".first").innerText = 10;',
          },
        }}
      >
        <Output />
      </Root>
    );

    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("renders everything correctly with language: ts", () => {
    const component = renderer.create(
      <Root
        initialState={{
          srcDoc: {
            html: '<h1 class="first">Hello world</h1>',
            css: `.first {
                  color: green;
                  }`,
            js: `const a: number = 10;
            document.querySelector(".first").innerText = a;`,
          },
          languages: {
            languages: "HTML+CSS+TS",
          },
        }}
      >
        <Output />
      </Root>
    );

    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
