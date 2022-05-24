import { srcDoc, languages, isRunning, checkbox } from "../index";
import KEYS from "../../actions/keys";

let initialState;
beforeEach(() => {
  initialState = {
    html: '<p class="first">Testing</p>',
    css: `.first {
            color: green;
          }`,
    js: `document.querySelector('.first').innerText = 'hello';`,
    languages: `HTML+CSS+JS`,
    checked: false,
    isRunning: true,
  };
});

describe("srcDoc reducer", () => {
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
      languages: `HTML+CSS+JS`,
      checked: false,
      isRunning: true,
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
      languages: `HTML+CSS+JS`,
      checked: false,
      isRunning: true,
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
      languages: `HTML+CSS+JS`,
      checked: false,
      isRunning: true,
    };

    expect(returnedState).toEqual(expectedState);
  });
});

describe("reducers other than srcDoc", () => {
  it("change languages to the selected languages", () => {
    const localStorageLanguage = "TS";

    const returnedState = languages(initialState, {
      type: KEYS.CHANGE_LANGUAGES,
      payload: `HTML+CSS+${localStorageLanguage}`,
    });

    const expectedState = {
      html: '<p class="first">Testing</p>',
      css: `.first {
            color: green;
          }`,
      js: `document.querySelector('.first').innerText = 'hello';`,
      languages: `HTML+CSS+TS`,
      checked: false,
      isRunning: true,
    };

    expect(returnedState).toEqual(expectedState);
  });

  it("change isRunning to false", () => {
    const returnedState = isRunning(initialState, {
      type: KEYS.CHANGE_RUN,
      payload: false,
    });

    const expectedState = {
      html: '<p class="first">Testing</p>',
      css: `.first {
            color: green;
          }`,
      js: `document.querySelector('.first').innerText = 'hello';`,
      languages: `HTML+CSS+JS`,
      checked: false,
      isRunning: false,
    };

    expect(returnedState).toEqual(expectedState);
  });

  it("change checkbox to checked", () => {
    const returnedState = checkbox(initialState, {
      type: KEYS.CHANGE_RUN_WHILE_TYPING,
      payload: true,
    });

    const expectedState = {
      html: '<p class="first">Testing</p>',
      css: `.first {
            color: green;
          }`,
      js: `document.querySelector('.first').innerText = 'hello';`,
      languages: `HTML+CSS+JS`,
      checked: true,
      isRunning: true,
    };

    expect(returnedState).toEqual(expectedState);
  });
});
