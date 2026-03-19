import { useState } from "react";

const lectures = [
  {
    id: "lec14", label: "Lec 14", title: "classList Methods & Async JS (Event Loop)",
    date: "13/03/26", color: "#f59e0b",
    sections: [
      {
        heading: "classList API",
        content: `a. add(...String)          : void
   → if class already exists it IGNORES the classNames to be added.

b. contains(String)       : boolean
   → returns true if class exists on element, false otherwise.

c. remove(...String)      : void
   → removes the specified class(es) from the element.

d. toggle(String, ?boolean): boolean
   → toggle(String, true)  → apply className (force add)
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
console.log(text);                  // p#text
console.log(text.classList);        // DOMTokenList [value: '']
text.classList.add("box", "red");
console.log(text.classList.length); // 2

function changeColor() {
    console.log("***Function executed******");

    if (text.classList.contains("red")) {
        text.classList.remove("red");   // 2nd click → removes red
    } else {
        text.classList.add("red");      // 3rd click → adds red
    }
    console.log(text.classList);
}

// Console Output:
// p#text
// DOMTokenList [value: '']
// 2
// ***Function executed****** → 1st click
//   DOMTokenList ['box', value: 'box']
// ***Function executed****** → 2nd click
//   DOMTokenList(2) ['box', 'red', value: 'box red']
// ***Function executed****** → 3rd click
//   DOMTokenList ['box', value: 'box']`
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

// Output:
//   start
//   end
//   (after 3s) Processing...

Control Flow:
  1. Parsing
  2. Execution Phase
     a. Memory creation

  JS Engine                    Browser APIs           Callback Queue
  ─────────────                ──────────────         ──────────────
  line-1 → console.log        setTimeout(handler,
  line-2 [timer] ──────────→  time) → register
  line-3 → console.log          handler              handler (after 3s)
                                 3s time ↓
                                 2s
                                 1s
                                 0s → ──────────────→ [handler]
                                                           ↓
                                                       Event Loop
  Event Loop:
    1. check time is expired or not
    2. check call stack is empty or not
       if empty → load handler from callback queue to call stack
       otherwise → wait till callstack becomes empty
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
  class [Template]                   Event Driven Programming: Asynchronous coding

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

Example:
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
let handler = function(){
}
let timer = 3000;

// HOF [Higher Order Function]
//         ↓
setTimeout(handler, timer);
//                  ↓
//          call back function

// eg-2: addEventListener with named handler
let handler = function () {}
document.getElementById("btn")
    .addEventListener("click", handler);
//                              ↓
//                     call back function

// Anonymous Function version:
document.getElementById("btn")
    .addEventListener("click", function () { });
//                                  ↓
//                          Anonymous Function`
      },
      {
        heading: "HOF & Callback — Definitions",
        content: `HOF → A function which accepts another function as an argument
       is referred as 'Higher Order Function'.

Callback function → A function which gets called automatically by another
                    function upon some event is referred as 'call back fn'.`
      },
      {
        heading: "Usage of Functional Programming — Circle Calculations",
        content: `let radius = [3, 2, 1, 4];

// ── Without Functional Programming ─────────────────────────
const areaOfCircle = function (radius) {
    let output = [];
    for (let index = 0; index < radius.length; index++) {
        let result = (Math.PI * radius[index] * radius[index]).toFixed(2);
        output.push(result);
    }
    return output;
}
const diameterOfCircle = function (radius) {
    let output = [];
    for (let index = 0; index < radius.length; index++) {
        let result = (2 * radius[index]).toFixed(2);
        output.push(result);
    }
    return output;
}
const circumferenceOfCircle = function (radius) {
    let output = [];
    for (let index = 0; index < radius.length; index++) {
        let result = (2 * Math.PI * radius[index]).toFixed(2);
        output.push(result);
    }
    return output;
}
console.log(areaOfCircle(radius));
console.log(diameterOfCircle(radius));
console.log(circumferenceOfCircle(radius));

// ── With Functional Programming ─────────────────────────────
// Functions [Function: Business Logic, Function: Generic function]
const area = function (r) { return Math.PI * r * r; }
const diameter = function (r) { return 2 * r; }
const cirumfarence = function (r) { return 2 * Math.PI * r; }

// Generic Function (HOF)
const calcuate = function (radius, logic) {   // logic = callback
    let output = [];
    for (let index = 0; index < radius.length; index++) {
        let result = logic(radius[index]).toFixed(2); // call back fn
        output.push(result);
    }
    return output;
}
// HOF calls
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
const area = function (r) { return Math.PI * r * r; }
const diameter = function (r) { return 2 * r; }
const cirumfarence = function (r) { return 2 * Math.PI * r; }

// Using custom calcuate (Generic HOF):
console.log(calcuate(radius, area));
console.log(calcuate(radius, diameter));
console.log(calcuate(radius, cirumfarence));

// Using built-in Array.map() instead:
console.log(radius.map(area));
console.log(radius.map(diameter));
console.log(radius.map(cirumfarence));

// Output:
// (4) ['28.27', '12.57', '3.14', '50.27']   ← calcuate w/ toFixed(2)
// (4) ['6.00', '4.00', '2.00', '8.00']
// (4) ['18.85', '12.57', '6.28', '25.13']
// (4) [28.274333882308138, 12.566370614359172, ...]  ← map (no toFixed)
// (4) [6, 4, 2, 8]
// (4) [18.84955592153876, 12.566370614359172, ...]`
      },
      {
        heading: "Events — Definition",
        content: `Something which happens on a webpage is referred as an 'Event'.
Action performed on a webpage by the user or browser is referred as an 'Event'.

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
        content: `→ Event is a message sent by sender to its subscriber in order to notify change.
→ Event follows a software design pattern called "Observer".
→ Observer is a communication pattern.
→ Event uses a function pointer mechanism. [Delegate = function pointer]

Event Handling approaches:

1. Inline: <button onclick='handler'></button>
   ❌ Multiple handlers can't be integrated
   ❌ Mixing of presentation logic and BL at one place is not good

2. via onclick property:
   let btn = document.querySelector("button");
   let handler = function(){}
   let handler1 = function(){}
   btn.onClick = handler;
   btn.onClick = handler1;
   ✅ Separation of BL from Presentation logic
   ❌ Multiple handlers can't be assigned for one event.

3. addEventListener("event", handler)
   ✅ Multiple handlers for same event
   ✅ Separation of concerns`
      },
      {
        heading: "onclick (overwrite) vs addEventListener (multiple)",
        content: `// ① onclick — OVERWRITES previous handler
let btn = document.querySelector("button");
btn.onclick = function () {
    console.log("Sending msg to registered mobile number");
}
btn.onclick = function () {
    console.log("Take your card and collect your cash");
}
// Output on click: "Take your card and collect your cash"
// (only last assignment wins)

// ② addEventListener — MULTIPLE handlers
let btn = document.querySelector("button");
btn.addEventListener("click", function () {
    console.log("Sending msg to registered mobile number");
});
btn.addEventListener("click", function () {
    console.log("Sending msg to registered email address");
});
btn.addEventListener("click", function () {
    console.log("Take your card and collect your cash");
});
// Output on click:
//   Sending msg to registered mobile number
//   Sending msg to registered email address
//   Take your card and collect your cash`
      },
      {
        heading: "Arguments used in Handler: this & e",
        content: `a. this  : default object available in handler
            → gives info about the element on which event occurred.

b. e     : event object — must be explicitly passed
            → used inside handler to know more about events occurred on element.
            event
              ↓ target
                  ↓ textContent, innerHTML, type, innerText, ....

// ③ Accessing 'this' and event properties:
let btn = document.querySelector("button");
btn.addEventListener("click", function () {
    console.log("Sending msg to registered mobile number");
    console.log(this);          // <button name="submit" id="btnClick" class="btn btn-primary">Click me</button>
    console.log(this);          // same as above
    console.log(this.name);     // submit
    console.log(this.id);       // btnClick
    console.log(this.className);// btn btn-primary
    console.log(this == window);// false
    console.log(this == btn);   // true
    console.log(this.innerHTML);
    console.log(this.outerHTML);
    console.log(this.textContent);
    console.log(this.innerText);
});

// ④ Accessing 'e' (event object):
btn.addEventListener("click", function (e) {
    console.log("Sending msg to registered mobile number");
    console.log(e);             // PointerEvent {isTrusted: true, pointerId: 2, ...}
    console.log(e.target);      // <button name="submit" id="btnClick" ...>Click me</button>
});`
      },
      {
        heading: "removeEventListener()",
        content: `removeEventListener() → It is used to nullify the handling effect upon an event on the element.

// ① removeEventListener with named handler reference (WORKS)
let btn1 = document.getElementById("btn1");
let btn2 = document.getElementById("btn2");

let handler = function () {
    console.log("I am listening to the event");
}
btn1.addEventListener("click", handler);

btn2.addEventListener("click", function () {
    btn1.removeEventListener("click", handler);
});
// 1. Click Button 1 → Message is printed
// 2. Click Button 2 → Event listener is removed
// 3. Click Button 1 again → No output

// ② Self-removing listener:
let handler = function () {
    console.log("I am listening to the event");
    btn1.removeEventListener("click", handler);
}
btn1.addEventListener("click", handler);
// First click:  "I am listening to the event" + listener removed
// Second click: Nothing happens (listener is gone)

// ③ Key Insight — anonymous functions CANNOT be removed:
btn1.addEventListener("click", function () {
    console.log("Button 1 clicked");
});
btn1.removeEventListener("click", function () {   // ❌ FAILS silently
    console.log("Button 1 clicked");
});
// Even though both functions look identical, they are:
//   ❌ Different objects in memory
//   ❌ Different references
// So removeEventListener FAILS SILENTLY
// Output: "Button 1 clicked" printed EVERY TIME you click
// Because the listener was NEVER removed`
      }
    ]
  }
];

