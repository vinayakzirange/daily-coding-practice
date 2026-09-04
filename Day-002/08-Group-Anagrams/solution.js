/*
 * Problem Name: Group Anagrams
 * Problem Statement: Given an array of strings strs, group the anagrams together. Return the answer in any order.
 * 
 * Approach: Sort each string alphabetically to use as a key in a Hash Map.
 * All anagrams will produce the exact same key when sorted.
 * 
 * Time Complexity: O(N * K log K) where N is number of strings and K is max length of string.
 * Space Complexity: O(N * K)
 */

function groupAnagrams(strs) {
  const map = new Map();

  for (let str of strs) {
    const key = str.split('').sort().join('');
    if (!map.has(key)) {
      map.set(key, []);
    }
    map.get(key).push(str);
  }

  return Array.from(map.values());
}

const input = ["eat", "tea", "tan", "ate", "nat", "bat"];
console.log(groupAnagrams(input));
// Expected: [ ["eat","tea","ate"], ["tan","nat"], ["bat"] ]
