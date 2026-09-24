/**
 * Problem: Construct Quad Tree
 * Topic: 2D Grid / Divide & Conquer / Tree Construction
 * Language: JavaScript
 *
 * Approach:
 * Divide N x N grid recursively into 4 quadrants.
 * If all cells in grid section share the same value (0 or 1), return a leaf QuadTreeNode.
 * Otherwise, recursively build 4 children (topLeft, topRight, bottomLeft, bottomRight).
 *
 * Time Complexity: O(N^2 log N)
 * Space Complexity: O(log N) recursion depth
 */

class Node {
    constructor(val, isLeaf, topLeft = null, topRight = null, bottomLeft = null, bottomRight = null) {
        this.val = val;
        this.isLeaf = isLeaf;
        this.topLeft = topLeft;
        this.topRight = topRight;
        this.bottomLeft = bottomLeft;
        this.bottomRight = bottomRight;
    }
}

function construct(grid) {
    function build(r, c, size) {
        let isSame = true;
        const val = grid[r][c];

        for (let i = r; i < r + size; i++) {
            for (let j = c; j < c + size; j++) {
                if (grid[i][j] !== val) {
                    isSame = false;
                    break;
                }
            }
            if (!isSame) break;
        }

        if (isSame) {
            return new Node(val === 1, true);
        }

        const half = Math.floor(size / 2);
        return new Node(
            true,
            false,
            build(r, c, half),
            build(r, c + half, half),
            build(r + half, c, half),
            build(r + half, c + half, half)
        );
    }

    return build(0, 0, grid.length);
}

// Test cases
const grid = [
  [0, 1],
  [1, 0]
];
const quadTree = construct(grid);
console.log("QuadTree root isLeaf ->", quadTree.isLeaf); // false
