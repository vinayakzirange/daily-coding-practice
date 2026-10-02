// Problem: Populating Next Right Pointers in Each Node (LeetCode 116)
// Language: JavaScript
// Difficulty: Medium
// Time Complexity: O(N)
// Space Complexity: O(1) auxiliary

class Node {
    constructor(val = 0, left = null, right = null, next = null) {
        this.val = val;
        this.left = left;
        this.right = right;
        this.next = next;
    }
}

function connect(root) {
    if (!root) return null;

    let leftmost = root;

    while (leftmost.left) {
        let head = leftmost;
        while (head) {
            // Connection 1: Left child to Right child
            head.left.next = head.right;

            // Connection 2: Right child to Next node's Left child
            if (head.next) {
                head.right.next = head.next.left;
            }

            head = head.next;
        }

        leftmost = leftmost.left;
    }

    return root;
}

// Test tree
const root = new Node(1, new Node(2, new Node(4), new Node(5)), new Node(3, new Node(6), new Node(7)));
connect(root);
console.log("Node 2 next:", root.left.next.val); // 3
console.log("Node 5 next:", root.left.right.next.val); // 6