// ── DEMOS ────────────────────────────────────────────────────────────────────

const demos = {
  classlist: [
    {
      label: "1. add() — basic",
      code: `let text = document.getElementById("text");
console.log(text.classList);
text.classList.add("box", "red");
console.log(text.classList.length);
console.log(text.classList);`,
      output: ["DOMTokenList [value: '']", "2", "DOMTokenList(2) ['box', 'red', value: 'box red']"],
      note: "add() appends class(es). If class already exists, it is silently ignored (no error, no duplicate)."
    },
    {
      label: "2. add() — duplicate ignored",
      code: `text.classList.add("box");   // first time
text.classList.add("box");   // already exists → ignored
console.log(text.classList.length); // still 1
console.log(text.classList);`,
      output: ["1", "DOMTokenList ['box', value: 'box']"],
      note: "✅ add() is idempotent — adding an existing class does nothing. No duplication in DOMTokenList."
    },
    {
      label: "3. contains()",
      code: `text.classList.add("box", "red");
console.log(text.classList.contains("red"));   // true
console.log(text.classList.contains("blue"));  // false`,
      output: ["true", "false"],
      note: "contains() returns boolean. Case-sensitive. Use before conditional add/remove."
    },
    {
      label: "4. remove()",
      code: `text.classList.add("box", "red", "border");
console.log(text.classList.length); // 3
text.classList.remove("red");
console.log(text.classList);
text.classList.remove("nonexistent"); // no error`,
      output: ["3", "DOMTokenList(2) ['box', 'border', value: 'box border']"],
      note: "remove() silently ignores classes that don't exist. No error thrown."
    },
    {
      label: "5. toggle() — no force flag",
      code: `text.classList.add("box");
// toggle without force flag
console.log(text.classList.toggle("red"));  // adds → true
console.log(text.classList);
console.log(text.classList.toggle("red"));  // removes → false
console.log(text.classList);`,
      output: ["true", "DOMTokenList(2) ['box', 'red', value: 'box red']", "false", "DOMTokenList ['box', value: 'box']"],
      note: "toggle() = add if absent, remove if present. Returns true when added, false when removed."
    },
    {
      label: "6. toggle(str, true) — force add",
      code: `text.classList.add("box", "red");
// force true → always ADD (even if already there)
console.log(text.classList.toggle("red", true));   // true
console.log(text.classList.toggle("blue", true));  // true
console.log(text.classList);`,
      output: ["true", "true", "DOMTokenList(3) ['box', 'red', 'blue', value: 'box red blue']"],
      note: "toggle(class, true) forces addition. toggle(class, false) forces removal. Returns the force value."
    },
    {
      label: "7. changeColor() — conditional toggle pattern",
      code: `text.classList.add("box", "red");

function changeColor() {
    console.log("***Function executed******");
    if (text.classList.contains("red")) {
        text.classList.remove("red");
    } else {
        text.classList.add("red");
    }
    console.log(text.classList);
}
// 1st click:
changeColor();
// 2nd click:
changeColor();`,
      output: ["***Function executed******", "DOMTokenList ['box', value: 'box']", "***Function executed******", "DOMTokenList(2) ['box', 'red', value: 'box red']"],
      note: "Classic contains→remove/add pattern for toggling styles. Same as classList.toggle('red')."
    }
  ],
  eventloop: [
    {
      label: "1. setTimeout basic (async)",
      code: `console.log("start");
setTimeout(function () {
    console.log("Processing...");
}, 3000);
console.log("end");`,
      output: ["start", "end", "(after 3000ms) Processing..."],
      note: "JS is single-threaded. setTimeout registers handler in Browser API. Event loop moves it to call stack after 3s only when call stack is empty."
    },
    {
      label: "2. setTimeout with 0ms delay",
      code: `console.log("start");
setTimeout(function () {
    console.log("I am async");
}, 0);
console.log("end");`,
      output: ["start", "end", "I am async"],
      note: "Even 0ms delay is async! Handler goes to callback queue → event loop waits for call stack to empty before executing."
    },
    {
      label: "3. Multiple setTimeouts — order",
      code: `console.log("A");
setTimeout(() => console.log("B - 2s"), 2000);
setTimeout(() => console.log("C - 1s"), 1000);
setTimeout(() => console.log("D - 0s"), 0);
console.log("E");`,
      output: ["A", "E", "D - 0s", "C - 1s", "B - 2s"],
      note: "All sync code runs first (A, E). Then callbacks fire in timer order: 0s → 1s → 2s."
    },
    {
      label: "4. Event Loop flow visualization",
      code: `// Phase 1: Parsing → syntax check
// Phase 2: Execution

// Call Stack (sync): line-1 → line-3
// Browser API: setTimeout → register handler
//   Timer countdown: 3s→2s→1s→0s → push to Callback Queue

// Event Loop checks:
//   1. Is timer expired? ✅
//   2. Is call stack empty? ✅
//   3. Move handler from Callback Queue → Call Stack
//   4. Execute handler

console.log("start");    // line-1 → call stack
setTimeout(fn, 3000);    // line-2 → Browser API (async)
console.log("end");      // line-3 → call stack`,
      output: ["start", "end", "(3000ms later) fn() runs"],
      note: "Event Loop = the mechanism that coordinates call stack + callback queue. JS itself is sync; async is handled by Browser APIs."
    }
  ],
  hof: [
    {
      label: "1. Function Expression basics",
      code: `var add = function (a, b) {
    return a + b;
}
console.log(add(2, 3));
console.log(typeof add);
console.log(add.name);`,
      output: ["5", "function", "add"],
      note: "Function Expression stores a function in a variable. typeof returns 'function'. .name gives the variable name."
    },
    {
      label: "2. HOF — setTimeout",
      code: `let handler = function(){
    console.log("Timer fired!");
}
let timer = 3000;

// HOF: setTimeout accepts function as argument
setTimeout(handler, timer);
//         ↑ HOF    ↑ callback`,
      output: ["(after 3000ms) Timer fired!"],
      note: "setTimeout is a HOF — it accepts handler (callback) as first arg. handler is invoked automatically after timer."
    },
    {
      label: "3. HOF — addEventListener",
      code: `let btn = document.getElementById("btn");
let handler = function () {
    console.log("Button clicked!");
}
// addEventListener = HOF
btn.addEventListener("click", handler);
// handler = callback`,
      output: ["(on click) Button clicked!"],
      note: "addEventListener is a HOF. It stores the callback (handler) and invokes it automatically on event."
    },
    {
      label: "4. Functional Programming — circle areas",
      code: `let radius = [3, 2, 1, 4];
const area = function (r) { return Math.PI * r * r; }
const diameter = function (r) { return 2 * r; }

// Generic HOF
const calcuate = function (radius, logic) {
    let output = [];
    for (let i = 0; i < radius.length; i++) {
        output.push(logic(radius[i]).toFixed(2));
    }
    return output;
}
console.log(calcuate(radius, area));
console.log(calcuate(radius, diameter));`,
      output: ["['28.27', '12.57', '3.14', '50.27']", "['6.00', '4.00', '2.00', '8.00']"],
      note: "Generic HOF: pass business logic as callback. Avoids code duplication. calcuate() is reusable for ANY formula."
    },
    {
      label: "5. map() vs custom calcuate()",
      code: `let radius = [3, 2, 1, 4];
const area = r => Math.PI * r * r;
const diameter = r => 2 * r;

// Custom HOF (with toFixed)
console.log(calcuate(radius, area));
// ['28.27', '12.57', '3.14', '50.27']

// Built-in Array.map() (no toFixed)
console.log(radius.map(area));
// [28.274..., 12.566..., 3.141..., 50.265...]

console.log(radius.map(diameter));
// [6, 4, 2, 8]`,
      output: ["['28.27', '12.57', '3.14', '50.27']", "[28.274333882308138, 12.566370614359172, 3.141592653589793, 50.26548245743669]", "[6, 4, 2, 8]"],
      note: "Array.map() is JS's built-in HOF equivalent to calcuate(). Main diff: no .toFixed(2) → returns raw numbers."
    }
  ],
  events: [
    {
      label: "1. onclick — overwrite",
      code: `let btn = document.querySelector("button");
btn.onclick = function () {
    console.log("Sending msg to registered mobile number");
}
btn.onclick = function () {
    console.log("Take your card and collect your cash");
}
// click btn`,
      output: ["Take your card and collect your cash"],
      note: "onclick is a property — assigning twice OVERWRITES. Only the last handler runs. DisAdv: can't have multiple handlers."
    },
    {
      label: "2. addEventListener — multiple handlers",
      code: `let btn = document.querySelector("button");
btn.addEventListener("click", function () {
    console.log("Sending msg to registered mobile number");
});
btn.addEventListener("click", function () {
    console.log("Sending msg to registered email address");
});
btn.addEventListener("click", function () {
    console.log("Take your card and collect your cash");
});
// click btn`,
      output: ["Sending msg to registered mobile number", "Sending msg to registered email address", "Take your card and collect your cash"],
      note: "addEventListener allows MULTIPLE handlers for same event. All fire in order of registration."
    },
    {
      label: "3. this inside handler",
      code: `let btn = document.querySelector("button");
// <button name="submit" id="btnClick" class="btn btn-primary">
btn.addEventListener("click", function () {
    console.log(this.name);
    console.log(this.id);
    console.log(this.className);
    console.log(this == window);
    console.log(this == btn);
    console.log(this.innerText);
});`,
      output: ["submit", "btnClick", "btn btn-primary", "false", "true", "Click me"],
      note: "'this' inside handler = the element the event is on. this == btn → true. this == window → false."
    },
    {
      label: "4. event object (e)",
      code: `let btn = document.querySelector("button");
btn.addEventListener("click", function (e) {
    console.log("Sending msg to registered mobile number");
    console.log(e);
    console.log(e.target);
});`,
      output: ["Sending msg to registered mobile number", "PointerEvent {isTrusted: true, pointerId: 2, width: 1, height: 1, pressure: 0, ...}", "<button name='submit' id='btnClick' class='btn btn-primary'>Click me</button>"],
      note: "'e' must be explicitly declared as param. e = PointerEvent object. e.target = element that fired the event."
    },
    {
      label: "5. removeEventListener — named handler",
      code: `let btn1 = document.getElementById("btn1");
let btn2 = document.getElementById("btn2");

let handler = function () {
    console.log("I am listening to the event");
}
btn1.addEventListener("click", handler);
btn2.addEventListener("click", function () {
    btn1.removeEventListener("click", handler);
});
// Click btn1 → prints message
// Click btn2 → removes listener
// Click btn1 again → nothing`,
      output: ["(btn1 click) I am listening to the event", "(btn2 click) listener removed", "(btn1 click) [nothing]"],
      note: "removeEventListener works ONLY with same function reference. Named handler → works ✅."
    },
    {
      label: "6. removeEventListener — self-removing",
      code: `let btn1 = document.getElementById("btn1");
let handler = function () {
    console.log("I am listening to the event");
    btn1.removeEventListener("click", handler);
}
btn1.addEventListener("click", handler);
// First click → logs + removes
// Second click → nothing`,
      output: ["(1st click) I am listening to the event", "(2nd click) [nothing]"],
      note: "Handler removes itself on first call — fires ONCE. Useful for one-time actions."
    },
    {
      label: "7. removeEventListener FAILS with anonymous fn",
      code: `let btn1 = document.getElementById("btn1");
btn1.addEventListener("click", function () {
    console.log("Button 1 clicked");
});
btn1.removeEventListener("click", function () {
    console.log("Button 1 clicked");
}); // ❌ FAILS silently — different references!
// Every click still logs "Button 1 clicked"`,
      output: ["Button 1 clicked", "Button 1 clicked", "Button 1 clicked (every click...)"],
      note: "❌ Anonymous functions are DIFFERENT objects in memory even if code looks identical. removeEventListener fails silently — listener never removed."
    }
  ]
};

