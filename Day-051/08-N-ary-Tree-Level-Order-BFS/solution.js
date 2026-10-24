/**
 * ====================================================================
 * Problem: N-ary Tree Level Order Traversal (LeetCode 429)
 * Difficulty: Medium
 * Topic: Tree, Breadth-First Search
 * ====================================================================
 * 
 * Given an n-ary tree, return the level order traversal of its nodes'
 * values.
 * 
 * Nary-Tree input serialization is represented in their level order
 * traversal, each group of children is separated by the null value.
 * 
 * Example 1:
 * Input: root = [1,null,3,2,4,null,5,6]
 * Output: [[1],[3,2,4],[5,6]]
 * 
 * Example 2:
 * Input: root = [1,null,2,3,4,5,null,null,6,7,null,8,null,9,10,null,null,11,null,12,null,13,null,null,14]
 * Output: [[1],[2,3,4,5],[6,7,8,9,10],[11,12,13],[14]]
 * 
 * Constraints:
 * - The height of the n-ary tree is less than or equal to 1000
 * - The total number of nodes is between [0, 10^4]
 * ====================================================================
 */

class _Node {
    constructor(val, children = []) {
        this.val = val;
        this.children = children;
    }
}

/**
 * Level order traversal of an N-ary tree using Breadth-First Search.
 * 
 * Time Complexity: O(n) visiting each node once
 * Space Complexity: O(w) where w is maximum width of tree
 * 
 * @param {_Node|null} root
 * @return {number[][]}
 */
function levelOrder(root) {
    if (!root) {
        return [];
    }

    const result = [];
    const queue = [root];

    while (queue.length > 0) {
        const levelSize = queue.length;
        const currentLevel = [];

        for (let i = 0; i < levelSize; i++) {
            const node = queue.shift();
            currentLevel.push(node.val);

            if (node.children && node.children.length > 0) {
                for (let child of node.children) {
                    queue.push(child);
                }
            }
        }

        result.push(currentLevel);
    }

    return result;
}

// --- Test Suite ---
if (require.main === module) {
    // Test 1: root = [1,null,3,2,4,null,5,6]
    //            1
    //         /  |  \
    //        3   2   4
    //       / \
    //      5   6
    const n5 = new _Node(5);
    const n6 = new _Node(6);
    const n3 = new _Node(3, [n5, n6]);
    const n2 = new _Node(2);
    const n4 = new _Node(4);
    const root1 = new _Node(1, [n3, n2, n4]);

    const res1 = levelOrder(root1);
    const exp1 = [[1], [3, 2, 4], [5, 6]];
    console.assert(JSON.stringify(res1) === JSON.stringify(exp1), `Test 1 failed: ${JSON.stringify(res1)}`);
    console.log(`Test 1 Passed: root1 -> ${JSON.stringify(res1)}`);

    // Test 2: Null root
    const res2 = levelOrder(null);
    console.assert(JSON.stringify(res2) === JSON.stringify([]), "Test 2 failed");
    console.log("Test 2 Passed: null -> []");

    // Test 3: Single node
    const res3 = levelOrder(new _Node(42));
    console.assert(JSON.stringify(res3) === JSON.stringify([[42]]), "Test 3 failed");
    console.log("Test 3 Passed: single node -> [[42]]");

    // Test 4: Flat wide tree
    const root4 = new _Node(0, [new _Node(1), new _Node(2), new _Node(3), new _Node(4)]);
    const res4 = levelOrder(root4);
    console.assert(JSON.stringify(res4) === JSON.stringify([[0], [1, 2, 3, 4]]), "Test 4 failed");
    console.log(`Test 4 Passed: flat tree -> ${JSON.stringify(res4)}`);

    console.log("\nAll N-ary Tree Level Order Traversal tests passed successfully!");
}

module.exports = { levelOrder, _Node };
