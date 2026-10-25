/**
 * ====================================================================
 * Problem: Binary Search Tree Iterator (LeetCode 173)
 * Difficulty: Medium
 * Topic: Stack, Tree, Design, Binary Search Tree, Binary Tree, Iterator
 * ====================================================================
 * 
 * Implement the BSTIterator class that represents an iterator over the
 * in-order traversal of a binary search tree (BST):
 * 
 * - BSTIterator(TreeNode root) Initializes an object of the BSTIterator
 *   class. The root of the BST is given as part of the constructor. The
 *   pointer should be initialized to a non-existent number smaller than
 *   any element in the BST.
 * - boolean hasNext() Returns true if there exists a number in the traversal
 *   to the right of the pointer, otherwise returns false.
 * - int next() Moves the pointer to the right, then returns the number at
 *   the pointer.
 * 
 * Notice that by initializing the pointer to a non-existent smallest number,
 * the first call to next() will return the smallest element in the BST.
 * 
 * You may assume that next() calls will always be valid. That is, there will
 * be at least a next number in the in-order traversal when next() is called.
 * 
 * Example 1:
 * Input:
 * ["BSTIterator", "next", "next", "hasNext", "next", "hasNext", "next", "hasNext", "next", "hasNext"]
 * [[[7, 3, 15, null, null, 9, 20]], [], [], [], [], [], [], [], [], []]
 * Output:
 * [null, 3, 7, true, 9, true, 15, true, 20, false]
 * 
 * Constraints:
 * - The number of nodes in the tree is in the range [1, 10^5].
 * - 0 <= Node.val <= 10^6
 * - At most 10^5 calls will be made to hasNext, and next.
 * 
 * Follow up: Could you implement next() and hasNext() to run in average
 * O(1) time and use O(h) memory, where h is the height of the tree?
 * ====================================================================
 */

class TreeNode {
    constructor(val, left = null, right = null) {
        this.val = val;
        this.left = left;
        this.right = right;
    }
}

/**
 * Controlled in-order traversal using an explicit stack of left ancestors.
 * - Memory: O(h) where h is tree height (at most depth of tree stored)
 * - Time: next() is amortized O(1), hasNext() is O(1)
 */
class BSTIterator {
    /**
     * @param {TreeNode} root
     */
    constructor(root) {
        this.stack = [];
        this._pushLeft(root);
    }

    _pushLeft(node) {
        while (node) {
            this.stack.push(node);
            node = node.left;
        }
    }

    /**
     * @return {number}
     */
    next() {
        const topNode = this.stack.pop();
        if (topNode.right) {
            this._pushLeft(topNode.right);
        }
        return topNode.val;
    }

    /**
     * @return {boolean}
     */
    hasNext() {
        return this.stack.length > 0;
    }
}

// --- Test Suite ---
if (require.main === module) {
    // Tree:
    //        7
    //       / \
    //      3   15
    //         /  \
    //        9    20
    const root = new TreeNode(7);
    root.left = new TreeNode(3);
    root.right = new TreeNode(15, new TreeNode(9), new TreeNode(20));

    const it = new BSTIterator(root);

    console.assert(it.next() === 3, "Test failed: next should be 3");
    console.assert(it.next() === 7, "Test failed: next should be 7");
    console.assert(it.hasNext() === true, "Test failed: hasNext should be true");
    console.assert(it.next() === 9, "Test failed: next should be 9");
    console.assert(it.hasNext() === true, "Test failed: hasNext should be true");
    console.assert(it.next() === 15, "Test failed: next should be 15");
    console.assert(it.hasNext() === true, "Test failed: hasNext should be true");
    console.assert(it.next() === 20, "Test failed: next should be 20");
    console.assert(it.hasNext() === false, "Test failed: hasNext should be false");

    console.log("All BSTIterator operations verified: [3, 7, 9, 15, 20]");
    console.log("\nAll Binary Search Tree Iterator tests passed successfully!");
}

module.exports = { BSTIterator, TreeNode };
