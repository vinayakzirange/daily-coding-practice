/**
 * Problem: Construct the Rectangle
 * Topic: Math / Square Root Bounds
 * Language: JavaScript
 *
 * Approach:
 * Start with W = floor(sqrt(area)) and decrement W until area % W === 0.
 * Calculate L = area / W. This guarantees L >= W and minimizes L - W.
 *
 * Time Complexity: O(sqrt(N))
 * Space Complexity: O(1)
 */

function constructRectangle(area) {
    let w = Math.floor(Math.sqrt(area));
    while (area % w !== 0) {
        w--;
    }
    return [area / w, w];
}

// Test cases
console.log("Area 4 ->", constructRectangle(4)); // [2, 2]
console.log("Area 37 ->", constructRectangle(37)); // [37, 1]
console.log("Area 122122 ->", constructRectangle(122122)); // [427, 286]
