/**
 * Problem: Task Scheduler
 * Topic: Greedy / Frequency Counting / CPU Intervals
 * Language: JavaScript
 *
 * Approach:
 * Count frequencies of each task. Find max frequency (maxFreq) and count how many tasks share maxFreq (maxCount).
 * Minimal execution time formula = (maxFreq - 1) * (n + 1) + maxCount.
 * Answer is max(formulaResult, tasks.length).
 *
 * Time Complexity: O(N)
 * Space Complexity: O(1)
 */

function leastInterval(tasks, n) {
    const freqs = new Array(26).fill(0);
    const codeA = 'A'.charCodeAt(0);
    for (let t of tasks) {
        freqs[t.charCodeAt(0) - codeA]++;
    }

    freqs.sort((a, b) => b - a);
    const maxFreq = freqs[0];
    let maxCount = 0;

    for (let f of freqs) {
        if (f === maxFreq) maxCount++;
    }

    const calculatedTime = (maxFreq - 1) * (n + 1) + maxCount;
    return Math.max(calculatedTime, tasks.length);
}

// Test cases
console.log("['A','A','A','B','B','B'], n=2 ->", leastInterval(["A","A","A","B","B","B"], 2)); // 8
console.log("['A','C','A','B','D','B'], n=1 ->", leastInterval(["A","C","A","B","D","B"], 1)); // 6
