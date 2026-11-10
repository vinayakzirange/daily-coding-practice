"""
Problem: Snapshot Array (LeetCode 1146)
Difficulty: Medium
Language: Python

Implement a SnapshotArray that supports the following interface:
    - SnapshotArray(int length) initializes an array-like data structure with the given length.
      Initially, each element equals 0.
    - void set(index, val) sets the element at the given index to be equal to val.
    - int snap() takes a snapshot of the array and returns the snap_id: the total number of times
      we called snap() minus 1.
    - int get(index, snap_id) returns the value at the given index, at the time we took the snapshot
      with the given snap_id.

Example 1:
    Input: ["SnapshotArray","set","snap","set","get"]
           [[3],[0,5],[],[0,6],[0,0]]
    Output: [null,null,0,null,5]
    Explanation:
        SnapshotArray snapshotArr = new SnapshotArray(3); // set the length to be 3
        snapshotArr.set(0,5);  // Set array[0] = 5
        snapshotArr.snap();  // Take a snapshot, return snap_id = 0
        snapshotArr.set(0,6);
        snapshotArr.get(0,0);  // Get the value of array[0] with snap_id = 0, return 5

Constraints:
    1 <= length <= 5 * 10^4
    0 <= index < length
    0 <= val <= 10^9
    0 <= snap_id < (the total number of times we call snap())
    At most 5 * 10^4 calls will be made to set, snap, and get.
"""

import bisect
from typing import List, Tuple


class SnapshotArray:
    """
    Space-efficient Snapshot Array recording changes per index and using binary search for retrieval.
    
    Complexity:
        set: O(1) amortized.
        snap: O(1) time.
        get: O(log(S)) where S is the number of updates made to the queried index.
        Space: O(U) where U is total number of set operations performed.
    """
    def __init__(self, length: int):
        self.current_snap_id = 0
        # For each index, maintain a list of (snap_id, val) entries
        self.history: List[List[Tuple[int, int]]] = [[(0, 0)] for _ in range(length)]

    def set(self, index: int, val: int) -> None:
        rec = self.history[index]
        # If the last record in history belongs to the current snapshot, update it in-place
        if rec[-1][0] == self.current_snap_id:
            rec[-1] = (self.current_snap_id, val)
        else:
            rec.append((self.current_snap_id, val))

    def snap(self) -> int:
        self.current_snap_id += 1
        return self.current_snap_id - 1

    def get(self, index: int, snap_id: int) -> int:
        rec = self.history[index]
        # Binary search for the rightmost record with record_snap_id <= snap_id
        # bisect_right on list of tuples using a key tuple (snap_id, infinity)
        idx = bisect.bisect_right(rec, (snap_id, float('inf'))) - 1
        return rec[idx][1]


if __name__ == "__main__":
    # Test 1: Example 1
    sa = SnapshotArray(3)
    sa.set(0, 5)
    s0 = sa.snap()
    assert s0 == 0, f"Expected snap_id 0, got {s0}"
    sa.set(0, 6)
    val = sa.get(0, 0)
    assert val == 5, f"Expected 5, got {val}"
    s1 = sa.snap()
    assert s1 == 1, f"Expected snap_id 1, got {s1}"
    assert sa.get(0, 1) == 6, "Expected 6"

    # Test 2: Multiple indices & untouched indices default to 0
    sa2 = SnapshotArray(5)
    sa2.set(2, 100)
    snap0 = sa2.snap()
    assert sa2.get(0, snap0) == 0, "Untouched index must return 0"
    assert sa2.get(2, snap0) == 100, "Modified index must return 100"

    # Test 3: Overwriting same snap_id
    sa3 = SnapshotArray(2)
    sa3.set(1, 10)
    sa3.set(1, 20)
    sa3.set(1, 30)
    snap = sa3.snap()
    assert sa3.get(1, snap) == 30, "Should get latest value in the snapshot"

    # Test 4: Multiple snaps without intermediate set calls
    sa4 = SnapshotArray(1)
    sa4.set(0, 42)
    id1 = sa4.snap()
    id2 = sa4.snap()
    id3 = sa4.snap()
    assert sa4.get(0, id1) == 42
    assert sa4.get(0, id2) == 42
    assert sa4.get(0, id3) == 42

    print("All Snapshot Array tests passed successfully!")

