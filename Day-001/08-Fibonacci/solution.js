/*
 * Problem: Fibonacci Number
 * Approach: Iterative (Bottom-up DP)
 * Time Complexity: O(N)
 * Space Complexity: O(1)
 */
function fibonacci(n) {
  if (n <= 1) return n;
  let a = 0, b = 1;
  for(let i = 2; i <= n; i++) {
    let temp = a + b;
    a = b;
    b = temp;
  }
  return b;
}
console.log(fibonacci(10)); // 55
