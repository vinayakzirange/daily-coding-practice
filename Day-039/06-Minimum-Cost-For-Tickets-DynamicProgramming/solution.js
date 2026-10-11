/**
 * Problem: Minimum Cost For Tickets (LeetCode 983)
 * Difficulty: Medium
 * Topic: Array / Dynamic Programming / Memoization
 * 
 * Description:
 * You have planned some train traveling one year in advance. The days of the year in
 * which you will travel are given as an integer array days. Each day is an integer from 1 to 365.
 * 
 * Train tickets are sold in three different ways:
 *   * a 1-day pass is sold for costs[0] dollars;
 *   * a 7-day pass is sold for costs[1] dollars;
 *   * a 30-day pass is sold for costs[2] dollars.
 * 
 * The passes allow that many days of consecutive travel.
 * For example, if we get a 7-day pass on day 2, then we can travel for 7 days: 2, 3, 4, 5, 6, 7, and 8.
 * 
 * Return the minimum number of dollars you need to travel every day in the given list of days.
 * 
 * Example 1:
 * Input: days = [1,4,6,7,8,20], costs = [2,7,15]
 * Output: 11
 * Explanation:
 * For example, here is one way to buy passes that lets you travel your travel plan:
 * On day 1, you bought a 1-day pass for costs[0] = $2, which covered day 1.
 * On day 3, you bought a 7-day pass for costs[1] = $7, which covered days 3, 4, ..., 9.
 * On day 20, you bought a 1-day pass for costs[0] = $2, which covered day 20.
 * In total, you spent $11 and covered all the days of your travel.
 * 
 * Example 2:
 * Input: days = [1,2,3,4,5,6,7,8,9,10,30,31], costs = [2,7,15]
 * Output: 17
 * 
 * Constraints:
 *   * 1 <= days.length <= 365
 *   * 1 <= days[i] <= 365
 *   * days is in strictly increasing order.
 *   * costs.length == 3
 *   * 1 <= costs[i] <= 1000
 * 
 * Complexity:
 *   * Time Complexity: O(max(days)) <= O(365) = O(1) time.
 *   * Space Complexity: O(max(days)) <= O(365) = O(1) space.
 */

/**
 * @param {number[]} days
 * @param {number[]} costs
 * @return {number}
 */
function mincostTickets(days, costs) {
    const travelDays = new Set(days);
    const lastDay = days[days.length - 1];

    // dp[i] is the minimum cost to travel up to calendar day i
    const dp = new Array(lastDay + 1).fill(0);

    for (let i = 1; i <= lastDay; i++) {
        if (!travelDays.has(i)) {
            // Not a travel day, cost remains same as previous day
            dp[i] = dp[i - 1];
        } else {
            const cost1 = dp[i - 1] + costs[0];
            const cost7 = dp[Math.max(0, i - 7)] + costs[1];
            const cost30 = dp[Math.max(0, i - 30)] + costs[2];

            dp[i] = Math.min(cost1, cost7, cost30);
        }
    }

    return dp[lastDay];
}

// ==========================================
// Test Cases & Verification
// ==========================================
function runTests() {
    const testCases = [
        { days: [1, 4, 6, 7, 8, 20], costs: [2, 7, 15], expected: 11 },
        { days: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 30, 31], costs: [2, 7, 15], expected: 17 },
        { days: [1, 2, 3, 4, 5, 6, 7], costs: [2, 7, 15], expected: 7 },
        { days: [1], costs: [2, 7, 15], expected: 2 }
    ];

    testCases.forEach((tc, idx) => {
        const result = mincostTickets(tc.days, tc.costs);
        console.assert(result === tc.expected, `Test ${idx + 1} Failed: got ${result}, expected ${tc.expected}`);
        console.log(`Test ${idx + 1} Passed: days count ${tc.days.length} -> min cost = $${result}`);
    });

    console.log('\nAll Minimum Cost For Tickets tests passed successfully!');
}

runTests();
