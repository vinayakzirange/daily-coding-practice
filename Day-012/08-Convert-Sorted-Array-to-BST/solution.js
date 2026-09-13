/**
 * Problem: Convert Sorted Array to Binary Search Tree
 * Topic: Binary Search Tree / Divide & Conquer
 * Language: JavaScript
 *
 * Approach:
 * Find the middle element of the sorted array to serve as root (ensures height-balanced tree).
 * Recursively build left subtree from left half and right subtree from right half.
 *
 * Time Complexity: O(N)
 * Space Complexity: O(log N) recursion stack
 */

class TreeNode {
    constructor(val, left = null, right = null) {
        this.val = val;
        this.left = left;
        this.right = right;
    }
}

function sortedArrayToBST(nums) {
    function buildBST(left, right) {
        if (left > right) return null;
        const mid = Math.floor((left + right) / 2);
        const root = new TreeNode(nums[mid]);
        root.left = buildBST(left, mid - 1);
        root.right = buildBST(mid + 1, right);
        return root;
    }
    return buildBST(0, nums.length - 1);
}

// Test cases
const tree = sortedArrayToBST([-10, -3, 0, 5, 9]);
console.log("Root value ->", tree.val); // 0
