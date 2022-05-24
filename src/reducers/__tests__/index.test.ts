import { srcDoc } from "../index";
import KEYS from "../../actions/keys";

describe("srcDoc reducer", () => {
  const initialState = {
    html: '<p class="first">Testing</p>',
    css: `.first {
            color: green;
          }`,
    js: `document.querySelector('.first').innerText = 'hello';`,
  };

  it("change html returns the correct result", () => {
    const pos = 1;
    const action = {
      type: KEYS[`CHANGE_${pos}`],
      payload: "<h1>Hello World!</h1>",
    };

    const returnedState = srcDoc(initialState, action);
    const expectedState = {
      html: "<h1>Hello World!</h1>",
      css: `.first {
            color: green;
          }`,
      js: `document.querySelector('.first').innerText = 'hello';`,
    };

    expect(returnedState).toEqual(expectedState);
  });

  it("change css returns the correct result", () => {
    const pos = 2;
    const action = {
      type: KEYS[`CHANGE_${pos}`],
      payload: `.first {
                  font-size: 20px;
                }`,
    };

    const returnedState = srcDoc(initialState, action);
    const expectedState = {
      html: '<p class="first">Testing</p>',
      css: `.first {
                  font-size: 20px;
                }`,
      js: `document.querySelector('.first').innerText = 'hello';`,
    };

    expect(returnedState).toEqual(expectedState);
  });

  it("change js returns the correct result", () => {
    const pos = 3;
    const action = {
      type: KEYS[`CHANGE_${pos}`],
      payload: `document.querySelector("first").innerText = 20;`,
    };

    const returnedState = srcDoc(initialState, action);
    const expectedState = {
      html: '<p class="first">Testing</p>',
      css: `.first {
            color: green;
          }`,
      js: `document.querySelector("first").innerText = 20;`,
    };

    expect(returnedState).toEqual(expectedState);
  });
});
