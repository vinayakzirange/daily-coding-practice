/**
 * ====================================================================
 * Problem: Water and Jug Problem (LeetCode 365)
 * Difficulty: Medium
 * Topic: Math, Depth-First Search, Breadth-First Search
 * ====================================================================
 * 
 * You are given two jugs with capacities x liters and y liters. You have
 * an infinite water supply. Determine whether it is possible to measure
 * exactly target liters using these two jugs.
 * 
 * If target liters of water is measurable, you must have target liters of
 * water contained within one or both jugs by the end.
 * 
 * Operations allowed:
 * - Fill any of the jugs with water.
 * - Empty any of the jugs.
 * - Pour water from one jug into another until the other jug is completely
 *   full, or the first jug itself is empty.
 * 
 * Example 1:
 * Input: x = 3, y = 5, target = 4
 * Output: true
 * Explanation:
 * 1. Fill the 5-liter jug (0, 5).
 * 2. Pour into 3-liter jug until full (3, 2).
 * 3. Empty the 3-liter jug (0, 2).
 * 4. Pour remaining 2 liters into 3-liter jug (2, 0).
 * 5. Fill the 5-liter jug (2, 5).
 * 6. Pour into 3-liter jug until full (3, 4).
 * Now we have exactly 4 liters!
 * 
 * Example 2:
 * Input: x = 2, y = 6, target = 5
 * Output: false
 * 
 * Example 3:
 * Input: x = 1, y = 2, target = 3
 * Output: true
 * 
 * Constraints:
 * - 1 <= x, y, target <= 10^6
 * ====================================================================
 */

/**
 * Solves the Water and Jug Problem using Bézout's Identity:
 * By Bézout's identity, ax + by = target has integer solutions a, b if and only if
 * target is a multiple of gcd(x, y).
 * Also, target cannot exceed the combined capacity x + y.
 * 
 * Time Complexity: O(log(min(x, y))) for Euclidean GCD
 * Space Complexity: O(1) auxiliary space
 * 
 * @param {number} x
 * @param {number} y
 * @param {number} target
 * @return {boolean}
 */
function canMeasureWater(x, y, target) {
    if (target > x + y) {
        return false;
    }
    if (target === 0) {
        return true;
    }

    function gcd(a, b) {
        while (b !== 0) {
            const temp = b;
            b = a % b;
            a = temp;
        }
        return a;
    }

    return target % gcd(x, y) === 0;
}

// --- Test Suite ---
if (require.main === module) {
    // Test 1: x = 3, y = 5, target = 4 -> true
    console.assert(canMeasureWater(3, 5, 4) === true, "Test 1 failed");
    console.log("Test 1 Passed: 3, 5, target=4 -> true");

    // Test 2: x = 2, y = 6, target = 5 -> false
    console.assert(canMeasureWater(2, 6, 5) === false, "Test 2 failed");
    console.log("Test 2 Passed: 2, 6, target=5 -> false");

    // Test 3: x = 1, y = 2, target = 3 -> true
    console.assert(canMeasureWater(1, 2, 3) === true, "Test 3 failed");
    console.log("Test 3 Passed: 1, 2, target=3 -> true");

    // Test 4: target exceeds sum: x = 2, y = 4, target = 7 -> false
    console.assert(canMeasureWater(2, 4, 7) === false, "Test 4 failed");
    console.log("Test 4 Passed: target > x + y -> false");

    // Test 5: Coprime large numbers: x = 104729, y = 104723, target = 2 -> true
    console.assert(canMeasureWater(104729, 104723, 2) === true, "Test 5 failed");
    console.log("Test 5 Passed: large primes -> true");

    console.log("\nAll Water and Jug Problem tests passed successfully!");
}

module.exports = { canMeasureWater };
