r"""
====================================================================
Problem: Map Sum Pairs (LeetCode 677)
Difficulty: Medium
Topic: Hash Table, String, Design, Trie
====================================================================

Design a map that allows you to do the following:
- Maps a string key to a given value.
- Returns the sum of the values that have a key with a prefix equal to
  a given string.

Implement the MapSum class:
- MapSum() Initializes the MapSum object.
- void insert(String key, int val) Inserts the key-val pair into the map.
  If the key already existed, the original key-value pair will be overridden
  to the new one.
- int sum(String prefix) Returns the sum of all the pairs' value whose key
  starts with the prefix.

Example 1:
Input:
["MapSum", "insert", "sum", "insert", "sum"]
[[], ["apple", 3], ["ap"], ["app", 2], ["ap"]]
Output:
[null, null, 3, null, 5]
Explanation:
MapSum mapSum = new MapSum();
mapSum.insert("apple", 3);  
mapSum.sum("ap");           // return 3 (apple = 3)
mapSum.insert("app", 2);    
mapSum.sum("ap");           // return 5 (apple + app = 3 + 2 = 5)

Constraints:
- 1 <= key.length, prefix.length <= 50
- key and prefix consist of only lowercase English letters.
- 1 <= val <= 1000
- At most 50 calls will be made to insert and sum.
====================================================================
"""


class TrieNode:
    def __init__(self):
        self.children = {}
        self.score = 0


class MapSum:
    """
    Trie-based prefix sum accumulator with hash map delta tracking.

    Complexity:
    - insert: O(K) where K is the length of key
    - sum: O(P) where P is the length of prefix
    - Space: O(K * N) where N is number of inserted keys
    """

    def __init__(self):
        self.root = TrieNode()
        self.key_map = {}

    def insert(self, key: str, val: int) -> None:
        delta = val - self.key_map.get(key, 0)
        self.key_map[key] = val

        curr = self.root
        curr.score += delta
        for char in key:
            if char not in curr.children:
                curr.children[char] = TrieNode()
            curr = curr.children[char]
            curr.score += delta

    def sum(self, prefix: str) -> int:
        curr = self.root
        for char in prefix:
            if char not in curr.children:
                return 0
            curr = curr.children[char]
        return curr.score


# --- Test Suite ---
if __name__ == "__main__":
    ms = MapSum()

    # Test 1: Example 1
    ms.insert("apple", 3)
    assert ms.sum("ap") == 3, f"Test 1 failed: expected 3, got {ms.sum('ap')}"

    ms.insert("app", 2)
    assert ms.sum("ap") == 5, f"Test 1b failed: expected 5, got {ms.sum('ap')}"

    # Test 2: Override value
    ms.insert("apple", 5)  # delta = +2 -> sum("ap") should now be 7
    assert ms.sum("ap") == 7, f"Test 2 failed: expected 7, got {ms.sum('ap')}"

    # Test 3: Prefix with no matches
    assert ms.sum("xyz") == 0, "Test 3 failed: non-existent prefix should return 0"

    # Test 4: Exact key as prefix
    assert ms.sum("app") == 7, "Test 4 failed: prefix 'app' matches 'app' and 'apple'"

    print("All Map Sum Pairs tests passed successfully!")
