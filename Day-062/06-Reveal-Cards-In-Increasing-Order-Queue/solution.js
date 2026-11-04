/**
 * LeetCode 950: Reveal Cards In Increasing Order (Medium)
 * https://leetcode.com/problems/reveal-cards-in-increasing-order/
 *
 * You are given an integer array deck. There is a deck of cards where every card
 * has a unique integer. You can order the deck in any order you want.
 *
 * You do the following steps repeatedly until all cards are revealed:
 * 1. Take the top card of the deck, reveal it, and take it out of the deck.
 * 2. If there are still cards in the deck, take the next top card of the deck
 *    and place it at the bottom of the deck.
 * 3. If there are still unrevealed cards, go back to step 1. Otherwise, stop.
 *
 * Return an ordering of the deck that would reveal the cards in increasing order.
 *
 * Example 1:
 * Input: deck = [17,13,11,2,3,5,7]
 * Output: [2,13,3,11,5,17,7]
 * Explanation:
 * We get the deck in order [2,13,3,11,5,17,7] (this order doesn't matter), and reorder it.
 * After reordering, the deck starts as [2,13,3,11,5,17,7], where 2 is the top of the deck.
 * We reveal 2, and move 13 to the bottom.  The deck is now [3,11,5,17,7,13].
 * We reveal 3, and move 11 to the bottom.  The deck is now [5,17,7,13,11].
 * We reveal 5, and move 17 to the bottom.  The deck is now [7,13,11,17].
 * We reveal 7, and move 13 to the bottom.  The deck is now [11,17,13].
 * We reveal 11, and move 17 to the bottom.  The deck is now [13,17].
 * We reveal 13, and move 17 to the bottom.  The deck is now [17].
 * We reveal 17.
 * Since all the cards revealed are in increasing order, the answer is correct.
 *
 * Example 2:
 * Input: deck = [1,1000]
 * Output: [1,1000]
 *
 * Constraints:
 * - 1 <= deck.length <= 1000
 * - 1 <= deck[i] <= 10^6
 * - All the values of deck are unique.
 *
 * @param {number[]} deck
 * @return {number[]}
 */
function deckRevealedIncreasing(deck) {
    const n = deck.length;
    deck.sort((a, b) => a - b);

    // Queue of indices
    const queue = [];
    for (let i = 0; i < n; i++) {
        queue.push(i);
    }

    const result = new Array(n);

    for (const card of deck) {
        // Step 1: Reveal top card at this index
        const revealIndex = queue.shift();
        result[revealIndex] = card;

        // Step 2: Put next top card to bottom of deck
        if (queue.length > 0) {
            queue.push(queue.shift());
        }
    }

    return result;
}

// Unit tests
function runTests() {
    // Test 1: Example 1
    const res1 = deckRevealedIncreasing([17, 13, 11, 2, 3, 5, 7]);
    const exp1 = [2, 13, 3, 11, 5, 17, 7];
    console.assert(JSON.stringify(res1) === JSON.stringify(exp1), `Test 1 Failed: ${JSON.stringify(res1)}`);

    // Test 2: Example 2
    const res2 = deckRevealedIncreasing([1, 1000]);
    const exp2 = [1, 1000];
    console.assert(JSON.stringify(res2) === JSON.stringify(exp2), `Test 2 Failed: ${JSON.stringify(res2)}`);

    // Test 3: Single element
    const res3 = deckRevealedIncreasing([5]);
    console.assert(JSON.stringify(res3) === JSON.stringify([5]), "Test 3 Failed");

    // Test 4: 4 elements [1, 2, 3, 4] -> [1, 3, 2, 4]
    // reveal 1, move 3 to back -> [2, 4, 3] -> reveal 2, move 4 to back -> [3, 4] -> reveal 3 -> reveal 4
    const res4 = deckRevealedIncreasing([1, 2, 3, 4]);
    console.assert(JSON.stringify(res4) === JSON.stringify([1, 3, 2, 4]), `Test 4 Failed: ${JSON.stringify(res4)}`);

    console.log("All Reveal Cards In Increasing Order tests passed successfully!");
}

runTests();

