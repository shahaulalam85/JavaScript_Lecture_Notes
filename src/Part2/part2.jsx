import { useState } from "react";

// ── COLOR HELPER ─────────────────────────────────────────────────────────────
function ColoredPre({ content }) {
  return (
    <pre style={{ fontSize: 12.5, margin: 0, whiteSpace: "pre-wrap", lineHeight: 1.9, fontFamily: "monospace" }}>
      {content.split("\n").map((line, i) => {
        const t = line.trim();
        if (t.startsWith("//")) return <span key={i} style={{ color: "#6ee7b7", display: "block" }}>{line}</span>;
        if (t.startsWith("/*") || t.endsWith("*/")) return <span key={i} style={{ color: "#6ee7b7", display: "block" }}>{line}</span>;
        if (/[=({};]/.test(line) && !/^[A-Z→✅❌⚠️#\d]/.test(t)) return <span key={i} style={{ color: "#fde68a", display: "block" }}>{line}</span>;
        if (/^[a-d]\./.test(t) || t.startsWith("→")) return <span key={i} style={{ color: "#c4b5fd", display: "block" }}>{line}</span>;
        if (t.includes("Output") || t.startsWith("// Output")) return <span key={i} style={{ color: "#86efac", display: "block" }}>{line}</span>;
        if (t.includes("❌") || t.includes("DisAdv")) return <span key={i} style={{ color: "#fca5a5", display: "block" }}>{line}</span>;
        if (t.includes("✅") || t.includes("Adv :")) return <span key={i} style={{ color: "#6ee7b7", display: "block" }}>{line}</span>;
        if (/^[─=]+/.test(t) || /^[A-Z ]{4,}$/.test(t)) return <span key={i} style={{ color: "#94a3b8", display: "block" }}>{line}</span>;
        return <span key={i} style={{ color: "#e2e8f0", display: "block" }}>{line}</span>;
      })}
    </pre>
  );
}

// ── DATA ─────────────────────────────────────────────────────────────────────
const lectures = [
  {
    id: "lec14", label: "Lec 14", title: "classList Methods & Async JS (Event Loop)",
    date: "13/03/26", color: "#f59e0b",
    sections: [
      {
        heading: "classList API",
        content: `a. add(...String)           : void
   → if class already exists it IGNORES the classNames to be added.

b. contains(String)        : boolean
   → returns true if class exists on element, false otherwise.

c. remove(...String)       : void
   → removes the specified class(es) from the element.

d. toggle(String, ?boolean): boolean
   → toggle(String, true)  → apply className  (force add)
   → toggle(String, false) → use the same className (force remove)

   toggle(String) : boolean
     if (contains(className))
         remove(className)
     otherwise
         add(className)
   → Acts like a switch: adds if absent, removes if present.`
      },
      {
        heading: "classList — Live Code Example",
        content: `let text = document.getElementById("text");
console.log(text);                   // p#text
console.log(text.classList);         // DOMTokenList [value: '']
text.classList.add("box", "red");
console.log(text.classList.length);  // 2

function changeColor() {
    console.log("***Function executed******");
    if (text.classList.contains("red")) {
        text.classList.remove("red");
    } else {
        text.classList.add("red");
    }
    console.log(text.classList);
}
// 1st click → DOMTokenList ['box', value: 'box']
// 2nd click → DOMTokenList(2) ['box','red', value: 'box red']
// 3rd click → DOMTokenList ['box', value: 'box']`
      },
      {
        heading: "JS Engine — 2 Phases",
        content: `1. Parsing     :: check for syntax
2. Execution   :: JS Engine
                   a. Execution Context
                        a. Memory creation     Code Execution
                                              single thread [call stack]
                           ↓
                         window
                           ↓
                    Browser API's (Give access via window object)
                        1. Timer [Async mode]
                        2. Network call [URL: shoot request]: fetch()
                        3. location
                        4. console api's [sync mode]
                        5. DOM API's
                        6. GeoLocation`
      },
      {
        heading: "Async JS — Event Loop (setTimeout example)",
        content: `console.log("start");
setTimeout(function () {
    console.log("Processing...");
}, 3000);
console.log("end");
// Output:  start  →  end  →  (after 3s) Processing...

Control Flow:
  JS Engine (Call Stack)       Browser APIs          Callback Queue
  ──────────────────────       ────────────          ──────────────
  line-1: console.log          setTimeout(fn,3000)
  line-2: [timer] ──────────→  register handler      handler (after 3s)
  line-3: console.log          3s→2s→1s→0s ────────→ [handler]
                                                           ↓
  Event Loop:
    1. check time expired?
    2. call stack empty?
       if empty → move handler → call stack
       else     → wait till call stack is empty
    3. load to call stack for execution`
      }
    ]
  },
  {
    id: "lec15", label: "Lec 15", title: "Function Expressions, HOF & Callbacks",
    date: "16/03/26", color: "#06b6d4",
    sections: [
      {
        heading: "Java vs JavaScript — OOP Comparison",
        content: `Java [OOP]                          JavaScript
─────────────────────────────────────────────────────────
keep data in a variable             Functions
made method[functions] to             a. Function Declaration  [POP | OOPs]
  access data                         b. Function Expression   [Functional Programming]
kept data and method inside                  ↓
  class [Template]               Event Driven Programming: Asynchronous coding

                                    Functions: First class citizen
                                      a. store function in variable
                                      b. pass parameter into function
                                      c. return variable as a function

                                    c. Arrow Functions`
      },
      {
        heading: "Syntax of Function Expression",
        content: `var function_name = function (parameters) {
    // function body
}

// Example:
var add = function (a, b) {
    return a + b;
}
console.log(add(2, 3)); // Output: 5`
      },
      {
        heading: "What is the use of storing a value in a variable?",
        content: `Ans:  a. Printing on console
      b. pass variable as an argument`
      },
      {
        heading: "HOF & Callback — Examples",
        content: `// eg-1: setTimeout with named handler
let handler = function(){ }
let timer = 3000;
// HOF [Higher Order Function]
setTimeout(handler, timer);
//         ↑ callback function

// eg-2: addEventListener with named handler
let handler = function () { }
document.getElementById("btn")
    .addEventListener("click", handler);
//                              ↑ callback function

// Anonymous Function version:
document.getElementById("btn")
    .addEventListener("click", function () { });
//                              ↑ Anonymous Function`
      },
      {
        heading: "HOF & Callback — Definitions",
        content: `HOF → A function which accepts another function as an argument
       is referred as 'Higher Order Function'.

Callback function → A function which gets called automatically
                    by another function upon some event.`
      },
      {
        heading: "Usage of Functional Programming — Circle Calculations",
        content: `let radius = [3, 2, 1, 4];

// ── Without Functional Programming ──────────────────────────
const areaOfCircle = function (radius) {
    let output = [];
    for (let index = 0; index < radius.length; index++) {
        let result = (Math.PI * radius[index] * radius[index]).toFixed(2);
        output.push(result);
    }
    return output;
}
// (same pattern repeated for diameter, circumference)

// ── With Functional Programming (HOF) ───────────────────────
const area = function (r) { return Math.PI * r * r; }
const diameter = function (r) { return 2 * r; }
const cirumfarence = function (r) { return 2 * Math.PI * r; }

// Generic HOF (reusable):
const calcuate = function (radius, logic) {
    let output = [];
    for (let index = 0; index < radius.length; index++) {
        let result = logic(radius[index]).toFixed(2); // callback fn
        output.push(result);
    }
    return output;
}
console.log(calcuate(radius, area));
console.log(calcuate(radius, diameter));
console.log(calcuate(radius, cirumfarence));`
      }
    ]
  },
  {
    id: "lec16", label: "Lec 16", title: "Array.map() & Browser Events",
    date: "17/03/26", color: "#10b981",
    sections: [
      {
        heading: "Array.map() — Replacing Generic calcuate()",
        content: `let radius = [3, 2, 1, 4];
const area = r => Math.PI * r * r;
const diameter = r => 2 * r;
const cirumfarence = r => 2 * Math.PI * r;

// Custom HOF (with toFixed):
console.log(calcuate(radius, area));
// ['28.27', '12.57', '3.14', '50.27']

// Built-in Array.map() (no toFixed):
console.log(radius.map(area));
// [28.274..., 12.566..., 3.141..., 50.265...]
console.log(radius.map(diameter));
// [6, 4, 2, 8]`
      },
      {
        heading: "Events — Definition",
        content: `Something which happens on a webpage is referred as an 'Event'.
Action performed on a webpage by the user or browser is an 'Event'.

User Action          Event
====================================
clicking button      click
typing               keydown
submitting form      submit
moving mouse         mousemove
page loaded          load`
      },
      {
        heading: "Events Terminologies",
        content: `Sender
Subscriber
Observer
Delegate[Function pointer] or Event Delegation
Event Handler
Event Listener
Event Bubbling | Capturing`
      },
      {
        heading: "JavaScript Browser Events — Key Concepts",
        content: `→ Event is a message sent by sender to its subscriber to notify change.
→ Event follows a software design pattern called "Observer".
→ Observer is a communication pattern.
→ Event uses a function pointer mechanism. [Delegate = function pointer]

1. Inline: <button onclick='handler'></button>
   ❌ Multiple handlers can't be integrated
   ❌ Mixing of presentation logic and BL at one place

2. via onclick property:
   btn.onClick = handler;   // last assignment wins
   ✅ Separation of BL from Presentation logic
   ❌ Multiple handlers can't be assigned for one event.

3. addEventListener("event", handler)
   ✅ Multiple handlers for same event
   ✅ Separation of concerns`
      },
      {
        heading: "onclick vs addEventListener",
        content: `// ① onclick — OVERWRITES previous handler
btn.onclick = function () { console.log("msg 1"); }
btn.onclick = function () { console.log("msg 2"); }
// Output: "msg 2" only

// ② addEventListener — MULTIPLE handlers
btn.addEventListener("click", function () { console.log("msg 1"); });
btn.addEventListener("click", function () { console.log("msg 2"); });
btn.addEventListener("click", function () { console.log("msg 3"); });
// Output: msg 1 → msg 2 → msg 3`
      },
      {
        heading: "Arguments used in Handler: this & e",
        content: `a. this  : default object — gives info about element where event occurred.
           this == window → false
           this == btn    → true

b. e     : event object — explicitly passed to handler.
           e → target → textContent, innerHTML, type, innerText, ...

// ③ Accessing 'e' (PointerEvent object):
btn.addEventListener("click", function (e) {
    console.log(e);          // PointerEvent {isTrusted: true, ...}
    console.log(e.target);   // <button name="submit" ...>Click me</button>
});`
      },
      {
        heading: "removeEventListener()",
        content: `removeEventListener() → nullifies the handling effect upon an event.

// ✅ WORKS — named reference (same memory reference)
let handler = function () { console.log("listening"); }
btn1.addEventListener("click", handler);
btn2.addEventListener("click", () => btn1.removeEventListener("click", handler));

// ✅ Self-removing (fires ONCE):
let handler = function () {
    console.log("listening");
    btn1.removeEventListener("click", handler);
}
btn1.addEventListener("click", handler);

// ❌ FAILS silently — anonymous functions are different objects!
btn1.addEventListener("click", function () { console.log("clicked"); });
btn1.removeEventListener("click", function () { console.log("clicked"); });
// Different references in memory → listener NEVER removed`
      }
    ]
  },
  {
    id: "lec17", label: "Lec 17", title: "Form Events, Event Propagation & stopPropagation",
    date: "29/03/26", color: "#ec4899",
    sections: [
      {
        heading: "Form Related Events",
        content: `a. onsubmit → data sent to backend and page would be refreshed.
b. onreset  → data won't be sent to backend and data would be erased from components`
      },
      {
        heading: "preventDefault()",
        content: `// prevent default form submit behavior (page refresh)
document.getElementById("frmElement").addEventListener("submit", function (e) {
    e.preventDefault();
    alert("data not sent to the backend and page is not refreshed");

    let userName = e.target[0].value;  // e.target[0] = first form field
    document.querySelector("h1").innerText = "UserName is " + userName;
});

// prevent default reset behavior:
document.getElementById("frmElement").addEventListener("reset", function (e) {
    e.preventDefault();
    alert("data is not reset");
});`
      },
      {
        heading: "Event Propagation — 3 Phases",
        content: `JavaScript event occurs in 3 phases:
  1. Capturing phase   → document → body → div → button  (top to bottom)
  2. Target phase      → element where event occurred
  3. Bubbling phase    → button → div → body → document  (bottom to top)

Diagram:
   document
       ↓  [Capturing phase goes DOWN]
     body
       ↓
      div  ← bubbling phase goes UP ↑
       ↓
    button ← Target phase

addEventListener(event, handler, useCapture)
  useCapture = false (default) → Bubbling phase
  useCapture = true            → Capturing phase`
      },
      {
        heading: "Bubbling Phase (default — useCapture: false)",
        content: `// <div id="parent"><button id="child">Click Me</button></div>
let child = document.getElementById("child");
let parent = document.getElementById("parent");

child.addEventListener("click", function () { console.log("Button clicked"); });
parent.addEventListener("click", function () { console.log("Div clicked"); });
document.querySelector("body").addEventListener("click", function () {
    console.log("Body clicked");
});

// Output on button click (BUBBLES UP):
//   Button clicked
//   Div clicked
//   Body clicked`
      },
      {
        heading: "Capturing Phase (useCapture: true)",
        content: `child.addEventListener("click", function () { console.log("Button clicked"); }, true);
parent.addEventListener("click", function () { console.log("Div clicked"); }, true);
document.querySelector("body").addEventListener("click", function () {
    console.log("Body clicked");
}, true);

// Output on button click (CAPTURES DOWN):
//   Body clicked
//   Div clicked
//   Button clicked`
      },
      {
        heading: "stopPropagation()",
        content: `To prevent event bubbling we use stopPropagation().
To avoid event object propagation from parent↔child we use stopPropagation().
If we have multiple handlers to the same element, all handlers still get a chance.

child.addEventListener("click", function (e) { console.log("Button clicked-1");
    e.stopPropagation();
}, true);
child.addEventListener("click", function (e) { console.log("Button clicked-2"); }, true);
child.addEventListener("click", function (e) { console.log("Button clicked-3"); }, true);
parent.addEventListener("click", function (e) { console.log("div clicked"); }, true);
// Output:
//   div clicked    (capturing reaches parent first)
//   Button clicked-1
//   Button clicked-2
//   Button clicked-3`
      },
      {
        heading: "stopImmediatePropagation()",
        content: `stopPropagation() + stops ALL handlers associated with the Target Phase element.
→ Even sibling handlers on the SAME element are blocked.

child.addEventListener("click", function (e) {
    console.log("Button clicked-1");
    e.stopImmediatePropagation();  // stops ALL further handlers on child too
}, true);
child.addEventListener("click", function (e) {
    console.log("Button clicked-2");  // ❌ never runs
}, true);
child.addEventListener("click", function (e) {
    console.log("Button clicked-3");  // ❌ never runs
}, true);
parent.addEventListener("click", function (e) { console.log("div clicked"); }, true);
// Output:
//   div clicked       (parent capturing fires first)
//   Button clicked-1  (then stops immediately)
// ❌ Button clicked-2 and clicked-3 are blocked`
      }
    ]
  },
  {
    id: "lec18", label: "Lec 18", title: "forEach, Event Delegation, Pure Functions & Keyboard Events",
    date: "27/03/26", color: "#a78bfa",
    sections: [
      {
        heading: "forEach() — return type: void",
        content: `// forEach() return type → void

// HTML: <ul><li>Javascript</li><li>React</li><li>Node.js</li>
//            <li>Express.js</li><li>Vue.js</li><li>Next.js</li></ul>

document.querySelectorAll("li")
    .forEach(function (item) {
        console.log(item);
    });
// Output: li  li  li  li  li  li  (each li element)`
      },
      {
        heading: "forEach — Adding Events (Not Recommended)",
        content: `// ① Bad practice — adding addEventListener inside forEach
//   (one handler per li = multiple handlers for same action)
document.querySelectorAll("li")
    .forEach(function (item) {
        item.addEventListener("click", function (e) {
            console.log("You selected : " + e.target.textContent);
        });
    });
// Output on click:
//   You selected : Express.js
//   You selected : Node.js
//   You selected : Next.js

// ❌ This is not a good practice because in each "li"
//    we are adding addEventListener`
      },
      {
        heading: "Event Delegation",
        content: `→ Due to event bubbling, event object is delegated from child nodes to
  parent nodes so writing one handler at parent level to handle the
  events occurred in child object is referred as 'Delegation'.

// ② Better approach — Event Delegation (one handler on ul)
document.querySelector("ul").addEventListener("click", function (e) {
    console.log("You selected : " + e.target.textContent);
});
// Output on clicking any li:
//   You selected : Express.js
//   You selected : Node.js
//   You selected : Next.js`
      },
      {
        heading: "forEach — index parameter",
        content: `// ① Using template literal (shows [object HTMLLIElement]):
document.querySelectorAll("li")
    .forEach(function (item, index) {
        console.log("Index " + index + " : " + item);
    });
// Output: Index 0 : [object HTMLLIElement]
//         Index 1 : [object HTMLLIElement] ...

// ② Using console.log with comma (shows actual element):
document.querySelectorAll("li")
    .forEach(function (item, index) {
        console.log("Index", index, ":", item);
    });
// Output: Index 0 : ► li
//         Index 1 : ► li  ...`
      },
      {
        heading: "Pure Function",
        content: `Pure Function → No outside dependency + No outside modification

// Impure Function (has outside dependency):
let total = 0;
function addToTotal(num) {
    total += num;      // modifies external variable
    return total;
}

// Pure Function:
function add(a, b) {
    return a + b;      // no side effects
}

✅ Same inputs  → Same Output
✅ Doesn't modify any external variables
✅ Doesn't log, fetch, or change DOM

Note → callback function should always be a pure function
        (it should avoid side effects).`
      },
      {
        heading: "Events in JavaScript — Categories",
        content: `a. Binding to UI
      a. keyboard
            a. Clipboard event : cut, copy, paste
      b. mouse
      c. form events : submit, reset
      d. timer event : setTimeout(), ...........`
      },
      {
        heading: "Keyboard Events",
        content: `keydown → key is pressed
keyup   → key is released

// Live typing Example:
// <h2>Live typing Example</h2>
// <input type="text" id="search" placeholder="Type something ....">

document.querySelector("input").addEventListener("keyup", function (e) {
    console.log(e);
    alert("key is pressed and released");
})

// Output on typing "sv":
//   KeyboardEvent {isTrusted: true, key: 'Shift', code: 'ShiftRight', ...}
//   KeyboardEvent {isTrusted: true, key: 's', code: 'KeyS', ...}
//   KeyboardEvent {isTrusted: true, key: 'v', code: 'KeyV', ...}
//   KeyboardEvent {isTrusted: true, key: ' ', code: 'Space', ...}`
      },
      {
        heading: "PointerEvent — Properties",
        content: `// PointerEvent fired on button click:
// PointerEvent {isTrusted: true, pointerId: 2, width: 1, height: 1, pressure: 0, ...}
//   altitudeAngle: 1.5707963267948966
//   bubbles: true
//   cancelable: true
//   clientX: 43    ← In button, where I have clicked, it's giving position
//   clientY: 114
//   composed: true
//   detail: 1
//   height: 1
//   layerX: 43
//   layerY: 114
//   offsetX: 34
//   offsetY: 8
//   pageX: 43
//   pageY: 114
//   pointerId: 2
//   pointerType: "touch"
//   returnValue: true
//   screenX: 88
//   screenY: 233
//   target: button
//   type: "click"
//   width: 1
//   x: 43
//   y: 114`
      }
    ]
  }
];

// ── DEMOS ────────────────────────────────────────────────────────────────────
const demos = {
  classlist: [
    { label: "1. add() basic", code: `let text = document.getElementById("text");
console.log(text.classList);
text.classList.add("box", "red");
console.log(text.classList.length);
console.log(text.classList);`, output: ["DOMTokenList [value: '']", "2", "DOMTokenList(2) ['box', 'red', value: 'box red']"], note: "add() appends class(es). If class already exists it is silently ignored." },
    { label: "2. contains()", code: `text.classList.add("box", "red");
console.log(text.classList.contains("red"));   // true
console.log(text.classList.contains("blue"));  // false`, output: ["true", "false"], note: "contains() returns boolean. Case-sensitive." },
    { label: "3. remove()", code: `text.classList.add("box", "red", "border");
text.classList.remove("red");
console.log(text.classList);`, output: ["DOMTokenList(2) ['box', 'border', value: 'box border']"], note: "remove() silently ignores non-existent classes." },
    { label: "4. toggle() — no force", code: `text.classList.add("box");
console.log(text.classList.toggle("red"));   // adds → true
console.log(text.classList.toggle("red"));   // removes → false`, output: ["true", "false"], note: "toggle() adds if absent → true, removes if present → false." },
    { label: "5. toggle(str, true) force add", code: `text.classList.add("box", "red");
console.log(text.classList.toggle("red", true));   // force add → true
console.log(text.classList.toggle("blue", true));  // force add → true`, output: ["true", "true"], note: "toggle(class, true) forces addition regardless." },
  ],
  eventloop: [
    { label: "1. setTimeout basic", code: `console.log("start");
setTimeout(function () {
    console.log("Processing...");
}, 3000);
console.log("end");`, output: ["start", "end", "(after 3000ms) Processing..."], note: "Sync code (start, end) runs first. setTimeout goes to Browser API → Callback Queue → Event Loop." },
    { label: "2. 0ms still async", code: `console.log("start");
setTimeout(function () {
    console.log("I am async");
}, 0);
console.log("end");`, output: ["start", "end", "I am async"], note: "Even 0ms delay is async! Handler waits in queue until call stack is empty." },
    { label: "3. Multiple timers — order", code: `console.log("A");
setTimeout(() => console.log("B - 2s"), 2000);
setTimeout(() => console.log("C - 1s"), 1000);
setTimeout(() => console.log("D - 0s"), 0);
console.log("E");`, output: ["A", "E", "D - 0s", "C - 1s", "B - 2s"], note: "Sync first (A, E). Then callbacks fire in expiry order: 0s → 1s → 2s." },
  ],
  hof: [
    { label: "1. Function Expression", code: `var add = function (a, b) { return a + b; }
console.log(add(2, 3));
console.log(typeof add);`, output: ["5", "function"], note: "Function Expression stores a function in a variable. typeof returns 'function'." },
    { label: "2. HOF — setTimeout", code: `let handler = function(){ console.log("Timer fired!"); }
let timer = 3000;
setTimeout(handler, timer); // HOF`, output: ["(after 3000ms) Timer fired!"], note: "setTimeout is a HOF — accepts handler (callback) as first arg." },
    { label: "3. Functional Programming", code: `let radius = [3, 2, 1, 4];
const area = r => Math.PI * r * r;
const diameter = r => 2 * r;

const calcuate = function (radius, logic) {
    let output = [];
    for (let i = 0; i < radius.length; i++) {
        output.push(logic(radius[i]).toFixed(2));
    }
    return output;
}
console.log(calcuate(radius, area));
console.log(calcuate(radius, diameter));`, output: ["['28.27', '12.57', '3.14', '50.27']", "['6.00', '4.00', '2.00', '8.00']"], note: "Generic HOF: pass business logic as callback. One calcuate() works for any formula." },
    { label: "4. map() vs calcuate()", code: `let radius = [3, 2, 1, 4];
const diameter = r => 2 * r;
console.log(calcuate(radius, diameter)); // toFixed → strings
console.log(radius.map(diameter));       // raw numbers`, output: ["['6.00', '4.00', '2.00', '8.00']", "[6, 4, 2, 8]"], note: "Array.map() is JS's built-in HOF. Difference: no .toFixed(2) → raw numbers returned." },
  ],
  events: [
    { label: "1. onclick — overwrite", code: `let btn = document.querySelector("button");
btn.onclick = function () { console.log("msg 1"); }
btn.onclick = function () { console.log("msg 2"); }
// click btn`, output: ["msg 2"], note: "onclick is a property — 2nd assignment overwrites 1st. Only last handler runs." },
    { label: "2. addEventListener — multiple", code: `btn.addEventListener("click", () => console.log("msg 1"));
btn.addEventListener("click", () => console.log("msg 2"));
btn.addEventListener("click", () => console.log("msg 3"));
// click btn`, output: ["msg 1", "msg 2", "msg 3"], note: "addEventListener allows MULTIPLE handlers. All fire in registration order." },
    { label: "3. this & e in handler", code: `btn.addEventListener("click", function (e) {
    console.log(this == window); // false
    console.log(this == btn);    // true
    console.log(e);              // PointerEvent
    console.log(e.target);       // the button element
});`, output: ["false", "true", "PointerEvent {isTrusted: true, ...}", "<button ...>Click me</button>"], note: "'this' = element event is on. 'e' = event object (must be explicitly declared as param)." },
    { label: "4. removeEventListener — named", code: `let handler = function () {
    console.log("I am listening");
}
btn1.addEventListener("click", handler);
btn2.addEventListener("click", () => {
    btn1.removeEventListener("click", handler);
});`, output: ["(btn1) I am listening", "(btn2) listener removed", "(btn1 again) [nothing]"], note: "✅ removeEventListener works ONLY with same function reference. Named handler → works." },
    { label: "5. removeEventListener — anonymous FAILS", code: `btn1.addEventListener("click", function () {
    console.log("clicked");
});
btn1.removeEventListener("click", function () {
    console.log("clicked");
}); // ❌ different references!`, output: ["clicked", "clicked", "clicked (every click...)"], note: "❌ Anonymous functions are different objects in memory. removeEventListener fails silently." },
  ],
  propagation: [
    { label: "1. Bubbling (default)", code: `child.addEventListener("click", () => console.log("Button clicked"));
parent.addEventListener("click", () => console.log("Div clicked"));
document.querySelector("body")
    .addEventListener("click", () => console.log("Body clicked"));
// click the button`, output: ["Button clicked", "Div clicked", "Body clicked"], note: "Default bubbling: event fires on target first, then BUBBLES UP through ancestors." },
    { label: "2. Capturing (useCapture: true)", code: `child.addEventListener("click", () => console.log("Button clicked"), true);
parent.addEventListener("click", () => console.log("Div clicked"), true);
document.querySelector("body")
    .addEventListener("click", () => console.log("Body clicked"), true);
// click the button`, output: ["Body clicked", "Div clicked", "Button clicked"], note: "Capturing: event starts from top and CAPTURES DOWN to target. true = capturing phase." },
    { label: "3. stopPropagation() on body", code: `child.addEventListener("click", e => console.log("Button clicked"), true);
parent.addEventListener("click", e => console.log("Div clicked"), true);
document.querySelector("body").addEventListener("click", function(e) {
    console.log("Body clicked");
    e.stopPropagation();
}, true);`, output: ["Body clicked"], note: "stopPropagation on body: event captured at body, stops — div and button never fire." },
    { label: "4. stopPropagation() — siblings still fire", code: `child.addEventListener("click", function(e) {
    console.log("Button clicked-1");
    e.stopPropagation();
}, true);
child.addEventListener("click", e => console.log("Button clicked-2"), true);
child.addEventListener("click", e => console.log("Button clicked-3"), true);
parent.addEventListener("click", e => console.log("div clicked"), true);`, output: ["div clicked", "Button clicked-1", "Button clicked-2", "Button clicked-3"], note: "stopPropagation stops propagation to OTHER elements but ALL handlers on same element still fire." },
    { label: "5. stopImmediatePropagation()", code: `child.addEventListener("click", function(e) {
    console.log("Button clicked-1");
    e.stopImmediatePropagation();
}, true);
child.addEventListener("click", e => console.log("Button clicked-2"), true);
child.addEventListener("click", e => console.log("Button clicked-3"), true);
parent.addEventListener("click", e => console.log("div clicked"), true);`, output: ["div clicked", "Button clicked-1"], note: "stopImmediatePropagation = stopPropagation + stops ALL sibling handlers on same element too." },
    { label: "6. preventDefault() on form", code: `document.getElementById("frmElement")
    .addEventListener("submit", function (e) {
        e.preventDefault();
        alert("data not sent to backend");
        let userName = e.target[0].value;
        document.querySelector("h1").innerText = "UserName is " + userName;
    });`, output: ["(alert) data not sent to backend", "(h1 updates with username — no refresh)"], note: "preventDefault() stops the default browser behavior (form submit = page reload). Data stays." },
  ],
  delegation: [
    { label: "1. forEach — log each li", code: `// <ul><li>Javascript</li><li>React</li>
//      <li>Node.js</li><li>Express.js</li>
//      <li>Vue.js</li><li>Next.js</li></ul>

document.querySelectorAll("li")
    .forEach(function (item) {
        console.log(item);
    });`, output: ["► li (Javascript)", "► li (React)", "► li (Node.js)", "► li (Express.js)", "► li (Vue.js)", "► li (Next.js)"], note: "forEach return type = void. Iterates each NodeList item. Cannot use break/continue." },
    { label: "2. forEach — index param (+ operator)", code: `document.querySelectorAll("li")
    .forEach(function (item, index) {
        console.log("Index " + index + " : " + item);
    });`, output: ["Index 0 : [object HTMLLIElement]", "Index 1 : [object HTMLLIElement]", "Index 2 : [object HTMLLIElement]", "Index 3 : [object HTMLLIElement]", "Index 4 : [object HTMLLIElement]", "Index 5 : [object HTMLLIElement]"], note: "Using + operator with element converts it to string → '[object HTMLLIElement]'." },
    { label: "3. forEach — index param (comma)", code: `document.querySelectorAll("li")
    .forEach(function (item, index) {
        console.log("Index", index, ":", item);
    });`, output: ["Index 0 : ► li", "Index 1 : ► li", "Index 2 : ► li", "Index 3 : ► li", "Index 4 : ► li", "Index 5 : ► li"], note: "Using comma in console.log shows the actual element (expandable ► li) instead of string." },
    { label: "4. ❌ forEach with addEventListener (bad)", code: `// ❌ Not recommended — adds handler to EACH li
document.querySelectorAll("li")
    .forEach(function (item) {
        item.addEventListener("click", function (e) {
            console.log("You selected : " + e.target.textContent);
        });
    });
// Click Express.js
// Click Node.js
// Click Next.js`, output: ["You selected : Express.js", "You selected : Node.js", "You selected : Next.js"], note: "❌ Bad practice: N listeners for N items. Each li gets its own handler — memory inefficient." },
    { label: "5. ✅ Event Delegation (best)", code: `// ✅ One handler on parent ul — Event Delegation
document.querySelector("ul")
    .addEventListener("click", function (e) {
        console.log("You selected : " + e.target.textContent);
    });
// Click Express.js
// Click Node.js
// Click Next.js`, output: ["You selected : Express.js", "You selected : Node.js", "You selected : Next.js"], note: "✅ Event Delegation: one handler on ul catches all li clicks via bubbling. Efficient & scalable." },
    { label: "6. Pure vs Impure Function", code: `// Impure Function — outside dependency
let total = 0;
function addToTotal(num) {
    total += num;      // modifies external variable
    return total;
}
console.log(addToTotal(5));  // 5
console.log(addToTotal(5));  // 10 — different output same input!

// Pure Function — no side effects
function add(a, b) {
    return a + b;
}
console.log(add(2, 3));  // always 5
console.log(add(2, 3));  // always 5`, output: ["5", "10", "5", "5"], note: "Impure: same input → different output (depends on external state). Pure: same input → ALWAYS same output." },
    { label: "7. Keyboard Event — keyup", code: `// <input type="text" id="search" placeholder="Type something ....">
document.querySelector("input")
    .addEventListener("keyup", function (e) {
        console.log(e);
        console.log(e.key);
        console.log(e.code);
    });
// Type "sv":
// KeyboardEvent {isTrusted: true, key: 's', code: 'KeyS', ...}
// KeyboardEvent {isTrusted: true, key: 'v', code: 'KeyV', ...}`, output: ["KeyboardEvent {isTrusted: true, key: 's', code: 'KeyS', location: 0, ctrlKey: false, ...}", "s", "KeyS", "KeyboardEvent {isTrusted: true, key: 'v', code: 'KeyV', location: 0, ctrlKey: false, ...}", "v", "KeyV"], note: "keyup fires when key is released. e.key = character pressed. e.code = physical key location on keyboard." },
  ],
};

// ── QUIZ ─────────────────────────────────────────────────────────────────────
const quiz = [
  { q: "What does classList.toggle('red') return when 'red' is already present?", opts: ["true","false","void","undefined"], ans: 1 },
  { q: "What is the correct order of Event Propagation phases?", opts: ["Bubbling → Target → Capturing","Capturing → Target → Bubbling","Target → Bubbling → Capturing","Target → Capturing → Bubbling"], ans: 1 },
  { q: "What does e.preventDefault() do on a form submit?", opts: ["Stops event bubbling","Prevents page refresh / default form submission","Removes the form from DOM","Clears form fields"], ans: 1 },
  { q: "console.log('A'); setTimeout(fn,0); console.log('B'); — Output?", opts: ["A → fn → B","fn → A → B","A → B → fn","B → fn → A"], ans: 2 },
  { q: "Which is true about stopPropagation()?", opts: ["Stops ALL handlers on same element","Stops propagation to other elements but same-element siblings still fire","Prevents default browser behavior","Removes the event listener"], ans: 1 },
  { q: "What does stopImmediatePropagation() do differently from stopPropagation()?", opts: ["Also clears the callback queue","Also stops ALL other handlers on the SAME element","Only works in capturing phase","Prevents default form submit"], ans: 1 },
  { q: "What is Event Delegation?", opts: ["Adding one handler to every child element","Adding one handler at parent level to catch child events via bubbling","Delegating events to the window object","A method to remove event listeners"], ans: 1 },
  { q: "A Pure Function must...", opts: ["Modify external state","Always return the same output for the same inputs and have no side effects","Use only arrow functions","Accept a callback as argument"], ans: 1 },
  { q: "forEach() return type is?", opts: ["Array","NodeList","boolean","void"], ans: 3 },
  { q: "keydown vs keyup — difference?", opts: ["keydown fires on release, keyup on press","keydown fires when key is pressed, keyup when key is released","They are identical","keyup only works with letters"], ans: 1 },
];

// ── PROPAGATION DIAGRAM ───────────────────────────────────────────────────────
function PropDiagram() {
  return (
    <div style={{ background: "#0b1120", border: "1px solid #1f2937", borderRadius: 12, padding: 20, marginTop: 20 }}>
      <h4 style={{ color: "#ec4899", margin: "0 0 14px" }}>🌊 Event Propagation Visual</h4>
      <div style={{ display: "flex", gap: 20, alignItems: "flex-start", flexWrap: "wrap" }}>
        <div style={{ flex: 1, minWidth: 200 }}>
          <div style={{ color: "#94a3b8", fontSize: 11, marginBottom: 8, textAlign: "center" }}>Bubbling (default)</div>
          {["document", "body", "div", "button ← Target"].map((el, i) => (
            <div key={i} style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 6 }}>
              <div style={{ width: `${180 - i * 30}px`, background: "#ec4899" + (30 + i * 20).toString(16), border: "1px solid #ec489940", borderRadius: 6, padding: "5px 10px", color: i === 3 ? "#ec4899" : "#94a3b8", fontSize: 12, textAlign: "center" }}>{el.replace(" ← Target", "")}{i === 3 && <span style={{ color: "#fbbf24" }}> ★</span>}</div>
              {i < 3 && <span style={{ color: "#ec4899", fontSize: 16 }}>↑</span>}
            </div>
          ))}
          <div style={{ color: "#ec4899", fontSize: 11, marginTop: 6 }}>Fires button → div → body → doc</div>
        </div>
        <div style={{ flex: 1, minWidth: 200 }}>
          <div style={{ color: "#94a3b8", fontSize: 11, marginBottom: 8, textAlign: "center" }}>Capturing (useCapture: true)</div>
          {["document", "body", "div", "button ← Target"].map((el, i) => (
            <div key={i} style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 6 }}>
              <div style={{ width: `${180 - i * 30}px`, background: "#06b6d4" + (30 + i * 20).toString(16), border: "1px solid #06b6d440", borderRadius: 6, padding: "5px 10px", color: i === 3 ? "#06b6d4" : "#94a3b8", fontSize: 12, textAlign: "center" }}>{el.replace(" ← Target", "")}{i === 3 && <span style={{ color: "#fbbf24" }}> ★</span>}</div>
              {i < 3 && <span style={{ color: "#06b6d4", fontSize: 16 }}>↓</span>}
            </div>
          ))}
          <div style={{ color: "#06b6d4", fontSize: 11, marginTop: 6 }}>Fires doc → body → div → button</div>
        </div>
      </div>
    </div>
  );
}

