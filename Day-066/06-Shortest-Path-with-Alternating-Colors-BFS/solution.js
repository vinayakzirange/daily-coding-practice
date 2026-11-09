/**
 * Problem: Shortest Path with Alternating Colors (LeetCode 1129)
 * Difficulty: Medium
 * Language: JavaScript
 * 
 * You are given an integer n, the number of nodes in a directed graph numbered 0 to n - 1.
 * Each edge is either red or blue. You are given redEdges and blueEdges arrays.
 * 
 * Return an array answer of length n, where answer[x] is the length of the shortest path
 * from node 0 to node x such that edge colors alternate along the path, or -1 if no such path exists.
 * 
 * Example 1:
 *  Input: n = 3, redEdges = [[0,1],[1,2]], blueEdges = []
 *  Output: [0,1,-1]
 * 
 * Example 2:
 *  Input: n = 3, redEdges = [[0,1]], blueEdges = [[2,1]]
 *  Output: [0,1,-1]
 * 
 * Example 3:
 *  Input: n = 3, redEdges = [[1,0]], blueEdges = [[2,1]]
 *  Output: [0,-1,-1]
 * 
 * Constraints:
 *  1 <= n <= 100
 *  0 <= redEdges.length, blueEdges.length <= 400
 *  redEdges[i].length == blueEdges[j].length == 2
 *  0 <= ai, bi, uj, vj < n
 */

/**
 * Finds shortest alternating paths from node 0 using Breadth-First Search (BFS).
 * 
 * @param {number} n
 * @param {number[][]} redEdges
 * @param {number[][]} blueEdges
 * @return {number[]}
 * 
 * Complexity:
 *  Time: O(V + E) where V = n and E = redEdges.length + blueEdges.length.
 *  Space: O(V + E) for adjacency graph representation, visited table, and BFS queue.
 */
function shortestAlternatingPaths(n, redEdges, blueEdges) {
    // Color 0 = RED, Color 1 = BLUE
    const adj = [
        Array.from({ length: n }, () => []), // Red neighbors
        Array.from({ length: n }, () => [])  // Blue neighbors
    ];

    for (const [u, v] of redEdges) {
        adj[0][u].push(v);
    }
    for (const [u, v] of blueEdges) {
        adj[1][u].push(v);
    }

    // dist[node] tracks minimum steps from 0
    const ans = new Array(n).fill(-1);
    ans[0] = 0;

    // visited[color][node]
    const visited = [
        new Array(n).fill(false),
        new Array(n).fill(false)
    ];

    // Queue stores: [node, lastColor, distance]
    // To allow first step to be either RED or BLUE, we start from 0 with dummy initial colors
    const queue = [];
    queue.push([0, 0, 0]); // start with next being BLUE (1)
    queue.push([0, 1, 0]); // start with next being RED (0)
    visited[0][0] = true;
    visited[1][0] = true;

    while (queue.length > 0) {
        const [curr, lastColor, d] = queue.shift();
        const nextColor = 1 - lastColor;

        for (const nbr of adj[nextColor][curr]) {
            if (!visited[nextColor][nbr]) {
                visited[nextColor][nbr] = true;
                if (ans[nbr] === -1 || d + 1 < ans[nbr]) {
                    ans[nbr] = d + 1;
                }
                queue.push([nbr, nextColor, d + 1]);
            }
        }
    }

    return ans;
}

// ==========================================
// Test Cases
// ==========================================
function runTests() {
    const assert = require('assert');

    // Test 1: Example 1
    const res1 = shortestAlternatingPaths(3, [[0, 1], [1, 2]], []);
    assert.deepStrictEqual(res1, [0, 1, -1], `Test 1 Failed: ${JSON.stringify(res1)}`);

    // Test 2: Example 2
    const res2 = shortestAlternatingPaths(3, [[0, 1]], [[2, 1]]);
    assert.deepStrictEqual(res2, [0, 1, -1], `Test 2 Failed: ${JSON.stringify(res2)}`);

    // Test 3: Alternating cycle / valid path
    // 0 -(red)-> 1 -(blue)-> 2
    const res3 = shortestAlternatingPaths(3, [[0, 1]], [[1, 2]]);
    assert.deepStrictEqual(res3, [0, 1, 2], `Test 3 Failed: ${JSON.stringify(res3)}`);

    // Test 4: Disconnected graph
    const res4 = shortestAlternatingPaths(4, [[0, 1]], [[2, 3]]);
    assert.deepStrictEqual(res4, [0, 1, -1, -1], `Test 4 Failed: ${JSON.stringify(res4)}`);

    // Test 5: Parallel edges with different colors
    const res5 = shortestAlternatingPaths(3, [[0, 1], [0, 2]], [[1, 0]]);
    assert.deepStrictEqual(res5, [0, 1, 1], `Test 5 Failed: ${JSON.stringify(res5)}`);

    console.log("All Shortest Path with Alternating Colors tests passed successfully!");
}

runTests();
