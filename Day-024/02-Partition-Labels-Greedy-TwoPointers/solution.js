// Problem: Partition Labels (LeetCode 763)
// Language: JavaScript
// Difficulty: Medium
// Time Complexity: O(N)
// Space Complexity: O(1) - last occurrences map of 26 letters

function partitionLabels(s) {
    const last = {};
    for (let i = 0; i < s.length; i++) {
        last[s[i]] = i;
    }
    
    const result = [];
    let start = 0;
    let end = 0;
    
    for (let i = 0; i < s.length; i++) {
        end = Math.max(end, last[s[i]]);
        if (i === end) {
            result.push(end - start + 1);
            start = i + 1;
        }
    }
    
    return result;
}

// Test cases
console.log("Output ('ababcbacadefegdehijhklij'):", partitionLabels("ababcbacadefegdehijhklij")); // [9,7,8]
console.log("Output ('eccbbbbdec'):", partitionLabels("eccbbbbdec")); // [10]
