import { useState, useRef, useEffect } from "react";

// ── DATA ─────────────────────────────────────────────────────────────────────

const lectures = [
    {
        id: "lec01", label: "Lec 01", title: "Web Architecture & JS at Client Side",
        date: "16/02/26", color: "#f59e0b",
        sections: [
            {
                heading: "3-Layer Architecture",
                content: `UI Layer → Business Layer (Express/RestApi) → Persistence Store | Repository
• UI: HTML, CSS | Bootstrap, JavaScript (React, Angular)
• Business: Java, JavaScript[Node.js], Python, Golang, PHP
  → Data exchanged as JSON
• DB: Oracle/MySQL (SQL), MongoDB (NoSQL/JavaScript)
• Stacks: MERN, MEAN`
            },
            {
                heading: "JavaScript at Client Side — Pipeline",
                content: `HDD (.js file)
  ↓
Parser → AST (Byte Code / MLL | HLL) [on fly]
  ↓ JIT
RAM [semi conductor]
  binary: 10101010, 10100101, ...
  ↓
MP (Micro Processor) → Output

• JIT Compilation done by V8Engine inside Browser
  → Chrome (Google), Mozilla (Firefox), Safari (Apple)
• Error at parse stage: SyntaxError
• Pipeline: .js → parser → byte code → JIT → MLL → output (RAM)`
            },
            {
                heading: "4 Roles of JS at Client Side",
                content: `1. Dynamic actions on page
   e.g. "Pay to proceed" button → redirect to payment page
        Playing games / actions on a page

2. Connect to external devices
   e.g. Printing a ticket [without using internet]

3. Support APIs to manage data at client side
   e.g. localStorage, cookies, etc.

4. Controls data validation at client side
   WITHOUT requesting the backend application`
            }
        ]
    },
    {
        id: "lec02", label: "Lec 02", title: "Script vs Program & JS Types",
        date: "17/02/26", color: "#06b6d4",
        sections: [
            {
                heading: "Script vs Program",
                content: `Script → small task needed to perform at certain interval
  a. start DB engine
  b. create a table → start init
  c. CRUD operation

Program → set of instructions given to perform specific or large task
  e.g. program to perform large operation`
            },
            {
                heading: "How JavaScript Takes Control of DOM",
                content: `Q: How would JavaScript take over the control of DOM?
Ans: To take control of DOM we need to write a script and link the script to an HTML page.`
            },
            {
                heading: "3 Ways to Write JavaScript",
                content: `a. Inline — JS in the same line where we write HTML
   ✅ Faster in execution
   ✅ Testing purpose
   ❌ Code redundancy

b. Embedded — written inside HTML file only, with <script type="text/javascript">
   // single line comment   /* multi line comment */
   ✅ No code redundancy
   ✅ Multiple actions code can be written
   ❌ No clear separation b/w HTML, CSS, JS
   ❌ JS code can be used in only that page

c. External — writing JS code outside the page
   <script src="path/to/file.js"></script>
   ✅ Clear cut separation
   ✅ Can be linked to multiple HTML pages
   ❌ Loading time would be more`
            },
            {
                heading: "Parsers per Technology",
                content: `HTML ──→ HTML Parser
CSS  ──→ CSS Parser (CSSOM)
JS   ──→ V8 Engine

HTML structure:
  <head>  → loaded to browser memory
  <body>  → directly painted on webpage
            <script src='path of js file'></script> placed here`
            },
            {
                heading: "Evolution of Programming Languages",
                content: `C      → Denis Ritchie      → Structured programming language
C++    → Stroustrup         → Object Oriented programming [not 100%]
Java   → James Gosling      → Object Oriented programming

Java → 1991, internet also booming, browser era
  HTML + CSS + LiveScript[Netscape] — Brendan Eich
  SUN MICROSYSTEMS → JAVASCRIPT
    influenced by: C, C++, Java → AOP, OBP`
            }
        ]
    },
    {
        id: "lec03", label: "Lec 03", title: "Functions & Execution Context",
        date: "18/02/26", color: "#10b981",
        sections: [
            {
                heading: "Functions — Heart of JavaScript",
                content: `All code would be written INSIDE functions.
Functions are:
  a. Heart of JavaScript
  b. First class citizens of JavaScript

Types of Functions:
  a. Predefined: console.log()
  b. User-defined:
     a. Function Declaration
     b. Function Expression [Pure functions, HOF, RF]
     c. IIFE (Immediately Invoking Function Expression)
     d. Arrow Functions [ECMASCRIPT-2015]`
            },
            {
                heading: "Execution Context — Example",
                content: `var n = 2;
function square(num) {
  ans = num * num;
  return ans;
}
var result = square(n);
console.log(result);  // 4

Memory Phase:
  n: undefined, square: fn(){...}, result: undefined

Execution Phase:
  Line-1: n = 2
  Line-6: square(n) called → new EC created
    Memory: num: undefined, ans: undefined
    Code:   num = 2, ans = 4, return → EC popped
  Line-6: result = 4
  Line-7: console.log(4) → Output: 4`
            },
            {
                heading: "Execution Context",
                content: `Every JS program runs inside an Execution Context (Container).
Has 2 components: Memory (variable env) + Code (thread of execution)

Call Stack (LIFO): GEC at bottom → EC-1 → EC-2 on top
Also called:
  1. Execution Context Stack
  2. Program Stack
  3. Control Stack
  4. Runtime Stack
  5. Machine Stack`
            }
        ]
    },
    {
        id: "lec04", label: "Lec 04", title: "JS Engine & 2 Phases",
        date: "23/02/26", color: "#8b5cf6",
        sections: [
            {
                heading: "What happens when you run JavaScript Code?",
                content: `→ Execution context is CREATED when JavaScript code is run.
→ Execution context is created in TWO phases:
   1. Memory Creation Phase
   2. Code Execution Phase`
            },
            {
                heading: "1. Memory Creation Phase",
                content: `JS allocates memory to ALL variables and functions.

Using: var n = 2; function square(num){...} var result = square(n);

→ Line-1: n=2 → JS allocates memory for n → stores 'undefined'
→ Line-2: square function → allocates memory → stores ENTIRE function code
→ Line-6: result → allocates memory → stores 'undefined'

Key: Functions get their WHOLE code stored in memory.
     Variables get 'undefined' as placeholder.`
            },
            {
                heading: "2. Code Execution Phase",
                content: `JS runs through the whole program LINE BY LINE (Thread Synchronous).

→ Line-1: n = 2 (undefined replaced by 2)
→ Line-2–5: nothing to execute (function definition)
→ Line-6: square(n) invoked → brand new EC is created
   Memory phase of EC: num: undefined, ans: undefined
   Code phase of EC:
     num is parameter, n is argument → num = 2
     Line-3: ans = 2*2 = 4 (undefined → 4)
     return → control returned to where function was invoked (Line-6)
     result = 4 (undefined → 4)
     square EC popped off the call stack
→ Line-7: console.log(result) → Output: 4
→ GEC also popped when program ends`
            },
            {
                heading: "Key Insight — undefined vs not defined",
                content: `'undefined' → memory IS allocated, but value not yet initialized (placeholder keyword)
'not defined' → memory was NEVER allocated → ReferenceError

Note: var a; if(a==undefined) → GOOD approach
      var a = undefined; → BAD coding (data inconsistency)

Shortest JS Program: variable-code.js
  global → window [it is a part of browser]
  global scope → window → this
  var a = 10;
  console.log(a);        // 10
  console.log(window.a); // 10
  console.log(this.a);   // 10
  console.log(window == this); // true`
            }
        ]
    },
    {
        id: "lec05", label: "Lec 05", title: "Scope Chain & Lexical Environment",
        date: "24/02/26", color: "#f43f5e",
        sections: [
            {
                heading: "Scope & Lexical Environment",
                content: `Scope → it refers to where a variable or function can be accessed in a code.

Lexical Environment → whenever an Execution Context is created, a Lexical Environment is created.
  = Local Memory + Lexical Environment of the Parent

Note: With the help of Lexical Environment, a variable can be accessed
      from the hierarchy [parent].

Local Variables: variables created temporarily by the programmer for temporary usage.
  → Memory would be created in the stack.`
            },
            {
                heading: "Scope Chain",
                content: `Scope Chain = chain of Lexical Environments + parent references.
If JS engine doesn't find a variable in local memory,
it goes to the next level of the scope chain.
This whole chain of lexical environments is called the SCOPE CHAIN.`
            },
            {
                heading: "Scope Examples",
                content: `Example 1 — Access via scope chain:
  function a(){ console.log(b); }
  var b = 10;
  a(); // Output: 10 ✅ (b found in GEC via LE)

Example 2 — Nested scope chain:
  function a(){
    c();
    function c(){ console.log(b); }
  }
  var b = 10;
  a(); // Output: 10 ✅ (c → a → GEC chain)

Example 3 — Cannot access function-local from outside:
  function a(){ var b = 10; }
  a();
  console.log(b); // ❌ ReferenceError: b is not defined

Example 4 — c() inside a() can access a's variable:
  function a(){
    var b = 10;
    c();
    function c(){ console.log(b); }
  }
  a(); // Output: 10 ✅

Example 5 — c() not accessible outside a():
  function a(){
    c();
    function c(){ console.log(b); }
  }
  var b = 10;
  c(); // ❌ ReferenceError: c is not defined`
            },
            {
                heading: "JS vs C/Java",
                content: `C | Java                     JavaScript
─────────────────────────────────────────────────
Compile Time checking        Runtime checking
Strictly typed               Weakly | loosely typed
Clear cut scopes             Execution Context Driven scope

JavaScript Engine also:
  1. Scans the entire program and first checks the scope
  2. Creates Global Execution Context
     a. Memory Creation Phase → K: undefined or TDZ, K: body of function
     b. Code Execution Phase  → Thread Synchronous`
            }
        ]
    },
    {
        id: "lec06", label: "Lec 06", title: "Hoisting in JavaScript",
        date: "24/02/26", color: "#fbbf24",
        sections: [
            {
                heading: "Hoisting Rules",
                content: `Variables and functions are hoisted in JS during Memory Creation Phase.

1. After initialization → works fine
2. Before initialization → var gives 'undefined', function works fine
3. Variable without declaration → ReferenceError: not defined
4. Function Expression before init → TypeError (not a function)
5. Arrow Function before init → TypeError (not a function)

Key: Function Expressions & Arrow Functions are NOT hoisted (they're variables).`
            },
            {
                heading: "undefined vs not defined",
                content: `undefined  → memory IS allocated, but JS engine set it to undefined
not defined → memory NOT allocated → ReferenceError`
            }
        ]
    },
    {
        id: "lec07", label: "Lec 07", title: "var, let, const",
        date: "25/02/26", color: "#34d399",
        sections: [
            {
                heading: "var",
                content: `• Redeclaration IS permitted in same scope
• Respects global & function scope (NOT block scope)
• Hoisting with 'undefined' value
• Uses global object (OER = Object Environment Record = window) memory → bad practice
• global scope = window = this`
            },
            {
                heading: "let",
                content: `• Redeclaration NOT permitted in same scope
• Respects block, function, and global scope (separate memory)
• Supports hoisting with TDZ (Temporal Dead Zone)
• Uses DER = Declarative Environment Record (not window / not on OER)
• Added in ECMASCRIPT-2015`
            },
            {
                heading: "const",
                content: `• Redeclaration NOT permitted
• Same scope rules as let (DER)
• Supports hoisting with TDZ
• Reinitialization NOT supported → TypeError
• MUST be initialized at declaration level → SyntaxError otherwise
• const = let + initialization at declaration + no reinitialization
• ECMASCRIPT-2015`
            },
            {
                heading: "Snippet 1 — var in Global Scope",
                content: `let a = 10;
var b = 20;
console.log(a); // Output: 10

Global Scope Memory:
  OER (window): b: undefined → 10
  DER (script): a: TDZ → 10
  LE: null`
            },
            {
                heading: "Snippet 2 — let TDZ Error",
                content: `console.log(a); // ❌ ReferenceError: Cannot access 'a' before initialization
let a = 10;
var b = 20;

Memory (M phase): a: TDZ, b: undefined
Code  (E phase):  Error thrown at console.log(a) → TDZ`
            },
            {
                heading: "Snippet 3 — let declared then assigned",
                content: `let a;
a = 10;
console.log(a); // Output: 10

Memory (M): a: TDZ
Execution:  a = 10 → Output: 10`
            },
            {
                heading: "Snippet 4 — let redeclaration",
                content: `let a = 100;
let a = 200; // ❌ SyntaxError: Identifier 'a' has already been declared
console.log(a);`
            },
            {
                heading: "Snippet 5 — const without init",
                content: `const a;       // ❌ SyntaxError: Missing initializer in const declaration
a = 20;
console.log(a);`
            },
            {
                heading: "Snippet 6 — const reassignment",
                content: `const a = 10;
a = 100;        // ❌ TypeError: Assignment to constant variable
console.log(a);`
            },
            {
                heading: "Snippet 7 — Block scope (var leaks, let/const block-scoped)",
                content: `{
  var a = 100;     // Global OER: a = 100 (leaks out)
  let b = 200;     // Block DER: b = 200 (stays inside)
  const c = 300;   // Block DER: c = 300 (stays inside)
}
console.log(a); // 100 ✅
console.log(b); // ❌ ReferenceError: b is not defined
console.log(c); // ❌ ReferenceError: c is not defined

Memory layout:
  Global scope:  OER: a=undefined→100, DER: -
  Block scope:   OER: -, DER: b=TDZ→200, c=TDZ→300
  LE: block scope`
            },
            {
                heading: "Snippet 8 — All three inside block, logging outside",
                content: `{
  var a = 100;
  let b = 200;
  const c = 300;
  console.log(a); // 100 ✅
  console.log(b); // 200 ✅
  console.log(c); // 300 ✅
}
console.log(a); // 100 ✅ (var leaks)
console.log(b); // ❌ ReferenceError: b is not defined`
            }
        ]
    },
    {
        id: "lec08", label: "Lec 08", title: "Shadowing & Closures",
        date: "26/02/26", color: "#ec4899",
        sections: [
            {
                heading: "Shadowing",
                content: `Shadowing = inner scope variable with same name as outer scope.
var inside block shadows outer var (same OER/window object → value gets overwritten).
let/const in block → separate DER (block scope), doesn't affect outer.

Shadowing snippet 1 — var shadows var:
  var a = 1;
  { var a = 100; let b = 200; const c = 300; }
  console.log(a); // 100 (var changed global OER directly)
  console.log(b); // ❌ ReferenceError: b is not defined

Shadowing snippet 2 — let in outer, var+let+const in block:
  let b = 1;
  { var a = 100; let b = 200; const c = 300; }
  console.log(b); // 1 (outer let b unaffected)
  console.log(a); // 100 (var leaks to global)
  console.log(c); // ❌ ReferenceError

Shadowing snippet 3 — var + window.a mutation:
  var a = 10;
  function x() {
    var a = 100; // local shadow
    console.log("inner a =", a);       // 100
    console.log("window.a =", window.a); // 10 (global var)
    window.a = 200;                    // mutates global
  }
  x();
  console.log("After x(), a =", a);  // 200`
            },
            {
                heading: "Illegal Shadowing",
                content: `let a = 10;
{ var a = 100; }  // ❌ SyntaxError: Identifier 'a' has already been declared

During the creation phase, the engine builds the lexical environment.
It sees two declarations of 'a' in the same environment record —
one from let, one from var. Since let and var CANNOT coexist with the
same identifier in one scope, PARSING FAILS.`
            },
            {
                heading: "Closure — Concept",
                content: `A closure = function + its lexical environment (remembers outer variables).
Inner function can use variables of outer function even after outer is done.

function outer() {
  // declare a variable
  function inner() { }
  inner();           ← can use outer's variable → YES → Closure
}
outer();`
            },
            {
                heading: "Closure Snippet 1 — Basic",
                content: `function Outer1() {
  let x = 100;
  function Inner1() {
    let y = 200;
    return function () {
      console.log(x); // 100 (via closure)
      console.log(y); // 200 (via closure)
    }
  }
  return Inner1();
}
let fn = Outer1()();
Output: 100 / 200

EC chain: GEC [LE:null] ← Outer1 [LE:GEC] ← Inner1 [LE:Outer1] ← return fn`
            },
            {
                heading: "Closure Snippet 2 — Counter (shared closure)",
                content: `function counter() {
  let count = 0;
  return function () {
    count++;
    console.log(count);
  }
}
let fn = counter();
fn(); // 1
fn(); // 2
fn(); // 3

Each call to counter() creates a new lexical environment with its own count.
When we store it in fn, we reuse the SAME closure → count keeps incrementing.`
            },
            {
                heading: "Closure Snippet 3 — count++ outside return",
                content: `function counter() {
  let count = 0;
  count++;
  return function () { console.log(count); }
}
let fn = counter();
fn(); // 1
fn(); // 1
fn(); // 1

count++ runs at counter() call, not inside returned fn.
fn only reads count from closure → always 1.`
            },
            {
                heading: "Closure Snippet 4 — Deep nested (a→b→c)",
                content: `function a() {
  let x = 100;
  function b() {
    let y = 200;
    let c = function () {
      let z = 1000;
      console.log(x, y, z); // 100 200 1000
    }
    c();
  }
  b();
}
a();

EC chain: GEC[LE:null] ← a()[LE:GEC] ← b()[LE:a] ← c()[LE:b]
c() traverses scope chain to find x→a, y→b, z→local`
            },
            {
                heading: "Closure Snippet 5 — IIFE with nested closure",
                content: `(function () {
  let x = 100;
  function b() {
    let y = 200;
    let c = function () {
      let z = 1000;
      console.log(x, y, z);
    }
    c();
  }
  return b();
})();

Calling function without a name and printing it — IIFE pattern.`
            }
        ]
    },
    {
        id: "lec09", label: "Lec 09", title: "DOM — Introduction",
        date: "02/03/26", color: "#f59e0b",
        sections: [
            {
                heading: "What is the DOM?",
                content: `HTML + CSS → Browser → Static DOM → JS makes it Dynamic

Upon browser events:
1. Select the element
2. Actions on element: update / delete / add
3. Add style if needed

Browser fires an event → JS handles it via functions`
            },
            {
                heading: "How JS Selects DOM Elements",
                content: `1. By id      → getElementById()
2. By tagName → getElementsByTagName()
3. By class   → getElementsByClassName()
4. By CSS selector → querySelector() / querySelectorAll()`
            },
            {
                heading: "null vs undefined",
                content: `undefined → Memory creation phase; variable gets memory but value = undefined (runtime)
null → Code execution phase; value not available, engine sets null
  → null: value didn't come at runtime, so we set null manually`
            },
            {
                heading: "HTMLCollection vs NodeList",
                content: `HTMLCollection → only HTML elements (DYNAMIC — forEach NOT supported)
NodeList → HTML elements + text data + comments (STATIC — forEach supported)`
            }
        ]
    },
    {
        id: "lec10", label: "Lec 10", title: "DOM Selection Methods",
        date: "03/03/26", color: "#06b6d4",
        sections: [
            {
                heading: "Selection APIs",
                content: `getElementById(String)           → HTMLElement | null
getElementsByClassName(String)   → HTMLCollectionOf<Element>
getElementsByTagName(String)     → HTMLCollection[]
getElementsByName(String)        → NodeList<HTMLElement>
querySelector(String)            → HTMLElement | null
querySelectorAll(String)         → NodeList[]`
            },
            {
                heading: "classList",
                content: `classList → holds class names bound to an element
Internally an array (length = number of classes)
Arrays in JS are dynamic (can grow/shrink)`
            },
            {
                heading: "HTMLCollection vs NodeList (Key Diff)",
                content: `HTMLCollection → DYNAMIC (live DOM) → forEach() NOT possible
NodeList      → STATIC (snapshot)  → forEach() IS possible`
            }
        ]
    },
    {
        id: "lec11", label: "Lec 11", title: "DOM Manipulation",
        date: "05/03/26", color: "#8b5cf6",
        sections: [
            {
                heading: "Creating & Adding Elements",
                content: `createElement(String) → creates new Element (TagName)
  Note: Unknown tagName → creates 'unknownElement'

appendChild(node) → appends child node (Node only, 1 arg)
append(...nodes | String) → appends node or text (multiple args, accepts strings)`
            },
            {
                heading: "innerText vs textContent vs innerHTML",
                content: `innerText   → what USER sees | no HTML tags | no hidden text
textContent → everything in DOM | no HTML tags | YES hidden text
innerHTML   → actual HTML code | YES HTML tags | YES hidden text`
            },
            {
                heading: "appendChild vs append",
                content: `Feature        appendChild()   append()
──────────────────────────────────────
Arguments      1               Multiple
Accepts string ❌ No           ✅ Yes
Accepts nodes  ✅ Yes          ✅ Yes
Return value   Appended node   undefined`
            }
        ]
    },
    {
        id: "lec12", label: "Lec 12", title: "removeChild & replaceChild",
        date: "10/03/26", color: "#f43f5e",
        sections: [
            {
                heading: "removeChild()",
                content: `Removes a specific child node from parent.
Syntax: parentNode.removeChild(childNode)
Note: After deletion, calling again → TypeError
Reversed args: childNode.removeChild(parent) → NotFoundError`
            },
            {
                heading: "replaceChild()",
                content: `Replaces an existing child with a new child.
Syntax: parentNode.replaceChild(newNode, oldNode)
newNode → new element | oldNode → element to replace`
            },
            {
                heading: "childNodes vs children",
                content: `childNodes → NodeList (text + li + text nodes etc.)
children   → HTMLCollection (only element nodes)
Note: Text in NodeList = newline + space`
            },
            {
                heading: "Abstraction",
                content: `Abstraction = exposing a set of services but hiding internal implementation.
e.g. getElementById(String) : HTMLElement | null`
            }
        ]
    },
    {
        id: "lec13", label: "Lec 13", title: "insertBefore & Dynamic Styles",
        date: "10/03/26", color: "#10b981",
        sections: [
            {
                heading: "insertBefore()",
                content: `Insert before a specific node.
Syntax: parentNode.insertBefore(newNode, referenceNode)

  parent.insertBefore(childNode, ref[2]);  // insert before 3rd child
  parent.insertBefore(childNode, ref[-1]); // insert after last element
  parent.insertBefore(childNode, ref[-0]); // insert before first element
  parent.insertBefore(childNode, ref[100]);// insert at end of list

Note: passing ref = document.getElementById("js") → inserts before that specific node.
After insert, childNodes updates (live NodeList grows).`
            },
            {
                heading: "3 Ways to Add Styles Dynamically",
                content: `a. style property → element.style.propertyName = 'value'
   CSS name    → JS name
   font-size   → fontSize
   border      → border
   font-family → fontFamily
   Applied inline. e.g.:
     text.style.color = 'red';
     text.style.border = '1px dotted black';
     text.style.margin = '15px';
     text.style.padding = '5px';

b. cssText property → element.style.cssText = 'k:v; k:v;'
   Write full CSS string inline. e.g.:
     text.style.cssText = 'font-size:25px; font-family:Algerian; font-weight:bold';

c. classList → write CSS separately in <style>, then:
   element.classList.add("className1", "className2")
   classList is a live DOMTokenList.
   Best practice: use className for separate CSS files.
   e.g.: text.classList.add("box", "red");`
            },
            {
                heading: "Attribute vs Property",
                content: `Feature       Attribute                  Property
──────────────────────────────────────────────────────
Definition    Value defined in HTML markup   Value stored in DOM object
Location      Exists in HTML                 Exists in JavaScript DOM
Represents    Initial/default value          Current/live value
Access        getAttribute() / setAttribute()  element.property
Data Type     Always string                  Can be any type (bool, obj, string)
Updates       Usually does NOT change auto   Changes when user interacts
Example       <input value="John">           input.value
Sync          May stay unchanged             Reflects real-time state

Real life analogy:
  Attribute → Car manual says Fuel Capacity = 50L (static spec)
  Property  → Dashboard shows Current Fuel = 20L (live value)`
            }
        ]
    }
];

