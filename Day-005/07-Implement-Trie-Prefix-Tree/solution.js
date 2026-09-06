/*
 * Problem Name: Implement Trie (Prefix Tree)
 * Problem Statement: A trie (pronounced as "try") or prefix tree is a tree data structure used to efficiently store and retrieve keys in a dataset of strings.
 * Implement insert, search, and startsWith methods.
 * 
 * Approach: Tree of TrieNode objects where each node contains children map/object and isEndOfWord boolean flag.
 * 
 * Time Complexity: O(L) for insert, search, startsWith where L is length of word
 * Space Complexity: O(N * L) where N is number of words
 */

class TrieNode {
  constructor() {
    this.children = {};
    this.isEndOfWord = false;
  }
}

class Trie {
  constructor() {
    this.root = new TrieNode();
  }

  insert(word) {
    let curr = this.root;
    for (let char of word) {
      if (!curr.children[char]) {
        curr.children[char] = new TrieNode();
      }
      curr = curr.children[char];
    }
    curr.isEndOfWord = true;
  }

  search(word) {
    let node = this._searchPrefix(word);
    return node !== null && node.isEndOfWord;
  }

  startsWith(prefix) {
    return this._searchPrefix(prefix) !== null;
  }

  _searchPrefix(prefix) {
    let curr = this.root;
    for (let char of prefix) {
      if (!curr.children[char]) return null;
      curr = curr.children[char];
    }
    return curr;
  }
}

const trie = new Trie();
trie.insert("apple");
console.log("Search 'apple':", trie.search("apple"));   // true
console.log("Search 'app':", trie.search("app"));       // false
console.log("StartsWith 'app':", trie.startsWith("app")); // true
trie.insert("app");
console.log("Search 'app' after insert:", trie.search("app")); // true
