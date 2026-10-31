r"""
====================================================================
Problem: Dota2 Senate (LeetCode 649)
Difficulty: Medium
Topic: String, Greedy, Queue
====================================================================

In the world of Dota2, there are two parties: the Radiant and the Dire.

The Dota2 senate consists of senators coming from two parties. Now the
Senate wants to decide on a change in the Dota2 game. The voting for this
change is a round-based procedure. In each round, each senator can exercise
one of the two rights:
1. Ban one senator's right: A senator can make another senator lose all
   his rights in this and all the following rounds.
2. Announce the victory: If this senator found the senators who still have
   rights to vote are all from the same party, he can announce the victory
   and decide on the change in the game.

Given a string senate representing each senator's party belonging. The
character 'R' and 'D' represent the Radiant party and the Dire party.
Then if there are n senators, the size of the given string will be n.

The round-based procedure starts from the first senator to the last senator
in the given order. This procedure will last until the end of voting. All the
senators who have lost their rights will be skipped during the procedure.

Suppose every senator is smart enough and will play the best strategy for
his own party. Predict which party will finally announce the victory and
change the Dota2 game. The output should be "Radiant" or "Dire".

Example 1:
Input: senate = "RD"
Output: "Radiant"
Explanation: 
The first senator comes from Radiant and he can just ban the next senator's right in round 1. 
And the second senator can't exercise any rights anymore since his right has been banned. 
And in round 2, the first senator can just announce the victory.

Example 2:
Input: senate = "RDD"
Output: "Dire"
Explanation: 
The first senator comes from Radiant and he bans the first Dire senator's right.
The second senator comes from Dire and he can ban the first senator's right.
And the third senator comes from Dire and he can announce victory.

Constraints:
- n == senate.length
- 1 <= n <= 10^4
- senate[i] is either 'R' or 'D'.
====================================================================
"""

from collections import deque


class Solution:
    def predictPartyVictory(self, senate: str) -> str:
        """
        Simulates optimal greedy round-based banning using two queues.
        The senator appearing earlier in turn order always bans the next
        upcoming senator from the opposing party.

        Complexity:
        - Time: O(N) each senator is processed in O(1) turns
        - Space: O(N) to store senator indices in queues
        """
        n = len(senate)
        r_queue = deque()
        d_queue = deque()

        for i, party in enumerate(senate):
            if party == "R":
                r_queue.append(i)
            else:
                d_queue.append(i)

        while r_queue and d_queue:
            r_idx = r_queue.popleft()
            d_idx = d_queue.popleft()

            # The senator with smaller index acts first and bans the other
            if r_idx < d_idx:
                r_queue.append(r_idx + n)
            else:
                d_queue.append(d_idx + n)

        return "Radiant" if r_queue else "Dire"


# --- Test Suite ---
if __name__ == "__main__":
    sol = Solution()

    # Test 1: "RD" -> "Radiant"
    assert sol.predictPartyVictory("RD") == "Radiant", "Test 1 failed"

    # Test 2: "RDD" -> "Dire"
    assert sol.predictPartyVictory("RDD") == "Dire", "Test 2 failed"

    # Test 3: "DDRRR" -> "Dire"
    assert sol.predictPartyVictory("DDRRR") == "Dire", "Test 3 failed"

    # Test 4: "RRDDD" -> "Radiant"
    assert sol.predictPartyVictory("RRDDD") == "Radiant", "Test 4 failed"

    # Test 5: Single party "RRRR" -> "Radiant"
    assert sol.predictPartyVictory("RRRR") == "Radiant", "Test 5 failed"

    print("All Dota2 Senate tests passed successfully!")
