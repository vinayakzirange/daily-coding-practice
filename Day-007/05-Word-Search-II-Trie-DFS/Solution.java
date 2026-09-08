/*
 * Problem Name: Word Search II
 * Problem Statement: Given an m x n board of characters and a list of strings words, return all words on the board.
 * 
 * Approach: Insert all words into a Trie, then perform DFS from every grid cell matching the Trie root.
 * 
 * Time Complexity: O(M * N * 4^L) where L is max word length
 * Space Complexity: O(W * L) for Trie structure
 */

import java.util.*;

class TrieNode {
    Map<Character, TrieNode> children = new HashMap<>();
    String word = null;
}

public class Solution {
    public static List<String> findWords(char[][] board, String[] words) {
        TrieNode root = new TrieNode();
        for (String w : words) {
            TrieNode curr = root;
            for (char ch : w.toCharArray()) {
                curr.children.putIfAbsent(ch, new TrieNode());
                curr = curr.children.get(ch);
            }
            curr.word = w;
        }

        List<String> result = new ArrayList<>();
        int rows = board.length;
        int cols = board[0].length;

        for (int r = 0; r < rows; r++) {
            for (int c = 0; c < cols; c++) {
                if (root.children.containsKey(board[r][c])) {
                    dfs(board, r, c, root, result);
                }
            }
        }

        return result;
    }

    private static void dfs(char[][] board, int r, int c, TrieNode parent, List<String> result) {
        char ch = board[r][c];
        TrieNode curr = parent.children.get(ch);

        if (curr.word != null) {
            result.add(curr.word);
            curr.word = null; // Avoid duplicate entries
        }

        board[r][c] = '#'; // Visited

        int[][] dirs = {{1, 0}, {-1, 0}, {0, 1}, {0, -1}};
        for (int[] d : dirs) {
            int nr = r + d[0];
            int nc = c + d[1];
            if (nr >= 0 && nr < board.length && nc >= 0 && nc < board[0].length) {
                if (curr.children.containsKey(board[nr][nc])) {
                    dfs(board, nr, nc, curr, result);
                }
            }
        }

        board[r][c] = ch; // Backtrack
    }

    public static void main(String[] args) {
        char[][] board = {
            {'o','a','a','n'},
            {'e','t','a','e'},
            {'i','h','k','r'},
            {'i','f','l','v'}
        };
        String[] words = {"oath","pea","eat","rain"};
        System.out.println("Words found: " + findWords(board, words)); // Expected: ["oath", "eat"]
    }
}
