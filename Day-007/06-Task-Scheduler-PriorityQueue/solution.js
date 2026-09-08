/*
 * Problem Name: Task Scheduler
 * Problem Statement: Given a characters array tasks, representing the tasks a CPU needs to do, 
 * and a non-negative integer n representing the cooling period between two same tasks, 
 * return the least number of units of times that the CPU will take to finish all the given tasks.
 * 
 * Approach: Math / Frequency count approach. Max frequency task determines minimum slots needed.
 * 
 * Time Complexity: O(N)
 * Space Complexity: O(1) (26 task types)
 */

function leastInterval(tasks, n) {
  const freq = {};
  let maxFreq = 0;

  for (let task of tasks) {
    freq[task] = (freq[task] || 0) + 1;
    maxFreq = Math.max(maxFreq, freq[task]);
  }

  let maxFreqCount = 0;
  for (let task in freq) {
    if (freq[task] === maxFreq) {
      maxFreqCount++;
    }
  }

  const partCount = maxFreq - 1;
  const partLength = n - (maxFreqCount - 1);
  const emptySlots = partCount * Math.max(0, partLength);
  const availableTasks = tasks.length - (maxFreq * maxFreqCount);
  const idles = Math.max(0, emptySlots - availableTasks);

  return tasks.length + idles;
}

console.log("Least interval for ['A','A','A','B','B','B'] with n=2:", leastInterval(["A","A","A","B","B","B"], 2)); // Expected: 8