// ── QUIZ ─────────────────────────────────────────────────────────────────────

const quiz = [
  { q: "What does classList.add() do if the class already exists?", opts: ["Throws an error","Adds a duplicate class","Silently ignores it","Replaces the existing class"], ans: 2 },
  { q: "What does classList.toggle('red') do if 'red' is already present?", opts: ["Adds another 'red'","Removes 'red' and returns false","Adds 'red' and returns true","Throws TypeError"], ans: 1 },
  { q: "What is the return type of classList.contains()?", opts: ["void","String","Number","boolean"], ans: 3 },
  { q: "console.log('start'); setTimeout(fn, 0); console.log('end'); — Output order?", opts: ["start → fn → end","fn → start → end","start → end → fn","end → start → fn"], ans: 2 },
  { q: "The Event Loop checks the callback queue only when...", opts: ["The timer expires","The call stack is empty","The browser is idle","A new event fires"], ans: 1 },
  { q: "HOF = Higher Order Function means?", opts: ["A function with no return","A function declared at top of file","A function that accepts another function as argument","A function inside a class"], ans: 2 },
  { q: "What is the key difference between Array.map() and custom calcuate()?", opts: ["map() is faster","map() returns strings","calcuate() uses toFixed(); map() returns raw numbers","map() only works with numbers"], ans: 2 },
  { q: "btn.onclick = handler1; btn.onclick = handler2; — clicking btn fires?", opts: ["Both handler1 and handler2","handler1 only","handler2 only","Neither"], ans: 2 },
  { q: "Why does removeEventListener fail with anonymous functions?", opts: ["JS disallows removing anonymous functions","They are different objects/references in memory","Anonymous functions are not callable","Browser API restriction"], ans: 1 },
  { q: "What does 'e' in addEventListener('click', function(e){}) refer to?", opts: ["The element","An error object","The event object (e.g. PointerEvent)","The window object"], ans: 2 },
];

