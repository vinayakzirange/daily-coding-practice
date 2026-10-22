/**
 * ====================================================================
 * Problem: Validate IP Address (LeetCode 468)
 * Difficulty: Medium
 * Topic: String
 * ====================================================================
 * 
 * Given a string queryIP, return "IPv4" if IP is a valid IPv4 address,
 * "IPv6" if IP is a valid IPv6 address or "Neither" if IP is not a
 * correct IP of any type.
 * 
 * A valid IPv4 address is an IP in the form "x1.x2.x3.x4" where 0 <= xi <= 255
 * and xi cannot contain leading zeros. For example, "192.168.1.1" and
 * "192.168.1.0" are valid IPv4 addresses while "192.168.01.1", "192.168.1.00",
 * and "192.168@1.1" are invalid IPv4 addresses.
 * 
 * A valid IPv6 address is an IP in the form "x1:x2:x3:x4:x5:x6:x7:x8" where:
 * - 1 <= xi.length <= 4
 * - xi is a hexadecimal string which may contain digits, lowercase English-letter
 *   ('a' to 'f') and upper-case English-letter ('A' to 'F').
 * - Leading zeros are allowed in xi.
 * For example, "2001:0db8:85a3:0000:0000:8a2e:0370:7334" and
 * "2001:db8:85a3:0:0:8A2E:0370:7334" are valid IPv6 addresses, while
 * "2001:0db8:85a3::8A2E:0370:7334" and "02001:0db8:85a3:0000:0000:8a2e:0370:7334"
 * are invalid IPv6 addresses.
 * 
 * Constraints:
 * - queryIP consists only of English letters, digits and the characters '.' and ':'.
 * ====================================================================
 */

/**
 * Validates whether queryIP is IPv4, IPv6, or Neither.
 * 
 * Time Complexity: O(n) where n = queryIP.length
 * Space Complexity: O(1) auxiliary space
 * 
 * @param {string} queryIP
 * @return {string}
 */
function validIPAddress(queryIP) {
    if (queryIP.includes('.')) {
        // Validate IPv4
        const parts = queryIP.split('.');
        if (parts.length !== 4) return "Neither";

        for (let p of parts) {
            // Must not be empty, length between 1 and 3
            if (p.length === 0 || p.length > 3) return "Neither";
            // No leading zero if length > 1
            if (p.length > 1 && p[0] === '0') return "Neither";
            // Must contain only digits
            for (let c of p) {
                if (c < '0' || c > '9') return "Neither";
            }
            const val = Number(p);
            if (val < 0 || val > 255) return "Neither";
        }
        return "IPv4";
    } else if (queryIP.includes(':')) {
        // Validate IPv6
        const parts = queryIP.split(':');
        if (parts.length !== 8) return "Neither";

        const hexChars = "0123456789abcdefABCDEF";
        for (let p of parts) {
            // Length must be between 1 and 4
            if (p.length === 0 || p.length > 4) return "Neither";
            for (let c of p) {
                if (!hexChars.includes(c)) return "Neither";
            }
        }
        return "IPv6";
    }

    return "Neither";
}

// --- Test Suite ---
if (require.main === module) {
    // Test 1: Valid IPv4
    const t1 = "172.16.254.1";
    console.assert(validIPAddress(t1) === "IPv4", "Test 1 failed");
    console.log(`Test 1 Passed: "${t1}" -> IPv4`);

    // Test 2: Valid IPv6
    const t2 = "2001:0db8:85a3:0:0:8A2E:0370:7334";
    console.assert(validIPAddress(t2) === "IPv6", "Test 2 failed");
    console.log(`Test 2 Passed: "${t2}" -> IPv6`);

    // Test 3: Neither (IPv4 with leading zeros)
    const t3 = "256.256.256.256";
    console.assert(validIPAddress(t3) === "Neither", "Test 3 failed");
    console.log(`Test 3 Passed: "${t3}" -> Neither`);

    // Test 4: Leading zero in IPv4
    const t4 = "192.168.01.1";
    console.assert(validIPAddress(t4) === "Neither", "Test 4 failed");
    console.log(`Test 4 Passed: "${t4}" -> Neither`);

    // Test 5: Trailing colon in IPv6
    const t5 = "2001:0db8:85a3:0:0:8A2E:0370:7334:";
    console.assert(validIPAddress(t5) === "Neither", "Test 5 failed");
    console.log(`Test 5 Passed: "${t5}" -> Neither`);

    // Test 6: Empty string
    const t6 = "";
    console.assert(validIPAddress(t6) === "Neither", "Test 6 failed");
    console.log(`Test 6 Passed: "" -> Neither`);

    console.log("\nAll Validate IP Address tests passed successfully!");
}

module.exports = { validIPAddress };
