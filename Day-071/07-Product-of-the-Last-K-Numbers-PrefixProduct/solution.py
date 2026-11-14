"""
Problem: Product of the Last K Numbers (LeetCode 1352)
Difficulty: Medium
Language: Python

Design an algorithm that accepts a stream of integers and retrieves the product of the last k integers of the stream.

Implement the ProductOfNumbers class:
    - ProductOfNumbers() Initializes the object with an empty stream.
    - void add(int num) Appends the integer num to the stream.
    - int getProduct(int k) Returns the product of the last k numbers in the current list.
      You can assume that always the current list has at least k numbers.

The test cases are generated so that, at any time, the product of any contiguous sequence of numbers
will fit into a single 32-bit integer without overflowing.

Example:
    Input
    ["ProductOfNumbers","add","add","add","add","add","getProduct","getProduct","getProduct","add","getProduct"]
    [[],[3],[0],[2],[5],[4],[2],[3],[4],[8],[2]]

    Output
    [null,null,null,null,null,null,20,40,0,null,32]

Constraints:
    0 <= num <= 100
    1 <= k <= 4 * 10^4
    At most 4 * 10^4 calls will be made to add and getProduct.
"""


class ProductOfNumbers:
    """
    Computes products of last k numbers in O(1) time using Prefix Products with Zero Resets.
    
    Complexity:
        add: O(1) time.
        getProduct: O(1) time.
        Space: O(N) where N is stream size.
    """
    def __init__(self):
        # prefix stores cumulative products since the last zero
        self.prefix = [1]

    def add(self, num: int) -> None:
        if num == 0:
            # Zero invalidates prior products; reset list
            self.prefix = [1]
        else:
            self.prefix.append(self.prefix[-1] * num)

    def getProduct(self, k: int) -> int:
        # If k spans beyond or includes the last reset point (a zero was within the last k elements)
        if k >= len(self.prefix):
            return 0
        return self.prefix[-1] // self.prefix[-k - 1]


if __name__ == "__main__":
    # Test 1: Example 1
    pon = ProductOfNumbers()
    pon.add(3)        # [3]
    pon.add(0)        # resets to [1]
    pon.add(2)        # [1, 2]
    pon.add(5)        # [1, 2, 10]
    pon.add(4)        # [1, 2, 10, 40]
    assert pon.getProduct(2) == 20, f"Expected 20, got {pon.getProduct(2)}"
    assert pon.getProduct(3) == 40, f"Expected 40, got {pon.getProduct(3)}"
    assert pon.getProduct(4) == 0, f"Expected 0, got {pon.getProduct(4)}"
    pon.add(8)        # [1, 2, 10, 40, 320]
    assert pon.getProduct(2) == 32, f"Expected 32, got {pon.getProduct(2)}"

    # Test 2: Stream without zeros
    pon2 = ProductOfNumbers()
    pon2.add(1)
    pon2.add(2)
    pon2.add(3)
    assert pon2.getProduct(1) == 3
    assert pon2.getProduct(2) == 6
    assert pon2.getProduct(3) == 6

    # Test 3: Multiple zeros in stream
    pon3 = ProductOfNumbers()
    pon3.add(0)
    pon3.add(0)
    pon3.add(7)
    assert pon3.getProduct(1) == 7
    assert pon3.getProduct(2) == 0

    print("All Product of the Last K Numbers tests passed successfully!")
