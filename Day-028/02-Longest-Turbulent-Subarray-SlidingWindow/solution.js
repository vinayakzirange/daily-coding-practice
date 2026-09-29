// Problem: Longest Turbulent Subarray (LeetCode 978)
// Language: JavaScript
// Difficulty: Medium
// Time Complexity: O(N)
// Space Complexity: O(1)

function maxTurbulenceSize(arr) {
    if (arr.length < 2) return arr.length;

    let maxLen = 1;
    let anchor = 0;

    for (let i = 1; i < arr.length; i++) {
        const c = Math.sign(arr[i - 1] - arr[i]);

        if (c === 0) {
            anchor = i;
        } else if (i === arr.length - 1 || c * Math.sign(arr[i] - arr[i + 1]) >= 0) {
            maxLen = Math.max(maxLen, i - anchor + 1);
            anchor = i;
        }
    }

    return maxLen;
}

// Test cases
console.log("Output ([9,4,2,10,7,8,8,1,9]):", maxTurbulenceSize([9,4,2,10,7,8,8,1,9])); // 5
console.log("Output ([4,8,12,16]):", maxTurbulenceSize([4,8,12,16])); // 2
