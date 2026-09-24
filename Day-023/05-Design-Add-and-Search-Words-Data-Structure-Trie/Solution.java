/**
 * Problem: Design Add and Search Words Data Structure
 * Topic: Trie / Backtracking Search / Wildcard Matching
 * Language: Java
 *
 * Approach:
 * Build a Trie supporting wildcard character '.' which matches any letter.
 * For search(word), run recursive DFS. On '.', test all 26 non-null children.
 *
 * Time Complexity: O(L) for addWord, O(26^L) worst case for wildcard search
 * Space Complexity: O(N * L) Trie nodes
 */

class WordDictionary {
    private class TrieNode {
        TrieNode[] children = new TrieNode[26];
        boolean isEnd = false;
    }

    private TrieNode root;

    public WordDictionary() {
        root = new TrieNode();
    }

    public void addWord(String word) {
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
        return searchInNode(word, 0, root);
    }

    private boolean searchInNode(String word, int index, TrieNode node) {
        if (node == null) return false;
        if (index == word.length()) return node.isEnd;

        char c = word.charAt(index);
        if (c == '.') {
            for (int i = 0; i < 26; i++) {
                if (node.children[i] != null && searchInNode(word, index + 1, node.children[i])) {
                    return true;
                }
            }
            return false;
        } else {
            int idx = c - 'a';
            return searchInNode(word, index + 1, node.children[idx]);
        }
    }
}

public class Solution {
    public static void main(String[] args) {
        WordDictionary wd = new WordDictionary();
        wd.addWord("bad");
        wd.addWord("dad");
        wd.addWord("mad");
        System.out.println("search('pad') -> " + wd.search("pad")); // false
        System.out.println("search('bad') -> " + wd.search("bad")); // true
        System.out.println("search('.ad') -> " + wd.search(".ad")); // true
        System.out.println("search('b..') -> " + wd.search("b..")); // true
    }
}
