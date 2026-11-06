/**
 * LeetCode 1029: Two City Scheduling (Medium)
 * https://leetcode.com/problems/two-city-scheduling/
 *
 * A company is planning to interview 2n people. Given the array costs where
 * costs[i] = [aCost_i, bCost_i], the cost of flying the ith person to city A
 * is aCost_i, and the cost of flying the ith person to city B is bCost_i.
 *
 * Return the minimum cost to fly every person to a city such that exactly n
 * people arrive in each city.
 *
 * Example 1:
 * Input: costs = [[10,20],[30,200],[400,50],[30,20]]
 * Output: 110
 * Explanation:
 * The first person goes to city A for a cost of 10.
 * The second person goes to city A for a cost of 30.
 * The third person goes to city B for a cost of 50.
 * The fourth person goes to city B for a cost of 20.
 * The total minimum cost is 10 + 30 + 50 + 20 = 110 to have 2 people in each city.
 *
 * Example 2:
 * Input: costs = [[259,770],[448,54],[926,667],[184,139],[840,118],[577,469]]
 * Output: 1859
 *
 * Example 3:
 * Input: costs = [[515,563],[451,713],[537,709],[343,819],[855,779],[457,60],[650,359],[631,42]]
 * Output: 3086
 *
 * Constraints:
 * - 2 * n == costs.length
 * - 2 <= costs.length <= 100
 * - costs.length is even.
 * - 1 <= aCost_i, bCost_i <= 1000
 *
 * @param {number[][]} costs
 * @return {number}
 */
function twoCitySchedCost(costs) {
    // Greedy difference sorting:
    // Suppose everyone initially flies to city A: baseCost = sum(cost[0]).
    // The change in cost if person i flies to city B instead of A is (cost[1] - cost[0]).
    // To minimize total cost, sort by (cost[1] - cost[0]) in ascending order:
    // the first n people have the most favorable (cheapest) relative cost to fly to B.

    let totalCost = 0;
    const n = costs.length / 2;

    // Sort by bCost - aCost ascending
    costs.sort((a, b) => (a[1] - a[0]) - (b[1] - b[0]));

    // First n people fly to city B, remaining n people fly to city A
    for (let i = 0; i < n; i++) {
        totalCost += costs[i][1];
    }
    for (let i = n; i < 2 * n; i++) {
        totalCost += costs[i][0];
    }

    return totalCost;
}

// Unit tests
function runTests() {
    // Test 1: Example 1
    const costs1 = [[10, 20], [30, 200], [400, 50], [30, 20]];
    console.assert(twoCitySchedCost(costs1) === 110, "Test 1 Failed");

    // Test 2: Example 2
    const costs2 = [[259, 770], [448, 54], [926, 667], [184, 139], [840, 118], [577, 469]];
    console.assert(twoCitySchedCost(costs2) === 1859, "Test 2 Failed");

    // Test 3: Example 3
    const costs3 = [[515, 563], [451, 713], [537, 709], [343, 819], [855, 779], [457, 60], [650, 359], [631, 42]];
    console.assert(twoCitySchedCost(costs3) === 3086, "Test 3 Failed");

    // Test 4: Exactly 2 people
    const costs4 = [[10, 100], [100, 10]];
    console.assert(twoCitySchedCost(costs4) === 20, "Test 4 Failed");

    console.log("All Two City Scheduling tests passed successfully!");
}

runTests();

