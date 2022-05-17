import KEYS from "./keys";

export function change(code, type) {
  return {
    type,
    payload: code,
  };
}

export function changeRunWhileTyping(value) {
  return {
    type: KEYS.CHANGE_RUN_WHILE_TYPING,
    payload: value,
  };
}

export function changeIsRunning(value) {
  return {
    type: KEYS.CHANGE_RUN,
    payload: value,
  };
}
