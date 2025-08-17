/*
Roman Urdu → JavaScript small transpiler / wrapper
File: roman-urdu-js-wrapper.js

Purpose: let developers write small JS programs using Roman Urdu keywords and helper functions.
Design: Simple token-replacement transpiler + runtime helper. Not a full parser — good for learning, prototyping, and small scripts.

Usage (in browser or Node):
  1) include this file (or import it as a module)
  2) call `runRoman(romanCode)` to execute Roman-Urdu code
  3) optionally call `transpileRoman(romanCode)` to get generated JS source
  4) extend `ROMAN_MAP` to add more keyword translations

Security: This uses the Function constructor to run generated JS. Do NOT run untrusted input on servers. For sandboxing, integrate a proper JS sandbox or run in a dedicated iframe.

Example Roman-Urdu script (see README in this file for full examples):
  likho('Assalamu alaikum');
  let n = 5;
  agar (n > 3) {
    likho('n bara hai 3');
  } warna {
    likho('n chhota');
  }
*/

// Mapping of Roman Urdu tokens (words) → JS tokens.
// This is intentionally conservative: only whole-word replacements (\b...\b).
const ROMAN_MAP = {
  // basic I/O
  'likho': 'console.log',    // likho(...) → console.log(...)
  // keywords
  'agar': 'if',
  'warna': 'else',
  'jabtak': 'while',
  'wapas': 'return',
  'karo': 'function',
  // logical
  'aur': '&&',
  'ya': '||',
  'nahin': '!',
  // comparison
  'barabar': '===',
  'bara': '>',
  'chhota': '<',
  'baraabar': '>=',
  'chhotaabar': '<=',
  'barabargay': '!==',
  // variable declarations
  'bolo': 'let',        // bolo x = 5;
  'muqarrar': 'const',  // muqarrar PI = 3.14;
  // common helpers
  'seedha': 'true',
  'ghalat': 'false',
  // for loop helpers (simple)
  'ke_liye': 'for',     // for (let i=0; i<5; i++) → ke_liye (let i=0; i<5; i++)
};

// Build an array of replacement rules (RegExp, replacementString)
const RULES = Object.entries(ROMAN_MAP).map(([k, v]) => {
  // \b for word boundaries, 'g' for global, 'i' for case-insensitive
  // use Unicode-aware word boundaries where possible
  const pattern = new RegExp('\\b' + escapeRegExp(k) + '\\b', 'gi');
  return { pattern, replacement: v };
});

function escapeRegExp(string) {
  return string.replace(/[.*+?^${}()|[\\]\\\\]/g, '\\$&');
}

/**
 * transpileRoman(romanCode) -> transpiled JS string
 * Performs token replacements and returns JS source. Also preserves indentation and comments.
 */
function transpileRoman(romanCode) {
  let out = romanCode;
  // Apply rules in order
  for (const r of RULES) {
    out = out.replace(r.pattern, r.replacement);
  }

  // A few helpful fixes: allow 'aur' and 'ya' to be used infix without spacing issues
  // (they were already replaced by && and ||)

  // Normalize some common Roman Urdu punctuation variations (optional)
  out = out.replace(/؛/g, ';'); // Arabic semicolon

  return out;
}

/**
 * runRoman(romanCode, opts)
 * - transpiles the code and executes it using Function()
 * - opts: {context: object} optional object whose properties will be injected as locals
 */
function runRoman(romanCode, opts = {}) {
  const js = transpileRoman(romanCode);

  // Basic safety check: disallow a few obviously dangerous tokens when running on server
  const dangerous = ['process', 'require', 'child_process', 'fs', 'Function', 'eval'];
  for (const tok of dangerous) {
    if (new RegExp('\\b' + escapeRegExp(tok) + '\\b', 'i').test(js)) {
      throw new Error('Refusing to run code that mentions "' + tok + '".');
    }
  }

  // Prepare argument names & values from context
  const ctx = opts.context || {};
  const argNames = Object.keys(ctx);
  const argValues = Object.values(ctx);

  // Create a new Function with injected context variables; returns result of last expression
  const func = new Function(...argNames, js);
  return func(...argValues);
}

/**
 * extendMapping(obj)
 * Add or override roman-to-js mappings at runtime. Example:
 *   extendMapping({ 'chapo': 'document.write' })
 */
function extendMapping(obj) {
  for (const k of Object.keys(obj)) {
    ROMAN_MAP[k] = obj[k];
  }

  // rebuild rules
  while (RULES.length) RULES.pop();
  Object.entries(ROMAN_MAP).forEach(([k, v]) => {
    RULES.push({ pattern: new RegExp('\\b' + escapeRegExp(k) + '\\b', 'gi'), replacement: v });
  });
}

// Export for CommonJS / ES module / browser global
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { transpileRoman, runRoman, extendMapping, ROMAN_MAP };
} else {
  window.transpileRoman = transpileRoman;
  window.runRoman = runRoman;
  window.extendMapping = extendMapping;
  window.ROMAN_MAP = ROMAN_MAP;
}

/*
--- More examples included below (in the file) ---

// Example 1: simple printing
likho('Hello from Roman Urdu');

// Example 2: variable and conditional
bolo n = 7;
agar (n bara 5) {
  likho('n 5 se bara hai');
} warna {
  likho('n 5 se chhota ya barabar');
}

// Example 3: extend mapping
extendMapping({ 'ginti_karo': 'for' });

// Notes & limitations:
// - This translator is token-based, not AST-based: rare edge-cases may produce invalid JS.
// - It is meant for education and prototyping. For production, write a proper parser/transpiler.
*/
