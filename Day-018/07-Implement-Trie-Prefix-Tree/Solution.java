/**
 * Problem: Implement Trie (Prefix Tree)
 * Topic: Trie / Data Structure Design
 * Language: Java
 *
 * Approach:
 * Build a TrieNode class containing a children array of size 26 and boolean isEnd flag.
 * Implement insert, search, and startsWith methods.
 *
 * Time Complexity: O(L) per operation where L is key length
 * Space Complexity: O(N * L) total characters inserted
 */

class TrieNode {
    TrieNode[] children = new TrieNode[26];
    boolean isEnd = false;
}

class Trie {
    private TrieNode root;

    public Trie() {
        root = new TrieNode();
    }

    public void insert(String word) {
        TrieNode node = root;
        for (char c : word.toCharArray()) {
            int idx = c - 'a';
            if (node.children[idx] == null) {
                node.children[idx] = new TrieNode();
            }
            node = node.children[idx];
        }
        node.isEnd = true;
    }

    public boolean search(String word) {
        TrieNode node = root;
        for (char c : word.toCharArray()) {
            int idx = c - 'a';
            if (node.children[idx] == null) return false;
            node = node.children[idx];
        }
        return node.isEnd;
    }

    public boolean startsWith(String prefix) {
        TrieNode node = root;
        for (char c : prefix.toCharArray()) {
            int idx = c - 'a';
            if (node.children[idx] == null) return false;
            node = node.children[idx];
        }
        return true;
    }
}

public class Solution {
    public static void main(String[] args) {
        Trie trie = new Trie();
        trie.insert("apple");
        System.out.println("search('apple') -> " + trie.search("apple")); // true
        System.out.println("search('app') -> " + trie.search("app")); // false
        System.out.println("startsWith('app') -> " + trie.startsWith("app")); // true
    }
}
