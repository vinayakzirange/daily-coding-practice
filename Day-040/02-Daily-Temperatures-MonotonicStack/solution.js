/**
 * Problem: Daily Temperatures (LeetCode 739)
 * Difficulty: Medium
 * Topic: Stack / Monotonic Stack / Array
 *
 * Description:
 * Given an array of integers temperatures represents the daily temperatures,
 * return an array answer such that answer[i] is the number of days you have to
 * wait after the i-th day to get a warmer temperature. If there is no future
 * day for which this is possible, keep answer[i] == 0 instead.
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
 * - 1 <= temperatures.length <= 10^5
 * - 30 <= temperatures[i] <= 100
 *
 * Complexity Analysis:
 * - Time Complexity: O(n) where each index is pushed and popped at most once.
 * - Space Complexity: O(n) auxiliary space for the monotonic stack.
 */

/**
 * @param {number[]} temperatures
 * @return {number[]}
 */
function dailyTemperatures(temperatures) {
    const n = temperatures.length;
    const answer = new Array(n).fill(0);
    const stack = []; // Monotonic decreasing stack storing indices

    for (let i = 0; i < n; i++) {
        const currentTemp = temperatures[i];

        // While current temperature is strictly warmer than the temperature at the stack top
        while (stack.length > 0 && currentTemp > temperatures[stack[stack.length - 1]]) {
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
function arraysEqual(a, b) {
    if (a.length !== b.length) return false;
    for (let i = 0; i < a.length; i++) {
        if (a[i] !== b[i]) return false;
    }
    return true;
}

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
        temps: [89, 62, 70, 58, 47, 47, 46, 76, 100, 70],
        expected: [8, 1, 5, 4, 3, 2, 1, 1, 0, 0]
    },
    {
        temps: [50],
        expected: [0]
    },
    {
        temps: [80, 75, 70, 65],
        expected: [0, 0, 0, 0]
    }
];

testCases.forEach((tc, idx) => {
    const result = dailyTemperatures(tc.temps);
    if (!arraysEqual(result, tc.expected)) {
        console.error(`Test ${idx + 1} Failed: got [${result}], expected [${tc.expected}]`);
        process.exit(1);
    }
    console.log(`Test ${idx + 1} Passed: temps=[${tc.temps.slice(0, 5)}...] -> wait=[${result.slice(0, 5)}...]`);
});

console.log("\nAll Daily Temperatures tests passed successfully!");
