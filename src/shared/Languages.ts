type Languages = {
  HTML: readonly string[];
  CSS: readonly string[];
  JS: readonly string[];
  TS: readonly string[];
};

const LANGUAGES: Languages = {
  HTML: ["HTML", "xml"],
  CSS: ["CSS", "css"],
  JS: ["JS", "javascript"],
  TS: ["TS", "text/typescript"],
} as const;

export default LANGUAGES;
