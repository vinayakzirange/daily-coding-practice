/**
 * Problem: Student Attendance Record I
 * Topic: String Scanning / Rule Check
 * Language: JavaScript
 *
 * Approach:
 * Count total absent days 'A'. Ensure absent count < 2 AND string does not contain "LLL"
 * (3 consecutive late days).
 *
 * Time Complexity: O(N)
 * Space Complexity: O(1)
 */

function checkRecord(s) {
    let absents = 0;
    for (let char of s) {
        if (char === 'A') absents++;
    }
    return absents < 2 && !s.includes("LLL");
}

// Test cases
console.log("'PPALLP' ->", checkRecord("PPALLP")); // true
console.log("'PPALLL' ->", checkRecord("PPALLL")); // false
