/**
 * LeetCode 1023: Camelcase Matching (Medium)
 * https://leetcode.com/problems/camelcase-matching/
 *
 * Given an array of strings queries and a string pattern, return a boolean array answer
 * where answer[i] is true if queries[i] matches pattern, and false otherwise.
 *
 * A query word matches a given pattern if you can insert lowercase English letters
 * pattern so that it equals the query. (You cannot insert uppercase English letters).
 *
 * Example 1:
 * Input: queries = ["FooBar","FooBarTest","FootBall","FrameBuffer","ForceFeedBack"], pattern = "FB"
 * Output: [true,false,true,true,false]
 * Explanation:
 * "FooBar" can be generated like this "F" + "oo" + "B" + "ar".
 * "FootBall" can be generated like this "F" + "oot" + "B" + "all".
 * "FrameBuffer" can be generated like this "F" + "rame" + "B" + "uffer".
 *
 * Example 2:
 * Input: queries = ["FooBar","FooBarTest","FootBall","FrameBuffer","ForceFeedBack"], pattern = "FoBa"
 * Output: [true,false,true,false,false]
 * Explanation:
 * "FooBar" can be generated like this "Fo" + "o" + "Ba" + "r".
 * "FootBall" can be generated like this "Fo" + "ot" + "Ba" + "ll".
 *
 * Example 3:
 * Input: queries = ["FooBar","FooBarTest","FootBall","FrameBuffer","ForceFeedBack"], pattern = "FoBaT"
 * Output: [false,true,false,false,false]
 *
 * Constraints:
 * - 1 <= pattern.length, queries.length <= 100
 * - 1 <= queries[i].length <= 100
 * - queries[i] and pattern consist of English letters.
 *
 * @param {string[]} queries
 * @param {string} pattern
 * @return {boolean[]}
 */
function camelMatch(queries, pattern) {
    function matches(query, pat) {
        let p = 0;

        for (let i = 0; i < query.length; i++) {
            const ch = query[i];

            if (p < pat.length && ch === pat[p]) {
                p++;
            } else if (ch >= 'A' && ch <= 'Z') {
                // Any unmatched uppercase letter in query violates the pattern requirement
                return false;
            }
        }

        // All characters in pattern must have been matched in order
        return p === pat.length;
    }

    return queries.map(q => matches(q, pattern));
}

// Unit tests
function runTests() {
    const queries = ["FooBar", "FooBarTest", "FootBall", "FrameBuffer", "ForceFeedBack"];

    // Test 1: pattern = "FB"
    const res1 = camelMatch(queries, "FB");
    const exp1 = [true, false, true, true, false];
    console.assert(JSON.stringify(res1) === JSON.stringify(exp1), `Test 1 Failed: ${JSON.stringify(res1)}`);

    // Test 2: pattern = "FoBa"
    const res2 = camelMatch(queries, "FoBa");
    const exp2 = [true, false, true, false, false];
    console.assert(JSON.stringify(res2) === JSON.stringify(exp2), `Test 2 Failed: ${JSON.stringify(res2)}`);

    // Test 3: pattern = "FoBaT"
    const res3 = camelMatch(queries, "FoBaT");
    const exp3 = [false, true, false, false, false];
    console.assert(JSON.stringify(res3) === JSON.stringify(exp3), `Test 3 Failed: ${JSON.stringify(res3)}`);

    // Test 4: Exact match
    console.assert(JSON.stringify(camelMatch(["Foo"], "Foo")) === JSON.stringify([true]), "Test 4 Failed");

    // Test 5: Extra uppercase in query
    console.assert(JSON.stringify(camelMatch(["FooBarQ"], "FooBar")) === JSON.stringify([false]), "Test 5 Failed");

    console.log("All Camelcase Matching tests passed successfully!");
}

runTests();

