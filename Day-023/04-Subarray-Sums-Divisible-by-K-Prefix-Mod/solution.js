/**
 * Problem: Subarray Sums Divisible by K
 * Topic: Prefix Sum / Modulo Arithmetic / HashMap
 * Language: JavaScript
 *
 * Approach:
 * Compute running prefix sum. Calculate remainder = (prefixSum % k + k) % k (handles negative numbers).
 * Count matching remainders in frequency map.
 *
 * Time Complexity: O(N)
 * Space Complexity: O(K)
 */

function subarraysDivByK(nums, k) {
    const modMap = new Array(k).fill(0);
    modMap[0] = 1; // Base case: prefix sum of 0 has remainder 0
    let prefixSum = 0;
    let count = 0;

    for (let num of nums) {
        prefixSum += num;
        let remainder = ((prefixSum % k) + k) % k;
        count += modMap[remainder];
        modMap[remainder]++;
    }

    return count;
}

// Test cases
console.log("[4,5,0,-2,-3,1], k=5 ->", subarraysDivByK([4, 5, 0, -2, -3, 1], 5)); // 7
console.log("[5], k=9 ->", subarraysDivByK([5], 9)); // 0
