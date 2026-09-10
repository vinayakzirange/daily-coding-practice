/*
 * Problem Name: Course Schedule II
 * Problem Statement: There are a total of numCourses courses you have to take labeled from 0 to numCourses - 1.
 * Given prerequisites array, return the ordering of courses you should take to finish all courses.
 * If it is impossible to finish all courses, return an empty array.
 * 
 * Approach: Topological Sort using BFS (Kahn's Algorithm with in-degrees).
 * 
 * Time Complexity: O(V + E)
 * Space Complexity: O(V + E)
 */

function findOrder(numCourses, prerequisites) {
  const inDegree = new Array(numCourses).fill(0);
  const adj = Array.from({ length: numCourses }, () => []);

  for (let [course, pre] of prerequisites) {
    adj[pre].push(course);
    inDegree[course]++;
  }

  const queue = [];
  for (let i = 0; i < numCourses; i++) {
    if (inDegree[i] === 0) queue.push(i);
  }

  const order = [];
  while (queue.length > 0) {
    const curr = queue.shift();
    order.push(curr);

    for (let neighbor of adj[curr]) {
      inDegree[neighbor]--;
      if (inDegree[neighbor] === 0) {
        queue.push(neighbor);
      }
    }
  }

  return order.length === numCourses ? order : [];
}

console.log("Course Order for 4 courses:", findOrder(4, [[1,0],[2,0],[3,1],[3,2]]));
// Expected: [0, 1, 2, 3] or [0, 2, 1, 3]
