import words from '../data/words.json';

export function countLetters(word: string) {
  return word.split('').reduce((acc, letter) => {
    const count = acc.get(letter);
    if (!count) acc.set(letter, 1);
    else acc.set(letter, count + 1);
    return acc;
  }, new Map<string, number>());
}

export function substractCountDict(
  d1: Map<string, number>,
  d2: Map<string, number>,
) {
  const r = new Map<string, number>();
  for (const k of Array.from(d1.keys()).concat(Array.from(d2.keys()))) {
    const c1 = d1.get(k) ?? 0;
    const c2 = d2.get(k) ?? 0;
    const rr = c1 - c2;
    if (rr > 0) {
      r.set(k, rr);
    }
  }

  return r;
}

export function addCountDict(d1: Map<string, number>, d2: Map<string, number>) {
  const r = new Map<string, number>();
  for (const k of Array.from(d1.keys()).concat(Array.from(d2.keys()))) {
    const c1 = d1.get(k) ?? 0;
    const c2 = d2.get(k) ?? 0;
    const rr = c1 + c2;
    if (rr > 0) {
      r.set(k, rr);
    }
  }

  return r;
}

export function countLettersInList(
  words: string[],
  excludeFromCount?: string[],
) {
  let exclusion = new Map<string, number>();
  if (excludeFromCount) {
    exclusion = countLetters(excludeFromCount.join(''));
  }

  const lettersCounted = words.reduce((acc, word) => {
    const wordLettersCount = countLetters(word);
    const r = substractCountDict(wordLettersCount, exclusion);
    return addCountDict(acc, r);
  }, new Map<string, number>());

  Array.from(lettersCounted.keys()).forEach(letter => {
    const c = lettersCounted.get(letter);
    if (c === 0) lettersCounted.delete(letter);
  });

  return lettersCounted;
}

function computeFirstLetter() {
  return countLettersInList(words);
}

export function computePossibleWords(word: string[], anyPosition?: string) {
  const possibleWords = words.filter(w =>
    word
      .map((letter, i) => {
        if (letter === '.') return true;
        return letter === w[i];
      })
      .every(x => x),
  );

  console.log(anyPosition, possibleWords, word);

  if (anyPosition)
    return possibleWords.filter(word => word.includes(anyPosition));

  return possibleWords;
}

const lettersByFrequency = computeFirstLetter();
export const firstChoice = Array.from(lettersByFrequency.entries())
  .sort((a, b) => b[1] - a[1])
  .map(x => x[0]);
