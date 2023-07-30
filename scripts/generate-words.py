from functools import reduce
from json import dumps

words = open("words.txt").read().split("\n")

def add_to_dc(dc: dict[int, list[str]], word: str) -> dict[int, list[str]]:
    l = len(word)
    if l in dc:
        dc[l].append(word)
    else:
        dc[l] = [word]
    return dc

words_by_letters = reduce(add_to_dc, words, {})

open("words-by-letters.json", "w+").write(dumps(words_by_letters, indent=4))

# for l, ws in words_by_letters.items():
#     fname = f"words/words-{l}-letters.json"
#     open(fname, "w+").write(dumps(ws, indent=4))