/**
 * Problem: Word Search II (Multi-Word Grid Search)
 * Topic: Trie + 2D Grid DFS / Backtracking
 * Language: JavaScript
 *
 * Approach:
 * Insert all target words into a Trie. Perform DFS traversal from every grid cell,
 * navigating the Trie. When a Trie node contains a word, append to result and clear word to avoid duplicates.
 *
 * Time Complexity: O(M * N * 4^L)
 * Space Complexity: O(W * L) Trie size
 */

class TrieNode {
    constructor() {
        this.children = {};
        this.word = null;
    }
}

function findWords(board, words) {
    const root = new TrieNode();
    for (let word of words) {
        let node = root;
        for (let char of word) {
            if (!node.children[char]) node.children[char] = new TrieNode();
            node = node.children[char];
        }
        node.word = word;
    }

    const result = [];
    const rows = board.length;
    const cols = board[0].length;

    function dfs(r, c, node) {
        if (r < 0 || r >= rows || c < 0 || c >= cols) return;
        const char = board[r][c];
        if (char === '#' || !node.children[char]) return;

        const nextNode = node.children[char];
        if (nextNode.word !== null) {
            result.push(nextNode.word);
            nextNode.word = null; // avoid duplicate entries
        }

        board[r][c] = '#';
        dfs(r + 1, c, nextNode);
        dfs(r - 1, c, nextNode);
        dfs(r, c + 1, nextNode);
        dfs(r, c - 1, nextNode);
        board[r][c] = char;
    }

    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
            dfs(r, c, root);
        }
    }

    return result;
}

// Test cases
const board = [
  ['o','a','a','n'],
  ['e','t','a','e'],
  ['i','h','k','r'],
  ['i','f','l','v']
];
console.log("Found Words ->", findWords(board, ["oath","pea","eat","rain"])); // ["oath", "eat"]
