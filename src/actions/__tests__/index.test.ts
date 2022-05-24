import {
  change,
  changeLanguages,
  changeIsRunning,
  changeRunWhileTyping,
} from "../index";
import KEYS from "../keys";

describe("action creators", () => {
  it("test action creator: change", () => {
    const code = "<h1>hello</h1>";
    const action = change(code, KEYS.CHANGE_1);
    expect(action).toEqual({ type: KEYS.CHANGE_1, payload: code });
  });

  it("test action creator: changeLanguages", () => {
    const languages = "HTML+CSS+TS";
    const action = changeLanguages(languages);
    expect(action).toEqual({ type: KEYS.CHANGE_LANGUAGES, payload: languages });
  });

  it("test action creator: changeIsRunning", () => {
    const isRunningState = true;
    const action = changeIsRunning(isRunningState);
    expect(action).toEqual({ type: KEYS.CHANGE_RUN, payload: isRunningState });
  });

  it("test action creator: changeRunWhileTyping", () => {
    const runWhileTypingState = true;
    const action = changeRunWhileTyping(runWhileTypingState);
    expect(action).toEqual({
      type: KEYS.CHANGE_RUN_WHILE_TYPING,
      payload: runWhileTypingState,
    });
  });
});
