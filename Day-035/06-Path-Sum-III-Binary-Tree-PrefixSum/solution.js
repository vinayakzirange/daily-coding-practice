/**
 * Problem: Path Sum III (LeetCode 437)
 * Difficulty: Medium
 * Topic: Binary Tree / Depth-First Search / Prefix Sum / Hash Map
 * 
 * Description:
 * Given the root of a binary tree and an integer targetSum, return the number of paths
 * where the sum of the values along the path equals targetSum.
 * 
 * The path does not need to start or end at the root or a leaf, but it must go downwards
 * (i.e., traveling only from parent nodes to child nodes).
 * 
 * Example 1:
 * Input: root = [10,5,-3,3,2,null,11,3,-2,null,1], targetSum = 8
 * Output: 3
 * Explanation: The paths that sum to 8 are:
 * 1. 5 -> 3
 * 2. 5 -> 2 -> 1
 * 3. -3 -> 11
 * 
 * Example 2:
 * Input: root = [5,4,8,11,null,13,4,7,2,null,null,5,1], targetSum = 22
 * Output: 3
 * 
 * Constraints:
 *   * The number of nodes in the tree is in the range [0, 1000].
 *   * -10^9 <= Node.val <= 10^9
 *   * -1000 <= targetSum <= 1000
 * 
 * Complexity:
 *   * Time Complexity: O(n) - Single DFS traversal with prefix sum hash map lookup in O(1).
 *   * Space Complexity: O(h) - Hash map and recursion stack size proportional to tree height h.
 */

// Definition for a binary tree node.
function TreeNode(val, left = null, right = null) {
    this.val = val;
    this.left = left;
    this.right = right;
}

/**
 * @param {TreeNode} root
 * @param {number} targetSum
 * @return {number}
 */
function pathSum(root, targetSum) {
    // Map to store frequency of prefix sums from the root down to the current node
    const prefixCount = new Map();
    prefixCount.set(0, 1); // Base case: prefix sum of 0 occurs once initially

    let totalPaths = 0;

    function dfs(node, currentSum) {
        if (!node) return;

        currentSum += node.val;

        // Check if there is a subpath ending at node that sums to targetSum
        const needed = currentSum - targetSum;
        if (prefixCount.has(needed)) {
            totalPaths += prefixCount.get(needed);
        }

        // Add currentSum to prefix map
        prefixCount.set(currentSum, (prefixCount.get(currentSum) || 0) + 1);

        // Traverse left and right subtrees
        dfs(node.left, currentSum);
        dfs(node.right, currentSum);

        // Backtrack: remove currentSum count as we leave this subtree branch
        prefixCount.set(currentSum, prefixCount.get(currentSum) - 1);
        if (prefixCount.get(currentSum) === 0) {
            prefixCount.delete(currentSum);
        }
    }

    dfs(root, 0);
    return totalPaths;
}

// ==========================================
// Test Cases & Verification
// ==========================================
function runTests() {
    // Tree 1:
    //          10
    //         /  \
    //        5   -3
    //       / \    \
    //      3   2   11
    //     / \   \
    //    3  -2   1
    const tree1 = new TreeNode(10,
        new TreeNode(5,
            new TreeNode(3, new TreeNode(3), new TreeNode(-2)),
            new TreeNode(2, null, new TreeNode(1))
        ),
        new TreeNode(-3, null, new TreeNode(11))
    );

    const res1 = pathSum(tree1, 8);
    console.assert(res1 === 3, `Test 1 Failed: got ${res1}, expected 3`);
    console.log(`Test 1 Passed: Tree 1 with targetSum=8 -> paths = ${res1}`);

    // Tree 2: Empty tree
    const res2 = pathSum(null, 5);
    console.assert(res2 === 0, `Test 2 Failed: got ${res2}, expected 0`);
    console.log(`Test 2 Passed: Empty tree -> paths = ${res2}`);

    // Tree 3: Single node matching target
    const tree3 = new TreeNode(5);
    const res3 = pathSum(tree3, 5);
    console.assert(res3 === 1, `Test 3 Failed: got ${res3}, expected 1`);
    console.log(`Test 3 Passed: Single node [5] with targetSum=5 -> paths = ${res3}`);

    // Tree 4: Single branch with negative values
    const tree4 = new TreeNode(1, new TreeNode(-2, new TreeNode(1, new TreeNode(-1))));
    const res4 = pathSum(tree4, -1);
    console.assert(res4 === 4, `Test 4 Failed: got ${res4}, expected 4`);
    console.log(`Test 4 Passed: Negative chain with targetSum=-1 -> paths = ${res4}`);

    console.log('\nAll Path Sum III tests passed successfully!');
}

runTests();
