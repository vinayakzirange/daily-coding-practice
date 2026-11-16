/**
 * Problem: HTML Entity Parser (LeetCode 1410)
 * Difficulty: Medium
 * Category: String / Hash Table / Simulation
 *
 * Description:
 * HTML entity parser is the parser that takes HTML code as input and replace all
 * the entities of the special characters by the characters itself.
 *
 * The special characters and their entities for HTML are:
 *   - Quotation Mark: the entity is &quot; and symbol character is ".
 *   - Single Quote Mark: the entity is &apos; and symbol character is '.
 *   - Ampersand: the entity is &amp; and symbol character is &.
 *   - Greater Than Sign: the entity is &gt; and symbol character is >.
 *   - Less Than Sign: the entity is &lt; and symbol character is <.
 *   - Slash: the entity is &frasl; and symbol character is /.
 *
 * Given the input text string to the HTML parser, return the parsed string.
 *
 * Note that characters should only be replaced once from left to right.
 * E.g., "&amp;gt;" should be replaced to "&gt;", NOT ">".
 *
 * Example 1:
 *   Input: text = "&amp; is an HTML entity but &ambassador; is not."
 *   Output: "& is an HTML entity but &ambassador; is not."
 *
 * Example 2:
 *   Input: text = "and I quote: &quot;...&quot;"
 *   Output: "and I quote: \"...\""
 *
 * Constraints:
 *   - 1 <= text.length <= 10^5
 *   - The string may contain any possible characters out of all the 256 ASCII characters.
 */

/**
 * Replaces HTML entities with their corresponding symbol characters in a single pass.
 *
 * @param {string} text
 * @return {string}
 */
function entityParser(text) {
  const entityMap = {
    '&quot;': '"',
    '&apos;': "'",
    '&amp;': '&',
    '&gt;': '>',
    '&lt;': '<',
    '&frasl;': '/'
  };

  const n = text.length;
  const result = [];
  let i = 0;

  while (i < n) {
    if (text[i] === '&') {
      let matched = false;
      // Entity lengths vary from 4 ("&gt;", "&lt;") to 7 ("&frasl;")
      for (const entity in entityMap) {
        if (text.startsWith(entity, i)) {
          result.push(entityMap[entity]);
          i += entity.length;
          matched = true;
          break;
        }
      }
      if (!matched) {
        result.push(text[i]);
        i++;
      }
    } else {
      result.push(text[i]);
      i++;
    }
  }

  return result.join('');
}

// ----------------- Unit Tests -----------------
function runTests() {
  const assert = require('assert');

  // Test 1: Example 1
  assert.strictEqual(
    entityParser('&amp; is an HTML entity but &ambassador; is not.'),
    '& is an HTML entity but &ambassador; is not.',
    'Test 1 Failed'
  );

  // Test 2: Example 2
  assert.strictEqual(
    entityParser('and I quote: &quot;...&quot;'),
    'and I quote: "..."',
    'Test 2 Failed'
  );

  // Test 3: Multiple adjacent entities
  assert.strictEqual(
    entityParser('&gt;&lt;&frasl;&apos;&amp;'),
    '></\'&',
    'Test 3 Failed'
  );

  // Test 4: Single pass guarantee (&amp;gt; -> &gt;)
  assert.strictEqual(
    entityParser('&amp;gt;'),
    '&gt;',
    'Test 4 Failed: Should not recursively convert to >'
  );

  // Test 5: No entities
  assert.strictEqual(
    entityParser('Hello World 123!'),
    'Hello World 123!',
    'Test 5 Failed'
  );

  console.log('All tests passed for 06-HTML-Entity-Parser-String!');
}

if (require.main === module) {
  runTests();
}

module.exports = { entityParser };
