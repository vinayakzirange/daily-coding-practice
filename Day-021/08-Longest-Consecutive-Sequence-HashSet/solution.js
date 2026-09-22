/**
 * Problem: Longest Consecutive Sequence
 * Topic: HashSet Lookup / Array O(N)
 * Language: JavaScript
 *
 * Approach:
 * Insert all numbers into a Set. Iterate through set elements; if (num - 1) is NOT in set,
 * 'num' is the start of a consecutive sequence! Count sequence length by incrementing num + 1.
 *
 * Time Complexity: O(N)
 * Space Complexity: O(N)
 */

function longestConsecutive(nums) {
    const set = new Set(nums);
    let maxStreak = 0;

    for (let num of set) {
        // Only start sequence if 'num' is the first element of sequence
        if (!set.has(num - 1)) {
            let currentNum = num;
            let currentStreak = 1;

            while (set.has(currentNum + 1)) {
                currentNum += 1;
                currentStreak += 1;
            }

            if (currentStreak > maxStreak) {
                maxStreak = currentStreak;
            }
        }
    }
    return maxStreak;
}

// Test cases
console.log("[100, 4, 200, 1, 3, 2] ->", longestConsecutive([100, 4, 200, 1, 3, 2])); // 4 ([1,2,3,4])
console.log("[0,3,7,2,5,8,4,6,0,1] ->", longestConsecutive([0, 3, 7, 2, 5, 8, 4, 6, 0, 1])); // 9
