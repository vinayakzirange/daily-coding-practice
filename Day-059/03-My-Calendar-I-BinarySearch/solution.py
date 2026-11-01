r"""
====================================================================
Problem: My Calendar I (LeetCode 729)
Difficulty: Medium
Topic: Array, Binary Search, Design, Segment Tree, Binary Search Tree
====================================================================

You are implementing a program to use as your calendar. We can add a new
event if adding the event will not cause a double booking.

A double booking happens when two events have some non-empty intersection
(i.e., some moment is common to both events).

The event can be represented as a pair of integers start and end that
represents a booking on the half-open interval [start, end), the range
of real numbers x such that start <= x < end.

Implement the MyCalendar class:
- MyCalendar() Initializes the calendar object.
- boolean book(int start, int end) Returns true if the event can be added
  to the calendar successfully without causing a double booking. Otherwise,
  return false and do not add the event to the calendar.

Example 1:
Input:
["MyCalendar", "book", "book", "book"]
[[], [10, 20], [15, 25], [20, 30]]
Output:
[null, true, false, true]
Explanation:
MyCalendar myCalendar = new MyCalendar();
myCalendar.book(10, 20); // return True
myCalendar.book(15, 25); // return False, It cannot be booked because time 15 is already booked by another event.
myCalendar.book(20, 30); // return True, The event can be booked, as the first event takes every time less than 20, but not including 20.

Constraints:
- 0 <= start < end <= 10^9
- At most 1000 calls will be made to book.
====================================================================
"""

import bisect


class MyCalendar:
    """
    Maintains sorted intervals using binary search to find adjacent
    overlapping intervals in O(log N) search time.

    Complexity:
    - Time: O(log N) search + O(N) insertion per booking
    - Space: O(N) where N is number of booked events
    """

    def __init__(self):
        # List of [start, end] pairs kept sorted by start time
        self.calendar = []

    def book(self, start: int, end: int) -> bool:
        # Binary search for position where this event would fit
        idx = bisect.bisect_right(self.calendar, [start, end])

        # Check overlap with previous interval: calendar[idx - 1]
        if idx > 0 and self.calendar[idx - 1][1] > start:
            return False

        # Check overlap with next interval: calendar[idx]
        if idx < len(self.calendar) and self.calendar[idx][0] < end:
            return False

        self.calendar.insert(idx, [start, end])
        return True


# --- Test Suite ---
if __name__ == "__main__":
    cal = MyCalendar()

    # Test 1: [10, 20] -> True
    assert cal.book(10, 20) is True, "Test 1 failed"

    # Test 2: [15, 25] -> False (overlap with [10, 20))
    assert cal.book(15, 25) is False, "Test 2 failed"

    # Test 3: [20, 30] -> True (adjacent boundary allowed)
    assert cal.book(20, 30) is True, "Test 3 failed"

    # Test 4: Earlier interval [0, 5] -> True
    assert cal.book(0, 5) is True, "Test 4 failed"

    # Test 5: Interval in-between [5, 10] -> True
    assert cal.book(5, 10) is True, "Test 5 failed"

    # Test 6: Enclosing interval [0, 35] -> False
    assert cal.book(0, 35) is False, "Test 6 failed"

    print("All My Calendar I tests passed successfully!")
