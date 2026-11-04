r"""
LeetCode 911: Online Election (Medium)
https://leetcode.com/problems/online-election/

You are given two integer arrays persons and times. In an election, the ith vote
was cast for persons[i] at time times[i].

For each query at a time t, find the person that was leading the election at time t.
Votes cast at time t will count towards our query. In the case of a tie, the most
recent vote (among tied candidates) wins.

Implement the TopVotedCandidate class:
- TopVotedCandidate(int[] persons, int[] times) Initializes the object with the persons and times arrays.
- int q(int t) Returns the number of the person that was leading the election at time t according to the mentioned rules.

Example 1:
Input:
["TopVotedCandidate", "q", "q", "q", "q", "q", "q"]
[[[0, 1, 1, 0, 0, 1, 0], [0, 5, 10, 15, 20, 25, 30]], [3], [12], [25], [15], [24], [8]]
Output:
[null, 0, 1, 1, 0, 0, 1]

Explanation:
At time 3, the votes are [0], and 0 is leading.
At time 12, the votes are [0,1,1], and 1 is leading.
At time 25, the votes are [0,1,1,0,0,1], and 1 is leading (as 1 was the most recent vote among ties).
At time 15, 0 is leading.
At time 24, 0 is leading.
At time 8, 1 is leading.

Constraints:
- 1 <= persons.length <= 5000
- times.length == persons.length
- 0 <= persons[i] < persons.length
- times is strictly increasing: 0 <= times[i] <= 10^9
- times[0] <= t <= 10^9
- At most 10^4 calls will be made to q.
"""

from typing import List
from collections import defaultdict
import bisect


class TopVotedCandidate:
    def __init__(self, persons: List[int], times: List[int]):
        """
        Precompute the leader at each vote timestamp:
        Maintain a vote counter and the current leader. If the current candidate's
        vote count is >= max_votes, they become the new leader (ties break towards
        the most recent vote).

        Time Complexity: O(N) where N is len(persons).
        Space Complexity: O(N) to store leaders and times.
        """
        self.times = times
        self.leaders = []
        counts = defaultdict(int)
        current_leader = -1
        max_votes = 0

        for p in persons:
            counts[p] += 1
            if counts[p] >= max_votes:
                current_leader = p
                max_votes = counts[p]
            self.leaders.append(current_leader)

    def q(self, t: int) -> int:
        """
        Binary search for the latest timestamp <= t using bisect_right:
        idx = bisect_right(times, t) - 1 gives the latest vote cast at or before time t.

        Time Complexity: O(log N) per query.
        Space Complexity: O(1) auxiliary per query.
        """
        idx = bisect.bisect_right(self.times, t) - 1
        return self.leaders[idx]


if __name__ == "__main__":
    # Test Case 1: Example 1
    persons = [0, 1, 1, 0, 0, 1, 0]
    times = [0, 5, 10, 15, 20, 25, 30]
    tvc = TopVotedCandidate(persons, times)

    queries = [3, 12, 25, 15, 24, 8]
    expected = [0, 1, 1, 0, 0, 1]
    results = [tvc.q(t) for t in queries]
    assert results == expected, f"Test 1 Failed: {results} != {expected}"

    # Test Case 2: Exact timestamp queries
    assert tvc.q(0) == 0
    assert tvc.q(5) == 1
    assert tvc.q(10) == 1
    assert tvc.q(30) == 0

    # Test Case 3: Query far beyond the last timestamp
    assert tvc.q(100) == 0

    # Test Case 4: Single voter
    single = TopVotedCandidate([42], [10])
    assert single.q(10) == 42
    assert single.q(1000) == 42

    print("All Online Election tests passed successfully!")