// ── MAIN COMPONENT ────────────────────────────────────────────────────────────

export default function JSNotes({ onBack }) {
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

  const runDemo = () => {
    setAnimating(true);
    setShowOutput(false);
    setTimeout(() => { setShowOutput(true); setAnimating(false); }, 600);
  };

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

  const topicBtns = [
    { id: "classlist", label: "🏷 classList", color: "#f59e0b" },
    { id: "eventloop", label: "⏱ Event Loop", color: "#8b5cf6" },
    { id: "hof", label: "🔼 HOF & Callbacks", color: "#06b6d4" },
    { id: "events", label: "🖱 Browser Events", color: "#10b981" },
  ];

  return (
    <div style={{ fontFamily: "monospace", background: "#060d1a", minHeight: "100vh", color: "#e2e8f0" }}>
      {/* Header */}
      <div style={{ background: "linear-gradient(135deg,#0a1628,#0f2040)", borderBottom: "2px solid #10b981", padding: "16px 24px", display: "flex", alignItems: "center", gap: 12 }}>
        <div style={{ background: "linear-gradient(135deg,#10b981,#06b6d4)", borderRadius: "50%", width: 42, height: 42, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20 }}>🎯</div>
        <div>
          <h1 style={{ margin: 0, fontSize: 19, color: "#fff" }}>JavaScript — Lec 14 to 16</h1>
          <p style={{ margin: 0, color: "#10b981", fontSize: 11 }}>classList · Async JS · HOF · Callbacks · Browser Events · removeEventListener</p>
        </div>
      </div>

      {/* Nav */}
      <div style={{ background: "#0b1120", borderBottom: "1px solid #1f2937", display: "flex" }}>
        {[{ id: "notes", label: "📖 Notes" }, { id: "demo", label: "▶ Live Demo" }, { id: "quiz", label: "🧠 Quiz" }].map(n => (
          <button key={n.id} onClick={() => setTab(n.id)} style={{
            padding: "11px 22px", background: "none", border: "none", cursor: "pointer",
            fontSize: 13, fontWeight: 700, fontFamily: "monospace",
            color: tab === n.id ? "#10b981" : "#475569",
            borderBottom: tab === n.id ? "3px solid #10b981" : "3px solid transparent",
          }}>{n.label}</button>
        ))}
      </div>

      <div style={{ display: "flex", width: "100%" }}>

        {/* ── NOTES ── */}
        {tab === "notes" && (
          <>
            <div style={{ width: 150, minHeight: "80vh", background: "#0b1120", borderRight: "1px solid #1f2937", padding: "14px 0", flexShrink: 0 }}>
              {lectures.map((l, i) => (
                <button key={l.id} onClick={() => setActiveLec(i)} style={{
                  display: "block", width: "100%", textAlign: "left", padding: "10px 14px",
                  background: activeLec === i ? l.color + "22" : "none",
                  border: "none", borderLeft: activeLec === i ? `3px solid ${l.color}` : "3px solid transparent",
                  cursor: "pointer", color: activeLec === i ? l.color : "#64748b", fontSize: 12, fontFamily: "monospace",
                }}>
                  <div style={{ fontWeight: 700 }}>{l.label}</div>
                  <div style={{ fontSize: 10, opacity: 0.8 }}>{l.date}</div>
                </button>
              ))}
            </div>
            <div style={{ flex: 1, padding: 28, overflowY: "auto" }}>
              <div style={{ borderBottom: `2px solid ${lec.color}`, paddingBottom: 12, marginBottom: 20 }}>
                <span style={{ background: lec.color + "22", border: `1px solid ${lec.color}`, borderRadius: 6, padding: "3px 10px", color: lec.color, fontSize: 12, fontWeight: 700 }}>{lec.label}</span>
                <h2 style={{ margin: "10px 0 0", color: "#fff", fontSize: 18 }}>{lec.title}</h2>
              </div>
              {lec.sections.map((s, i) => (
                <div key={i} style={{ background: "#0b1120", border: "1px solid #1f2937", borderLeft: `4px solid ${lec.color}`, borderRadius: 10, padding: 20, marginBottom: 14 }}>
                  <h4 style={{ color: lec.color, margin: "0 0 10px", fontSize: 14 }}>{s.heading}</h4>
                  <pre style={{ fontSize: 12.5, margin: 0, whiteSpace: "pre-wrap", lineHeight: 1.9, fontFamily: "monospace" }}>
                    {s.content.split("\n").map((line, li) => {
                      // comments
                      if (line.trim().startsWith("//")) return <span key={li} style={{ color: "#6ee7b7", display: "block" }}>{line}</span>;
                      // code lines (contain = or ( or { or })
                      if (/[=({};]/.test(line) && !/^[A-Z→✅❌⚠️#]/.test(line.trim())) return <span key={li} style={{ color: "#fde68a", display: "block" }}>{line}</span>;
                      // headings/labels (→ arrows, lettered items a. b. c.)
                      if (/^[a-d]\./.test(line.trim()) || line.trim().startsWith("→")) return <span key={li} style={{ color: "#c4b5fd", display: "block" }}>{line}</span>;
                      // output lines
                      if (line.includes("Output") || line.includes("// Output")) return <span key={li} style={{ color: "#86efac", display: "block" }}>{line}</span>;
                      // error / bad practice
                      if (line.includes("❌") || line.includes("DisAdv")) return <span key={li} style={{ color: "#fca5a5", display: "block" }}>{line}</span>;
                      // good/advantage
                      if (line.includes("✅") || line.includes("Adv")) return <span key={li} style={{ color: "#6ee7b7", display: "block" }}>{line}</span>;
                      // section separators / headers (all caps or ── lines)
                      if (/^[─=]+/.test(line.trim()) || /^[A-Z ]{4,}$/.test(line.trim())) return <span key={li} style={{ color: "#94a3b8", display: "block" }}>{line}</span>;
                      // default prose
                      return <span key={li} style={{ color: "#e2e8f0", display: "block" }}>{line}</span>;
                    })}
                  </pre>
                </div>
              ))}
            </div>
          </>
        )}

        {/* ── DEMO ── */}
        {tab === "demo" && (
          <div style={{ flex: 1, padding: 28 }}>
            <h2 style={{ color: "#10b981", marginTop: 0 }}>▶ Live Output Simulator</h2>
            <p style={{ color: "#475569", fontSize: 13, marginBottom: 18 }}>Select topic and snippet, then click Run.</p>

            <div style={{ display: "flex", gap: 8, marginBottom: 18, flexWrap: "wrap" }}>
              {topicBtns.map(t => (
                <button key={t.id} onClick={() => { setDemoTopic(t.id); setDemoIdx(0); setShowOutput(false); }} style={{
                  padding: "8px 16px", borderRadius: 8, border: `2px solid ${demoTopic === t.id ? t.color : "#1f2937"}`,
                  background: demoTopic === t.id ? t.color + "22" : "#0b1120",
                  color: demoTopic === t.id ? t.color : "#64748b",
                  cursor: "pointer", fontWeight: 700, fontSize: 12, fontFamily: "monospace",
                }}>{t.label}</button>
              ))}
            </div>

            <div style={{ display: "flex", gap: 6, marginBottom: 18, flexWrap: "wrap" }}>
              {demoList.map((d, i) => (
                <button key={i} onClick={() => { setDemoIdx(i); setShowOutput(false); }} style={{
                  padding: "6px 11px", borderRadius: 6, border: `1px solid ${demoIdx === i ? "#10b981" : "#1f2937"}`,
                  background: demoIdx === i ? "#10b98122" : "#0b1120",
                  color: demoIdx === i ? "#10b981" : "#64748b",
                  cursor: "pointer", fontSize: 11, fontFamily: "monospace",
                }}>{i + 1}. {d.label}</button>
              ))}
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
              <div style={{ background: "#060d1a", border: "1px solid #1f2937", borderRadius: 12, overflow: "hidden" }}>
                <div style={{ background: "#1f2937", padding: "8px 14px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <span style={{ color: "#64748b", fontSize: 12 }}>📄 {demo.label}</span>
                  <button onClick={runDemo} style={{ background: "#10b981", border: "none", borderRadius: 6, padding: "5px 14px", color: "#060d1a", fontWeight: 700, cursor: "pointer", fontSize: 12, fontFamily: "monospace" }}>▶ Run</button>
                </div>
                <pre style={{ color: "#a3e635", fontSize: 12.5, margin: 0, padding: "16px", lineHeight: 1.7, whiteSpace: "pre-wrap" }}>{demo.code}</pre>
              </div>

              <div style={{ background: "#060d1a", border: "1px solid #1f2937", borderRadius: 12, overflow: "hidden" }}>
                <div style={{ background: "#1f2937", padding: "8px 14px" }}>
                  <span style={{ color: "#64748b", fontSize: 12 }}>💻 Console Output</span>
                </div>
                <div style={{ padding: 16, minHeight: 120 }}>
                  {animating && <div style={{ color: "#475569", fontSize: 13 }}>Running...</div>}
                  {showOutput && !animating && demo.output.map((line, i) => (
                    <div key={i} style={{
                      fontFamily: "monospace", fontSize: 12.5, padding: "4px 0",
                      color: line.startsWith("❌") ? "#f87171" : line.startsWith("⚠️") ? "#fbbf24" : line.startsWith("(") ? "#94a3b8" : "#a3e635",
                      borderBottom: i < demo.output.length - 1 ? "1px solid #1f293720" : "none",
                    }}>{line}</div>
                  ))}
                  {!showOutput && !animating && <div style={{ color: "#374151", fontSize: 12 }}>Click ▶ Run to see output</div>}
                </div>
                {showOutput && (
                  <div style={{ background: "#0a1f14", borderTop: "1px solid #065f46", padding: "10px 16px" }}>
                    <p style={{ color: "#6ee7b7", fontSize: 12, margin: 0 }}>💡 {demo.note}</p>
                  </div>
                )}
              </div>
            </div>

            {/* Event Loop Visualizer */}
            {showOutput && demoTopic === "eventloop" && (
              <div style={{ marginTop: 20, background: "#0b1120", border: "1px solid #1f2937", borderRadius: 12, padding: 20 }}>
                <h4 style={{ color: "#8b5cf6", margin: "0 0 14px" }}>⚙️ Event Loop Architecture</h4>
                <div style={{ display: "flex", gap: 10, alignItems: "flex-start", flexWrap: "wrap" }}>
                  {[
                    { name: "Call Stack", color: "#06b6d4", items: ["console.log('start')", "console.log('end')", "(empty — waiting)"] },
                    { name: "Browser APIs", color: "#f59e0b", items: ["setTimeout(fn, Xms)", "Timer: 3s→2s→1s→0s", "Registers handler"] },
                    { name: "Callback Queue", color: "#8b5cf6", items: ["[handler pushed here]", "(after timer expires)"] },
                    { name: "Event Loop", color: "#10b981", items: ["1. Timer expired?", "2. Call stack empty?", "3. Move to call stack"] },
                  ].map((box, i) => (
                    <div key={i} style={{ flex: 1, minWidth: 140, background: "#060d1a", border: `2px solid ${box.color}30`, borderTop: `3px solid ${box.color}`, borderRadius: 10, padding: 12 }}>
                      <div style={{ color: box.color, fontWeight: 700, fontSize: 12, marginBottom: 8 }}>{box.name}</div>
                      {box.items.map((it, j) => <div key={j} style={{ color: "#94a3b8", fontSize: 11, marginBottom: 4 }}>→ {it}</div>)}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* removeEventListener reference diagram */}
            {showOutput && demoTopic === "events" && demoIdx >= 4 && (
              <div style={{ marginTop: 20, background: "#0b1120", border: "1px solid #1f2937", borderRadius: 12, padding: 20 }}>
                <h4 style={{ color: "#10b981", margin: "0 0 14px" }}>🔑 removeEventListener — Reference Rule</h4>
                <div style={{ display: "flex", gap: 12 }}>
                  <div style={{ flex: 1, background: "#064e3b", border: "2px solid #10b981", borderRadius: 10, padding: 14 }}>
                    <div style={{ color: "#10b981", fontWeight: 700, marginBottom: 8 }}>✅ WORKS — Named Reference</div>
                    <pre style={{ color: "#6ee7b7", fontSize: 11, margin: 0 }}>{`let handler = function(){...}
btn.addEventListener("click", handler);
btn.removeEventListener("click", handler);
// Same reference → removed ✅`}</pre>
                  </div>
                  <div style={{ flex: 1, background: "#450a0a", border: "2px solid #ef4444", borderRadius: 10, padding: 14 }}>
                    <div style={{ color: "#f87171", fontWeight: 700, marginBottom: 8 }}>❌ FAILS — Anonymous Function</div>
                    <pre style={{ color: "#fca5a5", fontSize: 11, margin: 0 }}>{`btn.addEventListener("click", function(){...});
btn.removeEventListener("click", function(){...});
// Different objects in memory → fails silently ❌`}</pre>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* ── QUIZ ── */}
        {tab === "quiz" && (
          <div style={{ flex: 1, padding: 28 }}>
            <h2 style={{ color: "#10b981", marginTop: 0 }}>🧠 Knowledge Check — Lec 14–16</h2>
            {!quizDone ? (
              <div>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 10 }}>
                  <span style={{ color: "#475569", fontSize: 13 }}>Q {quizQ + 1} / {quiz.length}</span>
                  <span style={{ color: "#34d399", fontWeight: 700 }}>Score: {quizScore}/{quiz.length}</span>
                </div>
                <div style={{ width: "100%", height: 4, background: "#1f2937", borderRadius: 4, marginBottom: 24 }}>
                  <div style={{ width: `${(quizQ / quiz.length) * 100}%`, height: "100%", background: "#10b981", borderRadius: 4, transition: "width 0.3s" }} />
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
                        <button key={i} onClick={() => handleQuiz(i)} style={{
                          background: bg, border: `2px solid ${border}`, borderRadius: 10, padding: "11px 16px",
                          color, textAlign: "left", cursor: quizSel === null ? "pointer" : "default",
                          fontSize: 13, fontFamily: "monospace",
                        }}>
                          <span style={{ fontWeight: 700, marginRight: 8 }}>{["A","B","C","D"][i]}.</span>
                          {opt}
                          {quizSel !== null && i === quiz[quizQ].ans && " ✅"}
                          {quizSel === i && i !== quiz[quizQ].ans && " ❌"}
                        </button>
                      );
                    })}
                  </div>
                </div>
                {quizSel !== null && (
                  <div style={{ display: "flex", justifyContent: "flex-end" }}>
                    <button onClick={nextQ} style={{ background: "#10b981", border: "none", borderRadius: 10, padding: "11px 26px", color: "#060d1a", fontWeight: 700, cursor: "pointer", fontSize: 14, fontFamily: "monospace" }}>
                      {quizQ + 1 >= quiz.length ? "Results →" : "Next →"}
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div style={{ textAlign: "center", background: "#0b1120", border: "1px solid #1f2937", borderRadius: 20, padding: 48 }}>
                <div style={{ fontSize: 60, marginBottom: 14 }}>{quizScore >= 9 ? "🏆" : quizScore >= 7 ? "🎯" : "📚"}</div>
                <h3 style={{ color: "#10b981", fontSize: 28 }}>{quizScore}/{quiz.length}</h3>
                <p style={{ color: "#94a3b8", marginBottom: 24 }}>
                  {quizScore === 10 ? "Perfect! classList, HOF & Events mastered! 🌟" : quizScore >= 7 ? "Great work! Revisit Event Loop and removeEventListener." : "Head back to Notes and Live Demo to review!"}
                </p>
                <button onClick={resetQuiz} style={{ background: "#10b981", border: "none", borderRadius: 10, padding: "12px 28px", color: "#060d1a", fontWeight: 700, cursor: "pointer", fontSize: 15, fontFamily: "monospace" }}>
                  Retry 🔄
                </button>
              </div>
            )}
          </div>
        )}
      </div>

      <div style={{ background: "#0b1120", borderTop: "1px solid #1f2937", padding: "12px 24px", textAlign: "center" }}>
        <p style={{ color: "#1f2937", fontSize: 11, margin: 0 }}>JavaScript Lec 14–16 · PW Institute of Innovation · BEN01SOTUGBTC25B01</p>
      </div>
    </div>
  );
}