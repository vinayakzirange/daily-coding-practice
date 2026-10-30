/**
 * ====================================================================
 * Problem: Valid Square (LeetCode 593)
 * Difficulty: Medium
 * Topic: Math, Geometry
 * ====================================================================
 * 
 * Given the coordinates of four points in 2D space p1, p2, p3 and p4,
 * return true if the four points construct a square.
 * 
 * The coordinate of a point p_i is represented as [x_i, y_i]. The input
 * is not given in any order.
 * 
 * A valid square has four equal sides with positive length and four equal
 * angles (90-degree angles).
 * 
 * Example 1:
 * Input: p1 = [0,0], p2 = [1,1], p3 = [1,0], p4 = [0,1]
 * Output: true
 * 
 * Example 2:
 * Input: p1 = [0,0], p2 = [1,1], p3 = [1,0], p4 = [0,12]
 * Output: false
 * 
 * Example 3:
 * Input: p1 = [1,0], p2 = [-1,0], p3 = [0,1], p4 = [0,-1]
 * Output: true
 * 
 * Constraints:
 * - p1.length == p2.length == p3.length == p4.length == 2
 * - -10^4 <= x_i, y_i <= 10^4
 * ====================================================================
 */

/**
 * Checks if 4 points form a square by examining all 6 pairwise squared distances.
 * A valid square has 4 equal side lengths (dist > 0) and 2 equal diagonal lengths (2 * dist).
 * 
 * Complexity:
 * - Time: O(1) checking exactly 6 pairwise distances
 * - Space: O(1)
 * 
 * @param {number[]} p1
 * @param {number[]} p2
 * @param {number[]} p3
 * @param {number[]} p4
 * @return {boolean}
 */
function validSquare(p1, p2, p3, p4) {
    function distSq(a, b) {
        const dx = a[0] - b[0];
        const dy = a[1] - b[1];
        return dx * dx + dy * dy;
    }

    const points = [p1, p2, p3, p4];
    const distances = [];

    for (let i = 0; i < 4; i++) {
        for (let j = i + 1; j < 4; j++) {
            distances.push(distSq(points[i], points[j]));
        }
    }

    distances.sort((a, b) => a - b);

    // 4 sides must be equal and > 0, 2 diagonals must be equal
    const side = distances[0];
    const diag = distances[4];

    return (
        side > 0 &&
        distances[1] === side &&
        distances[2] === side &&
        distances[3] === side &&
        distances[5] === diag &&
        diag === 2 * side
    );
}

// --- Test Suite ---
if (require.main === module) {
    // Test 1: Unit square
    console.assert(
        validSquare([0, 0], [1, 1], [1, 0], [0, 1]) === true,
        "Test 1 Failed: unit square should be true"
    );

    // Test 2: Invalid square
    console.assert(
        validSquare([0, 0], [1, 1], [1, 0], [0, 12]) === false,
        "Test 2 Failed: expected false"
    );

    // Test 3: Rotated 45-degree diamond square
    console.assert(
        validSquare([1, 0], [-1, 0], [0, 1], [0, -1]) === true,
        "Test 3 Failed: rotated square should be true"
    );

    // Test 4: All points identical (0 side length)
    console.assert(
        validSquare([0, 0], [0, 0], [0, 0], [0, 0]) === false,
        "Test 4 Failed: degenerate square with side 0 should be false"
    );

    // Test 5: Rectangle (not square)
    console.assert(
        validSquare([0, 0], [2, 0], [2, 1], [0, 1]) === false,
        "Test 5 Failed: rectangle should be false"
    );

    console.log("All Valid Square tests passed successfully!");
}

module.exports = { validSquare };
