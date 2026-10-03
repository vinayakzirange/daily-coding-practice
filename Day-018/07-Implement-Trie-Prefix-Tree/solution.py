"""
Problem: Implement Trie (Prefix Tree)
Topic: Trie / Data Structure Design
Language: Python

Approach:
Build a TrieNode class containing a children dictionary and boolean is_end flag.
Implement insert, search, and starts_with methods.

Time Complexity: O(L) per operation where L is key length
Space Complexity: O(N * L) total characters inserted
"""

class TrieNode:
    def __init__(self):
        self.children = {}
        self.is_end = False

class Trie:
    def __init__(self):
        self.root = TrieNode()

    def insert(self, word: str) -> None:
        node = self.root
        for c in word:
            if c not in node.children:
                node.children[c] = TrieNode()
            node = node.children[c]
        node.is_end = True

    def search(self, word: str) -> bool:
        node = self.root
        for c in word:
            if c not in node.children:
                return False
            node = node.children[c]
        return node.is_end

    def startsWith(self, prefix: str) -> bool:
        node = self.root
        for c in prefix:
            if c not in node.children:
                return False
            node = node.children[c]
        return True

if __name__ == "__main__":
    trie = Trie()
    trie.insert("apple")
    print("search('apple') ->", trie.search("apple"))      # True
    print("search('app') ->", trie.search("app"))          # False
    print("startsWith('app') ->", trie.startsWith("app"))  # True
