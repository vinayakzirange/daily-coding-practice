"""
Problem: Design Browser History (LeetCode 1472)
Difficulty: Medium
Category: Array / Stack / Design / Simulation

Description:
You have a browser of one tab where you start on the homepage and you can visit
another url, get back in the history number of steps or move forward in the history number of steps.

Implement the BrowserHistory class:
- BrowserHistory(string homepage): Initializes the object with the homepage of the browser.
- void visit(string url): Visits url from the current page. It clears up all the forward history.
- string back(int steps): Move steps back in history. If you can only return x steps in the history
  and steps > x, you will return only x steps. Return the current url after moving back in history at most steps.
- string forward(int steps): Move steps forward in history. If you can only forward x steps in the history
  and steps > x, you will forward only x steps. Return the current url after forwarding in history at most steps.

Example:
    browserHistory = BrowserHistory("leetcode.com")
    browserHistory.visit("google.com")       # history: ["leetcode.com", "google.com"]
    browserHistory.visit("facebook.com")     # history: ["leetcode.com", "google.com", "facebook.com"]
    browserHistory.visit("youtube.com")      # history: ["leetcode.com", "google.com", "facebook.com", "youtube.com"]
    browserHistory.back(1)                   # returns "facebook.com"
    browserHistory.back(1)                   # returns "google.com"
    browserHistory.forward(1)                # returns "facebook.com"
    browserHistory.visit("linkedin.com")     # history: ["leetcode.com", "google.com", "facebook.com", "linkedin.com"]
    browserHistory.forward(2)                # returns "linkedin.com" (cannot forward)
    browserHistory.back(2)                   # returns "google.com"
    browserHistory.back(7)                   # returns "leetcode.com"

Constraints:
    - 1 <= homepage.length <= 20
    - 1 <= url.length <= 20
    - 1 <= steps <= 100
    - homepage and url consist of '.' or lower case English letters.
    - At most 5000 calls will be made to visit, back, and forward.
"""


class BrowserHistory:
    def __init__(self, homepage: str):
        """Initializes browser with homepage."""
        self.history = [homepage]
        self.curr = 0

    def visit(self, url: str) -> None:
        """Visits url from current page, discarding all forward history."""
        self.curr += 1
        self.history = self.history[:self.curr]
        self.history.append(url)

    def back(self, steps: int) -> str:
        """Moves at most `steps` back in history."""
        self.curr = max(0, self.curr - steps)
        return self.history[self.curr]

    def forward(self, steps: int) -> str:
        """Moves at most `steps` forward in history."""
        self.curr = min(len(self.history) - 1, self.curr + steps)
        return self.history[self.curr]


def run_tests():
    bh = BrowserHistory("leetcode.com")

    bh.visit("google.com")
    bh.visit("facebook.com")
    bh.visit("youtube.com")

    assert bh.back(1) == "facebook.com", "Test 1 Failed"
    assert bh.back(1) == "google.com", "Test 2 Failed"
    assert bh.forward(1) == "facebook.com", "Test 3 Failed"

    bh.visit("linkedin.com")

    assert bh.forward(2) == "linkedin.com", "Test 4 Failed"
    assert bh.back(2) == "google.com", "Test 5 Failed"
    assert bh.back(7) == "leetcode.com", "Test 6 Failed"
    assert bh.forward(10) == "linkedin.com", "Test 7 Failed"

    print("All tests passed for 07-Design-Browser-History-Design!")


if __name__ == "__main__":
    run_tests()
