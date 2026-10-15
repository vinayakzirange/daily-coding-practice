"""
Problem: Clone Graph (LeetCode 133)
Difficulty: Medium
Topic: Hash Table / Depth-First Search / Breadth-First Search / Graph

Description:
Given a reference of a node in a connected undirected graph.
Return a deep copy (clone) of the graph.

Each node in the graph contains a value (int) and a list (List[Node]) of its neighbors.

class Node {
    public int val;
    public List<Node> neighbors;
}

Test case format:
For simplicity, each node's value is the same as the node's index (1-indexed).
For example, the first node with val == 1, the second node with val == 2, and so on.
The graph is represented in the test case using an adjacency list.

Example 1:
Input: adjList = [[2,4],[1,3],[2,4],[1,3]]
Output: [[2,4],[1,3],[2,4],[1,3]]

Example 2:
Input: adjList = [[]]
Output: [[]]
Explanation: Note that the input contains one empty list. The graph consists of only one node with val = 1 and it does not have any neighbors.

Example 3:
Input: adjList = []
Output: []
Explanation: This an empty graph, it does not have any nodes.

Constraints:
- The number of nodes in the graph is in the range [0, 100].
- 1 <= Node.val <= 100
- Node.val is unique for each node.
- There are no repeated edges and no self-loops in the graph.
- The Graph is connected and all nodes can be visited starting from the given node.

Complexity Analysis:
- Time Complexity: O(V + E) where V is number of vertices and E is number of edges.
- Space Complexity: O(V) for the hash map and BFS queue.
"""

from collections import deque
from typing import List, Optional


class Node:
    def __init__(self, val=0, neighbors=None):
        self.val = val
        self.neighbors = neighbors if neighbors is not None else []


class Solution:
    def cloneGraph(self, node: Optional["Node"]) -> Optional["Node"]:
        if not node:
            return None

        # Map original node -> cloned node
        cloned_map = {node: Node(node.val)}
        queue = deque([node])

        while queue:
            curr = queue.popleft()

            for neighbor in curr.neighbors:
                if neighbor not in cloned_map:
                    # Clone the neighbor and enqueue it for exploration
                    cloned_map[neighbor] = Node(neighbor.val)
                    queue.append(neighbor)

                # Connect the cloned nodes
                cloned_map[curr].neighbors.append(cloned_map[neighbor])

        return cloned_map[node]


# ==========================================
# Helpers for Testing
# ==========================================
def build_graph(adjList: List[List[int]]) -> Optional[Node]:
    if not adjList:
        return None
    nodes = {i + 1: Node(i + 1) for i in range(len(adjList))}
    for i, neighbors in enumerate(adjList):
        nodes[i + 1].neighbors = [nodes[nbr] for nbr in neighbors]
    return nodes[1]


def graph_to_adj_list(node: Optional[Node]) -> List[List[int]]:
    if not node:
        return []
    visited = {}
    queue = deque([node])
    visited[node.val] = node

    while queue:
        curr = queue.popleft()
        for nbr in curr.neighbors:
            if nbr.val not in visited:
                visited[nbr.val] = nbr
                queue.append(nbr)

    adj = []
    for val in sorted(visited.keys()):
        adj.append([nbr.val for nbr in visited[val].neighbors])
    return adj


# ==========================================
# Test Cases & Verification
# ==========================================
if __name__ == "__main__":
    sol = Solution()

    test_cases = [
        ([[2, 4], [1, 3], [2, 4], [1, 3]], [[2, 4], [1, 3], [2, 4], [1, 3]]),
        ([[]], [[]]),
        ([], []),
        ([[2], [1]], [[2], [1]]),
        ([[2, 3], [1, 3], [1, 2]], [[2, 3], [1, 3], [1, 2]]),
    ]

    for idx, (adj, expected) in enumerate(test_cases, 1):
        original = build_graph(adj)
        clone = sol.cloneGraph(original)

        # Check deep copy: cloned nodes must have distinct memory addresses
        if original and clone:
            assert (
                original is not clone
            ), f"Test {idx} Failed: Clone is not a deep copy (same reference)"

        result_adj = graph_to_adj_list(clone)
        assert (
            result_adj == expected
        ), f"Test {idx} Failed: got {result_adj}, expected {expected}"
        print(f"Test {idx} Passed: graph nodes={len(adj)} -> cloned correctly")

    print("\nAll Clone Graph tests passed successfully!")
