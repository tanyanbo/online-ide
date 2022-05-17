export function change(code, type) {
  return {
    type: `CHANGE_${type}`,
    payload: code,
  };
}
