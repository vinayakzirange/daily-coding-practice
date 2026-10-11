"""
Problem: Time Based Key-Value Store (LeetCode 981)
Difficulty: Medium
Topic: Hash Table / String / Binary Search / Design

Description:
Design a time-based key-value data structure that can store multiple values for the
same key at different time stamps and retrieve the key's value at a certain timestamp.

Implement the TimeMap class:
  * TimeMap() Initializes the object of the data structure.
  * void set(String key, String value, int timestamp) Stores the key key with the value
    value at the given time timestamp.
  * String get(String key, int timestamp) Returns a value such that set was called
    previously, with timestamp_prev <= timestamp. If there are multiple such values,
    it returns the value associated with the largest timestamp_prev. If there are no
    values, it returns "".

Example 1:
Input
["TimeMap", "set", "get", "get", "set", "get", "get"]
[[], ["foo", "bar", 1], ["foo", 1], ["foo", 3], ["foo", "bar2", 4], ["foo", 4], ["foo", 5]]
Output
[null, null, "bar", "bar", null, "bar2", "bar2"]

Explanation
TimeMap timeMap = new TimeMap();
timeMap.set("foo", "bar", 1);  // store the key "foo" and value "bar" along with timestamp = 1.
timeMap.get("foo", 1);         // return "bar"
timeMap.get("foo", 3);         // return "bar", since there is no value corresponding to timestamp 3 and timestamp 2, then the only value is at timestamp 1 is "bar".
timeMap.set("foo", "bar2", 4); // store the key "foo" and value "bar2" along with timestamp = 4.
timeMap.get("foo", 4);         // return "bar2"
timeMap.get("foo", 5);         // return "bar2"

Constraints:
  * 1 <= key.length, value.length <= 100
  * key and value consist of lowercase English letters and digits.
  * 1 <= timestamp <= 10^7
  * All the timestamps timestamp of set are strictly increasing.
  * At most 2 * 10^5 calls will be made to set and get.

Complexity:
  * Time Complexity: O(1) for set(), O(log n) for get() via binary search.
  * Space Complexity: O(n) total elements stored across all keys.
"""

from bisect import bisect_right
from collections import defaultdict


class TimeMap:
    def __init__(self):
        # Store key -> list of (timestamp, value)
        self.store = defaultdict(list)

    def set(self, key: str, value: str, timestamp: int) -> None:
        self.store[key].append((timestamp, value))

    def get(self, key: str, timestamp: int) -> str:
        if key not in self.store:
            return ""

        values = self.store[key]

        # Binary search for rightmost entry with entry_timestamp <= timestamp
        left, right = 0, len(values) - 1
        res = ""

        while left <= right:
            mid = left + (right - left) // 2
            if values[mid][0] <= timestamp:
                res = values[mid][1]
                left = mid + 1
            else:
                right = mid - 1

        return res


# ==========================================
# Test Cases & Verification
# ==========================================
if __name__ == "__main__":
    tm = TimeMap()

    tm.set("foo", "bar", 1)
    assert tm.get("foo", 1) == "bar", "Test 1 Failed"
    print("Test 1 Passed: get('foo', 1) -> 'bar'")

    assert tm.get("foo", 3) == "bar", "Test 2 Failed"
    print("Test 2 Passed: get('foo', 3) -> 'bar'")

    tm.set("foo", "bar2", 4)
    assert tm.get("foo", 4) == "bar2", "Test 3 Failed"
    print("Test 3 Passed: get('foo', 4) -> 'bar2'")

    assert tm.get("foo", 5) == "bar2", "Test 4 Failed"
    print("Test 4 Passed: get('foo', 5) -> 'bar2'")

    assert tm.get("foo", 0) == "", "Test 5 Failed"
    print("Test 5 Passed: get('foo', 0) -> ''")

    assert tm.get("nonexistent", 10) == "", "Test 6 Failed"
    print("Test 6 Passed: get('nonexistent', 10) -> ''")

    print("\nAll Time Based Key-Value Store tests passed successfully!")
