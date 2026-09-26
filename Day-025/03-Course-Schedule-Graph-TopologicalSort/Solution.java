// Problem: Course Schedule (LeetCode 207)
// Language: Java
// Difficulty: Medium
// Time Complexity: O(V + E)
// Space Complexity: O(V + E)

import java.util.*;

public class Solution {
    public boolean canFinish(int numCourses, int[][] prerequisites) {
        List<List<Integer>> adj = new ArrayList<>();
        int[] inDegree = new int[numCourses];
        
        for (int i = 0; i < numCourses; i++) {
            adj.add(new ArrayList<>());
        }
        
        for (int[] pre : prerequisites) {
            adj.get(pre[1]).add(pre[0]);
            inDegree[pre[0]]++;
        }
        
        Queue<Integer> queue = new LinkedList<>();
        for (int i = 0; i < numCourses; i++) {
            if (inDegree[i] == 0) {
                queue.add(i);
            }
        }
        
        int count = 0;
        while (!queue.isEmpty()) {
            int course = queue.poll();
            count++;
            for (int next : adj.get(course)) {
                inDegree[next]--;
                if (inDegree[next] == 0) {
                    queue.add(next);
                }
            }
        }
        
        return count == numCourses;
    }

    public static void main(String[] args) {
        Solution sol = new Solution();
        int[][] pre1 = {{1, 0}};
        System.out.println("Can finish 2 courses {{1,0}}: " + sol.canFinish(2, pre1)); // true
        
        int[][] pre2 = {{1, 0}, {0, 1}};
        System.out.println("Can finish 2 courses {{1,0},{0,1}}: " + sol.canFinish(2, pre2)); // false
    }
}
