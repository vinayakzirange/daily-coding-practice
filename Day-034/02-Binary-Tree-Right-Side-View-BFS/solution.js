/**
 * Problem: Binary Tree Right Side View (LeetCode 199)
 * Difficulty: Medium
 * Topic: Binary Tree / Breadth-First Search / Level-Order Traversal / Queue
 * 
 * Description:
 * Given the root of a binary tree, imagine yourself standing on the right side of it,
 * return the values of the nodes you can see ordered from top to bottom.
 * 
 * Example 1:
 * Input: root = [1,2,3,null,5,null,4]
 * Output: [1,3,4]
 * 
 * Example 2:
 * Input: root = [1,null,3]
 * Output: [1,3]
 * 
 * Example 3:
 * Input: root = []
 * Output: []
 * 
 * Constraints:
 *   * The number of nodes in the tree is in the range [0, 100].
 *   * -100 <= Node.val <= 100
 * 
 * Complexity:
 *   * Time Complexity: O(n) - Every node is processed in the queue once.
 *   * Space Complexity: O(w) where w is the maximum width of the binary tree (up to O(n)).
 */

// Definition for a binary tree node.
function TreeNode(val, left = null, right = null) {
    this.val = val;
    this.left = left;
    this.right = right;
}

/**
 * @param {TreeNode} root
 * @return {number[]}
 */
function rightSideView(root) {
    if (!root) return [];

    const result = [];
    const queue = [root];

    while (queue.length > 0) {
        const levelSize = queue.length;

        for (let i = 0; i < levelSize; i++) {
            const currentNode = queue.shift();

            // The last node of each level is visible from the right side
            if (i === levelSize - 1) {
                result.push(currentNode.val);
            }

            if (currentNode.left) queue.push(currentNode.left);
            if (currentNode.right) queue.push(currentNode.right);
        }
    }

    return result;
}

// ==========================================
// Test Cases & Verification
// ==========================================
function runTests() {
    // Tree 1:
    //       1
    //      / \
    //     2   3
    //      \   \
    //       5   4
    const tree1 = new TreeNode(1,
        new TreeNode(2, null, new TreeNode(5)),
        new TreeNode(3, null, new TreeNode(4))
    );
    const res1 = rightSideView(tree1);
    console.assert(JSON.stringify(res1) === JSON.stringify([1, 3, 4]), `Test 1 Failed: got ${res1}`);
    console.log(`Test 1 Passed: [1,2,3,null,5,null,4] -> right side view: [${res1}]`);

    // Tree 2: [1, null, 3]
    const tree2 = new TreeNode(1, null, new TreeNode(3));
    const res2 = rightSideView(tree2);
    console.assert(JSON.stringify(res2) === JSON.stringify([1, 3]), `Test 2 Failed: got ${res2}`);
    console.log(`Test 2 Passed: [1, null, 3] -> right side view: [${res2}]`);

    // Tree 3: Empty tree
    const res3 = rightSideView(null);
    console.assert(JSON.stringify(res3) === JSON.stringify([]), `Test 3 Failed: got ${res3}`);
    console.log(`Test 3 Passed: [] -> right side view: [${res3}]`);

    // Tree 4: Left-heavy tree:
    //       1
    //      /
    //     2
    //    /
    //   3
    const tree4 = new TreeNode(1, new TreeNode(2, new TreeNode(3)));
    const res4 = rightSideView(tree4);
    console.assert(JSON.stringify(res4) === JSON.stringify([1, 2, 3]), `Test 4 Failed: got ${res4}`);
    console.log(`Test 4 Passed: [1, 2, null, 3] -> right side view: [${res4}]`);

    console.log('\nAll Binary Tree Right Side View tests passed successfully!');
}

runTests();
