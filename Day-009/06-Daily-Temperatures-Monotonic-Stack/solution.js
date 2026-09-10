/*
 * Problem Name: Daily Temperatures
 * Problem Statement: Given an array of integers temperatures represents the daily temperatures, return an array answer 
 * such that answer[i] is the number of days you have to wait after the ith day to get a warmer temperature.
 * 
 * Approach: Monotonic Decreasing Stack storing indices of temperatures.
 * 
 * Time Complexity: O(N)
 * Space Complexity: O(N)
 */

function dailyTemperatures(temperatures) {
  const n = temperatures.length;
  const result = new Array(n).fill(0);
  const stack = []; // Stores indices

  for (let i = 0; i < n; i++) {
    while (stack.length > 0 && temperatures[i] > temperatures[stack[stack.length - 1]]) {
      const prevIndex = stack.pop();
      result[prevIndex] = i - prevIndex;
    }
    stack.push(i);
  }

  return result;
}

console.log("Days to wait:", dailyTemperatures([73, 74, 75, 71, 69, 72, 76, 73]));
// Expected: [1, 1, 4, 2, 1, 1, 0, 0]
