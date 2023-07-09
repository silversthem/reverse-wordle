from string import ascii_lowercase
import json

words = open("sgb-words.txt").read().split("\n")


# def count_words(words):
#     dc = {c: 0 for c in ascii_lowercase}
#     for word in words:
#         for letter in word:
#             dc[letter] += 1
#     return dc


# letters_1st = count_words(words)
# letters_1st_sorted = sorted(ascii_lowercase, key=lambda l: letters_1st[l], reverse=True)

# print(letters_1st_sorted)


def make_trie(words):
    def add_to_trie(word, node):
        if len(word) == 0:
            return
        letter = word[0]
        if len(word) == 1:
            node[letter] = True
            return
        if letter not in node:
            node[letter] = {}
        add_to_trie(word[1:], node[letter])

    root = {}
    for word in words:
        add_to_trie(word, root)
    return root


trie = make_trie(words)
open("words-trie.json", "w+").write(json.dumps(trie, indent=4))

# trie = json.load(open("words-trie.json"))


# def count_words_including_letter(words, l):
#     dc = {c: 0 for c in ascii_lowercase}
#     for word in words:
#         if l not in word:
#             continue
#         for letter in word:
#             dc[letter] += 1
#         dc[l] -= 1  # discarding the included letter
#     return dc


# letters_2nd = {}

# for letter in ascii_lowercase:
#     letters_2nd[letter] = count_words_including_letter(words, letter)

# open("words-best-letters-2.json", "w+").write(json.dumps(letters_2nd, indent=4))
