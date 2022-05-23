import KEYS from "./keys";

export function change(
  code: string,
  type: number
): { type: number; payload: string } {
  return {
    type,
    payload: code,
  };
}

export function changeRunWhileTyping(value: boolean): {
  type: number;
  payload: boolean;
} {
  return {
    type: KEYS.CHANGE_RUN_WHILE_TYPING,
    payload: value,
  };
}

export function changeIsRunning(value: boolean): {
  type: number;
  payload: boolean;
} {
  return {
    type: KEYS.CHANGE_RUN,
    payload: value,
  };
}

export function changeLanguages(value: string): {
  type: number;
  payload: string;
} {
  return {
    type: KEYS.CHANGE_LANGUAGES,
    payload: value,
  };
}
