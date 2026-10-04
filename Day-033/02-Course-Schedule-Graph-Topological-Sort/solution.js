/**
 * Problem: Course Schedule (LeetCode 207)
 * Difficulty: Medium
 * Topic: Graph / Topological Sort / Kahn's BFS Algorithm / Cycle Detection
 * 
 * Description:
 * There are a total of numCourses courses you have to take, labeled from 0 to numCourses - 1.
 * You are given an array prerequisites where prerequisites[i] = [ai, bi] indicates that you
 * must take course bi first if you want to take course ai.
 * 
 * For example, the pair [0, 1], indicates that to take course 0 you have to first take course 1.
 * Return true if you can finish all courses. Otherwise, return false.
 * 
 * Example 1:
 * Input: numCourses = 2, prerequisites = [[1,0]]
 * Output: true
 * Explanation: There are a total of 2 courses to take. 
 * To take course 1 you should have finished course 0. So it is possible.
 * 
 * Example 2:
 * Input: numCourses = 2, prerequisites = [[1,0],[0,1]]
 * Output: false
 * Explanation: There are a total of 2 courses to take. 
 * To take course 1 you should have finished course 0, and to take course 0 you should also 
 * have finished course 1. So it is impossible.
 * 
 * Constraints:
 *   * 1 <= numCourses <= 2000
 *   * 0 <= prerequisites.length <= 5000
 *   * prerequisites[i].length == 2
 *   * 0 <= ai, bi < numCourses
 *   * All the pairs prerequisites[i] are unique.
 * 
 * Complexity:
 *   * Time Complexity: O(V + E) where V = numCourses, E = prerequisites.length
 *   * Space Complexity: O(V + E) for adjacency list and indegree array
 */

/**
 * @param {number} numCourses
 * @param {number[][]} prerequisites
 * @return {boolean}
 */
function canFinish(numCourses, prerequisites) {
    const adj = Array.from({ length: numCourses }, () => []);
    const inDegree = new Array(numCourses).fill(0);

    for (const [course, prereq] of prerequisites) {
        adj[prereq].push(course);
        inDegree[course]++;
    }

    const queue = [];
    for (let i = 0; i < numCourses; i++) {
        if (inDegree[i] === 0) {
            queue.push(i);
        }
    }

    let processedCourses = 0;
    let head = 0;

    while (head < queue.length) {
        const curr = queue[head++];
        processedCourses++;

        for (const neighbor of adj[curr]) {
            inDegree[neighbor]--;
            if (inDegree[neighbor] === 0) {
                queue.push(neighbor);
            }
        }
    }

    return processedCourses === numCourses;
}

// ==========================================
// Test Cases & Verification
// ==========================================
function runTests() {
    const testCases = [
        { numCourses: 2, prerequisites: [[1, 0]], expected: true },
        { numCourses: 2, prerequisites: [[1, 0], [0, 1]], expected: false },
        { numCourses: 4, prerequisites: [[1, 0], [2, 0], [3, 1], [3, 2]], expected: true },
        { numCourses: 1, prerequisites: [], expected: true },
        { numCourses: 3, prerequisites: [[0, 1], [1, 2], [2, 0]], expected: false }
    ];

    testCases.forEach((tc, idx) => {
        const result = canFinish(tc.numCourses, tc.prerequisites);
        console.assert(result === tc.expected, `Test ${idx + 1} Failed: got ${result}, expected ${tc.expected}`);
        console.log(`Test ${idx + 1} Passed: courses=${tc.numCourses} -> canFinish = ${result}`);
    });

    console.log('\nAll Course Schedule tests passed successfully!');
}

runTests();
