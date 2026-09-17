/**
 * Problem: Group Anagrams
 * Topic: HashMap / String Sorting / Categorization
 * Language: JavaScript
 *
 * Approach:
 * For each word, sort its characters to generate a unique anagram signature key.
 * Group words sharing the same signature key into a Map array bucket.
 *
 * Time Complexity: O(N * K log K) where N is word count, K is max word length
 * Space Complexity: O(N * K)
 */

function groupAnagrams(strs) {
    const map = new Map();

    for (let word of strs) {
        const key = word.split('').sort().join('');
        if (!map.has(key)) {
            map.set(key, []);
        }
        map.get(key).push(word);
    }

    return Array.from(map.values());
}

// Test cases
console.log("['eat','tea','tan','ate','nat','bat'] ->", groupAnagrams(["eat", "tea", "tan", "ate", "nat", "bat"]));
