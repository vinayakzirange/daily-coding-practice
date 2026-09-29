// Problem: Maximal Network Rank (LeetCode 1615)
// Language: JavaScript
// Difficulty: Medium
// Time Complexity: O(N^2)
// Space Complexity: O(N^2)

function maximalNetworkRank(n, roads) {
    const degrees = new Array(n).fill(0);
    const connected = Array.from({ length: n }, () => new Array(n).fill(false));

    for (const [u, v] of roads) {
        degrees[u]++;
        degrees[v]++;
        connected[u][v] = true;
        connected[v][u] = true;
    }

    let maxRank = 0;

    for (let i = 0; i < n; i++) {
        for (let j = i + 1; j < n; j++) {
            let rank = degrees[i] + degrees[j];
            if (connected[i][j]) {
                rank--;
            }
            maxRank = Math.max(maxRank, rank);
        }
    }

    return maxRank;
}

// Test cases
console.log("Max Rank (n=4, [[0,1],[0,3],[1,2],[1,3]]):", maximalNetworkRank(4, [[0,1],[0,3],[1,2],[1,3]])); // 4
console.log("Max Rank (n=5, [[0,1],[0,2],[0,3],[1,2],[1,3]]):", maximalNetworkRank(5, [[0,1],[0,2],[0,3],[1,2],[1,3]])); // 5
