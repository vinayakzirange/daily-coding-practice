/**
 * LeetCode 890: Find and Replace Pattern (Medium)
 * https://leetcode.com/problems/find-and-replace-pattern/
 *
 * Given a list of strings words and a string pattern, return a list of words[i] that match pattern.
 * You may return the answer in any order.
 *
 * A word matches the pattern if there exists a permutation of letters p such that after
 * replacing every letter x in the pattern with p(x), we get the desired word.
 * (i.e., a bijection between characters of pattern and word).
 *
 * Example 1:
 * Input: words = ["abc","deq","mee","aqq","dkd","ccc"], pattern = "abb"
 * Output: ["mee","aqq"]
 * Explanation: "mee" matches the pattern because there is a bijection {a -> m, b -> e}.
 * "ccc" does not match the pattern because {a -> c, b -> c} is not a bijection.
 *
 * Example 2:
 * Input: words = ["a","b","c"], pattern = "a"
 * Output: ["a","b","c"]
 *
 * Constraints:
 * - 1 <= pattern.length <= 20
 * - 1 <= words.length <= 50
 * - words[i].length == pattern.length
 * - pattern and words[i] are lowercase English letters.
 *
 * @param {string[]} words
 * @param {string} pattern
 * @return {string[]}
 */
function findAndReplacePattern(words, pattern) {
    function matches(word, pat) {
        if (word.length !== pat.length) return false;

        const wToP = new Map();
        const pToW = new Map();

        for (let i = 0; i < word.length; i++) {
            const wChar = word[i];
            const pChar = pat[i];

            if ((wToP.has(wChar) && wToP.get(wChar) !== pChar) ||
                (pToW.has(pChar) && pToW.get(pChar) !== wChar)) {
                return false;
            }

            wToP.set(wChar, pChar);
            pToW.set(pChar, wChar);
        }

        return true;
    }

    return words.filter(word => matches(word, pattern));
}

// Unit tests
function runTests() {
    // Test 1: Example 1
    const words1 = ["abc", "deq", "mee", "aqq", "dkd", "ccc"];
    const pattern1 = "abb";
    const res1 = findAndReplacePattern(words1, pattern1);
    const expected1 = ["mee", "aqq"];
    console.assert(JSON.stringify(res1) === JSON.stringify(expected1), `Test 1 Failed: ${JSON.stringify(res1)}`);

    // Test 2: Example 2
    const words2 = ["a", "b", "c"];
    const pattern2 = "a";
    const res2 = findAndReplacePattern(words2, pattern2);
    const expected2 = ["a", "b", "c"];
    console.assert(JSON.stringify(res2) === JSON.stringify(expected2), `Test 2 Failed: ${JSON.stringify(res2)}`);

    // Test 3: No matches
    const words3 = ["abc", "def"];
    const pattern3 = "aaa";
    const res3 = findAndReplacePattern(words3, pattern3);
    console.assert(res3.length === 0, `Test 3 Failed: ${JSON.stringify(res3)}`);

    // Test 4: All unique pattern
    const words4 = ["xyz", "xyx", "zzz"];
    const pattern4 = "abc";
    const res4 = findAndReplacePattern(words4, pattern4);
    console.assert(JSON.stringify(res4) === JSON.stringify(["xyz"]), `Test 4 Failed: ${JSON.stringify(res4)}`);

    console.log("All Find and Replace Pattern tests passed successfully!");
}

runTests();

