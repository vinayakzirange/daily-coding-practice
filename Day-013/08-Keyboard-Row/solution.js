/**
 * Problem: Keyboard Row
 * Topic: Set / String Filtering
 * Language: JavaScript
 *
 * Approach:
 * Map each character a-z to its row index (0, 1, or 2). For each word, verify if all
 * characters map to the same row index.
 *
 * Time Complexity: O(N * L) where N is word count, L is average word length
 * Space Complexity: O(1)
 */

function findWords(words) {
    const rowMap = {
        q:1, w:1, e:1, r:1, t:1, y:1, u:1, i:1, o:1, p:1,
        a:2, s:2, d:2, f:2, g:2, h:2, j:2, k:2, l:2,
        z:3, x:3, c:3, v:3, b:3, n:3, m:3
    };

    return words.filter(word => {
        const lower = word.toLowerCase();
        const firstRow = rowMap[lower[0]];
        for (let char of lower) {
            if (rowMap[char] !== firstRow) return false;
        }
        return true;
    });
}

// Test cases
console.log("['Hello', 'Alaska', 'Dad', 'Peace'] ->", findWords(["Hello", "Alaska", "Dad", "Peace"])); // ["Alaska", "Dad"]
console.log("['omk'] ->", findWords(["omk"])); // []
