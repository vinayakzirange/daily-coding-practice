/**
 * ====================================================================
 * Problem: Heaters (LeetCode 475)
 * Difficulty: Medium
 * Topic: Array, Two Pointers, Binary Search, Sorting
 * ====================================================================
 * 
 * Winter is coming! During the contest, your first job is to design a
 * standard horizontal heater with a fixed radius to warm all the houses.
 * 
 * Every house can be warmed, as long as the house is within the heater's
 * radius range.
 * 
 * Given the positions of houses and heaters on a horizontal line, return
 * the minimum radius of heaters so that all houses could be covered by
 * at least one heater.
 * 
 * Note that all the heaters follow your radius standard, and the radius
 * is the same for all heaters.
 * 
 * Example 1:
 * Input: houses = [1,2,3], heaters = [2]
 * Output: 1
 * Explanation: The only heater was placed in position 2, and if we use
 * the radius 1 standard, then all the houses can be warmed.
 * 
 * Example 2:
 * Input: houses = [1,2,3,4], heaters = [1,4]
 * Output: 1
 * Explanation: The two heaters were placed at positions 1 and 4. We need
 * to use radius 1 standard, then all the houses can be warmed.
 * 
 * Example 3:
 * Input: houses = [1,5], heaters = [2]
 * Output: 3
 * 
 * Constraints:
 * - 1 <= houses.length, heaters.length <= 3 * 10^4
 * - 1 <= houses[i], heaters[i] <= 10^9
 * ====================================================================
 */

/**
 * Finds the minimum radius to cover all houses.
 * Sort heaters and for each house binary search the closest heater on left & right.
 * The radius needed for this house is min(dist_left, dist_right).
 * The overall radius is the maximum radius needed across all houses.
 * 
 * Time Complexity: O(m log m + n log m) where n = houses.length, m = heaters.length
 * Space Complexity: O(1) auxiliary space (ignoring sorting space)
 * 
 * @param {number[]} houses
 * @param {number[]} heaters
 * @return {number}
 */
function findRadius(houses, heaters) {
    heaters.sort((a, b) => a - b);
    let maxRadius = 0;

    for (let house of houses) {
        // Binary search for house in heaters
        let low = 0;
        let high = heaters.length - 1;

        while (low <= high) {
            const mid = Math.floor(low + (high - low) / 2);
            if (heaters[mid] === house) {
                low = mid;
                break;
            } else if (heaters[mid] < house) {
                low = mid + 1;
            } else {
                high = mid - 1;
            }
        }

        // low is insertion index; closest heaters are at low - 1 and low
        let dist = Infinity;
        if (low < heaters.length) {
            dist = Math.min(dist, Math.abs(heaters[low] - house));
        }
        if (low > 0) {
            dist = Math.min(dist, Math.abs(heaters[low - 1] - house));
        }

        maxRadius = Math.max(maxRadius, dist);
    }

    return maxRadius;
}

// --- Test Suite ---
if (require.main === module) {
    // Test 1: houses = [1,2,3], heaters = [2] -> 1
    const r1 = findRadius([1, 2, 3], [2]);
    console.assert(r1 === 1, `Test 1 failed: ${r1}`);
    console.log(`Test 1 Passed: [1,2,3], [2] -> ${r1}`);

    // Test 2: houses = [1,2,3,4], heaters = [1,4] -> 1
    const r2 = findRadius([1, 2, 3, 4], [1, 4]);
    console.assert(r2 === 1, `Test 2 failed: ${r2}`);
    console.log(`Test 2 Passed: [1,2,3,4], [1,4] -> ${r2}`);

    // Test 3: houses = [1,5], heaters = [2] -> 3
    const r3 = findRadius([1, 5], [2]);
    console.assert(r3 === 3, `Test 3 failed: ${r3}`);
    console.log(`Test 3 Passed: [1,5], [2] -> ${r3}`);

    // Test 4: All houses share location with heater -> 0
    const r4 = findRadius([2, 4], [2, 4]);
    console.assert(r4 === 0, `Test 4 failed: ${r4}`);
    console.log(`Test 4 Passed: [2,4], [2,4] -> ${r4}`);

    // Test 5: Single house far away
    const r5 = findRadius([100], [1, 10]);
    console.assert(r5 === 90, `Test 5 failed: ${r5}`);
    console.log(`Test 5 Passed: [100], [1,10] -> ${r5}`);

    console.log("\nAll Heaters tests passed successfully!");
}

module.exports = { findRadius };
