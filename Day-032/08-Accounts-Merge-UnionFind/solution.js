// Problem: Accounts Merge (LeetCode 721)
// Language: JavaScript
// Difficulty: Medium
// Time Complexity: O(N * K * log(N * K)) where N is number of accounts, K is max emails per account
// Space Complexity: O(N * K)

class UnionFind {
    constructor() {
        this.parent = new Map();
    }

    find(x) {
        if (!this.parent.has(x)) {
            this.parent.set(x, x);
        }
        if (this.parent.get(x) !== x) {
            this.parent.set(x, this.find(this.parent.get(x)));
        }
        return this.parent.get(x);
    }

    union(x, y) {
        const rootX = this.find(x);
        const rootY = this.find(y);
        if (rootX !== rootY) {
            this.parent.set(rootX, rootY);
        }
    }
}

/**
 * @param {string[][]} accounts
 * @return {string[][]}
 */
function accountsMerge(accounts) {
    const uf = new UnionFind();
    const emailToName = new Map();

    // Step 1: Map each email to account name and union all emails of the same account
    for (const [name, firstEmail, ...otherEmails] of accounts) {
        emailToName.set(firstEmail, name);
        uf.find(firstEmail);

        for (const email of otherEmails) {
            emailToName.set(email, name);
            uf.union(firstEmail, email);
        }
    }

    // Step 2: Group emails by their root representative
    const groups = new Map();
    for (const email of emailToName.keys()) {
        const root = uf.find(email);
        if (!groups.has(root)) {
            groups.set(root, []);
        }
        groups.get(root).push(email);
    }

    // Step 3: Format output with name and sorted emails
    const result = [];
    for (const [root, emails] of groups.entries()) {
        emails.sort();
        result.push([emailToName.get(root), ...emails]);
    }

    return result;
}

// Test cases
const accounts = [
    ["John", "johnsmith@mail.com", "john_newyork@mail.com"],
    ["John", "johnsmith@mail.com", "john00@mail.com"],
    ["Mary", "mary@mail.com"],
    ["John", "johnnybravo@mail.com"]
];

console.log("Merged Accounts:");
console.log(JSON.stringify(accountsMerge(accounts), null, 2));
// Expected: John merged with 3 emails, Mary with 1, John with johnnybravo
