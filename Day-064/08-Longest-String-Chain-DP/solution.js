/**
 * LeetCode 1048: Longest String Chain (Medium)
 * https://leetcode.com/problems/longest-string-chain/
 *
 * You are given an array of words where each word consists of lowercase English letters.
 *
 * wordA is a predecessor of wordB if and only if we can insert exactly one letter anywhere
 * in wordA without changing the order of the other characters to make it equal to wordB.
 * - For example, "abc" is a predecessor of "abac", while "cba" is not a predecessor of "bcad".
 *
 * A word chain is a sequence of words [word_1, word_2, ..., word_k] with k >= 1, where word_1
 * is a predecessor of word_2, word_2 is a predecessor of word_3, and so on.
 *
 * Return the length of the longest possible word chain with words chosen from the given list of words.
 *
 * Example 1:
 * Input: words = ["a","b","ba","bca","bda","bdca"]
 * Output: 4
 * Explanation: One of the longest word chains is ["a","ba","bda","bdca"].
 *
 * Example 2:
 * Input: words = ["xbc","pcxbcf","xb","cxbc","pcxbc"]
 * Output: 5
 * Explanation: All the words can be put in a word chain ["xb", "xbc", "cxbc", "pcxbc", "pcxbcf"].
 *
 * Example 3:
 * Input: words = ["abcd","dbqca"]
 * Output: 1
 *
 * Constraints:
 * - 1 <= words.length <= 1000
 * - 1 <= words[i].length <= 16
 * - words[i] only consists of lowercase English letters.
 *
 * @param {string[]} words
 * @return {number}
 */
function longestStrChain(words) {
    // Sort words by length in ascending order
    words.sort((a, b) => a.length - b.length);

    const dp = new Map();
    let maxChain = 1;

    for (const word of words) {
        let best = 1;

        // Try removing each character one by one to find all possible predecessors
        for (let i = 0; i < word.length; i++) {
            const pred = word.slice(0, i) + word.slice(i + 1);
            if (dp.has(pred)) {
                best = Math.max(best, dp.get(pred) + 1);
            }
        }

        dp.set(word, best);
        maxChain = Math.max(maxChain, best);
    }

    return maxChain;
}

// Unit tests
function runTests() {
    // Test 1: Example 1
    const words1 = ["a", "b", "ba", "bca", "bda", "bdca"];
    console.assert(longestStrChain(words1) === 4, "Test 1 Failed");

    // Test 2: Example 2
    const words2 = ["xbc", "pcxbcf", "xb", "cxbc", "pcxbc"];
    console.assert(longestStrChain(words2) === 5, "Test 2 Failed");

    // Test 3: Example 3
    const words3 = ["abcd", "dbqca"];
    console.assert(longestStrChain(words3) === 1, "Test 3 Failed");

    // Test 4: Single word
    console.assert(longestStrChain(["hello"]) === 1, "Test 4 Failed");

    // Test 5: Branching chains
    const words5 = ["a", "ab", "ac", "abc"];
    console.assert(longestStrChain(words5) === 3, "Test 5 Failed");

    console.log("All Longest String Chain tests passed successfully!");
}

runTests();

