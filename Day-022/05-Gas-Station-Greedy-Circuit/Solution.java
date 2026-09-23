/**
 * Problem: Gas Station (Circuit Traversal)
 * Topic: Greedy / Total Accumulator
 * Language: Java
 *
 * Approach:
 * If sum(gas) < sum(cost), circuit completion is impossible, return -1.
 * Maintain current tank balance 'currentTank'. If currentTank < 0, reset start station to i + 1
 * and reset currentTank to 0.
 *
 * Time Complexity: O(N)
 * Space Complexity: O(1)
 */

public class Solution {
    public static int canCompleteCircuit(int[] gas, int[] cost) {
        int totalGas = 0, totalCost = 0;
        int currentTank = 0, startIndex = 0;

        for (int i = 0; i < gas.length; i++) {
            totalGas += gas[i];
            totalCost += cost[i];
            currentTank += gas[i] - cost[i];

            if (currentTank < 0) {
                startIndex = i + 1;
                currentTank = 0;
            }
        }

        return totalGas >= totalCost ? startIndex : -1;
    }

    public static void main(String[] args) {
        int[] gas = {1, 2, 3, 4, 5};
        int[] cost = {3, 4, 5, 1, 2};
        System.out.println("Starting Gas Station -> " + canCompleteCircuit(gas, cost)); // 3
    }
}
