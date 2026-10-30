r"""
====================================================================
Problem: Encode and Decode TinyURL (LeetCode 535)
Difficulty: Medium
Topic: Hash Table, String, Design, Hash Function
====================================================================

TinyURL is a URL shortening service where you enter a URL such as
https://leetcode.com/problems/design-tinyurl and it returns a short
URL such as http://tinyurl.com/4e9iAk. Design a class to encode a
URL and decode a tiny URL.

There is no restriction on how your encode/decode algorithm should work.
You just need to ensure that a URL can be encoded to a tiny URL and the
tiny URL can be decoded to the original URL.

Implement the Codec class:
- Codec() Initializes the object of the system.
- String encode(String longUrl) Returns a tiny URL for the given longUrl.
- String decode(String shortUrl) Returns the original long URL for the
  given shortUrl. It is guaranteed that the given shortUrl was encoded
  by the same object.

Example 1:
Input: url = "https://leetcode.com/problems/design-tinyurl"
Output: "https://leetcode.com/problems/design-tinyurl"
Explanation:
Codec codec = new Codec();
codec.decode(codec.encode(url)); // returns "https://leetcode.com/problems/design-tinyurl"

Constraints:
- 1 <= url.length <= 10^4
- url is guaranteed to be a valid URL.
====================================================================
"""

import random
import string


class Codec:
    """
    URL shortener using 6-character Base62 alphanumeric random keys
    and bidirectional hash maps.

    Complexity:
    - Time: O(1) amortized for encode and O(1) for decode
    - Space: O(N) where N is the total number of unique URLs registered
    """

    def __init__(self):
        self.chars = string.ascii_letters + string.digits
        self.url_to_code = {}
        self.code_to_url = {}
        self.base_url = "http://tinyurl.com/"

    def _generate_code(self) -> str:
        return "".join(random.choices(self.chars, k=6))

    def encode(self, longUrl: str) -> str:
        """Encodes a URL to a shortened URL."""
        if longUrl in self.url_to_code:
            return self.base_url + self.url_to_code[longUrl]

        code = self._generate_code()
        while code in self.code_to_url:
            code = self._generate_code()

        self.url_to_code[longUrl] = code
        self.code_to_url[code] = longUrl
        return self.base_url + code

    def decode(self, shortUrl: str) -> str:
        """Decodes a shortened URL to its original URL."""
        code = shortUrl.replace(self.base_url, "")
        return self.code_to_url.get(code, "")


# --- Test Suite ---
if __name__ == "__main__":
    codec = Codec()

    # Test 1: Standard URL
    url1 = "https://leetcode.com/problems/design-tinyurl"
    short1 = codec.encode(url1)
    assert short1.startswith("http://tinyurl.com/"), f"Test 1 failed prefix: {short1}"
    assert codec.decode(short1) == url1, f"Test 1 failed decode: {codec.decode(short1)}"

    # Test 2: Idempotency (same URL returns same code)
    short2 = codec.encode(url1)
    assert short1 == short2, "Test 2 failed: duplicate encode should produce same shortened URL"

    # Test 3: Multiple unique URLs
    urls = [
        "https://google.com/search?q=antigravity",
        "https://github.com/vinayakzirange/daily-coding-practice",
        "https://en.wikipedia.org/wiki/Dynamic_programming",
    ]
    for u in urls:
        encoded = codec.encode(u)
        decoded = codec.decode(encoded)
        assert decoded == u, f"Test 3 failed for {u}: decoded={decoded}"

    print("All Encode and Decode TinyURL tests passed successfully!")
