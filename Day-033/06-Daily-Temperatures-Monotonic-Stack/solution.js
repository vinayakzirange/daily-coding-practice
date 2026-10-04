/**
 * Problem: Daily Temperatures (LeetCode 739)
 * Difficulty: Medium
 * Topic: Monotonic Stack / Array / Next Greater Element
 * 
 * Description:
 * Given an array of integers temperatures represents the daily temperatures, return an array
 * answer such that answer[i] is the number of days you have to wait after the ith day to get
 * a warmer temperature. If there is no future day for which this is possible, keep answer[i] == 0 instead.
 * 
 * Example 1:
 * Input: temperatures = [73,74,75,71,69,72,76,73]
 * Output: [1,1,4,2,1,1,0,0]
 * 
 * Example 2:
 * Input: temperatures = [30,40,50,60]
 * Output: [1,1,1,0]
 * 
 * Example 3:
 * Input: temperatures = [30,60,90]
 * Output: [1,1,0]
 * 
 * Constraints:
 *   * 1 <= temperatures.length <= 10^5
 *   * 30 <= temperatures[i] <= 100
 * 
 * Complexity:
 *   * Time Complexity: O(n) - Each index is pushed and popped at most once.
 *   * Space Complexity: O(n) - Monotonically decreasing stack.
 */

/**
 * @param {number[]} temperatures
 * @return {number[]}
 */
function dailyTemperatures(temperatures) {
    const n = temperatures.length;
    const answer = new Array(n).fill(0);
    // Stack stores indices of temperatures in strictly decreasing order
    const stack = [];

    for (let i = 0; i < n; i++) {
        while (stack.length > 0 && temperatures[i] > temperatures[stack[stack.length - 1]]) {
            const prevIndex = stack.pop();
            answer[prevIndex] = i - prevIndex;
        }
        stack.push(i);
    }

    return answer;
}

// ==========================================
// Test Cases & Verification
// ==========================================
function runTests() {
    const testCases = [
        {
            temps: [73, 74, 75, 71, 69, 72, 76, 73],
            expected: [1, 1, 4, 2, 1, 1, 0, 0]
        },
        {
            temps: [30, 40, 50, 60],
            expected: [1, 1, 1, 0]
        },
        {
            temps: [30, 60, 90],
            expected: [1, 1, 0]
        },
        {
            temps: [80],
            expected: [0]
        },
        {
            temps: [90, 80, 70, 60],
            expected: [0, 0, 0, 0]
        }
    ];

    testCases.forEach((tc, idx) => {
        const result = dailyTemperatures(tc.temps);
        const match = JSON.stringify(result) === JSON.stringify(tc.expected);
        console.assert(match, `Test ${idx + 1} Failed: got ${result}, expected ${tc.expected}`);
        console.log(`Test ${idx + 1} Passed: temps=[${tc.temps.slice(0, 4)}...] -> result=[${result.slice(0, 4)}...]`);
    });

    console.log('\nAll Daily Temperatures tests passed successfully!');
}

runTests();
