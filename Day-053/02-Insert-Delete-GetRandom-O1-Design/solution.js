/**
 * ====================================================================
 * Problem: Insert Delete GetRandom O(1) (LeetCode 380)
 * Difficulty: Medium
 * Topic: Array, Hash Table, Math, Design, Randomized
 * ====================================================================
 * 
 * Implement the RandomizedSet class:
 * 
 * - RandomizedSet() Initializes the RandomizedSet object.
 * - bool insert(int val) Inserts an item val into the set if not present.
 *   Returns true if the item was not present, false otherwise.
 * - bool remove(int val) Removes an item val from the set if present.
 *   Returns true if the item was present, false otherwise.
 * - int getRandom() Returns a random element from the current set of elements
 *   (it's guaranteed that at least one element exists when this method is called).
 *   Each element must have the same probability of being returned.
 * 
 * You must implement the functions of the class such that each function
 * works in average O(1) time complexity.
 * 
 * Example 1:
 * Input:
 * ["RandomizedSet", "insert", "remove", "insert", "getRandom", "remove", "insert", "getRandom"]
 * [[], [1], [2], [2], [], [1], [2], []]
 * Output:
 * [null, true, false, true, 2, true, false, 2]
 * 
 * Constraints:
 * - -2^31 <= val <= 2^31 - 1
 * - At most 2 * 10^5 calls will be made to insert, remove, and getRandom.
 * - There will be at least one element in the data structure when getRandom is called.
 * ====================================================================
 */

/**
 * Data structure supporting O(1) insert, delete, and getRandom.
 * Uses a dynamic array for O(1) random index access and a hash map
 * mapping values to their indices in the array. Deletions swap the
 * target element with the last element in O(1) time before popping.
 */
class RandomizedSet {
    constructor() {
        this.valToIndex = new Map();
        this.nums = [];
    }

    /**
     * Inserts a value to the set. Returns true if the set did not already contain the specified element.
     * @param {number} val
     * @return {boolean}
     */
    insert(val) {
        if (this.valToIndex.has(val)) {
            return false;
        }
        this.valToIndex.set(val, this.nums.length);
        this.nums.push(val);
        return true;
    }

    /**
     * Removes a value from the set. Returns true if the set contained the specified element.
     * @param {number} val
     * @return {boolean}
     */
    remove(val) {
        if (!this.valToIndex.has(val)) {
            return false;
        }
        const indexToRemove = this.valToIndex.get(val);
        const lastElement = this.nums[this.nums.length - 1];

        // Move the last element to the place of the element to delete
        this.nums[indexToRemove] = lastElement;
        this.valToIndex.set(lastElement, indexToRemove);

        // Remove the last element
        this.nums.pop();
        this.valToIndex.delete(val);

        return true;
    }

    /**
     * Get a random element from the set.
     * @return {number}
     */
    getRandom() {
        const randomIndex = Math.floor(Math.random() * this.nums.length);
        return this.nums[randomIndex];
    }
}

// --- Test Suite ---
if (require.main === module) {
    const randomizedSet = new RandomizedSet();

    // Test 1: insert 1 -> returns true
    console.assert(randomizedSet.insert(1) === true, "Test 1 Failed: insert(1) should return true");

    // Test 2: remove 2 -> returns false (not present)
    console.assert(randomizedSet.remove(2) === false, "Test 2 Failed: remove(2) should return false");

    // Test 3: insert 2 -> returns true
    console.assert(randomizedSet.insert(2) === true, "Test 3 Failed: insert(2) should return true");

    // Test 4: getRandom -> should return either 1 or 2
    const randVal1 = randomizedSet.getRandom();
    console.assert(randVal1 === 1 || randVal1 === 2, "Test 4 Failed: getRandom should return 1 or 2");

    // Test 5: remove 1 -> returns true
    console.assert(randomizedSet.remove(1) === true, "Test 5 Failed: remove(1) should return true");

    // Test 6: insert 2 -> returns false (already present)
    console.assert(randomizedSet.insert(2) === false, "Test 6 Failed: insert(2) should return false");

    // Test 7: getRandom -> should always return 2 since only 2 remains
    console.assert(randomizedSet.getRandom() === 2, "Test 7 Failed: getRandom should return 2");

    // Test 8: Multiple insertions and removals to verify index tracking
    const rSet2 = new RandomizedSet();
    rSet2.insert(10);
    rSet2.insert(20);
    rSet2.insert(30);
    rSet2.insert(40);
    rSet2.remove(20);
    console.assert(rSet2.remove(20) === false, "Test 8 Failed: removing already removed 20 should be false");
    console.assert(rSet2.nums.length === 3, "Test 8 Failed: size should be 3");

    console.log("All RandomizedSet operations verified successfully!");
    console.log("All Insert Delete GetRandom O(1) tests passed successfully!");
}

module.exports = { RandomizedSet };
