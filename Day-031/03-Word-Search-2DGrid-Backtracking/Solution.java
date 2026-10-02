// Problem: Word Search (LeetCode 79)
// Language: Java
// Difficulty: Medium
// Time Complexity: O(M * N * 3^L) where L is length of word
// Space Complexity: O(L) call stack

public class Solution {
    public boolean exist(char[][] board, String word) {
        int m = board.length;
        int n = board[0].length;

        for (int i = 0; i < m; i++) {
            for (int j = 0; j < n; j++) {
                if (board[i][j] == word.charAt(0) && dfs(board, i, j, word, 0)) {
                    return true;
                }
            }
        }

        return false;
    }

    private boolean dfs(char[][] board, int r, int c, String word, int index) {
        if (index == word.length()) return true;

        if (r < 0 || r >= board.length || c < 0 || c >= board[0].length || board[r][c] != word.charAt(index)) {
            return false;
        }

        char temp = board[r][c];
        board[r][c] = '#'; // Mark visited

        boolean found = dfs(board, r + 1, c, word, index + 1)
                     || dfs(board, r - 1, c, word, index + 1)
                     || dfs(board, r, c + 1, word, index + 1)
                     || dfs(board, r, c - 1, word, index + 1);

        board[r][c] = temp; // Backtrack

        return found;
    }

    public static void main(String[] args) {
        Solution sol = new Solution();
        char[][] board = {
            {'A','B','C','E'},
            {'S','F','C','S'},
            {'A','D','E','E'}
        };
        System.out.println("Word 'ABCCED' exists: " + sol.exist(board, "ABCCED")); // true
        System.out.println("Word 'SEE' exists: " + sol.exist(board, "SEE")); // true
        System.out.println("Word 'ABCB' exists: " + sol.exist(board, "ABCB")); // false
    }
}
