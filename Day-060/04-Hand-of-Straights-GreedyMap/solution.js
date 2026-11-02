/**
 * LeetCode 846: Hand of Straights (Medium)
 * https://leetcode.com/problems/hand-of-straights/
 *
 * Alice has some number of cards and she wants to rearrange the cards into groups so that
 * each group is of size groupSize, and consists of groupSize consecutive cards.
 *
 * Given an integer array hand where hand[i] is the value written on the ith card
 * and an integer groupSize, return true if she can rearrange the cards, or false otherwise.
 *
 * Example 1:
 * Input: hand = [1,2,3,6,2,3,4,7,8], groupSize = 3
 * Output: true
 * Explanation: Alice's hand can be rearranged as [1,2,3], [2,3,4], [6,7,8]
 *
 * Example 2:
 * Input: hand = [1,2,3,4,5], groupSize = 4
 * Output: false
 * Explanation: Alice's hand cannot be rearranged into groups of 4.
 *
 * Constraints:
 * - 1 <= hand.length <= 10^4
 * - 0 <= hand[i] <= 10^9
 * - 1 <= groupSize <= hand.length
 *
 * @param {number[]} hand
 * @param {number} groupSize
 * @return {boolean}
 */
function isNStraightHand(hand, groupSize) {
    if (hand.length % groupSize !== 0) {
        return false;
    }
    if (groupSize === 1) {
        return true;
    }

    // Build frequency map
    const count = new Map();
    for (const card of hand) {
        count.set(card, (count.get(card) || 0) + 1);
    }

    // Sort unique cards
    const sortedKeys = Array.from(count.keys()).sort((a, b) => a - b);

    for (const card of sortedKeys) {
        const freq = count.get(card);
        if (freq > 0) {
            // Need 'freq' consecutive sequences starting at 'card'
            for (let i = 0; i < groupSize; i++) {
                const nextCard = card + i;
                const nextFreq = count.get(nextCard) || 0;
                if (nextFreq < freq) {
                    return false;
                }
                count.set(nextCard, nextFreq - freq);
            }
        }
    }

    return true;
}

// Unit tests
function runTests() {
    // Test 1: Standard valid case
    console.assert(isNStraightHand([1, 2, 3, 6, 2, 3, 4, 7, 8], 3) === true, "Test 1 Failed");

    // Test 2: Standard invalid case (cannot form consecutive size 4)
    console.assert(isNStraightHand([1, 2, 3, 4, 5], 4) === false, "Test 2 Failed");

    // Test 3: groupSize = 1 is always valid
    console.assert(isNStraightHand([5, 1, 9, 2], 1) === true, "Test 3 Failed");

    // Test 4: Cannot divide into groups
    console.assert(isNStraightHand([1, 2, 3], 2) === false, "Test 4 Failed");

    // Test 5: Duplicate consecutive blocks
    // [1,2,3], [1,2,3]
    console.assert(isNStraightHand([1, 1, 2, 2, 3, 3], 3) === true, "Test 5 Failed");

    console.log("All Hand of Straights tests passed successfully!");
}

runTests();