// ── MAIN ──────────────────────────────────────────────────────────────────────
export default function JSNotes() {
  const [tab, setTab] = useState("notes");
  const [activeLec, setActiveLec] = useState(0);
  const [demoTopic, setDemoTopic] = useState("classlist");
  const [demoIdx, setDemoIdx] = useState(0);
  const [showOutput, setShowOutput] = useState(false);
  const [animating, setAnimating] = useState(false);
  const [quizQ, setQuizQ] = useState(0);
  const [quizSel, setQuizSel] = useState(null);
  const [quizScore, setQuizScore] = useState(0);
  const [quizDone, setQuizDone] = useState(false);

  const lec = lectures[activeLec];
  const demoList = demos[demoTopic];
  const demo = demoList[demoIdx];

  const runDemo = () => { setAnimating(true); setShowOutput(false); setTimeout(() => { setShowOutput(true); setAnimating(false); }, 600); };
  const handleQuiz = (i) => { if (quizSel !== null) return; setQuizSel(i); if (i === quiz[quizQ].ans) setQuizScore(s => s + 1); };
  const nextQ = () => { if (quizQ + 1 >= quiz.length) { setQuizDone(true); return; } setQuizQ(q => q + 1); setQuizSel(null); };
  const resetQuiz = () => { setQuizQ(0); setQuizSel(null); setQuizScore(0); setQuizDone(false); };

  const topicBtns = [
    { id: "classlist", label: "🏷 classList", color: "#f59e0b" },
    { id: "eventloop", label: "⏱ Event Loop", color: "#8b5cf6" },
    { id: "hof", label: "🔼 HOF & Callbacks", color: "#06b6d4" },
    { id: "events", label: "🖱 Browser Events", color: "#10b981" },
    { id: "propagation", label: "🌊 Propagation", color: "#ec4899" },
    { id: "delegation", label: "🎯 Delegation & forEach", color: "#a78bfa" },
  ];

  return (
    <div style={{ fontFamily: "monospace", background: "#060d1a", minHeight: "100vh", color: "#e2e8f0" }}>
      {/* Header */}
      <div style={{ background: "linear-gradient(135deg,#0a1628,#0f2040)", borderBottom: "2px solid #a78bfa", padding: "16px 24px", display: "flex", alignItems: "center", gap: 12 }}>
        <div style={{ background: "linear-gradient(135deg,#ec4899,#a78bfa)", borderRadius: "50%", width: 42, height: 42, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20 }}>🎯</div>
        <div>
          <h1 style={{ margin: 0, fontSize: 19, color: "#fff" }}>JavaScript — Lec 14 to 18</h1>
          <p style={{ margin: 0, color: "#a78bfa", fontSize: 11 }}>classList · Async JS · HOF · Callbacks · Events · Propagation · Delegation · forEach · Pure Functions · Keyboard Events</p>
        </div>
      </div>

      {/* Nav */}
      <div style={{ background: "#0b1120", borderBottom: "1px solid #1f2937", display: "flex" }}>
        {[{ id: "notes", label: "📖 Notes" }, { id: "demo", label: "▶ Live Demo" }, { id: "quiz", label: "🧠 Quiz" }].map(n => (
          <button key={n.id} onClick={() => setTab(n.id)} style={{ padding: "11px 22px", background: "none", border: "none", cursor: "pointer", fontSize: 13, fontWeight: 700, fontFamily: "monospace", color: tab === n.id ? "#a78bfa" : "#475569", borderBottom: tab === n.id ? "3px solid #a78bfa" : "3px solid transparent" }}>{n.label}</button>
        ))}
      </div>

      <div style={{ display: "flex", width: "100%" }}>

        {/* NOTES */}
        {tab === "notes" && (
          <>
            <div style={{ width: 150, minHeight: "80vh", background: "#0b1120", borderRight: "1px solid #1f2937", padding: "14px 0", flexShrink: 0 }}>
              {lectures.map((l, i) => (
                <button key={l.id} onClick={() => setActiveLec(i)} style={{ display: "block", width: "100%", textAlign: "left", padding: "10px 14px", background: activeLec === i ? l.color + "22" : "none", border: "none", borderLeft: activeLec === i ? `3px solid ${l.color}` : "3px solid transparent", cursor: "pointer", color: activeLec === i ? l.color : "#64748b", fontSize: 12, fontFamily: "monospace" }}>
                  <div style={{ fontWeight: 700 }}>{l.label}</div>
                  <div style={{ fontSize: 10, opacity: 0.8 }}>{l.date}</div>
                </button>
              ))}
            </div>
            <div style={{ flex: 1, minWidth: 0, padding: "28px 20px", overflowY: "auto" }}>
              <div style={{ borderBottom: `2px solid ${lec.color}`, paddingBottom: 12, marginBottom: 20 }}>
                <span style={{ background: lec.color + "22", border: `1px solid ${lec.color}`, borderRadius: 6, padding: "3px 10px", color: lec.color, fontSize: 12, fontWeight: 700 }}>{lec.label}</span>
                <h2 style={{ margin: "10px 0 0", color: "#fff", fontSize: 18 }}>{lec.title}</h2>
              </div>
              {lec.sections.map((s, i) => (
                <div key={i} style={{ background: "#0b1120", border: "1px solid #1f2937", borderLeft: `4px solid ${lec.color}`, borderRadius: 10, padding: 20, marginBottom: 14 }}>
                  <h4 style={{ color: lec.color, margin: "0 0 10px", fontSize: 14 }}>{s.heading}</h4>
                  <ColoredPre content={s.content} />
                </div>
              ))}
            </div>
          </>
        )}

        {/* DEMO */}
        {tab === "demo" && (
          <div style={{ flex: 1, padding: 28 }}>
            <h2 style={{ color: "#a78bfa", marginTop: 0 }}>▶ Live Output Simulator</h2>
            <p style={{ color: "#475569", fontSize: 13, marginBottom: 18 }}>Select topic and snippet, then click Run.</p>
            <div style={{ display: "flex", gap: 8, marginBottom: 18, flexWrap: "wrap" }}>
              {topicBtns.map(t => (
                <button key={t.id} onClick={() => { setDemoTopic(t.id); setDemoIdx(0); setShowOutput(false); }} style={{ padding: "8px 14px", borderRadius: 8, border: `2px solid ${demoTopic === t.id ? t.color : "#1f2937"}`, background: demoTopic === t.id ? t.color + "22" : "#0b1120", color: demoTopic === t.id ? t.color : "#64748b", cursor: "pointer", fontWeight: 700, fontSize: 12, fontFamily: "monospace" }}>{t.label}</button>
              ))}
            </div>
            <div style={{ display: "flex", gap: 6, marginBottom: 18, flexWrap: "wrap" }}>
              {demoList.map((d, i) => (
                <button key={i} onClick={() => { setDemoIdx(i); setShowOutput(false); }} style={{ padding: "6px 11px", borderRadius: 6, border: `1px solid ${demoIdx === i ? "#a78bfa" : "#1f2937"}`, background: demoIdx === i ? "#a78bfa22" : "#0b1120", color: demoIdx === i ? "#a78bfa" : "#64748b", cursor: "pointer", fontSize: 11, fontFamily: "monospace" }}>{i + 1}. {d.label}</button>
              ))}
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
              <div style={{ background: "#060d1a", border: "1px solid #1f2937", borderRadius: 12, overflow: "hidden" }}>
                <div style={{ background: "#1f2937", padding: "8px 14px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <span style={{ color: "#64748b", fontSize: 12 }}>📄 {demo.label}</span>
                  <button onClick={runDemo} style={{ background: "#a78bfa", border: "none", borderRadius: 6, padding: "5px 14px", color: "#060d1a", fontWeight: 700, cursor: "pointer", fontSize: 12, fontFamily: "monospace" }}>▶ Run</button>
                </div>
                <pre style={{ color: "#fde68a", fontSize: 12.5, margin: 0, padding: "16px", lineHeight: 1.7, whiteSpace: "pre-wrap" }}>{demo.code}</pre>
              </div>
              <div style={{ background: "#060d1a", border: "1px solid #1f2937", borderRadius: 12, overflow: "hidden" }}>
                <div style={{ background: "#1f2937", padding: "8px 14px" }}><span style={{ color: "#64748b", fontSize: 12 }}>💻 Console Output</span></div>
                <div style={{ padding: 16, minHeight: 120 }}>
                  {animating && <div style={{ color: "#475569", fontSize: 13 }}>Running...</div>}
                  {showOutput && !animating && demo.output.map((line, i) => (
                    <div key={i} style={{ fontFamily: "monospace", fontSize: 12.5, padding: "4px 0", color: line.startsWith("❌") ? "#f87171" : line.startsWith("(") ? "#94a3b8" : "#a3e635", borderBottom: i < demo.output.length - 1 ? "1px solid #1f293720" : "none" }}>{line}</div>
                  ))}
                  {!showOutput && !animating && <div style={{ color: "#374151", fontSize: 12 }}>Click ▶ Run to see output</div>}
                </div>
                {showOutput && (
                  <div style={{ background: "#1a0a1f", borderTop: "1px solid #4c065f", padding: "10px 16px" }}>
                    <p style={{ color: "#d8b4fe", fontSize: 12, margin: 0 }}>💡 {demo.note}</p>
                  </div>
                )}
              </div>
            </div>
            {showOutput && demoTopic === "propagation" && (demoIdx === 0 || demoIdx === 1) && <PropDiagram />}

            {/* Event Delegation visual */}
            {showOutput && demoTopic === "delegation" && (demoIdx === 3 || demoIdx === 4) && (
              <div style={{ marginTop: 20, background: "#0b1120", border: "1px solid #1f2937", borderRadius: 12, padding: 20 }}>
                <h4 style={{ color: "#a78bfa", margin: "0 0 14px" }}>🎯 Event Delegation vs forEach Listeners</h4>
                <div style={{ display: "flex", gap: 12 }}>
                  <div style={{ flex: 1, background: "#450a0a", border: "2px solid #ef4444", borderRadius: 10, padding: 14 }}>
                    <div style={{ color: "#f87171", fontWeight: 700, marginBottom: 8 }}>❌ forEach (N listeners)</div>
                    <div style={{ color: "#fca5a5", fontSize: 12 }}>li → handler</div>
                    <div style={{ color: "#fca5a5", fontSize: 12 }}>li → handler</div>
                    <div style={{ color: "#fca5a5", fontSize: 12 }}>li → handler</div>
                    <div style={{ color: "#94a3b8", fontSize: 11, marginTop: 8 }}>6 elements = 6 handlers 😰</div>
                  </div>
                  <div style={{ flex: 1, background: "#064e3b", border: "2px solid #10b981", borderRadius: 10, padding: 14 }}>
                    <div style={{ color: "#6ee7b7", fontWeight: 700, marginBottom: 8 }}>✅ Delegation (1 listener)</div>
                    <div style={{ color: "#6ee7b7", fontSize: 12 }}>ul → ONE handler</div>
                    <div style={{ color: "#6ee7b7", fontSize: 12 }}>  ↑ catches all li clicks</div>
                    <div style={{ color: "#6ee7b7", fontSize: 12 }}>  via bubbling</div>
                    <div style={{ color: "#94a3b8", fontSize: 11, marginTop: 8 }}>N elements = 1 handler 🎉</div>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* QUIZ */}
        {tab === "quiz" && (
          <div style={{ flex: 1, padding: 28 }}>
            <h2 style={{ color: "#a78bfa", marginTop: 0 }}>🧠 Knowledge Check — Lec 14–18</h2>
            {!quizDone ? (
              <div>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 10 }}>
                  <span style={{ color: "#475569", fontSize: 13 }}>Q {quizQ + 1} / {quiz.length}</span>
                  <span style={{ color: "#34d399", fontWeight: 700 }}>Score: {quizScore}/{quiz.length}</span>
                </div>
                <div style={{ width: "100%", height: 4, background: "#1f2937", borderRadius: 4, marginBottom: 24 }}>
                  <div style={{ width: `${(quizQ / quiz.length) * 100}%`, height: "100%", background: "#a78bfa", borderRadius: 4, transition: "width 0.3s" }} />
                </div>
                <div style={{ background: "#0b1120", border: "1px solid #1f2937", borderRadius: 14, padding: 28, marginBottom: 16 }}>
                  <p style={{ color: "#e2e8f0", fontSize: 16, fontWeight: 700, margin: "0 0 22px", lineHeight: 1.6 }}>{quiz[quizQ].q}</p>
                  <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                    {quiz[quizQ].opts.map((opt, i) => {
                      let bg = "#1f2937", border = "#374151", color = "#cbd5e1";
                      if (quizSel !== null) {
                        if (i === quiz[quizQ].ans) { bg = "#064e3b"; border = "#10b981"; color = "#6ee7b7"; }
                        else if (i === quizSel) { bg = "#450a0a"; border = "#ef4444"; color = "#fca5a5"; }
                      }
                      return (
                        <button key={i} onClick={() => handleQuiz(i)} style={{ background: bg, border: `2px solid ${border}`, borderRadius: 10, padding: "11px 16px", color, textAlign: "left", cursor: quizSel === null ? "pointer" : "default", fontSize: 13, fontFamily: "monospace" }}>
                          <span style={{ fontWeight: 700, marginRight: 8 }}>{["A","B","C","D"][i]}.</span>{opt}
                          {quizSel !== null && i === quiz[quizQ].ans && " ✅"}
                          {quizSel === i && i !== quiz[quizQ].ans && " ❌"}
                        </button>
                      );
                    })}
                  </div>
                </div>
                {quizSel !== null && (
                  <div style={{ display: "flex", justifyContent: "flex-end" }}>
                    <button onClick={nextQ} style={{ background: "#a78bfa", border: "none", borderRadius: 10, padding: "11px 26px", color: "#060d1a", fontWeight: 700, cursor: "pointer", fontSize: 14, fontFamily: "monospace" }}>
                      {quizQ + 1 >= quiz.length ? "Results →" : "Next →"}
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div style={{ textAlign: "center", background: "#0b1120", border: "1px solid #1f2937", borderRadius: 20, padding: 48 }}>
                <div style={{ fontSize: 60, marginBottom: 14 }}>{quizScore >= 9 ? "🏆" : quizScore >= 7 ? "🎯" : "📚"}</div>
                <h3 style={{ color: "#a78bfa", fontSize: 28 }}>{quizScore}/{quiz.length}</h3>
                <p style={{ color: "#94a3b8", marginBottom: 24 }}>{quizScore === 10 ? "Perfect score! Lec 14–18 mastered! 🌟" : quizScore >= 7 ? "Great! Revisit Event Delegation and Pure Functions." : "Head back to Notes and Live Demo to review!"}</p>
                <button onClick={resetQuiz} style={{ background: "#a78bfa", border: "none", borderRadius: 10, padding: "12px 28px", color: "#060d1a", fontWeight: 700, cursor: "pointer", fontSize: 15, fontFamily: "monospace" }}>Retry 🔄</button>
              </div>
            )}
          </div>
        )}
      </div>

      <div style={{ background: "#0b1120", borderTop: "1px solid #1f2937", padding: "12px 24px", textAlign: "center" }}>
        <p style={{ color: "#1f2937", fontSize: 11, margin: 0 }}>JavaScript Lec 14–18 · PW Institute of Innovation · BEN01SOTUGBTC25B01</p>
      </div>
    </div>
  );
}
