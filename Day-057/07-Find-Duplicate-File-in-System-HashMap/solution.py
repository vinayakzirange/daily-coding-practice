r"""
====================================================================
Problem: Find Duplicate File in System (LeetCode 609)
Difficulty: Medium
Topic: Array, Hash Table, String
====================================================================

Given a list paths of directory info, including the directory path,
and all the files with contents in this directory, return all the
duplicate files in the file system in terms of their paths. You may
return the answer in any order.

A group of duplicate files consists of at least two files that have
the same content.

A single directory info string in the input list has the following format:
- "root/d1/d2/.../dm f1.txt(f1_content) f2.txt(f2_content) ... fn.txt(fn_content)"

It means there are n files (f1.txt, f2.txt ... fn.txt) with content
(f1_content, f2_content ... fn_content) respectively in the directory
"root/d1/d2/.../dm". Note that n >= 1 and m >= 0. If m = 0, it means the
directory is just the root directory.

The output is a list of groups of duplicate file paths. For each group,
it contains all the file paths of the files that have the same content.
A file path is a string that has the following format:
- "directory_path/file_name.txt"

Example 1:
Input: paths = ["root/a 1.txt(abcd) 2.txt(efgh)","root/c 3.txt(abcd)","root/c/d 4.txt(efgh)","root 4.txt(efgh)"]
Output: [["root/a/2.txt","root/c/d/4.txt","root/4.txt"],["root/a/1.txt","root/c/3.txt"]]

Example 2:
Input: paths = ["root/a 1.txt(abcd) 2.txt(efgh)","root/c 3.txt(abcd)","root/c/d 4.txt(efgh)"]
Output: [["root/a/2.txt","root/c/d/4.txt"],["root/a/1.txt","root/c/3.txt"]]

Constraints:
- 1 <= paths.length <= 2 * 10^4
- 1 <= paths[i].length <= 3000
- 1 <= sum(paths[i].length) <= 5 * 10^5
- paths[i] consist of English letters, digits, '/', '.', '(', ')', and ' '.
- You may assume no files or directories share the same name in the same directory.
- You may assume each given directory info represents a unique directory.
====================================================================
"""

from collections import defaultdict
from typing import List


class Solution:
    def findDuplicate(self, paths: List[str]) -> List[List[str]]:
        """
        Parses directory records and groups files by their file contents
        using a hash map.

        Complexity:
        - Time: O(total characters in paths) to parse and hash contents
        - Space: O(total characters in paths) for storing full file paths
        """
        content_to_paths = defaultdict(list)

        for record in paths:
            parts = record.split(" ")
            directory = parts[0]

            for file_info in parts[1:]:
                # Extract file name and content: "1.txt(abcd)"
                idx = file_info.find("(")
                file_name = file_info[:idx]
                content = file_info[idx + 1 : -1]

                full_path = f"{directory}/{file_name}"
                content_to_paths[content].append(full_path)

        # Return only groups with at least two files (duplicates)
        return [group for group in content_to_paths.values() if len(group) >= 2]


# --- Test Suite ---
if __name__ == "__main__":
    sol = Solution()

    # Test 1: Example 1
    paths1 = [
        "root/a 1.txt(abcd) 2.txt(efgh)",
        "root/c 3.txt(abcd)",
        "root/c/d 4.txt(efgh)",
        "root 4.txt(efgh)",
    ]
    res1 = sol.findDuplicate(paths1)
    res1_sorted = sorted([sorted(g) for g in res1])
    expected1_sorted = sorted([
        sorted(["root/a/1.txt", "root/c/3.txt"]),
        sorted(["root/a/2.txt", "root/c/d/4.txt", "root/4.txt"]),
    ])
    assert res1_sorted == expected1_sorted, f"Test 1 failed: {res1}"

    # Test 2: No duplicates
    paths2 = ["root/a 1.txt(so1) 2.txt(so2)", "root/b 3.txt(so3)"]
    assert sol.findDuplicate(paths2) == [], "Test 2 failed: expected empty list"

    # Test 3: Multiple duplicates in same directory
    paths3 = ["root/a 1.txt(same) 2.txt(same) 3.txt(same)"]
    res3 = sol.findDuplicate(paths3)
    assert len(res3) == 1 and len(res3[0]) == 3, f"Test 3 failed: {res3}"

    print("All Find Duplicate File in System tests passed successfully!")