// ── LIVE DEMO DATA ────────────────────────────────────────────────────────────

const demos = {
    hoisting: [
        {
            label: "1. Fn Declaration (before init)",
            code: `getName();
var x = 7;
function getName(){
  console.log("PW IOI Javascript");
}
console.log(x);
console.log(getName);`,
            output: ["PW IOI Javascript", "7", "f getName(){ console.log('PW IOI Javascript'); }"],
            note: "✅ Function hoisted fully with its entire code. var x hoisted as undefined → then 7."
        },
        {
            label: "2. var before init → undefined",
            code: `console.log(x); // Memory phase: x = undefined
var x = 7;
console.log(x); // Code phase: x = 7`,
            output: ["undefined", "7"],
            note: "⚠️ var is hoisted as 'undefined'. Memory allocated in phase 1, value assigned in phase 2."
        },
        {
            label: "3. Variable without declaration",
            code: `console.log(x); // No memory allocated`,
            output: ["❌ ReferenceError: x is not defined"],
            note: "❌ No memory allocated at all → ReferenceError: not defined."
        },
        {
            label: "4. Function Expression before init",
            code: `getName1(); // getName1 = undefined in memory
var getName1 = function(){
  console.log("PW IOI React");
}`,
            output: ["❌ TypeError: getName1 is not a function"],
            note: "❌ getName1 is var → hoisted as undefined. Calling undefined() → TypeError."
        },
        {
            label: "5. Arrow Function before init",
            code: `getName1(); // getName1 = undefined in memory
var getName1 = () => {
  console.log("PW IOI React");
}`,
            output: ["❌ TypeError: getName1 is not a function"],
            note: "❌ Arrow functions behave like var function expressions — NOT hoisted as callable."
        },
        {
            label: "6. undefined check (good approach)",
            code: `var a;
if(a == undefined){
  console.log("undefined"); // good approach
} else {
  console.log("not defined");
}`,
            output: ["undefined"],
            note: "✅ Good practice: check if var is undefined before use. Memory allocated, value = undefined."
        },
        {
            label: "7. Bad coding — manual undefined",
            code: `var a = undefined; // Bad: data inconsistency
if(a == undefined){
  console.log("undefined");
} else {
  console.log("not defined");
}`,
            output: ["undefined"],
            note: "⚠️ Works but BAD practice. Never manually assign undefined — JS engine does this for you."
        },
        {
            label: "8. All 3 hoisting types together",
            code: `console.log(x);      // var → undefined
console.log(square); // fn → whole code
getName1();          // fn expr → TypeError

var x = 7;
function square(n){ return n*n; }
var getName1 = function(){ console.log("hi"); }`,
            output: ["undefined", "f square(n){ return n*n; }", "❌ TypeError: getName1 is not a function"],
            note: "Summary: var → undefined, function declaration → full code, function expression → TypeError."
        }
    ],
    varletconst: [
        {
            label: "1. let TDZ error",
            code: `console.log(a); // TDZ → Error
let a = 10;
var b = 20;`,
            output: ["❌ ReferenceError: Cannot access 'a' before initialization"],
            note: "❌ let is in Temporal Dead Zone (TDZ). Memory allocated in DER but inaccessible until declaration line."
        },
        {
            label: "2. let declared then assigned",
            code: `let a;      // Memory: a = TDZ → undefined
a = 10;     // Assigned
console.log(a);`,
            output: ["10"],
            note: "✅ let can be declared without init, then assigned. Memory phase: TDZ, after line: undefined, after assign: 10."
        },
        {
            label: "3. let redeclaration → SyntaxError",
            code: `let a = 100;
let a = 200; // Same scope redeclaration
console.log(a);`,
            output: ["❌ SyntaxError: Identifier 'a' has already been declared"],
            note: "❌ let does NOT allow redeclaration in same scope. Caught at parse time."
        },
        {
            label: "4. const without init → SyntaxError",
            code: `const a;   // Missing initializer
a = 20;
console.log(a);`,
            output: ["❌ SyntaxError: Missing initializer in const declaration"],
            note: "❌ const MUST be initialized at declaration. const = let + mandatory init + no reinit."
        },
        {
            label: "5. const reassignment → TypeError",
            code: `const a = 10;
a = 100;   // Reinit attempt
console.log(a);`,
            output: ["❌ TypeError: Assignment to constant variable"],
            note: "❌ const cannot be reassigned. Error thrown at runtime during code execution phase."
        },
        {
            label: "6. Block scope — var leaks, let/const don't",
            code: `{
  var a = 100;    // OER (global) → leaks
  let b = 200;    // DER (block)  → stays
  const c = 300;  // DER (block)  → stays
  console.log(a); // 100
  console.log(b); // 200
  console.log(c); // 300
}
console.log(a); // 100 (var leaked)
console.log(b); // ReferenceError`,
            output: ["100", "200", "300", "100", "❌ ReferenceError: b is not defined"],
            note: "var goes to OER (window/global). let/const go to DER (block scope). var leaks; let/const don't."
        },
        {
            label: "7. All 3 inside block + console outside",
            code: `{
  var a = 100;
  let b = 200;
  const c = 300;
  console.log(a); // 100
  console.log(b); // 200
  console.log(c); // 300
}
console.log(a); // 100 — var leaks
console.log(b); // RE
console.log(c); // never reached`,
            output: ["100", "200", "300", "100", "❌ ReferenceError: b is not defined"],
            note: "Execution stops at the first ReferenceError. c never logged."
        },
        {
            label: "8. global scope: window = this = var",
            code: `var a = 10;
console.log(a);        // 10
console.log(window.a); // 10
console.log(this.a);   // 10
console.log(window == this); // true`,
            output: ["10", "10", "10", "true"],
            note: "var is stored on OER = window = this (global object). let/const are NOT on window."
        },
        {
            label: "9. let scope: global vs function vs block",
            code: `let a = 10;        // global scope
function disp(){
  let b = 100;     // function scope
  if(true){
    let c = 1000;  // block scope
    console.log(a, b, c); // 10 100 1000
  }
  console.log(a, b); // 10 100
  // console.log(c); // would be ReferenceError
}
disp();`,
            output: ["10 100 1000", "10 100"],
            note: "let respects all 3 scopes: global, function, and block — each gets its own DER."
        }
    ],
    closure: [
        {
            label: "1. Basic Closure (3-level)",
            code: `function Outer1() {
  let x = 100;
  function Inner1() {
    let y = 200;
    return function () {
      console.log(x); // via LE: Inner1 → Outer1
      console.log(y); // via LE: Inner1
    }
  }
  return Inner1();
}
let fn = Outer1()();`,
            output: ["100", "200"],
            note: "✅ Returned fn closes over x (Outer1's LE) and y (Inner1's LE). Both accessible after return."
        },
        {
            label: "2. Counter — shared closure",
            code: `function counter() {
  let count = 0;
  return function () {
    count++;
    console.log(count);
  }
}
let fn = counter(); // 1 closure created
fn(); // 1
fn(); // 2
fn(); // 3`,
            output: ["1", "2", "3"],
            note: "✅ fn stores reference to same closure. count lives in counter()'s LE → persists across calls."
        },
        {
            label: "3. Counter — count++ outside return",
            code: `function counter() {
  let count = 0;
  count++;          // runs at counter() call
  return function () {
    console.log(count); // reads closed-over count
  }
}
let fn = counter();
fn(); // 1
fn(); // 1
fn(); // 1`,
            output: ["1", "1", "1"],
            note: "count++ runs when counter() is called (sets count=1). Returned fn only reads it → always 1."
        },
        {
            label: "4. Deep nested a→b→c closure",
            code: `function a() {
  let x = 100;
  function b() {
    let y = 200;
    let c = function () {
      let z = 1000;
      console.log(x, y, z); // 100 200 1000
    }
    c();
  }
  b();
}
a();`,
            output: ["100 200 1000"],
            note: "c() chain: LE:b → LE:a → LE:GEC. Each variable found at its level: z(local), y(b), x(a)."
        },
        {
            label: "5. IIFE with nested closure",
            code: `(function () {
  let x = 100;
  function b() {
    let y = 200;
    let c = function () {
      let z = 1000;
      console.log(x, y, z);
    }
    c();
  }
  return b();
})();`,
            output: ["100 200 1000"],
            note: "IIFE = Immediately Invoked Function Expression. No name needed. Closure still works inside."
        },
        {
            label: "6. New closure per counter() call",
            code: `function counter() {
  let count = 0;
  return function () {
    count++;
    console.log(count);
  }
}
counter()(); // new closure → 1
counter()(); // new closure → 1
counter()(); // new closure → 1`,
            output: ["1", "1", "1"],
            note: "Each counter() call creates a BRAND NEW closure with its own count=0. Not shared like fn."
        },
        {
            label: "7. Closure concept diagram",
            code: `function outer() {
  // declare a variable
  function inner() {
    // can use outer's variable → YES
  }
  inner();
}
outer();

// Pattern 2: returning inner
function outer2() {
  // declare a variable
  return function() { }
}
let inner2 = outer2();
inner2(); // inner2 has closure over outer2's LE`,
            output: ["(no console output — conceptual)"],
            note: "Closure = inner function + its Lexical Environment (LE). LE chain: GEC[null] ← Outer[GEC] ← Inner[Outer]."
        }
    ],
    scope: [
        {
            label: "1. Basic scope chain lookup",
            code: `function a(){
  console.log(b); // not in local → go up LE
}
var b = 10;
a(); // Output: 10`,
            output: ["10"],
            note: "✅ a() has no b locally → LE of a → GEC → b=10 found. Scope chain traversal."
        },
        {
            label: "2. Nested scope chain (c→a→GEC)",
            code: `function a(){
  c();
  function c(){
    console.log(b); // c → a → GEC
  }
}
var b = 10;
a();`,
            output: ["10"],
            note: "✅ c() → LE:a → LE:GEC. b found 2 levels up. Call stack: GEC → a() → c()."
        },
        {
            label: "3. Inner var not accessible outside",
            code: `function a(){
  var b = 10; // local to a()
}
a();
console.log(b); // GEC has no b`,
            output: ["❌ ReferenceError: b is not defined"],
            note: "❌ Scope chain goes UPWARD (child→parent) not downward. GEC cannot see a()'s local vars."
        },
        {
            label: "4. c() inside a() accesses a's var",
            code: `function a(){
  var b = 10;
  c();
  function c(){
    console.log(b); // c's LE → a's LE → b=10
  }
}
a();`,
            output: ["10"],
            note: "✅ c is lexically inside a → c's LE parent = a's LE → b accessible."
        },
        {
            label: "5. c() defined inside a(), called from GEC",
            code: `function a(){
  c();
  function c(){
    console.log(b);
  }
}
var b = 10;
c(); // c is not in GEC scope`,
            output: ["❌ ReferenceError: c is not defined"],
            note: "❌ c is defined inside a() → only accessible inside a(). GEC has no c in its memory."
        },
        {
            label: "6. Multiple functions same-level scope",
            code: `var x = 1;
function a(){ var x = 10; console.log(x); } // 10
function b(){ var x = 100; console.log(x); } // 100
a();
b();
console.log(x); // 1 (GEC)`,
            output: ["10", "100", "1"],
            note: "Each function has its own OER. var x inside a() and b() are LOCAL — do not affect GEC's x=1."
        },
        {
            label: "7. Scope chain with 3 functions",
            code: `var x = 1;
function a(){
  var x = 10;
  console.log("a:", x); // 10
  function b(){
    var x = 100;
    console.log("b:", x); // 100
    function c(){
      console.log("c:", x); // 100 from b's LE
    }
    c();
  }
  b();
}
a();
console.log("GEC:", x); // 1`,
            output: ["a: 10", "b: 100", "c: 100", "GEC: 1"],
            note: "c() finds x in b()'s LE (100) before reaching a()'s or GEC's x. Nearest scope wins."
        }
    ],
    dom: [
        {
            label: "1. getElementById",
            code: `let el = document.getElementById("main");
// Returns: HTMLElement | null
console.log(el);

if(el){
  console.log("Found:", el.id);
} else {
  console.log("Element not found");
}`,
            output: [`<div id="main" class="box">...</div>`, "Found: main"],
            note: "Returns HTMLElement or null. Case-sensitive id. Always null-check before use."
        },
        {
            label: "2. getElementsByClassName — case sensitive",
            code: `let els1 = document.getElementsByClassName("BOX");
console.log(els1); // [] — wrong case!

let els2 = document.getElementsByClassName("box");
console.log(els2); // HTMLCollection(3)`,
            output: ["HTMLCollection []", "HTMLCollection(3) [div#main.box, p.box, p.box]"],
            note: "⚠️ className IS case-sensitive. 'BOX' ≠ 'box'. Returns LIVE HTMLCollection (dynamic)."
        },
        {
            label: "3. getElementsByTagName",
            code: `let ps = document.getElementsByTagName("p");
console.log(ps); // HTMLCollection of all <p>

let divs = document.getElementsByTagName("div");
console.log(divs.length); // count of divs`,
            output: ["HTMLCollection(2) [p.box, p.box]", "1"],
            note: "Returns live HTMLCollection of all matching tag elements. Case-insensitive for HTML."
        },
        {
            label: "4. getElementsByName (radio edge case)",
            code: `// <input type="radio" name="gender" />MALE
// <input type="radio" name="gender" value="FEMALE" />FEMALE
// <input type="radio" name="gender" />OTHERS

let els = document.getElementsByByName("gender");
console.log(els);       // NodeList(3)
console.log(els[1]);    // FEMALE input`,
            output: ["NodeList(3) [input, input, input]", "<input type='radio' value='FEMALE'>FEMALE"],
            note: "getElementsByName returns NodeList (static). Useful for form radio/checkbox groups."
        },
        {
            label: "5. querySelector vs querySelectorAll",
            code: `let first = document.querySelector(".box");
console.log(first); // first match only

let all = document.querySelectorAll(".box");
console.log(all);   // NodeList (static)
console.log(all.length); // 3

// forEach works on NodeList ✅
all.forEach(el => console.log(el.tagName));`,
            output: [`<div id="main" class="box">`, "NodeList(3) [div.box, p.box, p.box]", "3", "DIV", "P", "P"],
            note: "querySelector → first match (HTMLElement|null). querySelectorAll → static NodeList (forEach ✅)."
        },
        {
            label: "6. HTMLCollection (live) vs NodeList (static)",
            code: `// Start: 2 items with class "item"
const live = document.getElementsByClassName("item");
const snap = document.querySelectorAll(".item");

console.log("Before:", live.length, snap.length); // 2 2

// Add a new .item element dynamically
let p = document.createElement("p");
p.className = "item";
document.body.append(p);

console.log("After:", live.length, snap.length); // 3 2`,
            output: ["Before: 2 2", "After: 3 2"],
            note: "HTMLCollection is LIVE → updates automatically (length 3). NodeList is STATIC → snapshot (length 2)."
        },
        {
            label: "7. createElement + append vs appendChild",
            code: `const div = document.createElement("div");
const p = document.createElement("p");

// append: accepts nodes AND strings
div.append("Hello ", p, " world");
console.log(div.innerHTML); // Hello <p></p> world

// appendChild: only nodes, returns appended node
const b = document.createElement("b");
b.innerText = "Javascript";
let result = div.appendChild(b);
console.log(result); // <b>Javascript</b>

// appendChild with string → Error
div.appendChild("is"); // TypeError`,
            output: ["Hello <p></p> world", "<b>Javascript</b>", "❌ TypeError: Failed to execute 'appendChild'"],
            note: "append() = multiple args + strings. appendChild() = single node only, returns appended node."
        },
        {
            label: "8. innerText vs textContent vs innerHTML",
            code: `// <div id="box">Hello <b style="display:none">hidden</b></div>
let el = document.getElementById("box");

console.log(el.innerText);   // Hello
console.log(el.textContent); // Hello hidden
console.log(el.innerHTML);   // Hello <b style="display:none">hidden</b>`,
            output: ["Hello", "Hello hidden", `Hello <b style="display:none">hidden</b>`],
            note: "innerText = visible text only. textContent = all text including hidden. innerHTML = raw HTML markup."
        },
        {
            label: "9. removeChild + replaceChild",
            code: `// <ul id="list"><li>Java</li><li id="rm">JS</li><li>React</li></ul>
let parent = document.getElementById("list");
let child = document.getElementById("rm");

parent.removeChild(child); // removes JS
// parent.removeChild(child); // 2nd call → TypeError

// replaceChild(newNode, oldNode)
let newLi = document.createElement("li");
newLi.textContent = "TypeScript";
let oldLi = parent.children[0]; // Java
parent.replaceChild(newLi, oldLi); // Java → TypeScript`,
            output: ["ul → [Java, React]", "ul → [TypeScript, React]"],
            note: "removeChild: call again after delete → TypeError. Reversed args → NotFoundError. replaceChild(new, old)."
        },
        {
            label: "10. childNodes vs children",
            code: `// <ul id="menu">
//   <li>HTML</li>
//   <li>CSS</li>
//   <li>JavaScript</li>
// </ul>
let menu = document.getElementById("menu");

console.log(menu.childNodes); // NodeList(7): text+li+text+li+text+li+text
console.log(menu.children);   // HTMLCollection(3): li li li`,
            output: ["NodeList(7) [text, li, text, li, text, li, text]", "HTMLCollection(3) [li, li, li]"],
            note: "childNodes = NodeList (text nodes + element nodes). children = HTMLCollection (elements only). Text = newline+space."
        },
        {
            label: "11. insertBefore()",
            code: `// <ul id="tech"><li>HTML</li><li>CSS</li>
//   <li id="js">JavaScript</li><li>React</li></ul>
let parent = document.getElementById("tech");
let ref = document.getElementById("js");

let newLi = document.createElement("li");
newLi.textContent = "Bootstrap";

parent.insertBefore(newLi, ref); // before JavaScript`,
            output: ["ul → [HTML, CSS, Bootstrap, JavaScript, React]"],
            note: "insertBefore(newNode, referenceNode). ref[-1] = after last, ref[-0] = before first, ref[100] = at end."
        },
        {
            label: "12. Dynamic styles — 3 methods",
            code: `let el = document.getElementById("text");

// Method a: style property (camelCase)
el.style.color = 'red';
el.style.fontSize = '25px';    // font-size → fontSize
el.style.fontFamily = 'Arial'; // font-family → fontFamily

// Method b: cssText string
el.style.cssText = 'font-size:25px; font-family:Algerian; font-weight:bold';

// Method c: classList.add (best practice)
el.classList.add("box", "red");
console.log(el.classList); // DOMTokenList ['box','red']`,
            output: ["DOMTokenList(2) ['box', 'red', value: 'box red']"],
            note: "a=inline style property (camelCase), b=cssText string, c=classList.add (best — uses separate CSS class)."
        }
    ],
    shadowing: [
        {
            label: "1. var shadows var in block",
            code: `var a = 1;
{
  var a = 100;   // same OER → overwrites!
  let b = 200;
  const c = 300;
  console.log(a); // 100
  console.log(b); // 200
  console.log(c); // 300
}
console.log(a); // 100 (overwritten)
console.log(b); // ReferenceError`,
            output: ["100", "200", "300", "100", "❌ ReferenceError: b is not defined"],
            note: "var inside block goes to SAME OER as outer var → shadows (overwrites) it. b is block-scoped in DER."
        },
        {
            label: "2. let in outer, shadowed inside block",
            code: `let b = 1; // global DER
{
  var a = 100;   // global OER
  let b = 200;   // block DER (new b, shadows outer)
  const c = 300; // block DER
  console.log(a); // 100
  console.log(b); // 200 (inner b)
  console.log(c); // 300
}
console.log(b); // 1 (outer b unaffected!)
console.log(a); // 100 (var leaked)
console.log(c); // ReferenceError`,
            output: ["100", "200", "300", "1", "100", "❌ ReferenceError: c is not defined"],
            note: "Outer let b=1 unaffected. Block creates separate DER with its own b=200. This is true shadowing."
        },
        {
            label: "3. var + window.a mutation via function",
            code: `var a = 10;
function x() {
  var a = 100;              // local shadow
  console.log("inner a =", a);        // 100
  console.log("window.a =", window.a);// 10 (global OER)
  console.log("this.a =", this.a);    // 10
  window.a = 200;           // mutate global
}
console.log("Outer a =", a); // 10
x();
console.log("After x(), a =", a); // 200`,
            output: ["Outer a = 10", "inner a = 100", "window.a = 10", "this.a = 10", "After x(), a = 200"],
            note: "Local var a=100 shadows global. window.a directly mutates OER. After x(), global a=200."
        },
        {
            label: "4. Illegal Shadowing — let + var",
            code: `let a = 10;
{
  var a = 100;  // ❌ Tries to put var a in OER
  console.log(a); // never reached
}
console.log(a);`,
            output: ["❌ SyntaxError: Identifier 'a' has already been declared"],
            note: "Illegal: var a tries to coexist with let a in same environment record. Fails at PARSE time (before execution)."
        },
        {
            label: "5. Legal: let shadows let",
            code: `let a = 10;
{
  let a = 100; // OK: block DER creates NEW a
  console.log(a); // 100
}
console.log(a); // 10 (outer unaffected)`,
            output: ["100", "10"],
            note: "✅ Legal shadowing: inner let creates new binding in block DER. Outer let in global DER untouched."
        },
        {
            label: "6. Legal: const shadows const",
            code: `const a = 10;
{
  const a = 100; // OK: new block DER binding
  console.log(a); // 100
}
console.log(a); // 10`,
            output: ["100", "10"],
            note: "✅ Legal shadowing with const too. Each block creates its own DER with independent bindings."
        }
    ],
    execution: [
        {
            label: "1. square(n) — full EC walkthrough",
            code: `var n = 2;
function square(num){
  ans = num * num;
  return ans;
}
var result = square(n);
console.log(result);`,
            output: ["4"],
            note: "Memory: n=undef, square=fn{}, result=undef. Execution: n=2, square(2)→new EC→ans=4→return→result=4."
        },
        {
            label: "2. Call stack LIFO demo",
            code: `function first(){
  console.log("first: start");
  second();
  console.log("first: end");
}
function second(){
  console.log("second: start");
  third();
  console.log("second: end");
}
function third(){
  console.log("third");
}
first();`,
            output: ["first: start", "second: start", "third", "second: end", "first: end"],
            note: "Stack: GEC → first() → second() → third(). LIFO: third pops first, then second, then first."
        },
        {
            label: "3. return statement & EC pop",
            code: `var n = 2;
function square(num){
  var ans = num * num;
  return ans; // EC popped here
}
var sq2 = square(n); // result = 4
var sq3 = square(3); // new EC → result = 9
console.log(sq2, sq3);`,
            output: ["4 9"],
            note: "Each square() call creates a new EC. return pops the EC and passes ans back to the caller."
        },
        {
            label: "4. Memory phases visualized",
            code: `// MEMORY CREATION PHASE:
// n: undefined
// square: fn(num){ ans=num*num; return ans; }
// result: undefined

// CODE EXECUTION PHASE:
var n = 2;            // n: undefined → 2
function square(num){ // (no execution)
  var ans = num * num;
  return ans;
}
var result = square(n); // square EC created
console.log(result);    // 4`,
            output: ["4"],
            note: "Phase 1 allocates memory: vars→undefined, fn→whole code. Phase 2 runs line by line and replaces values."
        },
        {
            label: "5. undefined vs not defined in EC",
            code: `var a; // memory allocated → undefined
console.log(a);  // undefined (memory phase)
a = 5;
console.log(a);  // 5 (code phase)

// console.log(b); // would be ReferenceError
// b was never declared → no memory allocated`,
            output: ["undefined", "5"],
            note: "undefined = memory allocated by JS engine but not yet initialized. not defined = no memory at all."
        }
    ]
};

