/**
 * ====================================================================
 * Problem: Minimum Genetic Mutation (LeetCode 433)
 * Difficulty: Medium
 * Topic: Hash Table, String, Breadth-First Search
 * ====================================================================
 * 
 * A gene string can be represented by an 8-character long string, with
 * choices from 'A', 'C', 'G', and 'T'.
 * 
 * Suppose we need to investigate a mutation from a gene string startGene
 * to a gene string endGene where one mutation is defined as an 8-character
 * long code where one of the characters has been changed to another character.
 * 
 * For example, "AACCGGTT" --> "AACCGGTA" is 1 mutation.
 * 
 * There is also a gene bank bank that records all the valid gene mutations.
 * A gene must be in bank to make it a valid gene string.
 * 
 * Given the two gene strings startGene and endGene and the gene bank bank,
 * return the minimum number of mutations needed to mutate from startGene
 * to endGene. If there is no such a mutation, return -1.
 * 
 * Note that the starting point is assumed to be valid, so it might not be
 * included in the bank.
 * 
 * Example 1:
 * Input: startGene = "AACCGGTT", endGene = "AACCGGTA", bank = ["AACCGGTA"]
 * Output: 1
 * 
 * Example 2:
 * Input: startGene = "AACCGGTT", endGene = "AAACGGTA", bank = ["AACCGGTA","AACCGCTA","AAACGGTA"]
 * Output: 2
 * 
 * Constraints:
 * - 0 <= bank.length <= 10
 * - startGene.length == endGene.length == bank[i].length == 8
 * - startGene, endGene, and bank[i] consist of only the characters ['A', 'C', 'G', 'T'].
 * ====================================================================
 */

/**
 * Finds minimum mutations using Breadth-First Search (BFS).
 * Level-by-level exploration guarantees the shortest path.
 * 
 * Time Complexity: O(B * L * 4) where B = bank.length, L = 8
 * Space Complexity: O(B) for visited set and BFS queue
 * 
 * @param {string} startGene
 * @param {string} endGene
 * @param {string[]} bank
 * @return {number}
 */
function minMutation(startGene, endGene, bank) {
    const bankSet = new Set(bank);
    if (!bankSet.has(endGene)) {
        return -1;
    }

    const genes = ['A', 'C', 'G', 'T'];
    const queue = [[startGene, 0]];
    const visited = new Set([startGene]);

    while (queue.length > 0) {
        const [currGene, steps] = queue.shift();

        if (currGene === endGene) {
            return steps;
        }

        // Try mutating each of the 8 characters
        for (let i = 0; i < 8; i++) {
            const originalChar = currGene[i];
            for (let g of genes) {
                if (g === originalChar) continue;

                const nextGene = currGene.slice(0, i) + g + currGene.slice(i + 1);

                if (bankSet.has(nextGene) && !visited.has(nextGene)) {
                    visited.add(nextGene);
                    queue.push([nextGene, steps + 1]);
                }
            }
        }
    }

    return -1;
}

// --- Test Suite ---
if (require.main === module) {
    // Test 1: Single mutation
    const r1 = minMutation("AACCGGTT", "AACCGGTA", ["AACCGGTA"]);
    console.assert(r1 === 1, `Test 1 failed: ${r1}`);
    console.log(`Test 1 Passed: result = ${r1}`);

    // Test 2: Two mutations
    const r2 = minMutation("AACCGGTT", "AAACGGTA", ["AACCGGTA", "AACCGCTA", "AAACGGTA"]);
    console.assert(r2 === 2, `Test 2 failed: ${r2}`);
    console.log(`Test 2 Passed: result = ${r2}`);

    // Test 3: Destination not in bank
    const r3 = minMutation("AACCGGTT", "AACCGGTA", []);
    console.assert(r3 === -1, `Test 3 failed: ${r3}`);
    console.log(`Test 3 Passed: result = ${r3}`);

    // Test 4: No valid path to destination
    const r4 = minMutation("AACCGGTT", "AACCGGTA", ["AACCGGTI"]);
    console.assert(r4 === -1, `Test 4 failed: ${r4}`);
    console.log(`Test 4 Passed: result = ${r4}`);

    // Test 5: startGene equals endGene (0 steps)
    const r5 = minMutation("AAAAACCC", "AAAAACCC", ["AAAAACCC"]);
    console.assert(r5 === 0, `Test 5 failed: ${r5}`);
    console.log(`Test 5 Passed: result = ${r5}`);

    console.log("\nAll Minimum Genetic Mutation tests passed successfully!");
}

module.exports = { minMutation };
