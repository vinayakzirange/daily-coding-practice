/**
 * Problem: Word Ladder
 * Topic: Graph / BFS / Shortest Path
 * Language: Java
 *
 * Approach:
 * Unweighted shortest path problem solved via BFS. For each word, generate all valid single-character
 * mutations present in dictionary set. Track sequence length level by level.
 *
 * Time Complexity: O(N * L * 26) where N is word count, L is word length
 * Space Complexity: O(N * L)
 */

import java.util.*;

public class Solution {
    public static int ladderLength(String beginWord, String endWord, List<String> wordList) {
        Set<String> wordSet = new HashSet<>(wordList);
        if (!wordSet.contains(endWord)) return 0;

        Queue<String> queue = new LinkedList<>();
        queue.offer(beginWord);

        int level = 1;

        while (!queue.isEmpty()) {
            int size = queue.size();
            for (int i = 0; i < size; i++) {
                String current = queue.poll();
                if (current.equals(endWord)) return level;

                char[] chars = current.toCharArray();
                for (int j = 0; j < chars.length; j++) {
                    char orig = chars[j];
                    for (char c = 'a'; c <= 'z'; c++) {
                        if (c == orig) continue;
                        chars[j] = c;
                        String nextWord = new String(chars);
                        if (wordSet.contains(nextWord)) {
                            wordSet.remove(nextWord);
                            queue.offer(nextWord);
                        }
                    }
                    chars[j] = orig;
                }
            }
            level++;
        }
        return 0;
    }

    public static void main(String[] args) {
        List<String> words = Arrays.asList("hot", "dot", "dog", "lot", "log", "cog");
        System.out.println("hit -> cog length -> " + ladderLength("hit", "cog", words)); // 5
    }
}
