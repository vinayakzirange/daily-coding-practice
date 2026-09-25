// Problem: Find All Anagrams in a String (LeetCode 438)
// Language: JavaScript
// Difficulty: Medium
// Time Complexity: O(N)
// Space Complexity: O(1) - fixed size array of 26

function findAnagrams(s, p) {
    const result = [];
    if (s.length < p.length) return result;
    
    const pCount = new Array(26).fill(0);
    const sCount = new Array(26).fill(0);
    const aCode = 'a'.charCodeAt(0);
    
    for (let i = 0; i < p.length; i++) {
        pCount[p.charCodeAt(i) - aCode]++;
        sCount[s.charCodeAt(i) - aCode]++;
    }
    
    if (arraysEqual(pCount, sCount)) result.push(0);
    
    for (let i = p.length; i < s.length; i++) {
        sCount[s.charCodeAt(i) - aCode]++;
        sCount[s.charCodeAt(i - p.length) - aCode]--;
        
        if (arraysEqual(pCount, sCount)) {
            result.push(i - p.length + 1);
        }
    }
    
    return result;
}

function arraysEqual(a, b) {
    for (let i = 0; i < 26; i++) {
        if (a[i] !== b[i]) return false;
    }
    return true;
}

// Test cases
console.log("Anagram indices ('cbaebabacd', 'abc'):", findAnagrams("cbaebabacd", "abc")); // [0, 6]
console.log("Anagram indices ('abab', 'ab'):", findAnagrams("abab", "ab")); // [0, 1, 2]
