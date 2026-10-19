/**
 * ====================================================================
 * Problem: Sort Characters By Frequency (LeetCode 451)
 * Difficulty: Medium
 * Topic: Hash Table, String, Sorting, Heap (Priority Queue), Bucket Sort
 * ====================================================================
 * 
 * Given a string s, sort it in decreasing order based on the frequency
 * of the characters. The frequency of a character is the number of times
 * it appears in the string.
 * 
 * Return the sorted string. If there are multiple answers, return any of them.
 * 
 * Example 1:
 * Input: s = "tree"
 * Output: "eert"
 * Explanation: 'e' appears twice while 'r' and 't' both appear once.
 * So 'e' must appear before both 'r' and 't'. Therefore "eetr" is also a valid answer.
 * 
 * Example 2:
 * Input: s = "cccaaa"
 * Output: "aaaccc"
 * Explanation: Both 'c' and 'a' appear three times, so both "cccaaa" and "aaaccc" are valid answers.
 * Note that "cacaca" is incorrect, as the same characters must be together.
 * 
 * Example 3:
 * Input: s = "Aabb"
 * Output: "bbAa"
 * Explanation: "bbaA" is also a valid answer, but "Aabb" is incorrect.
 * Note that 'A' and 'a' are treated as two different characters.
 * 
 * Constraints:
 * - 1 <= s.length <= 5 * 10^5
 * - s consists of uppercase and lowercase English letters and digits.
 * ====================================================================
 */

/**
 * Sorts characters by frequency in descending order.
 * Uses Bucket Sort for optimal O(n) linear time complexity.
 * 
 * Time Complexity: O(n) where n = s.length
 * Space Complexity: O(n) for frequency count map and buckets
 * 
 * @param {string} s
 * @return {string}
 */
function frequencySort(s) {
    const counts = new Map();
    for (let char of s) {
        counts.set(char, (counts.get(char) || 0) + 1);
    }

    const n = s.length;
    // Buckets from 0 to n
    const buckets = Array.from({ length: n + 1 }, () => []);

    for (let [char, freq] of counts.entries()) {
        buckets[freq].push(char);
    }

    const result = [];
    for (let freq = n; freq >= 1; freq--) {
        if (buckets[freq].length > 0) {
            for (let char of buckets[freq]) {
                result.push(char.repeat(freq));
            }
        }
    }

    return result.join('');
}

// --- Test Suite ---
function isValidFrequencySort(s, res) {
    if (s.length !== res.length) return false;
    const counts = new Map();
    for (let c of s) counts.set(c, (counts.get(c) || 0) + 1);

    let prevFreq = Infinity;
    let i = 0;
    while (i < res.length) {
        const c = res[i];
        const freq = counts.get(c);
        if (!freq || freq > prevFreq) return false;

        // Verify all occurrences of c are contiguous
        for (let j = 0; j < freq; j++) {
            if (res[i + j] !== c) return false;
        }
        prevFreq = freq;
        i += freq;
    }
    return true;
}

if (require.main === module) {
    // Test 1: "tree"
    const t1 = "tree";
    const r1 = frequencySort(t1);
    console.assert(isValidFrequencySort(t1, r1), `Test 1 failed: ${r1}`);
    console.log(`Test 1 Passed: "${t1}" -> "${r1}"`);

    // Test 2: "cccaaa"
    const t2 = "cccaaa";
    const r2 = frequencySort(t2);
    console.assert(isValidFrequencySort(t2, r2), `Test 2 failed: ${r2}`);
    console.log(`Test 2 Passed: "${t2}" -> "${r2}"`);

    // Test 3: "Aabb"
    const t3 = "Aabb";
    const r3 = frequencySort(t3);
    console.assert(isValidFrequencySort(t3, r3), `Test 3 failed: ${r3}`);
    console.log(`Test 3 Passed: "${t3}" -> "${r3}"`);

    // Test 4: Single char "a"
    const t4 = "a";
    const r4 = frequencySort(t4);
    console.assert(r4 === "a", "Test 4 failed");
    console.log(`Test 4 Passed: "${t4}" -> "${r4}"`);

    // Test 5: All distinct "abcdef"
    const t5 = "abcdef";
    const r5 = frequencySort(t5);
    console.assert(isValidFrequencySort(t5, r5), `Test 5 failed: ${r5}`);
    console.log(`Test 5 Passed: "${t5}" -> "${r5}"`);

    console.log("\nAll Sort Characters By Frequency tests passed successfully!");
}

module.exports = { frequencySort };
