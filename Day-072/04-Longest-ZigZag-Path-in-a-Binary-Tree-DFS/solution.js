/**
 * Problem: Longest ZigZag Path in a Binary Tree (LeetCode 1372)
 * Difficulty: Medium
 * Category: Tree / Depth-First Search / Binary Tree / Dynamic Programming
 *
 * Description:
 * You are given the root of a binary tree.
 *
 * A ZigZag path for a binary tree is defined as follow:
 *   1. Choose any node in the binary tree and a direction (right or left).
 *   2. If the current direction is right, move to the right child of the current node;
 *      otherwise, move to the left child.
 *   3. Change the direction from right to left or from left to right.
 *   4. Repeat the second and third steps until you can't move in the tree.
 *
 * Zigzag length is defined as the number of nodes visited - 1. (A single node has a length of 0).
 *
 * Return the longest ZigZag path contained in that tree.
 *
 * Example 1:
 *   Input: root = [1,null,1,1,1,null,null,1,1,null,1,null,null,null,1]
 *   Output: 3
 *
 * Example 2:
 *   Input: root = [1,1,1,null,1,null,null,1,1,null,1]
 *   Output: 4
 *
 * Example 3:
 *   Input: root = [1]
 *   Output: 0
 *
 * Constraints:
 *   - The number of nodes in the tree is in the range [1, 5 * 10^4].
 *   - 1 <= Node.val <= 100
 */

// Definition for a binary tree node.
function TreeNode(val, left = null, right = null) {
  this.val = val;
  this.left = left;
  this.right = right;
}

/**
 * Returns the maximum length of a ZigZag path in the binary tree.
 *
 * @param {TreeNode|null} root
 * @return {number}
 */
function longestZigZag(root) {
  let maxZigZag = 0;

  /**
   * Post-order DFS traversal.
   * Returns [leftSteps, rightSteps] where:
   *   - leftSteps: length of ZigZag path extending from node into left child
   *   - rightSteps: length of ZigZag path extending from node into right child
   *
   * @param {TreeNode|null} node
   * @return {[number, number]}
   */
  function dfs(node) {
    if (!node) {
      return [-1, -1];
    }

    const leftSub = dfs(node.left);
    const rightSub = dfs(node.right);

    // If we go left from `node`, the next step from `node.left` must have gone right
    const leftSteps = 1 + leftSub[1];
    // If we go right from `node`, the next step from `node.right` must have gone left
    const rightSteps = 1 + rightSub[0];

    maxZigZag = Math.max(maxZigZag, leftSteps, rightSteps);

    return [leftSteps, rightSteps];
  }

  dfs(root);
  return maxZigZag;
}

// ----------------- Unit Tests -----------------
function runTests() {
  const assert = require('assert');

  // Test 1: Single node tree
  const single = new TreeNode(1);
  assert.strictEqual(longestZigZag(single), 0, 'Test 1 Failed');

  // Test 2: Tree with alternating left-right path of length 2
  //      1
  //     /
  //    2
  //     \
  //      3
  const t2 = new TreeNode(1, new TreeNode(2, null, new TreeNode(3)), null);
  assert.strictEqual(longestZigZag(t2), 2, 'Test 2 Failed');

  // Test 3: ZigZag of length 3
  //      1
  //       \
  //        2
  //       /
  //      3
  //       \
  //        4
  const t3 = new TreeNode(1, null, new TreeNode(2, new TreeNode(3, null, new TreeNode(4)), null));
  assert.strictEqual(longestZigZag(t3), 3, 'Test 3 Failed');

  // Test 4: Straight linear path (all left) -> max zigzag is 1
  //    1 -> 2 -> 3 -> 4
  const t4 = new TreeNode(1, new TreeNode(2, new TreeNode(3, new TreeNode(4))), null);
  assert.strictEqual(longestZigZag(t4), 1, 'Test 4 Failed');

  // Test 5: Symmetric tree
  //        1
  //       / \
  //      2   3
  //     / \ / \
  //    4  5 6  7
  const t5 = new TreeNode(
    1,
    new TreeNode(2, new TreeNode(4), new TreeNode(5)),
    new TreeNode(3, new TreeNode(6), new TreeNode(7))
  );
  assert.strictEqual(longestZigZag(t5), 2, 'Test 5 Failed');

  console.log('All tests passed for 04-Longest-ZigZag-Path-in-a-Binary-Tree-DFS!');
}

if (require.main === module) {
  runTests();
}

module.exports = { TreeNode, longestZigZag };
