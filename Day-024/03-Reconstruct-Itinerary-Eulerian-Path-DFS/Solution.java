// Problem: Reconstruct Itinerary (LeetCode 332)
// Language: Java
// Difficulty: Hard / Medium-Hard
// Time Complexity: O(E log E) where E is number of tickets
// Space Complexity: O(E)

import java.util.*;

public class Solution {
    private Map<String, PriorityQueue<String>> targets = new HashMap<>();
    private List<String> route = new LinkedList<>();

    public List<String> findItinerary(List<List<String>> tickets) {
        for (List<String> ticket : tickets) {
            targets.computeIfAbsent(ticket.get(0), k -> new PriorityQueue<>()).add(ticket.get(1));
        }
        visit("JFK");
        return route;
    }

    private void visit(String airport) {
        PriorityQueue<String> dests = targets.get(airport);
        while (dests != null && !dests.isEmpty()) {
            visit(dests.poll());
        }
        route.add(0, airport);
    }

    public static void main(String[] args) {
        Solution sol = new Solution();
        List<List<String>> tickets = Arrays.asList(
            Arrays.asList("MUC", "LHR"),
            Arrays.asList("JFK", "MUC"),
            Arrays.asList("SFO", "SJC"),
            Arrays.asList("LHR", "SFO")
        );
        System.out.println("Itinerary: " + sol.findItinerary(tickets));
    }
}
