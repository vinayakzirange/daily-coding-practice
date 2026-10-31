/**
 * ====================================================================
 * Problem: Replace Words (LeetCode 648)
 * Difficulty: Medium
 * Topic: Array, Hash Table, String, Trie
 * ====================================================================
 * 
 * In English, we have a concept called root, which can be followed by
 * some other word to form another longer word - let's call this word
 * derivative. For example, when the root "help" is followed by the
 * word "ful", we can form a derivative "helpful".
 * 
 * Given a dictionary consisting of many roots and a sentence consisting
 * of words separated by spaces, replace all the derivatives in the
 * sentence with the root forming it. If a derivative can be replaced by
 * more than one root, replace it with the root that has the shortest length.
 * 
 * Return the sentence after the replacement.
 * 
 * Example 1:
 * Input: dictionary = ["cat","bat","rat"], sentence = "the cattle was rattled by the battery"
 * Output: "the cat was rat by the bat"
 * 
 * Example 2:
 * Input: dictionary = ["a","b","c"], sentence = "aadsfasf absbs bbab cadsfafs"
 * Output: "a a b c"
 * 
 * Constraints:
 * - 1 <= dictionary.length <= 1000
 * - 1 <= dictionary[i].length <= 100
 * - dictionary[i] consists of only lower-case letters.
 * - 1 <= sentence.length <= 10^6
 * - sentence consists of only lower-case letters and spaces.
 * - The number of words in sentence is in the range [1, 1000]
 * - The length of each word in sentence is in the range [1, 1000]
 * ====================================================================
 */

class TrieNode {
    constructor() {
        this.children = {};
        this.rootWord = null;
    }
}

/**
 * Replaces words with their shortest root prefix using a Trie.
 * 
 * Complexity:
 * - Time: O(D * L + S) where D is dictionary size, L is root length, S is sentence length
 * - Space: O(D * L) for Trie storage
 * 
 * @param {string[]} dictionary
 * @param {string} sentence
 * @return {string}
 */
function replaceWords(dictionary, sentence) {
    const root = new TrieNode();

    // Insert all dictionary roots into Trie
    for (const d of dictionary) {
        let curr = root;
        for (const char of d) {
            if (!curr.children[char]) {
                curr.children[char] = new TrieNode();
            }
            curr = curr.children[char];
        }
        curr.rootWord = d;
    }

    // Helper to find shortest root for a word
    function findRoot(word) {
        let curr = root;
        for (const char of word) {
            if (curr.rootWord !== null) {
                return curr.rootWord; // Found shortest root
            }
            if (!curr.children[char]) {
                return word; // No matching prefix in Trie
            }
            curr = curr.children[char];
        }
        return curr.rootWord !== null ? curr.rootWord : word;
    }

    const words = sentence.split(" ");
    return words.map(findRoot).join(" ");
}

// --- Test Suite ---
if (require.main === module) {
    // Test 1: ["cat","bat","rat"], "the cattle was rattled by the battery"
    const d1 = ["cat", "bat", "rat"];
    const s1 = "the cattle was rattled by the battery";
    const res1 = replaceWords(d1, s1);
    console.assert(
        res1 === "the cat was rat by the bat",
        `Test 1 Failed: got '${res1}'`
    );

    // Test 2: ["a","b","c"], "aadsfasf absbs bbab cadsfafs"
    const d2 = ["a", "b", "c"];
    const s2 = "aadsfasf absbs bbab cadsfafs";
    const res2 = replaceWords(d2, s2);
    console.assert(res2 === "a a b c", `Test 2 Failed: got '${res2}'`);

    // Test 3: Shortest root chosen when prefixes overlap ("c", "cat")
    const d3 = ["cat", "c", "cattle"];
    const s3 = "cattle cat dog";
    const res3 = replaceWords(d3, s3);
    console.assert(res3 === "c c dog", `Test 3 Failed: got '${res3}'`);

    // Test 4: No matching roots
    const d4 = ["apple", "banana"];
    const s4 = "hello world";
    const res4 = replaceWords(d4, s4);
    console.assert(res4 === "hello world", `Test 4 Failed: got '${res4}'`);

    console.log("All Replace Words tests passed successfully!");
}

module.exports = { replaceWords };
