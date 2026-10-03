// Problem: Clone Graph (LeetCode 133)
// Language: Java
// Difficulty: Medium
// Time Complexity: O(V + E)
// Space Complexity: O(V) hash map & queue

import java.util.*;

public class Solution {
    public static class Node {
        public int val;
        public List<Node> neighbors;

        public Node() {
            val = 0;
            neighbors = new ArrayList<>();
        }

        public Node(int _val) {
            val = _val;
            neighbors = new ArrayList<>();
        }

        public Node(int _val, ArrayList<Node> _neighbors) {
            val = _val;
            neighbors = _neighbors;
        }
    }

    public Node cloneGraph(Node node) {
        if (node == null) return null;

        Map<Node, Node> visited = new HashMap<>();
        Queue<Node> queue = new LinkedList<>();

        // Initialize clone of root
        Node clonedRoot = new Node(node.val);
        visited.put(node, clonedRoot);
        queue.offer(node);

        // BFS traversal
        while (!queue.isEmpty()) {
            Node curr = queue.poll();

            for (Node neighbor : curr.neighbors) {
                if (!visited.containsKey(neighbor)) {
                    // Clone neighbor and record mapping
                    visited.put(neighbor, new Node(neighbor.val));
                    queue.offer(neighbor);
                }
                // Connect cloned neighbor
                visited.get(curr).neighbors.add(visited.get(neighbor));
            }
        }

        return clonedRoot;
    }

    public static void main(String[] args) {
        // Build sample graph: 1 -- 2, 2 -- 3, 3 -- 4, 4 -- 1
        Node n1 = new Node(1);
        Node n2 = new Node(2);
        Node n3 = new Node(3);
        Node n4 = new Node(4);

        n1.neighbors.add(n2); n1.neighbors.add(n4);
        n2.neighbors.add(n1); n2.neighbors.add(n3);
        n3.neighbors.add(n2); n3.neighbors.add(n4);
        n4.neighbors.add(n1); n4.neighbors.add(n3);

        Solution sol = new Solution();
        Node cloned = sol.cloneGraph(n1);

        System.out.println("Root cloned val: " + cloned.val);
        System.out.println("Cloned root neighbors count: " + cloned.neighbors.size());
        System.out.println("Is root distinct instance: " + (cloned != n1));
        // Output: true
    }
}
