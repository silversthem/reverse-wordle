# Creating a tree representing the number of leaves each node has

import json


trie = json.load(open("words-trie.json"))


def make_trie_count(node):
    new_node = {}
    count = 0
    for letter in node:
        if node[letter] is True:
            count += 1
            new_node[letter] = True
        else:
            new_node[letter] = make_trie_count(node[letter])
            count += new_node[letter][0]
    return (count, new_node)


open("words-trie-count.json", "w+").write(
    json.dumps(make_trie_count(trie)[1], indent=4)
)
