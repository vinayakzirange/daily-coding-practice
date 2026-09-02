const fs = require('fs');
const path = require('path');

const problems = [
  { dir: '01-Two-Sum', name: 'Two Sum', content: `/*
 * Problem: Two Sum
 * Approach: Hash Map to store complement and index
 * Time Complexity: O(N)
 * Space Complexity: O(N)
 */
function twoSum(nums, target) {
  const map = new Map();
  for (let i = 0; i < nums.length; i++) {
    const complement = target - nums[i];
    if (map.has(complement)) return [map.get(complement), i];
    map.set(nums[i], i);
  }
  return [];
}
console.log(twoSum([2, 7, 11, 15], 9)); // [0, 1]
` },
  { dir: '02-Reverse-String', name: 'Reverse String', content: `/*
 * Problem: Reverse String
 * Approach: Two pointers (in-place)
 * Time Complexity: O(N)
 * Space Complexity: O(1)
 */
function reverseString(s) {
  let left = 0, right = s.length - 1;
  while (left < right) {
    let temp = s[left];
    s[left] = s[right];
    s[right] = temp;
    left++; right--;
  }
}
let arr = ['h','e','l','l','o'];
reverseString(arr);
console.log(arr); // ['o','l','l','e','h']
` },
  { dir: '03-Find-Maximum', name: 'Find Maximum in Array', content: `/*
 * Problem: Find Maximum
 * Approach: Linear scan
 * Time Complexity: O(N)
 * Space Complexity: O(1)
 */
function findMax(nums) {
  if (nums.length === 0) return null;
  let max = nums[0];
  for(let n of nums) if(n > max) max = n;
  return max;
}
console.log(findMax([3, 1, 4, 1, 5, 9])); // 9
` },
  { dir: '04-Second-Largest', name: 'Second Largest Element', content: `/*
 * Problem: Second Largest Element
 * Approach: Keep track of largest and second largest
 * Time Complexity: O(N)
 * Space Complexity: O(1)
 */
function secondLargest(nums) {
  let first = -Infinity, second = -Infinity;
  for(let n of nums) {
    if(n > first) { second = first; first = n; }
    else if(n > second && n < first) { second = n; }
  }
  return second === -Infinity ? null : second;
}
console.log(secondLargest([10, 5, 10])); // 5
` },
  { dir: '05-Palindrome', name: 'Valid Palindrome', content: `/*
 * Problem: Valid Palindrome
 * Approach: Two pointers, skip non-alphanumeric
 * Time Complexity: O(N)
 * Space Complexity: O(1)
 */
function isPalindrome(s) {
  s = s.toLowerCase().replace(/[^a-z0-9]/g, '');
  let l = 0, r = s.length - 1;
  while(l < r) {
    if(s[l++] !== s[r--]) return false;
  }
  return true;
}
console.log(isPalindrome("A man, a plan, a canal: Panama")); // true
` },
  { dir: '06-Count-Vowels', name: 'Count Vowels', content: `/*
 * Problem: Count Vowels
 * Approach: Iteration and Set lookup
 * Time Complexity: O(N)
 * Space Complexity: O(1)
 */
function countVowels(s) {
  let count = 0;
  const vowels = new Set(['a','e','i','o','u','A','E','I','O','U']);
  for(let char of s) if(vowels.has(char)) count++;
  return count;
}
console.log(countVowels("Hello World")); // 3
` },
  { dir: '07-Factorial', name: 'Factorial', content: `/*
 * Problem: Factorial
 * Approach: Recursion
 * Time Complexity: O(N)
 * Space Complexity: O(N) auxiliary stack space
 */
function factorial(n) {
  if (n <= 1) return 1;
  return n * factorial(n - 1);
}
console.log(factorial(5)); // 120
` },
  { dir: '08-Fibonacci', name: 'Fibonacci Number', content: `/*
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
` },
  { dir: '09-Binary-Search', name: 'Binary Search', content: `/*
 * Problem: Binary Search
 * Approach: Pointers for left and right bounds
 * Time Complexity: O(log N)
 * Space Complexity: O(1)
 */
function binarySearch(nums, target) {
  let l = 0, r = nums.length - 1;
  while(l <= r) {
    let mid = Math.floor((l + r) / 2);
    if(nums[mid] === target) return mid;
    else if(nums[mid] < target) l = mid + 1;
    else r = mid - 1;
  }
  return -1;
}
console.log(binarySearch([-1,0,3,5,9,12], 9)); // 4
` },
  { dir: '10-Remove-Duplicates', name: 'Remove Duplicates from Sorted Array', content: `/*
 * Problem: Remove Duplicates
 * Approach: Two pointers (slow and fast)
 * Time Complexity: O(N)
 * Space Complexity: O(1)
 */
function removeDuplicates(nums) {
  if(nums.length === 0) return 0;
  let i = 0;
  for(let j = 1; j < nums.length; j++) {
    if(nums[j] !== nums[i]) {
      i++;
      nums[i] = nums[j];
    }
  }
  return i + 1;
}
let arr = [1,1,2];
let len = removeDuplicates(arr);
console.log(arr.slice(0, len)); // [1, 2]
` }
];

const basePath = path.join(__dirname, 'Day-001');
if(!fs.existsSync(basePath)) fs.mkdirSync(basePath);

for(let p of problems) {
  const dirPath = path.join(basePath, p.dir);
  if(!fs.existsSync(dirPath)) fs.mkdirSync(dirPath);
  fs.writeFileSync(path.join(dirPath, 'solution.js'), p.content);
}
console.log("Created Day 001 files.");
