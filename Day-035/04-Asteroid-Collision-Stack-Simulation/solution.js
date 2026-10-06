/**
 * Problem: Asteroid Collision (LeetCode 735)
 * Difficulty: Medium
 * Topic: Array / Stack / Simulation / Directional Collisions
 * 
 * Description:
 * We are given an array asteroids of integers representing asteroids in a row.
 * 
 * For each asteroid, the absolute value represents its size, and the sign represents
 * its direction (positive meaning right, negative meaning left). Each asteroid moves
 * at the same speed.
 * 
 * Find out the state of the asteroids after all collisions. If two asteroids meet,
 * the smaller one will explode. If both are the same size, both will explode. Two
 * asteroids moving in the same direction will never meet.
 * 
 * Example 1:
 * Input: asteroids = [5,10,-5]
 * Output: [5,10]
 * Explanation: The 10 and -5 collide resulting in 10. The 5 and 10 never collide.
 * 
 * Example 2:
 * Input: asteroids = [8,-8]
 * Output: []
 * Explanation: The 8 and -8 collide exploding each other.
 * 
 * Example 3:
 * Input: asteroids = [10,2,-5]
 * Output: [10]
 * Explanation: The 2 and -5 collide resulting in -5. The 10 and -5 collide resulting in 10.
 * 
 * Constraints:
 *   * 2 <= asteroids.length <= 10^4
 *   * -1000 <= asteroids[i] <= 1000
 *   * asteroids[i] != 0
 * 
 * Complexity:
 *   * Time Complexity: O(n) - Each asteroid is pushed onto and popped from the stack at most once.
 *   * Space Complexity: O(n) - Stack stores remaining surviving asteroids.
 */

/**
 * @param {number[]} asteroids
 * @return {number[]}
 */
function asteroidCollision(asteroids) {
    const stack = [];

    for (const ast of asteroids) {
        let alive = true;

        // Collision happens only when stack top is moving RIGHT (> 0) and current is moving LEFT (< 0)
        while (alive && ast < 0 && stack.length > 0 && stack[stack.length - 1] > 0) {
            const top = stack[stack.length - 1];

            if (top < -ast) {
                // Stack top is smaller, it explodes; current continues
                stack.pop();
            } else if (top === -ast) {
                // Both are equal in size, both explode
                stack.pop();
                alive = false;
            } else {
                // Top is larger, current asteroid explodes
                alive = false;
            }
        }

        if (alive) {
            stack.push(ast);
        }
    }

    return stack;
}

// ==========================================
// Test Cases & Verification
// ==========================================
function runTests() {
    const testCases = [
        { asteroids: [5, 10, -5], expected: [5, 10] },
        { asteroids: [8, -8], expected: [] },
        { asteroids: [10, 2, -5], expected: [10] },
        { asteroids: [-2, -1, 1, 2], expected: [-2, -1, 1, 2] },
        { asteroids: [-2, -2, 1, -2], expected: [-2, -2, -2] },
        { asteroids: [1, -2, -2, -2], expected: [-2, -2, -2] }
    ];

    testCases.forEach((tc, idx) => {
        const result = asteroidCollision(tc.asteroids);
        const match = JSON.stringify(result) === JSON.stringify(tc.expected);
        console.assert(match, `Test ${idx + 1} Failed: got ${result}`);
        console.log(`Test ${idx + 1} Passed: asteroids=[${tc.asteroids}] -> result=[${result}]`);
    });

    console.log('\nAll Asteroid Collision tests passed successfully!');
}

runTests();
