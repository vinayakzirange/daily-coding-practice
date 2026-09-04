/*
 * Problem Name: Climbing Stairs
 * Problem Statement: You are climbing a staircase. It takes n steps to reach the top.
 * Each time you can either climb 1 or 2 steps. In how many distinct ways can you climb to the top?
 * 
 * Approach: Basic Dynamic Programming / Fibonacci sequence.
 * dp[i] = dp[i-1] + dp[i-2]
 * Optimized to O(1) space using two variables.
 * 
 * Time Complexity: O(N)
 * Space Complexity: O(1)
 */

function climbStairs(n) {
  if (n <= 2) return n;
  let first = 1;
  let second = 2;

  for (let i = 3; i <= n; i++) {
    let third = first + second;
    first = second;
    second = third;
  }

  return second;
}

console.log("Ways to climb 5 stairs:", climbStairs(5)); // Expected: 8
