/**
 * Problem: Top K Frequent Elements
 * Topic: HashMap / Bucket Sort / Bucket Array
 * Language: JavaScript
 *
 * Approach:
 * 1. Count element frequencies with Map.
 * 2. Create frequency buckets array where index = frequency count.
 * 3. Traverse buckets right-to-left to gather top K frequent elements.
 *
 * Time Complexity: O(N)
 * Space Complexity: O(N)
 */

function topKFrequent(nums, k) {
    const map = new Map();
    for (let num of nums) {
        map.set(num, (map.get(num) || 0) + 1);
    }

    const buckets = Array.from({ length: nums.length + 1 }, () => []);
    for (let [num, freq] of map.entries()) {
        buckets[freq].push(num);
    }

    const result = [];
    for (let i = buckets.length - 1; i >= 0 && result.length < k; i--) {
        if (buckets[i].length > 0) {
            result.push(...buckets[i]);
        }
    }

    return result.slice(0, k);
}

// Test cases
console.log("[1,1,1,2,2,3], k=2 ->", topKFrequent([1, 1, 1, 2, 2, 3], 2)); // [1, 2]
console.log("[1], k=1 ->", topKFrequent([1], 1)); // [1]
