/**
 * Problem: Design HashSet
 * Topic: Data Structure Design / Hash Map
 * Language: JavaScript
 *
 * Approach:
 * Use a fixed-size bucket array (e.g. key % 1000) where each bucket holds an array.
 * Implement add, remove, and contains methods without using built-in set data structures.
 *
 * Time Complexity: O(1) average per operation
 * Space Complexity: O(N)
 */

class MyHashSet {
    constructor() {
        this.size = 1000;
        this.buckets = Array.from({ length: this.size }, () => []);
    }

    _hash(key) {
        return key % this.size;
    }

    add(key) {
        const bucket = this.buckets[this._hash(key)];
        if (!bucket.includes(key)) {
            bucket.push(key);
        }
    }

    remove(key) {
        const bucket = this.buckets[this._hash(key)];
        const index = bucket.indexOf(key);
        if (index !== -1) {
            bucket.splice(index, 1);
        }
    }

    contains(key) {
        const bucket = this.buckets[this._hash(key)];
        return bucket.includes(key);
    }
}

// Test cases
const hashSet = new MyHashSet();
hashSet.add(1);
hashSet.add(2);
console.log("contains(1) ->", hashSet.contains(1)); // true
console.log("contains(3) ->", hashSet.contains(3)); // false
hashSet.add(2);
console.log("contains(2) ->", hashSet.contains(2)); // true
hashSet.remove(2);
console.log("contains(2) ->", hashSet.contains(2)); // false
