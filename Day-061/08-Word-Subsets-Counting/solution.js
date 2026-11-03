/**
 * LeetCode 916: Word Subsets (Medium)
 * https://leetcode.com/problems/word-subsets/
 *
 * You are given two string arrays words1 and words2.
 *
 * A string b is a subset of string a if every letter in b occurs in a including multiplicity.
 * - For example, "wrr" is a subset of "warrior", but is not a subset of "world".
 *
 * A string a from words1 is universal if for every string b in words2, b is a subset of a.
 *
 * Return an array of all the universal strings in words1. You may return the answer in any order.
 *
 * Example 1:
 * Input: words1 = ["amazon","apple","facebook","google","leetcode"], words2 = ["e","o"]
 * Output: ["facebook","google","leetcode"]
 *
 * Example 2:
 * Input: words1 = ["amazon","apple","facebook","google","leetcode"], words2 = ["l","e"]
 * Output: ["apple","google","leetcode"]
 *
 * Constraints:
 * - 1 <= words1.length, words2.length <= 10^4
 * - 1 <= words1[i].length, words2[i].length <= 10
 * - words1[i] and words2[i] consist only of lowercase English letters.
 * - All the strings of words1 are unique.
 *
 * @param {string[]} words1
 * @param {string[]} words2
 * @return {string[]}
 */
function wordSubsets(words1, words2) {
    // Helper to count character frequencies of a string
    function countFreq(word) {
        const freq = new Array(26).fill(0);
        for (let i = 0; i < word.length; i++) {
            freq[word.charCodeAt(i) - 97]++;
        }
        return freq;
    }

    // Combine words2 into a single maximum requirement frequency array
    const maxFreq = new Array(26).fill(0);
    for (const b of words2) {
        const bFreq = countFreq(b);
        for (let i = 0; i < 26; i++) {
            maxFreq[i] = Math.max(maxFreq[i], bFreq[i]);
        }
    }

    // Check which words in words1 satisfy the max requirement
    const result = [];
    for (const a of words1) {
        const aFreq = countFreq(a);
        let isUniversal = true;
        for (let i = 0; i < 26; i++) {
            if (aFreq[i] < maxFreq[i]) {
                isUniversal = false;
                break;
            }
        }
        if (isUniversal) {
            result.push(a);
        }
    }

    return result;
}

// Unit tests
function runTests() {
    // Test 1: words2 = ["e", "o"]
    const w1_1 = ["amazon", "apple", "facebook", "google", "leetcode"];
    const w2_1 = ["e", "o"];
    const res1 = wordSubsets(w1_1, w2_1).sort();
    const exp1 = ["facebook", "google", "leetcode"].sort();
    console.assert(JSON.stringify(res1) === JSON.stringify(exp1), `Test 1 Failed: ${JSON.stringify(res1)}`);

    // Test 2: words2 = ["l", "e"]
    const w1_2 = ["amazon", "apple", "facebook", "google", "leetcode"];
    const w2_2 = ["l", "e"];
    const res2 = wordSubsets(w1_2, w2_2).sort();
    const exp2 = ["apple", "google", "leetcode"].sort();
    console.assert(JSON.stringify(res2) === JSON.stringify(exp2), `Test 2 Failed: ${JSON.stringify(res2)}`);

    // Test 3: Multiple occurrences of same char
    const w1_3 = ["amazon", "apple", "facebook", "google", "leetcode"];
    const w2_3 = ["e", "oo"];
    const res3 = wordSubsets(w1_3, w2_3).sort();
    const exp3 = ["facebook", "google"].sort();
    console.assert(JSON.stringify(res3) === JSON.stringify(exp3), `Test 3 Failed: ${JSON.stringify(res3)}`);

    // Test 4: No matching universal words
    const w1_4 = ["apple", "banana"];
    const w2_4 = ["z"];
    const res4 = wordSubsets(w1_4, w2_4);
    console.assert(res4.length === 0, `Test 4 Failed: ${JSON.stringify(res4)}`);

    console.log("All Word Subsets tests passed successfully!");
}

runTests();

