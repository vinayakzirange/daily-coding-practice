/**
 * Problem: Kth Smallest Element in a BST (LeetCode 230)
 * Difficulty: Medium
 * Topic: Tree / Depth-First Search / Binary Search Tree / Binary Tree
 *
 * Description:
 * Given the root of a binary search tree, and an integer k, return the kth
 * smallest value (1-indexed) of all the values of the nodes in the tree.
 *
 * Example 1:
 * Input: root = [3,1,4,null,2], k = 1
 * Output: 1
 *
 * Example 2:
 * Input: root = [5,3,6,2,4,null,null,1], k = 3
 * Output: 3
 *
 * Constraints:
 * - The number of nodes in the tree is n.
 * - 1 <= k <= n <= 10^4
 * - 0 <= Node.val <= 10^4
 *
 * Follow-up: If the BST is modified often and you need to find the kth smallest
 * frequently, how would you optimize? (Augment nodes with subtree sizes).
 *
 * Complexity Analysis:
 * - Time Complexity: O(H + k) where H is tree height; early stop on k-th node.
 * - Space Complexity: O(H) auxiliary space for the traversal stack.
 */

// Definition for a binary tree node.
function TreeNode(val, left = null, right = null) {
    this.val = val;
    this.left = left;
    this.right = right;
}

/**
 * @param {TreeNode} root
 * @param {number} k
 * @return {number}
 */
function kthSmallest(root, k) {
    const stack = [];
    let curr = root;

    // Iterative inorder traversal visits nodes in ascending order
    while (curr !== null || stack.length > 0) {
        while (curr !== null) {
            stack.push(curr);
            curr = curr.left;
        }

        curr = stack.pop();
        k--;

        if (k === 0) {
            return curr.val;
        }

        curr = curr.right;
    }

    return -1;
}

// ==========================================
// Test Cases & Verification
// ==========================================
function buildTree(arr) {
    if (!arr || arr.length === 0) return null;
    const root = new TreeNode(arr[0]);
    const queue = [root];
    let i = 1;

    while (queue.length > 0 && i < arr.length) {
        const curr = queue.shift();

        if (i < arr.length && arr[i] !== null) {
            curr.left = new TreeNode(arr[i]);
            queue.push(curr.left);
        }
        i++;

        if (i < arr.length && arr[i] !== null) {
            curr.right = new TreeNode(arr[i]);
            queue.push(curr.right);
        }
        i++;
    }
    return root;
}

const testCases = [
    {
        treeArr: [3, 1, 4, null, 2],
        k: 1,
        expected: 1
    },
    {
        treeArr: [5, 3, 6, 2, 4, null, null, 1],
        k: 3,
        expected: 3
    },
    {
        treeArr: [5, 3, 6, 2, 4, null, null, 1],
        k: 1,
        expected: 1
    },
    {
        treeArr: [5, 3, 6, 2, 4, null, null, 1],
        k: 6,
        expected: 6
    },
    {
        treeArr: [10],
        k: 1,
        expected: 10
    },
    {
        treeArr: [2, 1, 3],
        k: 2,
        expected: 2
    }
];

testCases.forEach((tc, idx) => {
    const root = buildTree(tc.treeArr);
    const result = kthSmallest(root, tc.k);
    if (result !== tc.expected) {
        console.error(`Test ${idx + 1} Failed: k=${tc.k}, got ${result}, expected ${tc.expected}`);
        process.exit(1);
    }
    console.log(`Test ${idx + 1} Passed: k=${tc.k} -> kth smallest = ${result}`);
});

console.log("\nAll Kth Smallest Element in a BST tests passed successfully!");
