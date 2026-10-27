/**
 * ====================================================================
 * Problem: Number of Boomerangs (LeetCode 447)
 * Difficulty: Medium
 * Topic: Array, Hash Table, Math
 * ====================================================================
 * 
 * You are given n points in the plane that are all distinct, where
 * points[i] = [xi, yi]. A boomerang is a tuple of points (i, j, k)
 * such that the distance between i and j equals the distance between
 * i and k (the order of the tuple matters).
 * 
 * Return the number of boomerangs.
 * 
 * Example 1:
 * Input: points = [[0,0],[1,0],[2,0]]
 * Output: 2
 * Explanation: The two boomerangs are [[1,0],[0,0],[2,0]] and [[1,0],[2,0],[0,0]].
 * 
 * Example 2:
 * Input: points = [[1,1],[2,2],[3,3]]
 * Output: 2
 * 
 * Example 3:
 * Input: points = [[1,1]]
 * Output: 0
 * 
 * Constraints:
 * - n == points.length
 * - 1 <= n <= 500
 * - points[i].length == 2
 * - -10^4 <= xi, yi <= 10^4
 * - All the points are unique.
 * ====================================================================
 */

/**
 * Counts boomerangs by considering each point as the pivot / center.
 * Equidistant points to center i form permutations: m * (m - 1).
 * 
 * Complexity:
 * - Time: O(n^2) where n is the number of points
 * - Space: O(n) for the distance frequency map per pivot
 * 
 * @param {number[][]} points
 * @return {number}
 */
function numberOfBoomerangs(points) {
    let boomerangs = 0;
    const n = points.length;

    for (let i = 0; i < n; i++) {
        const distMap = new Map();
        const [x1, y1] = points[i];

        for (let j = 0; j < n; j++) {
            if (i === j) continue;
            const [x2, y2] = points[j];
            const dx = x1 - x2;
            const dy = y1 - y2;
            const distSq = dx * dx + dy * dy;

            distMap.set(distSq, (distMap.get(distSq) || 0) + 1);
        }

        // Each count m allows m * (m - 1) permutations for (j, k)
        for (const count of distMap.values()) {
            if (count > 1) {
                boomerangs += count * (count - 1);
            }
        }
    }

    return boomerangs;
}

// --- Test Suite ---
if (require.main === module) {
    // Test 1: [[0,0],[1,0],[2,0]] -> 2
    console.assert(
        numberOfBoomerangs([[0, 0], [1, 0], [2, 0]]) === 2,
        "Test 1 Failed: expected 2"
    );

    // Test 2: [[1,1],[2,2],[3,3]] -> 2
    console.assert(
        numberOfBoomerangs([[1, 1], [2, 2], [3, 3]]) === 2,
        "Test 2 Failed: expected 2"
    );

    // Test 3: [[1,1]] -> 0
    console.assert(
        numberOfBoomerangs([[1, 1]]) === 0,
        "Test 3 Failed: expected 0"
    );

    // Test 4: Square corners [[0,0],[1,0],[0,1],[1,1]]
    // For each point, 2 neighbors at distance 1 -> 2 * 1 = 2 pairs. Total = 4 * 2 = 8
    console.assert(
        numberOfBoomerangs([[0, 0], [1, 0], [0, 1], [1, 1]]) === 8,
        "Test 4 Failed: expected 8"
    );

    console.log("All Number of Boomerangs tests passed successfully!");
}

module.exports = { numberOfBoomerangs };