// ── COMPONENT ─────────────────────────────────────────────────────────────────

export default function JSNotes({ onBack }) {
    const [tab, setTab] = useState("notes");
    const [activeLec, setActiveLec] = useState(0);
    const [demoTopic, setDemoTopic] = useState("hoisting");
    const [demoIdx, setDemoIdx] = useState(0);
    const [showOutput, setShowOutput] = useState(false);
    const [animating, setAnimating] = useState(false);
    const [quizQ, setQuizQ] = useState(0);
    const [quizSel, setQuizSel] = useState(null);
    const [quizScore, setQuizScore] = useState(0);
    const [quizDone, setQuizDone] = useState(false);

    const quiz = [
        // ── ORIGINAL 10 ──────────────────────────────────────────────────────────
        { q: "What does JIT stand for in JS engine?", opts: ["Java Interpreted Threading", "Just In Time", "Joint Instruction Table", "Java Integration Tool"], ans: 1 },
        { q: "Which way of writing JS has 'code redundancy' as disadvantage?", opts: ["External", "Embedded", "Inline", "Module"], ans: 2 },
        { q: "What is stored in memory for a function during Memory Creation Phase?", opts: ["undefined", "null", "The entire function code", "A reference pointer"], ans: 2 },
        { q: "What is 'undefined' in JavaScript?", opts: ["Memory not allocated", "An error state", "Memory allocated but not yet initialized (placeholder)", "Same as null"], ans: 2 },
        { q: "Lexical Environment = ?", opts: ["Global memory only", "Local memory + LE of parent", "Call stack + memory", "Scope + closures"], ans: 1 },
        { q: "Which keyword is NOT block-scoped?", opts: ["let", "const", "var", "All are block-scoped"], ans: 2 },
        { q: "Function Expressions and Arrow Functions are ___.", opts: ["Fully hoisted", "Hoisted as undefined (not callable)", "Not hoisted at all", "Hoisted to block scope"], ans: 1 },
        { q: "What does a Closure capture?", opts: ["Only global variables", "Only local variables", "The function + its lexical environment", "The call stack"], ans: 3 },
        { q: "HTMLCollection supports forEach()?", opts: ["Yes — it's always live", "No — it's dynamic, forEach not supported", "Yes — via Array.from", "Only in modern browsers"], ans: 1 },
        { q: "Syntax for insertBefore()?", opts: ["child.insertBefore(parent, ref)", "parent.insertBefore(newNode, referenceNode)", "parent.insertBefore(ref, newNode)", "element.insertBefore(newNode)"], ans: 1 },

        // ── TRICKY: HOISTING ─────────────────────────────────────────────────────
        {
            q: `What is the output?\n\nconsole.log(foo);\nvar foo = 10;\nconsole.log(foo);`,
            opts: ["10, 10", "undefined, 10", "ReferenceError", "10, undefined"],
            ans: 1,
            trick: "var is hoisted as undefined. First log prints undefined, second prints 10 after assignment."
        },
        {
            q: `What is the output?\n\nfoo();\nfunction foo(){ console.log("hello"); }\nvar foo = 5;`,
            opts: ["hello", "TypeError: foo is not a function", "ReferenceError", "5"],
            ans: 0,
            trick: "Function declaration is hoisted ABOVE var. foo() works before the var foo=5 line."
        },
        {
            q: `What error does this throw?\n\nconsole.log(a);\nlet a = 5;`,
            opts: ["undefined", "null", "ReferenceError: Cannot access 'a' before initialization", "SyntaxError"],
            ans: 2,
            trick: "let is in TDZ (Temporal Dead Zone) — memory is allocated in DER but access is blocked until declaration."
        },
        {
            q: `What is the output?\n\nvar x = 1;\nfunction test(){\n  console.log(x);\n  var x = 2;\n}\ntest();`,
            opts: ["1", "2", "undefined", "ReferenceError"],
            ans: 2,
            trick: "Inside test(), var x is hoisted to the TOP of the function scope — so console.log(x) sees undefined, not the outer x=1."
        },
        {
            q: `What happens?\n\nconsole.log(a);\nconst a = 10;`,
            opts: ["undefined", "10", "ReferenceError: Cannot access 'a' before initialization", "SyntaxError"],
            ans: 2,
            trick: "const is also in TDZ like let. Accessing it before declaration → ReferenceError, not undefined."
        },

        // ── TRICKY: SCOPE & CLOSURES ──────────────────────────────────────────────
        {
            q: `What is logged?\n\nlet x = 10;\nfunction a(){ console.log(x); }\nfunction b(){\n  let x = 20;\n  a();\n}\nb();`,
            opts: ["20", "10", "undefined", "ReferenceError"],
            ans: 1,
            trick: "JS uses LEXICAL scope. a()'s LE parent is GEC (where it was DEFINED), not b() (where it was CALLED). So x=10."
        },
        {
            q: `What does this output?\n\nfunction outer(){\n  var count = 0;\n  return function(){\n    count++;\n    return count;\n  }\n}\nvar fn1 = outer();\nvar fn2 = outer();\nfn1(); fn1();\nconsole.log(fn2());`,
            opts: ["3", "1", "2", "undefined"],
            ans: 1,
            trick: "fn1 and fn2 are SEPARATE closures — each outer() call creates a new lexical environment. fn2's count starts fresh at 0."
        },
        {
            q: `What is the output of this classic loop trap?\n\nfor(var i=0; i<3; i++){\n  setTimeout(()=>console.log(i), 0);\n}\n// After all timeouts fire:`,
            opts: ["0 1 2", "3 3 3", "0 0 0", "1 2 3"],
            ans: 1,
            trick: "var i is shared in GEC. By the time setTimeout fires, the loop has finished and i=3. All three closures reference the SAME i."
        },
        {
            q: `What is the output?\n\nfunction a(){\n  let i = 10;\n  function b(){ console.log(i); }\n  i = 20;\n  b();\n}\na();`,
            opts: ["10", "20", "undefined", "ReferenceError"],
            ans: 1,
            trick: "Closures capture the VARIABLE REFERENCE, not the value at definition time. i was changed to 20 before b() is called."
        },
        {
            q: `What error type is thrown?\n\nlet a = 10;\n{ var a = 20; }`,
            opts: ["TypeError", "ReferenceError", "SyntaxError", "No error — var wins"],
            ans: 2,
            trick: "Illegal Shadowing: var a cannot coexist with let a in the same environment record. Fails at PARSE time → SyntaxError."
        },

        // ── TRICKY: var / let / const ─────────────────────────────────────────────
        {
            q: `What is the output?\n\nconst obj = { x: 1 };\nobj.x = 99;\nconsole.log(obj.x);`,
            opts: ["1", "99", "TypeError: Cannot assign", "undefined"],
            ans: 1,
            trick: "const prevents REASSIGNMENT of the binding, not mutation of the object. obj.x = 99 mutates the object — perfectly legal."
        },
        {
            q: `Which is true about: var a=1; in global scope?`,
            opts: ["window.a is undefined", "window.a === 1", "a is in DER", "let and var both go to window"],
            ans: 1,
            trick: "var in global scope is stored on OER = window object. window.a === 1. But let/const go to DER and are NOT on window."
        },
        {
            q: `What is the output?\n\n{\n  let x = 10;\n  var y = 20;\n}\nconsole.log(typeof x);\nconsole.log(typeof y);`,
            opts: ["undefined, undefined", "ReferenceError, 20", "'undefined', 'number'", "ReferenceError"],
            ans: 2,
            trick: "typeof on an undeclared variable returns 'undefined' (no error). y=20 leaked via var. x is block-scoped → typeof x = 'undefined'."
        },
        {
            q: `What is logged?\n\nvar x = 'global';\nfunction test(){\n  console.log(x);\n  if(false){\n    var x = 'local';\n  }\n}\ntest();`,
            opts: ["'global'", "'local'", "undefined", "ReferenceError"],
            ans: 2,
            trick: "var inside if block is HOISTED to the function top regardless of whether the block runs. So x is declared but undefined inside test()."
        },

        // ── TRICKY: DOM ───────────────────────────────────────────────────────────
        {
            q: `After: parent.removeChild(child);\nYou call it again: parent.removeChild(child);\nWhat happens?`,
            opts: ["Silently ignored", "null returned", "TypeError: parameter 1 is not of type 'Node'", "NotFoundError"],
            ans: 2,
            trick: "After the first removeChild, child is no longer a Node in the DOM. Second call throws TypeError: parameter is not a Node."
        },
        {
            q: `What is the difference between childNodes and children?`,
            opts: [
                "Both return HTMLCollection",
                "childNodes = NodeList (text+elements), children = HTMLCollection (elements only)",
                "children includes text nodes too",
                "No difference — both are static"
            ],
            ans: 1,
            trick: "childNodes returns NodeList including text nodes (newlines/spaces). children returns HTMLCollection of element nodes only."
        },
        {
            q: `div.appendChild("Hello") — what happens?`,
            opts: ["Appends 'Hello' as text node", "Works fine", "TypeError: argument is not a Node", "SyntaxError"],
            ans: 2,
            trick: "appendChild() only accepts Node objects. Strings are NOT nodes. Use append() for strings or create a TextNode first."
        },
        {
            q: `el.innerHTML vs el.textContent — which is an XSS risk?`,
            opts: ["textContent", "innerHTML", "Both equally", "Neither"],
            ans: 1,
            trick: "innerHTML parses and executes HTML tags including <script>. Never use innerHTML with untrusted user input. textContent treats everything as plain text."
        },

        // ── TRICKY: EXECUTION CONTEXT ─────────────────────────────────────────────
        {
            q: `How many Execution Contexts are created?\n\nfunction a(){ b(); }\nfunction b(){ c(); }\nfunction c(){}\na();`,
            opts: ["3", "4", "1", "2"],
            ans: 1,
            trick: "GEC + EC for a() + EC for b() + EC for c() = 4 total Execution Contexts on the call stack."
        },
        {
            q: `What is the Call Stack order (bottom → top) when c() is executing?\n\nfunction a(){ b(); }\nfunction b(){ c(); }\nfunction c(){}`,
            opts: ["c → b → a → GEC", "GEC → a → b → c", "a → b → c", "GEC → c → b → a"],
            ans: 1,
            trick: "Call stack is LIFO. GEC is always at the bottom. Then a() pushed, then b(), then c() at the top."
        },
        {
            q: `What is window == this in global scope?`,
            opts: ["false", "true", "undefined", "Depends on browser"],
            ans: 1,
            trick: "In a browser's global scope, window and this both refer to the global object. window == this → true. var declarations also go to window."
        },
    ];

    const runDemo = () => {
        setAnimating(true);
        setShowOutput(false);
        setTimeout(() => { setShowOutput(true); setAnimating(false); }, 700);
    };

    const changeDemoIdx = (i) => { setDemoIdx(i); setShowOutput(false); };
    const changeTopic = (t) => { setDemoTopic(t); setDemoIdx(0); setShowOutput(false); };

    const handleQuiz = (i) => {
        if (quizSel !== null) return;
        setQuizSel(i);
        if (i === quiz[quizQ].ans) setQuizScore(s => s + 1);
    };

    const nextQ = () => {
        if (quizQ + 1 >= quiz.length) { setQuizDone(true); return; }
        setQuizQ(q => q + 1); setQuizSel(null);
    };

    const resetQuiz = () => { setQuizQ(0); setQuizSel(null); setQuizScore(0); setQuizDone(false); };

    const lec = lectures[activeLec];
    const demoList = demos[demoTopic];
    const demo = demoList[demoIdx];

    const navs = [
        { id: "notes", label: "📖 Notes" },
        { id: "demo", label: "▶ Live Demo" },
        { id: "quiz", label: "🧠 Quiz" },
    ];

    return (
        <div style={{ fontFamily: "monospace", background: "#060d1a", minHeight: "100vh", color: "#e2e8f0" }}>
            {/* Header */}
            <div style={{ background: "linear-gradient(135deg,#0a1628,#0f2040)", borderBottom: "2px solid #06b6d4", padding: "18px 24px" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                    <div style={{ background: "linear-gradient(135deg,#06b6d4,#3b82f6)", borderRadius: "50%", width: 42, height: 42, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20 }}>⚡</div>
                    <div>
                        <h1 style={{ margin: 0, fontSize: 20, color: "#fff" }}>JavaScript — Lec 01 to 13</h1>
                        <p style={{ margin: 0, color: "#06b6d4", fontSize: 11 }}>PW Institute of Innovation · BEN01SOTUGBTC25B01 · Interactive Study Guide</p>
                    </div>
                </div>
            </div>

            {/* Nav */}
            <div style={{ background: "#0b1120", borderBottom: "1px solid #1f2937", display: "flex" }}>
                {navs.map(n => (
                    <button key={n.id} onClick={() => setTab(n.id)} style={{
                        padding: "11px 22px", background: "none", border: "none", cursor: "pointer",
                        fontSize: 13, fontWeight: 700, fontFamily: "monospace",
                        color: tab === n.id ? "#06b6d4" : "#475569",
                        borderBottom: tab === n.id ? "3px solid #06b6d4" : "3px solid transparent",
                    }}>{n.label}</button>
                ))}
            </div>

            <div style={{ display: "flex", width: "100%" }}>

                {/* ── NOTES ── */}
                {tab === "notes" && (
                    <>
                        {/* Sidebar */}
                        <div style={{ width: 160, minHeight: "80vh", background: "#0b1120", borderRight: "1px solid #1f2937", padding: "14px 0", flexShrink: 0 }}>
                            {lectures.map((l, i) => (
                                <button key={l.id} onClick={() => setActiveLec(i)} style={{
                                    display: "block", width: "100%", textAlign: "left", padding: "9px 14px",
                                    background: activeLec === i ? l.color + "22" : "none",
                                    border: "none", borderLeft: activeLec === i ? `3px solid ${l.color}` : "3px solid transparent",
                                    cursor: "pointer", color: activeLec === i ? l.color : "#64748b", fontSize: 12, fontFamily: "monospace",
                                }}>
                                    <div style={{ fontWeight: 700 }}>{l.label}</div>
                                    <div style={{ fontSize: 10, opacity: 0.8 }}>{l.date}</div>
                                </button>
                            ))}
                        </div>

                        {/* Content */}
                        <div style={{ flex: 1, padding: 28, overflowY: "auto" }}>
                            <div style={{ borderBottom: `2px solid ${lec.color}`, paddingBottom: 12, marginBottom: 20 }}>
                                <span style={{ background: lec.color + "22", border: `1px solid ${lec.color}`, borderRadius: 6, padding: "3px 10px", color: lec.color, fontSize: 12, fontWeight: 700 }}>{lec.label}</span>
                                <h2 style={{ margin: "10px 0 0", color: "#fff", fontSize: 18 }}>{lec.title}</h2>
                            </div>
                            {lec.sections.map((s, i) => (
                                <div key={i} style={{ background: "#0b1120", border: "1px solid #1f2937", borderLeft: `4px solid ${lec.color}`, borderRadius: 10, padding: 20, marginBottom: 14 }}>
                                    <h4 style={{ color: lec.color, margin: "0 0 10px", fontSize: 14 }}>{s.heading}</h4>
                                    <pre style={{ color: "#cbd5e1", fontSize: 13, margin: 0, whiteSpace: "pre-wrap", lineHeight: 1.8, fontFamily: "monospace" }}>{s.content}</pre>
                                </div>
                            ))}
                        </div>
                    </>
                )}

                {/* ── DEMO ── */}
                {tab === "demo" && (
                    <div style={{ flex: 1, padding: 28 }}>
                        <h2 style={{ color: "#06b6d4", marginTop: 0 }}>▶ Live Output Simulator</h2>
                        <p style={{ color: "#475569", fontSize: 13, marginBottom: 20 }}>Select a topic and snippet, then click Run to see what JavaScript outputs.</p>

                        {/* Topic tabs */}
                        <div style={{ display: "flex", gap: 8, marginBottom: 20, flexWrap: "wrap" }}>
                            {[
                                { id: "hoisting", label: "🔼 Hoisting", color: "#f59e0b" },
                                { id: "varletconst", label: "📦 var/let/const", color: "#34d399" },
                                { id: "closure", label: "🔒 Closures", color: "#ec4899" },
                                { id: "scope", label: "🔗 Scope Chain", color: "#8b5cf6" },
                                { id: "dom", label: "🌐 DOM", color: "#06b6d4" },
                                { id: "shadowing", label: "👥 Shadowing", color: "#f43f5e" },
                                { id: "execution", label: "⚙️ Exec Context", color: "#a3e635" },
                            ].map(t => (
                                <button key={t.id} onClick={() => changeTopic(t.id)} style={{
                                    padding: "8px 16px", borderRadius: 8, border: `2px solid ${demoTopic === t.id ? t.color : "#1f2937"}`,
                                    background: demoTopic === t.id ? t.color + "22" : "#0b1120",
                                    color: demoTopic === t.id ? t.color : "#64748b",
                                    cursor: "pointer", fontWeight: 700, fontSize: 12, fontFamily: "monospace",
                                }}>{t.label}</button>
                            ))}
                        </div>

                        {/* Snippet selector */}
                        <div style={{ display: "flex", gap: 6, marginBottom: 20, flexWrap: "wrap" }}>
                            {demoList.map((d, i) => (
                                <button key={i} onClick={() => changeDemoIdx(i)} style={{
                                    padding: "6px 12px", borderRadius: 6, border: `1px solid ${demoIdx === i ? "#06b6d4" : "#1f2937"}`,
                                    background: demoIdx === i ? "#06b6d422" : "#0b1120",
                                    color: demoIdx === i ? "#06b6d4" : "#64748b",
                                    cursor: "pointer", fontSize: 11, fontFamily: "monospace",
                                }}>{i + 1}. {d.label}</button>
                            ))}
                        </div>

                        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
                            {/* Code */}
                            <div style={{ background: "#060d1a", border: "1px solid #1f2937", borderRadius: 12, overflow: "hidden" }}>
                                <div style={{ background: "#1f2937", padding: "8px 14px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                                    <span style={{ color: "#64748b", fontSize: 12 }}>📄 {demo.label}</span>
                                    <button onClick={runDemo} style={{
                                        background: "#06b6d4", border: "none", borderRadius: 6, padding: "5px 14px",
                                        color: "#060d1a", fontWeight: 700, cursor: "pointer", fontSize: 12, fontFamily: "monospace",
                                    }}>▶ Run</button>
                                </div>
                                <pre style={{ color: "#a3e635", fontSize: 13, margin: 0, padding: "16px", lineHeight: 1.7, whiteSpace: "pre-wrap" }}>{demo.code}</pre>
                            </div>

                            {/* Output */}
                            <div style={{ background: "#060d1a", border: "1px solid #1f2937", borderRadius: 12, overflow: "hidden" }}>
                                <div style={{ background: "#1f2937", padding: "8px 14px" }}>
                                    <span style={{ color: "#64748b", fontSize: 12 }}>💻 Console Output</span>
                                </div>
                                <div style={{ padding: 16, minHeight: 120 }}>
                                    {animating && (
                                        <div style={{ color: "#475569", fontSize: 13 }}>
                                            {["⠋", "⠙", "⠹", "⠸", "⠼", "⠴", "⠦", "⠧", "⠇", "⠏"][Math.floor(Date.now() / 100) % 10]} Running...
                                        </div>
                                    )}
                                    {showOutput && !animating && demo.output.map((line, i) => (
                                        <div key={i} style={{
                                            fontFamily: "monospace", fontSize: 13, padding: "4px 0",
                                            color: line.startsWith("❌") ? "#f87171" : line.startsWith("⚠️") ? "#fbbf24" : "#a3e635",
                                            borderBottom: i < demo.output.length - 1 ? "1px solid #1f293720" : "none",
                                            animation: "fadeIn 0.3s ease",
                                        }}>{line}</div>
                                    ))}
                                    {!showOutput && !animating && (
                                        <div style={{ color: "#374151", fontSize: 12 }}>Click ▶ Run to see output</div>
                                    )}
                                </div>
                                {showOutput && (
                                    <div style={{ background: "#0a1f14", borderTop: "1px solid #065f46", padding: "10px 16px" }}>
                                        <p style={{ color: "#6ee7b7", fontSize: 12, margin: 0 }}>💡 {demo.note}</p>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Visual: Execution Context for closures/hoisting */}
                        {showOutput && (demoTopic === "closure" || demoTopic === "hoisting" || demoTopic === "execution") && (
                            <div style={{ marginTop: 20, background: "#0b1120", border: "1px solid #1f2937", borderRadius: 12, padding: 20 }}>
                                <h4 style={{ color: "#f59e0b", margin: "0 0 14px" }}>🧠 Execution Context Visualization</h4>
                                <div style={{ display: "flex", gap: 12, overflowX: "auto", paddingBottom: 8 }}>
                                    {demoTopic === "closure" && demoIdx === 1 && (
                                        <>
                                            {[
                                                { name: "GEC", items: ["fn: f(){}", "counter: f(){}"], le: "LE: null" },
                                                { name: "counter()", items: ["count: 0 → 1 → 2 → 3"], le: "LE: GEC", highlight: true },
                                                { name: "fn() [closure]", items: ["count++ (shared)"], le: "LE: counter" },
                                            ].map((ctx, i) => (
                                                <div key={i} style={{ minWidth: 160, background: ctx.highlight ? "#1a2a0a" : "#060d1a", border: `2px solid ${ctx.highlight ? "#a3e635" : "#374151"}`, borderRadius: 10, padding: 14 }}>
                                                    <div style={{ color: ctx.highlight ? "#a3e635" : "#94a3b8", fontWeight: 700, fontSize: 13, marginBottom: 8 }}>{ctx.name}</div>
                                                    {ctx.items.map((it, j) => <div key={j} style={{ color: "#fbbf24", fontSize: 12, marginBottom: 4 }}>{it}</div>)}
                                                    <div style={{ color: "#8b5cf6", fontSize: 11, marginTop: 8 }}>{ctx.le}</div>
                                                </div>
                                            ))}
                                        </>
                                    )}
                                    {demoTopic === "hoisting" && (
                                        <>
                                            {[
                                                { name: "Memory Phase", items: demo.code.includes("getName") ? ["getName: f(){}", "x: undefined", "result: undefined"] : ["x: undefined"], le: "GEC" },
                                                { name: "Code Phase", items: demo.output.filter(o => !o.startsWith("❌")), le: "Execution" },
                                            ].map((ctx, i) => (
                                                <div key={i} style={{ minWidth: 180, background: "#060d1a", border: "2px solid #374151", borderRadius: 10, padding: 14 }}>
                                                    <div style={{ color: i === 0 ? "#f59e0b" : "#06b6d4", fontWeight: 700, fontSize: 13, marginBottom: 8 }}>{ctx.name}</div>
                                                    {ctx.items.map((it, j) => <div key={j} style={{ color: "#fbbf24", fontSize: 12, marginBottom: 4 }}>→ {it}</div>)}
                                                    <div style={{ color: "#8b5cf6", fontSize: 11, marginTop: 8 }}>Phase {i + 1}</div>
                                                </div>
                                            ))}
                                        </>
                                    )}
                                </div>
                            </div>
                        )}

                        {/* var/let/const scope viz */}
                        {showOutput && demoTopic === "varletconst" && demoIdx === 4 && (
                            <div style={{ marginTop: 20, background: "#0b1120", border: "1px solid #1f2937", borderRadius: 12, padding: 20 }}>
                                <h4 style={{ color: "#34d399", margin: "0 0 14px" }}>📊 Memory Scope Diagram</h4>
                                <div style={{ display: "flex", gap: 12 }}>
                                    <div style={{ flex: 1, background: "#060d1a", border: "2px solid #374151", borderRadius: 10, padding: 14 }}>
                                        <div style={{ color: "#f59e0b", fontWeight: 700, marginBottom: 8 }}>Global Scope (OER)</div>
                                        <div style={{ color: "#fbbf24", fontSize: 13 }}>a: undefined → 100 (var leaks!)</div>
                                        <div style={{ color: "#475569", fontSize: 11, marginTop: 6 }}>window.a = 100</div>
                                    </div>
                                    <div style={{ flex: 1, background: "#060d1a", border: "2px dashed #34d399", borderRadius: 10, padding: 14 }}>
                                        <div style={{ color: "#34d399", fontWeight: 700, marginBottom: 8 }}>Block Scope (DER)</div>
                                        <div style={{ color: "#fbbf24", fontSize: 13 }}>b: TDZ → 200 (let)</div>
                                        <div style={{ color: "#fbbf24", fontSize: 13 }}>c: TDZ → 300 (const)</div>
                                        <div style={{ color: "#475569", fontSize: 11, marginTop: 6 }}>NOT on window object</div>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                )}

                {/* ── QUIZ ── */}
                {tab === "quiz" && (
                    <div style={{ flex: 1, padding: 28 }}>
                        <h2 style={{ color: "#06b6d4", marginTop: 0 }}>🧠 Knowledge Check — Lec 01–13</h2>
                        {!quizDone ? (
                            <div>
                                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 10 }}>
                                    <span style={{ color: "#475569", fontSize: 13 }}>Q {quizQ + 1} / {quiz.length}</span>
                                    <span style={{ color: "#34d399", fontWeight: 700 }}>Score: {quizScore}/{quiz.length}</span>
                                </div>
                                <div style={{ width: "100%", height: 4, background: "#1f2937", borderRadius: 4, marginBottom: 24 }}>
                                    <div style={{ width: `${(quizQ / quiz.length) * 100}%`, height: "100%", background: "#06b6d4", borderRadius: 4, transition: "width 0.3s" }} />
                                </div>
                                <div style={{ background: "#0b1120", border: "1px solid #1f2937", borderRadius: 14, padding: 28, marginBottom: 16 }}>
                                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
                                        <span style={{ color: quizQ < 10 ? "#06b6d4" : "#f59e0b", fontSize: 11, fontWeight: 700, padding: "3px 10px", border: `1px solid ${quizQ < 10 ? "#06b6d4" : "#f59e0b"}`, borderRadius: 20 }}>
                                            {quizQ < 10 ? "📘 STANDARD" : "🔥 TRICKY"}
                                        </span>
                                    </div>
                                    <p style={{ color: "#e2e8f0", fontSize: 16, fontWeight: 700, margin: "0 0 22px", lineHeight: 1.7, fontFamily: "monospace", whiteSpace: "pre-wrap" }}>{quiz[quizQ].q}</p>
                                    <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                                        {quiz[quizQ].opts.map((opt, i) => {
                                            let bg = "#1f2937", border = "#374151", color = "#cbd5e1";
                                            if (quizSel !== null) {
                                                if (i === quiz[quizQ].ans) { bg = "#064e3b"; border = "#10b981"; color = "#6ee7b7"; }
                                                else if (i === quizSel) { bg = "#450a0a"; border = "#ef4444"; color = "#fca5a5"; }
                                            }
                                            return (
                                                <button key={i} onClick={() => handleQuiz(i)} style={{
                                                    background: bg, border: `2px solid ${border}`, borderRadius: 10, padding: "12px 18px",
                                                    color, textAlign: "left", cursor: quizSel === null ? "pointer" : "default",
                                                    fontSize: 13, fontFamily: "monospace", transition: "all 0.2s",
                                                }}>
                                                    <span style={{ fontWeight: 700, marginRight: 10 }}>{["A", "B", "C", "D"][i]}.</span>
                                                    {opt}
                                                    {quizSel !== null && i === quiz[quizQ].ans && " ✅"}
                                                    {quizSel === i && i !== quiz[quizQ].ans && " ❌"}
                                                </button>
                                            );
                                        })}
                                    </div>
                                    {quizSel !== null && quiz[quizQ].trick && (
                                        <div style={{ marginTop: 16, background: "#1a1a0a", border: "1px solid #ca8a04", borderRadius: 10, padding: "12px 16px" }}>
                                            <span style={{ color: "#fbbf24", fontSize: 12, fontWeight: 700 }}>🧠 Mentor Note: </span>
                                            <span style={{ color: "#fde68a", fontSize: 12 }}>{quiz[quizQ].trick}</span>
                                        </div>
                                    )}
                                </div>
                                {quizSel !== null && (
                                    <div style={{ display: "flex", justifyContent: "flex-end" }}>
                                        <button onClick={nextQ} style={{ background: "#06b6d4", border: "none", borderRadius: 10, padding: "11px 26px", color: "#060d1a", fontWeight: 700, cursor: "pointer", fontSize: 14, fontFamily: "monospace" }}>
                                            {quizQ + 1 >= quiz.length ? "Results →" : "Next →"}
                                        </button>
                                    </div>
                                )}
                            </div>
                        ) : (
                            <div style={{ textAlign: "center", background: "#0b1120", border: "1px solid #1f2937", borderRadius: 20, padding: 48 }}>
                                <div style={{ fontSize: 60, marginBottom: 14 }}>{quizScore >= 9 ? "🏆" : quizScore >= 7 ? "🎯" : "📚"}</div>
                                <h3 style={{ color: "#06b6d4", fontSize: 28 }}>{quizScore}/{quiz.length}</h3>
                                <p style={{ color: "#94a3b8", marginBottom: 24 }}>
                                    {quizScore === 10 ? "Perfect! JS fundamentals mastered! 🌟" : quizScore >= 7 ? "Great job! Revisit closures and hoisting." : "Go back to the Notes and Live Demo tabs!"}
                                </p>
                                <button onClick={resetQuiz} style={{ background: "#06b6d4", border: "none", borderRadius: 10, padding: "12px 28px", color: "#060d1a", fontWeight: 700, cursor: "pointer", fontSize: 15, fontFamily: "monospace" }}>
                                    Retry 🔄
                                </button>
                            </div>
                        )}
                    </div>
                )}
            </div>

            <div style={{ background: "#0b1120", borderTop: "1px solid #1f2937", padding: "12px 24px", textAlign: "center" }}>
                <p style={{ color: "#1f2937", fontSize: 11, margin: 0, fontFamily: "monospace" }}>JavaScript Lec 01–13 · PW Institute of Innovation · BEN01SOTUGBTC25B01</p>
            </div>

            <style>{`@keyframes fadeIn { from { opacity: 0; transform: translateY(4px); } to { opacity: 1; transform: translateY(0); } }`}</style>
        </div>
    );
}