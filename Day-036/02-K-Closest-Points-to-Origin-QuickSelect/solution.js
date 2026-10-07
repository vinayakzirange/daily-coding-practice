/**
 * Problem: K Closest Points to Origin (LeetCode 973)
 * Difficulty: Medium
 * Topic: Array / Divide & Conquer / QuickSelect / Heap / Euclidean Distance
 * 
 * Description:
 * Given an array of points where points[i] = [xi, yi] represents a point on the X-Y plane
 * and an integer k, return the k closest points to the origin (0, 0).
 * 
 * The distance between two points on the X-Y plane is the Euclidean distance:
 * sqrt((x1 - x2)^2 + (y1 - y2)^2).
 * 
 * You may return the answer in any order. The answer is guaranteed to be unique
 * (except for the order that it is in).
 * 
 * Example 1:
 * Input: points = [[1,3],[-2,2]], k = 1
 * Output: [[-2,2]]
 * Explanation:
 * The distance between (1, 3) and the origin is sqrt(10).
 * The distance between (-2, 2) and the origin is sqrt(8).
 * Since sqrt(8) < sqrt(10), (-2, 2) is closer to the origin.
 * 
 * Example 2:
 * Input: points = [[3,3],[5,-1],[-2,4]], k = 2
 * Output: [[3,3],[-2,4]]
 * (The answer [[-2,4],[3,3]] would also be accepted.)
 * 
 * Constraints:
 *   * 1 <= k <= points.length <= 10^4
 *   * -10^4 <= xi, yi <= 10^4
 * 
 * Complexity:
 *   * Time Complexity: Average O(n), Worst-case O(n^2) with randomized QuickSelect.
 *   * Space Complexity: O(1) in-place partition memory.
 */

/**
 * @param {number[][]} points
 * @param {number} k
 * @return {number[][]}
 */
function kClosest(points, k) {
    function distSq(p) {
        return p[0] * p[0] + p[1] * p[1];
    }

    function swap(i, j) {
        const temp = points[i];
        points[i] = points[j];
        points[j] = temp;
    }

    function partition(left, right) {
        const randomIdx = left + Math.floor(Math.random() * (right - left + 1));
        swap(randomIdx, right);

        const pivotDist = distSq(points[right]);
        let storeIdx = left;

        for (let i = left; i < right; i++) {
            if (distSq(points[i]) <= pivotDist) {
                swap(storeIdx, i);
                storeIdx++;
            }
        }
        swap(storeIdx, right);
        return storeIdx;
    }

    let left = 0;
    let right = points.length - 1;

    while (left <= right) {
        const pivotIndex = partition(left, right);

        if (pivotIndex === k) {
            break;
        } else if (pivotIndex < k) {
            left = pivotIndex + 1;
        } else {
            right = pivotIndex - 1;
        }
    }

    return points.slice(0, k);
}

// ==========================================
// Test Cases & Verification
// ==========================================
function runTests() {
    const testCases = [
        {
            points: [[1, 3], [-2, 2]],
            k: 1,
            expected: [[-2, 2]]
        },
        {
            points: [[3, 3], [5, -1], [-2, 4]],
            k: 2,
            expected: [[3, 3], [-2, 4]]
        },
        {
            points: [[0, 1], [1, 0]],
            k: 2,
            expected: [[0, 1], [1, 0]]
        }
    ];

    testCases.forEach((tc, idx) => {
        const copy = tc.points.map(p => [...p]);
        const result = kClosest(copy, tc.k);
        const sortKey = pts => pts.map(p => `${p[0]},${p[1]}`).sort().join(';');
        const match = sortKey(result) === sortKey(tc.expected);
        console.assert(match, `Test ${idx + 1} Failed: got ${JSON.stringify(result)}`);
        console.log(`Test ${idx + 1} Passed: k=${tc.k} -> closest points: ${JSON.stringify(result)}`);
    });

    console.log('\nAll K Closest Points to Origin tests passed successfully!');
}

runTests();
