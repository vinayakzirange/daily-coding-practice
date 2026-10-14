/**
 * Problem: Course Schedule II (LeetCode 210)
 * Difficulty: Medium
 * Topic: Depth-First Search / Breadth-First Search / Graph / Topological Sort
 *
 * Description:
 * There are a total of numCourses courses you have to take, labeled from 0 to numCourses - 1.
 * You are given an array prerequisites where prerequisites[i] = [a_i, b_i] indicates that
 * you must take course b_i first if you want to take course a_i.
 *
 * Return the ordering of courses you should take to finish all courses.
 * If there are many valid answers, return any of them. If it is impossible to finish all
 * courses, return an empty array.
 *
 * Example 1:
 * Input: numCourses = 2, prerequisites = [[1,0]]
 * Output: [0,1]
 * Explanation: There are a total of 2 courses to take. To take course 1 you should have
 * finished course 0. So the correct course order is [0,1].
 *
 * Example 2:
 * Input: numCourses = 4, prerequisites = [[1,0],[2,0],[3,1],[3,2]]
 * Output: [0,2,1,3] (or [0,1,2,3])
 * Explanation: There are a total of 4 courses to take. To take course 3 you should have
 * finished both courses 1 and 2. Both courses 1 and 2 should be taken after course 0.
 *
 * Example 3:
 * Input: numCourses = 1, prerequisites = []
 * Output: [0]
 *
 * Constraints:
 * - 1 <= numCourses <= 2000
 * - 0 <= prerequisites.length <= numCourses * (numCourses - 1)
 * - prerequisites[i].length == 2
 * - 0 <= a_i, b_i < numCourses
 * - a_i != b_i
 * - All the pairs [a_i, b_i] are distinct.
 *
 * Complexity Analysis:
 * - Time Complexity: O(V + E) where V is numCourses and E is prerequisites.length.
 * - Space Complexity: O(V + E) for adjacency list, in-degree array, and BFS queue.
 */

/**
 * @param {number} numCourses
 * @param {number[][]} prerequisites
 * @return {number[]}
 */
function findOrder(numCourses, prerequisites) {
    const adj = Array.from({ length: numCourses }, () => []);
    const inDegree = new Array(numCourses).fill(0);

    // Build directed graph: b -> a
    for (const [dest, src] of prerequisites) {
        adj[src].push(dest);
        inDegree[dest]++;
    }

    // Initialize queue with all courses having 0 prerequisites
    const queue = [];
    for (let i = 0; i < numCourses; i++) {
        if (inDegree[i] === 0) {
            queue.push(i);
        }
    }

    const order = [];

    while (queue.length > 0) {
        const course = queue.shift();
        order.push(course);

        for (const neighbor of adj[course]) {
            inDegree[neighbor]--;
            if (inDegree[neighbor] === 0) {
                queue.push(neighbor);
            }
        }
    }

    return order.length === numCourses ? order : [];
}

// ==========================================
// Test Cases & Verification
// ==========================================
function isValidOrder(numCourses, prerequisites, order) {
    if (order.length !== numCourses) return false;
    const pos = new Map();
    order.forEach((c, idx) => pos.set(c, idx));

    for (const [dest, src] of prerequisites) {
        if (pos.get(src) >= pos.get(dest)) {
            return false;
        }
    }
    return true;
}

const testCases = [
    {
        numCourses: 2,
        prerequisites: [[1, 0]],
        possible: true
    },
    {
        numCourses: 4,
        prerequisites: [[1, 0], [2, 0], [3, 1], [3, 2]],
        possible: true
    },
    {
        numCourses: 1,
        prerequisites: [],
        possible: true
    },
    {
        numCourses: 2,
        prerequisites: [[1, 0], [0, 1]],
        possible: false
    },
    {
        numCourses: 3,
        prerequisites: [[0, 1], [1, 2], [2, 0]],
        possible: false
    }
];

testCases.forEach((tc, idx) => {
    const result = findOrder(tc.numCourses, tc.prerequisites);
    if (tc.possible) {
        if (!isValidOrder(tc.numCourses, tc.prerequisites, result)) {
            console.error(`Test ${idx + 1} Failed: invalid topological order [${result}]`);
            process.exit(1);
        }
    } else {
        if (result.length !== 0) {
            console.error(`Test ${idx + 1} Failed: expected empty array for cycle, got [${result}]`);
            process.exit(1);
        }
    }
    console.log(`Test ${idx + 1} Passed: numCourses=${tc.numCourses} -> valid order=[${result}]`);
});

console.log("\nAll Course Schedule II tests passed successfully!");
