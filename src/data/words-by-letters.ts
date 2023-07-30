import words from "./words-by-letters.json";

export default new Map(Object.entries(words)) as Map<string, string[]>;
