/*
 * Problem Name: Longest Consecutive Sequence
 * Problem Statement: Given an unsorted array of integers nums, return the length of the longest consecutive elements sequence.
 * You must write an algorithm that runs in O(n) time.
 * 
 * Approach: Insert all elements into a Set. Only start counting sequence length if num - 1 is NOT in the set (i.e. start of sequence).
 * 
 * Time Complexity: O(N)
 * Space Complexity: O(N)
 */

function longestConsecutive(nums) {
  const set = new Set(nums);
  let maxLength = 0;

  for (let num of set) {
    if (!set.has(num - 1)) {
      let currentNum = num;
      let currentLength = 1;

      while (set.has(currentNum + 1)) {
        currentNum++;
        currentLength++;
      }

      maxLength = Math.max(maxLength, currentLength);
    }
  }

  return maxLength;
}

console.log("Longest Consecutive Sequence:", longestConsecutive([100, 4, 200, 1, 3, 2])); // Expected: 4 ([1,2,3,4])
