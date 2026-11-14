"""
Problem: Angle Between Hands of a Clock (LeetCode 1344)
Difficulty: Medium
Language: Python

Given two numbers, hour and minutes, return the smaller angle (in degrees)
formed between the hour and the minute hand.

Answers within 10^-5 of the actual value will be accepted as correct.

Example 1:
    Input: hour = 12, minutes = 30
    Output: 165

Example 2:
    Input: hour = 3, minutes = 30
    Output: 75

Example 3:
    Input: hour = 3, minutes = 15
    Output: 7.5

Constraints:
    1 <= hour <= 12
    0 <= minutes <= 59
"""


class Solution:
    def angleClock(self, hour: int, minutes: int) -> float:
        """
        Calculates the smaller angle between the hour and minute hand.
        
        Math:
            Minute Hand: Moves 360 / 60 = 6 degrees per minute.
            Hour Hand: Moves 360 / 12 = 30 degrees per hour, plus 30 / 60 = 0.5 degrees per minute.
            
        Complexity:
            Time: O(1) - Constant-time arithmetic.
            Space: O(1) - Constant memory.
        """
        minute_angle = minutes * 6.0
        hour_angle = (hour % 12) * 30.0 + minutes * 0.5

        diff = abs(hour_angle - minute_angle)
        return min(diff, 360.0 - diff)


if __name__ == "__main__":
    sol = Solution()

    # Test 1: Example 1
    assert abs(sol.angleClock(12, 30) - 165.0) < 1e-5, "Test 1 Failed"

    # Test 2: Example 2
    assert abs(sol.angleClock(3, 30) - 75.0) < 1e-5, "Test 2 Failed"

    # Test 3: Example 3
    assert abs(sol.angleClock(3, 15) - 7.5) < 1e-5, "Test 3 Failed"

    # Test 4: Both hands at 12:00
    assert abs(sol.angleClock(12, 0) - 0.0) < 1e-5, "Test 4 Failed"

    # Test 5: Exact opposite hands at 6:00
    assert abs(sol.angleClock(6, 0) - 180.0) < 1e-5, "Test 5 Failed"

    print("All Angle Between Hands of a Clock tests passed successfully!")
