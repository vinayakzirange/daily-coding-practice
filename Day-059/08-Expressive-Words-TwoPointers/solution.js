/**
 * LeetCode 809: Expressive Words (Medium)
 * https://leetcode.com/problems/expressive-words/
 *
 * Sometimes people repeat letters to represent that they are feeling energetic.
 * Given a string s and an array of query strings words, return the number of words
 * that can be made equal to s by extending groups of letters to length 3 or more.
 *
 * For example, starting with "hello", we could extend the group of 'e's to get "heeellooo".
 * We can't get "helllo" because group of 'l's wasn't extended to size >= 3.
 *
 * Constraints:
 * - 1 <= s.length <= 100
 * - 1 <= words.length <= 100
 * - 1 <= words[i].length <= 100
 * - s and words[i] consist of lowercase letters.
 *
 * @param {string} s
 * @param {string[]} words
 * @return {number}
 */
function expressiveWords(s, words) {
    // Helper to get run-length encoding: [{char: 'h', count: 1}, ...]
    function getRLE(str) {
        const rle = [];
        let i = 0;
        while (i < str.length) {
            let j = i;
            while (j < str.length && str[j] === str[i]) {
                j++;
            }
            rle.push({ char: str[i], count: j - i });
            i = j;
        }
        return rle;
    }

    const sRLE = getRLE(s);

    function isStretchy(word) {
        const wRLE = getRLE(word);
        if (sRLE.length !== wRLE.length) return false;

        for (let i = 0; i < sRLE.length; i++) {
            if (sRLE[i].char !== wRLE[i].char) return false;
            const lenS = sRLE[i].count;
            const lenW = wRLE[i].count;

            if (lenS < lenW) return false;
            if (lenS !== lenW && lenS < 3) return false;
        }
        return true;
    }

    let count = 0;
    for (const w of words) {
        if (isStretchy(w)) {
            count++;
        }
    }
    return count;
}

// Unit tests
function runTests() {
    // Test 1: Standard example
    const s1 = "heeellooo";
    const words1 = ["hello", "hi", "helo"];
    console.assert(expressiveWords(s1, words1) === 1, `Test 1 Failed: got ${expressiveWords(s1, words1)}, expected 1`);

    // Test 2: Another example
    const s2 = "zzzzzyyyyy";
    const words2 = ["zzyy", "zy", "zyy"];
    console.assert(expressiveWords(s2, words2) === 3, `Test 2 Failed: got ${expressiveWords(s2, words2)}, expected 3`);

    // Test 3: No valid word
    const s3 = "abcd";
    const words3 = ["abcde", "abc", "abcc"];
    console.assert(expressiveWords(s3, words3) === 0, `Test 3 Failed: got ${expressiveWords(s3, words3)}, expected 0`);

    // Test 4: Exact match
    const s4 = "hello";
    const words4 = ["hello"];
    console.assert(expressiveWords(s4, words4) === 1, `Test 4 Failed: got ${expressiveWords(s4, words4)}, expected 1`);

    console.log("All tests passed for Expressive Words!");
}

runTests();
