# Roman Urdu JS Wrapper – Documentation

## 1. Introduction

The **Roman Urdu JS Wrapper** is a small educational library that lets you write JavaScript programs using **Roman Urdu words** instead of English keywords. The goal is **not** to replace JavaScript but to show that programming languages are **not magic**. They are just built on top of simple rules and predefined words that humans designed. By swapping English keywords with familiar Roman Urdu terms, we make programming more approachable and show that the “language” of programming is about structure, not about English.

Example:

```roman-urdu
likho('Assalamu Alaikum');
bolo n = 5;
agar (n bara 3) {
  likho('n bara hai 3 se');
} warna {
  likho('n chhota ya barabar hai 3 se');
}
```

This code works like normal JavaScript and prints messages, but the words are in Roman Urdu.

---

## 2. Why This Library?

* To demonstrate that programming languages are **human-designed tools**, not magic spells.
* To make programming concepts easier to understand for beginners in Pakistan/India who may find English keywords intimidating.
* To show that the **structure** (syntax) matters more than the specific keywords.
* To inspire learners to think: *“If I can make my own keywords, then programming is not alien, it’s just logic with words.”*

---

## 3. How It Works

The library is a **wrapper / transpiler**. It:

1. Takes your Roman Urdu code.
2. Replaces Roman Urdu keywords with JavaScript equivalents.
3. Runs the converted code in JavaScript.

For example:

* `likho` → `console.log`
* `agar` → `if`
* `warna` → `else`
* `bolo` → `let`

---

## 4. Installation & Usage

### In Browser

1. Save `roman-urdu-js-wrapper.js` in your project.
2. Include it in your HTML file:

```html
<script src="roman-urdu-js-wrapper.js"></script>
```

3. Write Roman Urdu code and run it:

```html
<script>
  runRoman(`likho('Hello Roman Urdu!');`);
</script>
```

### In Node.js

1. Copy `roman-urdu-js-wrapper.js` into your project.
2. Import it:

```js
const { runRoman } = require('./roman-urdu-js-wrapper');
runRoman("likho('Hello Roman Urdu from Node!')");
```

---

## 5. Supported Keywords

Here are the predefined Roman Urdu → JavaScript mappings:

| Roman Urdu | JavaScript    | Meaning                      |    |            |
| ---------- | ------------- | ---------------------------- | -- | ---------- |
| `likho`    | `console.log` | Print output                 |    |            |
| `agar`     | `if`          | If condition                 |    |            |
| `warna`    | `else`        | Else condition               |    |            |
| `jabtak`   | `while`       | Loop while condition is true |    |            |
| `wapas`    | `return`      | Return from function         |    |            |
| `karo`     | `function`    | Define a function            |    |            |
| `bolo`     | `let`         | Declare variable             |    |            |
| `muqarrar` | `const`       | Constant variable            |    |            |
| `aur`      | `&&`          | Logical AND                  |    |            |
| `ya`       | \`            |                              | \` | Logical OR |
| `nahin`    | `!`           | NOT (negation)               |    |            |
| `barabar`  | `===`         | Equals                       |    |            |
| `bara`     | `>`           | Greater than                 |    |            |
| `chhota`   | `<`           | Less than                    |    |            |
| `seedha`   | `true`        | Boolean true                 |    |            |
| `ghalat`   | `false`       | Boolean false                |    |            |
| `ke_liye`  | `for`         | For loop                     |    |            |

---

## 6. Example Programs

### Example 1: Hello World

```roman-urdu
likho('Hello Duniya!');
```

### Example 2: Condition

```roman-urdu
bolo umar = 20;
agar (umar bara 18) {
  likho('Adult hai');
} warna {
  likho('Adult nahin');
}
```

### Example 3: Loop

```roman-urdu
ke_liye (bolo i = 0; i chhota 5; i++) {
  likho('Ginti: ' + i);
}
```

---

## 7. Extending the Library

You can add your own keywords:

```js
extendMapping({ 'chapo': 'document.write' });
```

Then you can write:

```roman-urdu
chapo('Hello from chapo!');
```

---

## 8. Limitations

* This is **token-based**, not a real parser. Some edge cases may break.
* It’s meant for **learning and fun**, not production apps.
* Only a limited set of Roman Urdu keywords is supported (but you can extend them).

---

## 9. Conclusion

The Roman Urdu JS Wrapper shows that programming languages are not locked to English — they are just **rules plus words**. By redefining the words, we prove that programming is simply about logic and structure. This lowers the entry barrier for beginners and shows that anyone can design a programming language.

> **Key Idea:** Programming languages are human creations. They are not magic — they are just agreements on how to write instructions for the computer.
