/**
 * LeetCode 904: Fruit Into Baskets (Medium)
 * https://leetcode.com/problems/fruit-into-baskets/
 *
 * You are visiting a farm that has a single row of fruit trees arranged from left to right.
 * The trees are represented by an integer array fruits where fruits[i] is the type of fruit
 * the ith tree produces.
 *
 * You have two baskets, and each basket can only hold a single type of fruit. There is no
 * limit on the amount of fruit each basket can hold.
 *
 * Starting from any tree of your choice, you must pick exactly one fruit from every tree
 * (including the start tree) while moving to the right. The picked fruits must fit in one of
 * your baskets. Once you reach a tree with fruit that cannot fit in your baskets, you must stop.
 *
 * Given the integer array fruits, return the maximum number of fruits you can pick.
 *
 * Example 1:
 * Input: fruits = [1,2,1]
 * Output: 3
 * Explanation: We can pick from all 3 trees.
 *
 * Example 2:
 * Input: fruits = [0,1,2,2]
 * Output: 3
 * Explanation: We can pick from trees [1,2,2]. If we had started at tree 0, we would only pick [0,1].
 *
 * Example 3:
 * Input: fruits = [1,2,3,2,2]
 * Output: 4
 * Explanation: We can pick from trees [2,3,2,2].
 *
 * Constraints:
 * - 1 <= fruits.length <= 10^5
 * - 0 <= fruits[i] < fruits.length
 *
 * @param {number[]} fruits
 * @return {number}
 */
function totalFruit(fruits) {
    const basket = new Map();
    let left = 0;
    let maxFruits = 0;

    for (let right = 0; right < fruits.length; right++) {
        const f = fruits[right];
        basket.set(f, (basket.get(f) || 0) + 1);

        // If we have more than 2 types of fruit, shrink window from left
        while (basket.size > 2) {
            const leftFruit = fruits[left];
            const count = basket.get(leftFruit) - 1;
            if (count === 0) {
                basket.delete(leftFruit);
            } else {
                basket.set(leftFruit, count);
            }
            left++;
        }

        maxFruits = Math.max(maxFruits, right - left + 1);
    }

    return maxFruits;
}

// Unit tests
function runTests() {
    // Test 1: [1,2,1] -> 3
    console.assert(totalFruit([1, 2, 1]) === 3, "Test 1 Failed");

    // Test 2: [0,1,2,2] -> 3
    console.assert(totalFruit([0, 1, 2, 2]) === 3, "Test 2 Failed");

    // Test 3: [1,2,3,2,2] -> 4
    console.assert(totalFruit([1, 2, 3, 2, 2]) === 4, "Test 3 Failed");

    // Test 4: Single fruit type
    console.assert(totalFruit([3, 3, 3, 3]) === 4, "Test 4 Failed");

    // Test 5: Alternating fruit types
    console.assert(totalFruit([1, 0, 1, 4, 1, 4, 1, 2, 3]) === 5, "Test 5 Failed");

    console.log("All Fruit Into Baskets tests passed successfully!");
}

runTests();

