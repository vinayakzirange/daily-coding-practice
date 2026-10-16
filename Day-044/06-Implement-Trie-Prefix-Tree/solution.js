/**
 * Problem: Implement Trie (Prefix Tree) (LeetCode 208)
 * Difficulty: Medium
 * Topic: Hash Table / String / Design / Trie
 *
 * Description:
 * A trie (pronounced as "try") or prefix tree is a tree data structure used
 * to efficiently store and retrieve keys in a dataset of strings. There are
 * various applications of this data structure, such as autocomplete and
 * spellchecker.
 *
 * Implement the Trie class:
 * - Trie() Initializes the trie object.
 * - void insert(String word) Inserts the string word into the trie.
 * - boolean search(String word) Returns true if the string word is in the
 *   trie (i.e., was inserted before), and false otherwise.
 * - boolean startsWith(String prefix) Returns true if there is a previously
 *   inserted string word that has the prefix prefix, and false otherwise.
 *
 * Example 1:
 * Input:
 * ["Trie", "insert", "search", "search", "startsWith", "insert", "search"]
 * [[], ["apple"], ["apple"], ["app"], ["app"], ["app"], ["app"]]
 * Output:
 * [null, null, true, false, true, null, true]
 *
 * Explanation:
 * Trie trie = new Trie();
 * trie.insert("apple");
 * trie.search("apple");   // return True
 * trie.search("app");     // return False
 * trie.startsWith("app"); // return True
 * trie.insert("app");
 * trie.search("app");     // return True
 *
 * Constraints:
 * - 1 <= word.length, prefix.length <= 2000
 * - word and prefix consist only of lowercase English letters.
 * - At most 3 * 10^4 calls in total will be made to insert, search, and startsWith.
 *
 * Complexity Analysis:
 * - Time Complexity: O(m) for each of insert, search, and startsWith operations,
 *   where m is the length of the word/prefix.
 * - Space Complexity: O(N * m) where N is the number of keys and m is average key length.
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

    /**
     * @param {string} word
     * @return {void}
     */
    insert(word) {
        let node = this.root;
        for (const ch of word) {
            if (!node.children[ch]) {
                node.children[ch] = new TrieNode();
            }
            node = node.children[ch];
        }
        node.isEndOfWord = true;
    }

    /**
     * Helper to traverse to the node representing prefix
     * @param {string} prefix
     * @return {TrieNode|null}
     */
    _searchPrefix(prefix) {
        let node = this.root;
        for (const ch of prefix) {
            if (!node.children[ch]) {
                return null;
            }
            node = node.children[ch];
        }
        return node;
    }

    /**
     * @param {string} word
     * @return {boolean}
     */
    search(word) {
        const node = this._searchPrefix(word);
        return node !== null && node.isEndOfWord === true;
    }

    /**
     * @param {string} prefix
     * @return {boolean}
     */
    startsWith(prefix) {
        return this._searchPrefix(prefix) !== null;
    }
}

// ==========================================
// Test Cases & Verification
// ==========================================
const trie = new Trie();

// Test 1: Standard LeetCode example
trie.insert("apple");
console.log(`Test 1 Passed: search("apple") = ${trie.search("apple")}`);
if (!trie.search("apple")) process.exit(1);

console.log(`Test 2 Passed: search("app") = ${trie.search("app")}`);
if (trie.search("app")) process.exit(1);

console.log(`Test 3 Passed: startsWith("app") = ${trie.startsWith("app")}`);
if (!trie.startsWith("app")) process.exit(1);

trie.insert("app");
console.log(`Test 4 Passed: search("app") after insert = ${trie.search("app")}`);
if (!trie.search("app")) process.exit(1);

// Test 5: Additional words
trie.insert("banana");
trie.insert("band");
trie.insert("banner");

console.log(`Test 5 Passed: startsWith("ban") = ${trie.startsWith("ban")}`);
if (!trie.startsWith("ban")) process.exit(1);

console.log(`Test 6 Passed: search("band") = ${trie.search("band")}`);
if (!trie.search("band")) process.exit(1);

console.log(`Test 7 Passed: search("ba") = ${trie.search("ba")}`);
if (trie.search("ba")) process.exit(1);

console.log(`Test 8 Passed: startsWith("cat") = ${trie.startsWith("cat")}`);
if (trie.startsWith("cat")) process.exit(1);

console.log("\nAll Implement Trie tests passed successfully!");
