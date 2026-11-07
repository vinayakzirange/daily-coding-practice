r"""
LeetCode 1041: Robot Bounded In Circle (Medium)
https://leetcode.com/problems/robot-bounded-in-circle/

On an infinite plane, a robot initially stands at (0, 0) and faces north. Note that:
- The north direction is the positive direction of the y-axis.
- The south direction is the negative direction of the y-axis.
- The east direction is the positive direction of the x-axis.
- The west direction is the negative direction of the x-axis.

The robot can receive one of three instructions:
- 'G': go straight 1 unit.
- 'L': turn 90 degrees to the left (i.e., anti-clockwise direction).
- 'R': turn 90 degrees to the right (i.e., clockwise direction).

The robot performs the instructions given in order, and repeats them forever.

Return true if and only if there exists a circle in the plane such that the robot never leaves the circle.

Example 1:
Input: instructions = "GGLLGG"
Output: true
Explanation: The robot moves from (0,0) to (0,2), turns 180 degrees, and returns to (0,0).

Example 2:
Input: instructions = "GG"
Output: false
Explanation: The robot moves north indefinitely.

Example 3:
Input: instructions = "GL"
Output: true
Explanation: The robot moves (0, 0) -> (0, 1) -> (-1, 1) -> (-1, 0) -> (0, 0) in 4 iterations.

Constraints:
- 1 <= instructions.length <= 100
- instructions[i] is 'G', 'L' or 'R'.
"""


class Solution:
    def isRobotBounded(self, instructions: str) -> bool:
        """
        Mathematical Cycle Invariant:
        Simulate one full cycle of instructions.
        The robot is bounded within a circle if and only if:
        1. It returns to the starting position (x == 0 and y == 0), OR
        2. Its final orientation is NOT facing North (dir_idx != 0).
           If facing East, West, or South, repeating the instructions 4 times
           creates a closed vector polygon returning to the origin.

        Only when the robot displaces away from the origin AND still faces North
        will it diverge towards infinity.

        Directions (clockwise):
        0: North (0, 1), 1: East (1, 0), 2: South (0, -1), 3: West (-1, 0)

        Time Complexity: O(N) where N is len(instructions).
        Space Complexity: O(1).
        """
        dirs = [(0, 1), (1, 0), (0, -1), (-1, 0)]
        x, y = 0, 0
        d = 0  # Starts facing North

        for ch in instructions:
            if ch == "G":
                dx, dy = dirs[d]
                x += dx
                y += dy
            elif ch == "L":
                d = (d + 3) % 4
            elif ch == "R":
                d = (d + 1) % 4

        return (x == 0 and y == 0) or (d != 0)


if __name__ == "__main__":
    sol = Solution()

    # Test Case 1: Example 1 -> True
    assert sol.isRobotBounded("GGLLGG") is True, "Test 1 Failed"

    # Test Case 2: Example 2 -> False
    assert sol.isRobotBounded("GG") is False, "Test 2 Failed"

    # Test Case 3: Example 3 -> True
    assert sol.isRobotBounded("GL") is True, "Test 3 Failed"

    # Test Case 4: Right turns forming square -> True
    assert sol.isRobotBounded("GR") is True, "Test 4 Failed"

    # Test Case 5: Turns without movement -> True
    assert sol.isRobotBounded("LLLL") is True, "Test 5 Failed"

    print("All Robot Bounded In Circle tests passed successfully!")
