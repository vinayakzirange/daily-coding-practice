"""
Problem: Design Add and Search Words Data Structure
Topic: Trie / Backtracking Search / Wildcard Matching
Language: Python

Approach:
Build a Trie supporting wildcard character '.' which matches any letter.
For search(word), run recursive DFS. On '.', test all children.

Time Complexity: O(L) for addWord, O(26^L) worst case for wildcard search
Space Complexity: O(N * L) Trie nodes
"""

class TrieNode:
    def __init__(self):
        self.children = {}
        self.is_end = False

class WordDictionary:
    def __init__(self):
        self.root = TrieNode()

    def addWord(self, word: str) -> None:
        node = self.root
        for c in word:
            if c not in node.children:
                node.children[c] = TrieNode()
            node = node.children[c]
        node.is_end = True

    def search(self, word: str) -> bool:
        def search_in_node(index: int, node: TrieNode) -> bool:
            if index == len(word):
                return node.is_end

            c = word[index]
            if c == '.':
                for child in node.children.values():
                    if search_in_node(index + 1, child):
                        return True
                return False
            else:
                if c not in node.children:
                    return False
                return search_in_node(index + 1, node.children[c])

        return search_in_node(0, self.root)

if __name__ == "__main__":
    wd = WordDictionary()
    wd.addWord("bad")
    wd.addWord("dad")
    wd.addWord("mad")
    print("search('pad') ->", wd.search("pad"))  # False
    print("search('bad') ->", wd.search("bad"))  # True
    print("search('.ad') ->", wd.search(".ad"))  # True
    print("search('b..') ->", wd.search("b.."))  # True
