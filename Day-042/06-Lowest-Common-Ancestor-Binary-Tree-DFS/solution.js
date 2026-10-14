/**
 * Problem: Lowest Common Ancestor of a Binary Tree (LeetCode 236)
 * Difficulty: Medium
 * Topic: Tree / Depth-First Search / Binary Tree
 *
 * Description:
 * Given a binary tree, find the lowest common ancestor (LCA) of two given
 * nodes in the tree.
 *
 * According to the definition of LCA on Wikipedia: "The lowest common ancestor
 * is defined between two nodes p and q as the lowest node in T that has both
 * p and q as descendants (where we allow a node to be a descendant of itself)."
 *
 * Example 1:
 * Input: root = [3,5,1,6,2,0,8,null,null,7,4], p = 5, q = 1
 * Output: 3
 * Explanation: The LCA of nodes 5 and 1 is 3.
 *
 * Example 2:
 * Input: root = [3,5,1,6,2,0,8,null,null,7,4], p = 5, q = 4
 * Output: 5
 * Explanation: The LCA of nodes 5 and 4 is 5, since a node can be a descendant of itself.
 *
 * Example 3:
 * Input: root = [1,2], p = 1, q = 2
 * Output: 1
 *
 * Constraints:
 * - The number of nodes in the tree is in the range [2, 10^5].
 * - -10^9 <= Node.val <= 10^9
 * - All Node.val are unique.
 * - p != q
 * - p and q will exist in the tree.
 *
 * Complexity Analysis:
 * - Time Complexity: O(n) visiting each node at most once.
 * - Space Complexity: O(h) where h is the tree height for the recursion call stack.
 */

// Definition for a binary tree node.
function TreeNode(val, left = null, right = null) {
    this.val = val;
    this.left = left;
    this.right = right;
}

/**
 * @param {TreeNode} root
 * @param {TreeNode} p
 * @param {TreeNode} q
 * @return {TreeNode}
 */
function lowestCommonAncestor(root, p, q) {
    // Base cases: empty node, or we found p or q
    if (!root || root === p || root === q) {
        return root;
    }

    // Search in left and right subtrees
    const left = lowestCommonAncestor(root.left, p, q);
    const right = lowestCommonAncestor(root.right, p, q);

    // If both left and right return non-null, root is the LCA
    if (left && right) {
        return root;
    }

    // Otherwise, propagate the non-null child upwards
    return left ? left : right;
}

// ==========================================
// Test Cases & Verification
// ==========================================
// Build tree from array level-order
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

function findNode(root, val) {
    if (!root) return null;
    if (root.val === val) return root;
    return findNode(root.left, val) || findNode(root.right, val);
}

// Tree: [3, 5, 1, 6, 2, 0, 8, null, null, 7, 4]
const tree1 = buildTree([3, 5, 1, 6, 2, 0, 8, null, null, 7, 4]);

const testCases = [
    {
        tree: tree1,
        pVal: 5,
        qVal: 1,
        expectedVal: 3
    },
    {
        tree: tree1,
        pVal: 5,
        qVal: 4,
        expectedVal: 5
    },
    {
        tree: tree1,
        pVal: 7,
        qVal: 8,
        expectedVal: 3
    },
    {
        tree: tree1,
        pVal: 6,
        qVal: 7,
        expectedVal: 5
    },
    {
        tree: buildTree([1, 2]),
        pVal: 1,
        qVal: 2,
        expectedVal: 1
    }
];

testCases.forEach((tc, idx) => {
    const p = findNode(tc.tree, tc.pVal);
    const q = findNode(tc.tree, tc.qVal);
    const lca = lowestCommonAncestor(tc.tree, p, q);

    if (!lca || lca.val !== tc.expectedVal) {
        console.error(`Test ${idx + 1} Failed: expected ${tc.expectedVal}, got ${lca ? lca.val : null}`);
        process.exit(1);
    }
    console.log(`Test ${idx + 1} Passed: LCA of ${tc.pVal} and ${tc.qVal} is ${lca.val}`);
});

console.log("\nAll Lowest Common Ancestor tests passed successfully!");
