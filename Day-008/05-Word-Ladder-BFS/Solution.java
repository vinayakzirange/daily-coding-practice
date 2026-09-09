/*
 * Problem Name: Word Ladder
 * Problem Statement: Given two words, beginWord and endWord, and a dictionary wordList, return the number of words in the shortest 
 * transformation sequence from beginWord to endWord such that only one letter changes at a time and every word is in wordList.
 * 
 * Approach: Breadth-First Search (BFS) for shortest path in an unweighted word graph.
 * 
 * Time Complexity: O(N * M^2) where N is number of words and M is word length
 * Space Complexity: O(N * M)
 */

import java.util.*;

public class Solution {
    public static int ladderLength(String beginWord, String endWord, List<String> wordList) {
        Set<String> set = new HashSet<>(wordList);
        if (!set.contains(endWord)) return 0;

        Queue<String> queue = new LinkedList<>();
        queue.add(beginWord);
        int level = 1;

        while (!queue.isEmpty()) {
            int size = queue.size();
            for (int i = 0; i < size; i++) {
                String curr = queue.poll();
                char[] chars = curr.toCharArray();

                for (int j = 0; j < chars.length; j++) {
                    char originalChar = chars[j];

                    for (char ch = 'a'; ch <= 'z'; ch++) {
                        if (ch == originalChar) continue;
                        chars[j] = ch;
                        String newWord = new String(chars);

                        if (newWord.equals(endWord)) return level + 1;

                        if (set.contains(newWord)) {
                            queue.add(newWord);
                            set.remove(newWord); // Mark visited
                        }
                    }

                    chars[j] = originalChar;
                }
            }
            level++;
        }

        return 0;
    }

    public static void main(String[] args) {
        List<String> wordList = Arrays.asList("hot", "dot", "dog", "lot", "log", "cog");
        System.out.println("Shortest Ladder Length: " + ladderLength("hit", "cog", wordList)); // Expected: 5 ("hit" -> "hot" -> "dot" -> "dog" -> "cog")
    }
}
