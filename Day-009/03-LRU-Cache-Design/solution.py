"""
Problem Name: LRU Cache
Problem Statement: Design a data structure that follows the constraints of a Least Recently Used (LRU) cache.
Implement the LRUCache class with get(key) and put(key, value) in O(1) average time complexity.

Approach: Dictionary + Doubly Linked List for O(1) node removal and insertion at head.

Time Complexity: O(1) for both get and put
Space Complexity: O(Capacity)
"""

class Node:
    def __init__(self, key: int = 0, value: int = 0):
        self.key = key
        self.value = value
        self.prev = None
        self.next = None

class LRUCache:
    def __init__(self, capacity: int):
        self.capacity = capacity
        self.map = {}
        self.head = Node()
        self.tail = Node()
        self.head.next = self.tail
        self.tail.prev = self.head

    def get(self, key: int) -> int:
        if key in self.map:
            node = self.map[key]
            self._remove(node)
            self._insert_to_head(node)
            return node.value
        return -1

    def put(self, key: int, value: int) -> None:
        if key in self.map:
            self._remove(self.map[key])
        elif len(self.map) == self.capacity:
            self._remove(self.tail.prev)

        new_node = Node(key, value)
        self._insert_to_head(new_node)

    def _remove(self, node: Node) -> None:
        del self.map[node.key]
        node.prev.next = node.next
        node.next.prev = node.prev

    def _insert_to_head(self, node: Node) -> None:
        self.map[node.key] = node
        node.next = self.head.next
        node.next.prev = node
        self.head.next = node
        node.prev = self.head

if __name__ == "__main__":
    lru = LRUCache(2)
    lru.put(1, 1)
    lru.put(2, 2)
    print("Get 1:", lru.get(1))  # Expected: 1
    lru.put(3, 3)                # Evicts key 2
    print("Get 2:", lru.get(2))  # Expected: -1
    lru.put(4, 4)                # Evicts key 1
    print("Get 1:", lru.get(1))  # Expected: -1
    print("Get 3:", lru.get(3))  # Expected: 3
    print("Get 4:", lru.get(4))  # Expected: 4
