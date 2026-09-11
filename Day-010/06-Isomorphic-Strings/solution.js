/*
 * Problem Name: Isomorphic Strings
 * Problem Statement: Given two strings s and t, determine if they are isomorphic.
 * Two strings s and t are isomorphic if the characters in s can be replaced to get t.
 * 
 * Approach: Two HashMaps (or Arrays) to map char from s -> t and t -> s.
 * 
 * Time Complexity: O(N)
 * Space Complexity: O(1) (256 ASCII characters limit)
 */

function isIsomorphic(s, t) {
  if (s.length !== t.length) return false;

  const mapS = new Map();
  const mapT = new Map();

  for (let i = 0; i < s.length; i++) {
    const charS = s[i];
    const charT = t[i];

    if (mapS.has(charS) && mapS.get(charS) !== charT) return false;
    if (mapT.has(charT) && mapT.get(charT) !== charS) return false;

    mapS.set(charS, charT);
    mapT.set(charT, charS);
  }

  return true;
}

console.log("Is 'egg' and 'add' isomorphic:", isIsomorphic("egg", "add")); // true
console.log("Is 'foo' and 'bar' isomorphic:", isIsomorphic("foo", "bar")); // false
