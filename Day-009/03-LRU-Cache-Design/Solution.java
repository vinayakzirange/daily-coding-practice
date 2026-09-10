/*
 * Problem Name: LRU Cache
 * Problem Statement: Design a data structure that follows the constraints of a Least Recently Used (LRU) cache.
 * Implement the LRUCache class with get(key) and put(key, value) in O(1) average time complexity.
 * 
 * Approach: HashMap for O(1) key lookup combined with a Doubly Linked List for O(1) node removal and insertion at head.
 * 
 * Time Complexity: O(1) for both get and put
 * Space Complexity: O(Capacity)
 */

import java.util.HashMap;
import java.util.Map;

class Node {
    int key, value;
    Node prev, next;
    Node(int key, int value) {
        this.key = key;
        this.value = value;
    }
}

class LRUCache {
    private final int capacity;
    private final Map<Integer, Node> map;
    private final Node head, tail;

    public LRUCache(int capacity) {
        this.capacity = capacity;
        this.map = new HashMap<>();
        this.head = new Node(0, 0);
        this.tail = new Node(0, 0);
        head.next = tail;
        tail.prev = head;
    }

    public int get(int key) {
        if (map.containsKey(key)) {
            Node node = map.get(key);
            remove(node);
            insertToHead(node);
            return node.value;
        }
        return -1;
    }

    public void put(int key, int value) {
        if (map.containsKey(key)) {
            remove(map.get(key));
        }
        if (map.size() == capacity) {
            remove(tail.prev);
        }
        Node newNode = new Node(key, value);
        insertToHead(newNode);
    }

    private void remove(Node node) {
        map.remove(node.key);
        node.prev.next = node.next;
        node.next.prev = node.prev;
    }

    private void insertToHead(Node node) {
        map.put(node.key, node);
        node.next = head.next;
        node.next.prev = node;
        head.next = node;
        node.prev = head;
    }
}

public class Solution {
    public static void main(String[] args) {
        LRUCache lru = new LRUCache(2);
        lru.put(1, 1);
        lru.put(2, 2);
        System.out.println("Get 1: " + lru.get(1)); // Expected: 1
        lru.put(3, 3); // Evicts key 2
        System.out.println("Get 2: " + lru.get(2)); // Expected: -1
        lru.put(4, 4); // Evicts key 1
        System.out.println("Get 1: " + lru.get(1)); // Expected: -1
        System.out.println("Get 3: " + lru.get(3)); // Expected: 3
        System.out.println("Get 4: " + lru.get(4)); // Expected: 4
    }
}
