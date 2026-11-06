r"""
LeetCode 1024: Video Stitching (Medium)
https://leetcode.com/problems/video-stitching/

You are given a series of video clips from a sporting event that lasted time seconds.
These video clips can be overlapping with each other and have varied lengths.

Each video clip is described by an array clips where clips[i] = [start_i, end_i] indicates
that the ith clip started at start_i and ended at end_i.

We can cut these clips into segments freely.
- For example, a clip [0, 7] can be cut into segments [0, 1] + [1, 3] + [3, 7].

Return the minimum number of clips needed so that we can cut the sporting event into a collection
of clips that covers the entire sporting event [0, time]. If the task is impossible, return -1.

Example 1:
Input: clips = [[0,2],[4,6],[8,10],[1,9],[1,5],[5,9]], time = 10
Output: 3
Explanation: We take clips [0,2], [8,10], [1,9]; a total of 3 clips.
Then, we can cut the clips into [0,2] + [2,8] + [8,10] to cover the sporting event [0, 10].

Example 2:
Input: clips = [[0,1],[1,2]], time = 5
Output: -1
Explanation: We cannot cover [0,5] with only these clips.

Example 3:
Input: clips = [[0,1],[6,8],[0,2],[5,6],[0,4],[0,3],[6,7],[1,3],[4,7],[1,4],[2,5],[2,6],[3,4],[4,5],[5,7],[6,9]], time = 9
Output: 3

Constraints:
- 1 <= clips.length <= 100
- 0 <= start_i <= end_i <= 100
- 1 <= time <= 100
"""

from typing import List


class Solution:
    def videoStitching(self, clips: List[List[int]], time: int) -> int:
        """
        Greedy Jump Game Approach:
        Precompute max_reach[start], which records the furthest end time reachable
        from any clip that starts at or before `start`.

        We iterate through each second `i` from 0 to time - 1:
          - Maintain next_reach: the furthest right boundary we can jump to using clips available so far.
          - When i reaches cur_reach (the end of the current clip choice):
            - We must take another clip: increment count.
            - Update cur_reach = next_reach.
            - If cur_reach <= i, it means we cannot advance beyond i, so covering [0, time] is impossible (return -1).

        Time Complexity: O(N + time) where N is len(clips).
        Space Complexity: O(time) for max_reach array.
        """
        max_reach = [0] * (time + 1)
        for start, end in clips:
            if start < time:
                max_reach[start] = max(max_reach[start], end)

        cur_reach = 0
        next_reach = 0
        clips_count = 0

        for i in range(time):
            next_reach = max(next_reach, max_reach[i])
            if i == cur_reach:
                clips_count += 1
                cur_reach = next_reach
                if cur_reach <= i:
                    return -1

        return clips_count


if __name__ == "__main__":
    sol = Solution()

    # Test Case 1: Example 1
    clips1 = [[0, 2], [4, 6], [8, 10], [1, 9], [1, 5], [5, 9]]
    assert sol.videoStitching(clips1, 10) == 3, "Test 1 Failed"

    # Test Case 2: Example 2 (impossible)
    clips2 = [[0, 1], [1, 2]]
    assert sol.videoStitching(clips2, 5) == -1, "Test 2 Failed"

    # Test Case 3: Example 3
    clips3 = [
        [0, 1], [6, 8], [0, 2], [5, 6], [0, 4], [0, 3], [6, 7], [1, 3],
        [4, 7], [1, 4], [2, 5], [2, 6], [3, 4], [4, 5], [5, 7], [6, 9]
    ]
    assert sol.videoStitching(clips3, 9) == 3, "Test 3 Failed"

    # Test Case 4: Single clip covers entire duration
    clips4 = [[0, 10]]
    assert sol.videoStitching(clips4, 10) == 1, "Test 4 Failed"

    # Test Case 5: No clip starting at 0
    clips5 = [[1, 5], [2, 10]]
    assert sol.videoStitching(clips5, 10) == -1, "Test 5 Failed"

    print("All Video Stitching tests passed successfully!")

