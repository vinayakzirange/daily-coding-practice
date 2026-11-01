/**
 * LeetCode 799: Champagne Tower (Medium)
 * https://leetcode.com/problems/champagne-tower/
 *
 * We stack glasses in a pyramid, where the first row has 1 glass, the second row
 * has 2 glasses, and so on up to 100 rows. Each glass holds 1 cup of champagne.
 *
 * When poured cups of champagne are poured into the top glass, any excess (amount - 1)
 * splits equally between the two glasses below it: (r+1, c) and (r+1, c+1).
 *
 * Return how full the query_glass in the query_row is (capped at 1.0).
 *
 * Constraints:
 * - 0 <= poured <= 10^9
 * - 0 <= query_glass <= query_row < 100
 *
 * @param {number} poured
 * @param {number} query_row
 * @param {number} query_glass
 * @return {number}
 */
function champagneTower(poured, query_row, query_glass) {
    // dp[c] holds the amount of champagne poured into the c-th glass of the current row
    let current = [poured];

    for (let r = 0; r < query_row; r++) {
        const next = new Array(r + 2).fill(0);
        for (let c = 0; c <= r; c++) {
            if (current[c] > 1) {
                const overflow = (current[c] - 1) / 2.0;
                next[c] += overflow;
                next[c + 1] += overflow;
            }
        }
        current = next;
    }

    return Math.min(1.0, current[query_glass]);
}

// Unit tests
function runTests() {
    // Test 1: 1 cup poured, query row 1 glass 1
    const res1 = champagneTower(1, 1, 1);
    console.assert(Math.abs(res1 - 0.0) < 1e-5, `Test 1 Failed: got ${res1}, expected 0.0`);

    // Test 2: 2 cups poured, query row 1 glass 1
    const res2 = champagneTower(2, 1, 1);
    console.assert(Math.abs(res2 - 0.5) < 1e-5, `Test 2 Failed: got ${res2}, expected 0.5`);

    // Test 3: 100000009 cups poured, query row 33 glass 17
    const res3 = champagneTower(100000009, 33, 17);
    console.assert(Math.abs(res3 - 1.0) < 1e-5, `Test 3 Failed: got ${res3}, expected 1.0`);

    // Test 4: 0 cups poured
    const res4 = champagneTower(0, 0, 0);
    console.assert(Math.abs(res4 - 0.0) < 1e-5, `Test 4 Failed: got ${res4}, expected 0.0`);

    // Test 5: 6 cups poured, row 2 glass 0
    // row 0: [6] -> overflow 5 -> next row gets 2.5, 2.5
    // row 1: [2.5, 2.5] -> overflow from glass 0 is 1.5 -> half is 0.75
    // row 2 glass 0 gets 0.75
    const res5 = champagneTower(6, 2, 0);
    console.assert(Math.abs(res5 - 0.75) < 1e-5, `Test 5 Failed: got ${res5}, expected 0.75`);

    console.log("All tests passed for Champagne Tower!");
}

runTests();
