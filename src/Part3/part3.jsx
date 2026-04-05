import { useState } from "react";

// ── COLOR HELPER ─────────────────────────────────────────────────────────────
function ColoredPre({ content }) {
  return (
    <pre style={{ fontSize: 12.5, margin: 0, whiteSpace: "pre-wrap", lineHeight: 1.9, fontFamily: "monospace" }}>
      {content.split("\n").map((line, i) => {
        const t = line.trim();
        if (t.startsWith("//")) return <span key={i} style={{ color: "#6ee7b7", display: "block" }}>{line}</span>;
        if (t.startsWith("/*") || t.endsWith("*/")) return <span key={i} style={{ color: "#6ee7b7", display: "block" }}>{line}</span>;
        if (/[=({};`]/.test(line) && !/^[A-Z→✅❌⚠️#\d]/.test(t)) return <span key={i} style={{ color: "#fde68a", display: "block" }}>{line}</span>;
        if (/^[a-e]\./.test(t) || t.startsWith("→")) return <span key={i} style={{ color: "#c4b5fd", display: "block" }}>{line}</span>;
        if (t.includes("Output") || t.startsWith("// Output")) return <span key={i} style={{ color: "#86efac", display: "block" }}>{line}</span>;
        if (t.includes("❌") || t.includes("DisAdv")) return <span key={i} style={{ color: "#fca5a5", display: "block" }}>{line}</span>;
        if (t.includes("✅") || t.includes("Adv")) return <span key={i} style={{ color: "#6ee7b7", display: "block" }}>{line}</span>;
        if (/^[─=]+/.test(t) || /^[A-Z ]{4,}$/.test(t)) return <span key={i} style={{ color: "#94a3b8", display: "block" }}>{line}</span>;
        return <span key={i} style={{ color: "#e2e8f0", display: "block" }}>{line}</span>;
      })}
    </pre>
  );
}

// ── DATA ─────────────────────────────────────────────────────────────────────
const lectures = [
  {
    id: "lec19", label: "Lec 19", title: "Event Delegation — Practical Examples",
    date: "30/03/26", color: "#f59e0b",
    sections: [
      {
        heading: "① Without Event Delegation — Individual Handlers",
        content: `// HTML:
// <p>HELLO WORLD</p>
// <button id="red">RED</button>
// <button id="green">GREEN</button>
// <button id="blue">BLUE</button>

document.getElementById("red").addEventListener("click", function (e) {
    console.log(e.target.textContent);    // RED
    let p = document.querySelector("p");
    console.log(p);
    p.style.color = e.target.textContent; // sets p color to "red"
});
document.getElementById("green").addEventListener("click", function (e) {
    console.log(e.target.textContent);
    let p = document.querySelector("p");
    console.log(p);
    p.style.color = e.target.textContent;
});
document.getElementById("blue").addEventListener("click", function (e) {
    console.log(e.target.textContent);
    let p = document.querySelector("p");
    console.log(p);
    p.style.color = e.target.textContent;
});

// ❌ Bad: 3 separate handlers for 3 buttons — not scalable.`
      },
      {
        heading: "② Using Event Delegation — Single Handler on Parent",
        content: `// HTML:
// <p>HELLO WORLD</p>
// <div id="btnContainer">
//     <button>RED</button>
//     <button>GREEN</button>
//     <button>BLUE</button>
// </div>

document.getElementById("btnContainer").addEventListener("click", function (e) {
    console.log(e.target.tagName);   // "BUTTON" or "DIV"

    if (e.target.tagName === "BUTTON") {
        console.log(e.target.textContent); // RED / GREEN / BLUE
        document.querySelector("p").style.color = e.target.textContent;
    }
});

// ✅ One handler on parent div catches all button clicks via bubbling.
// tagName check ensures we only act when a BUTTON is clicked, not the div itself.
// Console output sequence for RED → GREEN → BLUE clicks:
//   BUTTON → RED → BUTTON → GREEN → BUTTON → BLUE`
      },
      {
        heading: "③ Image Click Detection using PointerEvent (clientX / clientY)",
        content: `// HTML:
// <img src="./public/images/spiderman.png" alt="">
// <div></div>

document.querySelector("img").addEventListener("click", function (e) {
    console.log(e.clientX, e.clientY);  // e.g. 79 89

    let xRange = e.clientX >= 56 && e.clientX <= 101;
    let yRange = e.clientY >= 66 && e.clientY <= 138;
    let condition = xRange && yRange;

    if (condition) {
        document.querySelector("div").innerHTML = "<p>HEAD</p>";
    } else {
        document.querySelector("div").innerHTML = "<p>NOT HEAD</p>";
    }
});

// clientX / clientY → position in button where user clicked
// If click falls within [56–101, 66–138] → HEAD region detected
// Otherwise → NOT HEAD`
      }
    ]
  },
  {
    id: "lec20", label: "Lec 20", title: "getModifierState & Event State Events",
    date: "31/04/26", color: "#06b6d4",
    sections: [
      {
        heading: "Username Availability Check (keyup)",
        content: `// HTML:
// <fieldset>
//   <legend>Register User</legend>
//   <dl>
//     <dt>Username</dt>
//     <dd><input type="text" name="" id="userId"></dd>
//     <dd id="msg"></dd>
//   </dl>
// </fieldset>

document.querySelector("#userId")
    .addEventListener('keyup', function (e) {
        let msg = document.querySelector("#msg");
        let data = this.value;

        // check whether the entered data is available in database
        let input = 'sachin';

        if (data === input) {
            // username already exists, try other name
            msg.innerHTML = '<p style="color:red;">username taken, try another name</p>';
        } else {
            // username is available
            msg.innerHTML = '<p style="color:green;">username available</p>';
        }
    });

// Flow:
// User types → keyup event
//     ↓
//   get value
//     ↓
// compare with "sachin"
//   /         \\
// match      not match
//   ↓             ↓
// red msg     green msg`
      },
      {
        heading: "getModifierState — CapsLock Detection",
        content: `// Every keyboard event object has: event.getModifierState("CapsLock")

// Modifier keys:
//   a. CapsLock
//   b. Shift
//   c. Control
//   d. Alt
//   e. Numlock

// Note: e.getModifierState("CapsLock")
//   → true if CapsLock key is ON
//   → false otherwise

document.querySelector("#userPwd").addEventListener('keyup', function (e) {
    let msg = document.querySelector("#msg2");
    console.log(e.getModifierState("CapsLock"));

    if (e.getModifierState("CapsLock")) {
        msg.style.display = "block";   // show warning
    } else {
        msg.style.display = "none";    // hide warning
    }

    console.log(e.keyCode);
});

// Flow:
// User types → keyup event
//     ↓
// check CapsLock state
//   /         \\
//  ON         OFF
//   ↓           ↓
// show msg   hide msg`
      },
      {
        heading: "Event State Events — focus, change, blur",
        content: `a. focus  → user kept the cursor on the element
b. change → user started to type the data on the element (keyup, keydown)
c. blur   → user lost the focus from the element

let userName = document.querySelector("#userId");
let msg = document.querySelector("#msg");

// focus → show hint when user clicks into input
userName.addEventListener('focus', function (e) {
    msg.innerHTML = "<p style='color:goldenrod'>Name in block letters only</p>";
});

// blur → show required message when user leaves input
userName.addEventListener("blur", function (e) {
    msg.innerHTML = "<p style='color:red;'>Username is required</p>";
});

// keyup → convert typed text to UPPERCASE in real time
userName.addEventListener('keyup', function (e) {
    let data = this.value;
    this.value = data.toUpperCase();
});

// Behavior:
// Click input  → show hint (Name in block letters only)
// Type text    → convert to uppercase in real time
// Leave input  → show required message (Username is required)`
      }
    ]
  },
  {
    id: "lec21", label: "Lec 21", title: "Form Validation & onChange Event",
    date: "01/04/26", color: "#10b981",
    sections: [
      {
        heading: "① Username Character Count Validation (keyup)",
        content: `// Flow:
// User types → count characters
// count == 0  → Name Required
// count < 4   → Name too short
// count >= 4  → valid (clear message)

let userMsg = document.querySelector("#msg");
document.querySelector("#userId")
    .addEventListener('keyup', function (e) {
        let count = this.value.length;
        console.log(count);

        if (count === 0) {
            // Name required
            userMsg.innerHTML = '<p style="color:red">Name Required</p>';
        } else {
            if (count < 4) {
                // Name too short
                userMsg.innerHTML = '<p style="color:red">Name too short</p>';
            } else {
                // valid
                userMsg.innerHTML = '';
            }
        }
    });`
      },
      {
        heading: "② Textarea Remaining Character Counter (keyup + maxLength)",
        content: `// HTML: <textarea id="userComments" maxlength="20"></textarea>
//        <span id="msg"></span>

// Note: this.maxLength and maxLength look different because:
//   HTML uses lowercase attribute (maxlength)
//   JavaScript DOM uses camelCase property (maxLength)
//   But they refer to the SAME thing.

let outputMsg = document.querySelector("#msg");
document.querySelector("#userComments")
    .addEventListener("keyup", function (e) {
        let userInput = e.target.value;

        let maxLimit = this.maxLength;               // 20
        let remainingChars = maxLimit - userInput.length;

        outputMsg.textContent = \`\${remainingChars}  no of chars left\`;
    });

// Flow:
// User types → get typed length → get maxLength → Subtract
//   → Show remaining characters
// When 0 chars left → "typing is not permitted" (via HTML maxlength attribute)`
      },
      {
        heading: "③ onChange Event — Dark/Light Theme Toggle (checkbox)",
        content: `// [onchange] event fires when checkbox is toggled

// HTML: <input type="checkbox" id="themeCheckbox">
//        Dark Theme

let frmLogin = document.getElementById("frmLogin");
let themeText = document.querySelector("#themeText");
let btnLogin = document.querySelector("#btnLogin");

//form: class = w-25 border border-3 rounded p-4 bg-light text-dark
document.querySelector("#themeCheckbox")
    .addEventListener("change", function (e) {
        let flag = e.target.checked;  // true or false
        console.log(flag);

        if (flag) {
            // change to Dark Theme
            frmLogin.className = "w-25 border border-3 rounded p-4 bg-dark text-light";
            btnLogin.className = "btn btn-light w-100";
            themeText.textContent = 'Light Theme';
        } else {
            // change to Light Theme
            frmLogin.className = "w-25 border border-3 rounded p-4 bg-light text-dark";
            btnLogin.className = "btn btn-dark w-100";
            themeText.textContent = 'Dark Theme';
        }
    });

// Flow:
// Checkbox toggled → checked?
//   true  → Dark mode  (dark bg, light text)
//   false → Light mode (light bg, dark text)`
      }
    ]
  }
];

// ── DEMOS ─────────────────────────────────────────────────────────────────────
const demos = {
  delegation: [
    {
      label: "1. Individual handlers (bad)",
      code: `// 3 buttons, 3 separate handlers ❌
document.getElementById("red").addEventListener("click", function (e) {
    console.log(e.target.textContent);
    document.querySelector("p").style.color = e.target.textContent;
});
document.getElementById("green").addEventListener("click", function (e) {
    console.log(e.target.textContent);
    document.querySelector("p").style.color = e.target.textContent;
});
// Click RED:`,
      output: ["RED", "(p color changes to red)"],
      note: "❌ Not scalable. 3 buttons = 3 handlers. If 100 buttons, 100 handlers needed."
    },
    {
      label: "2. Event Delegation (good)",
      code: `// One handler on parent div ✅
document.getElementById("btnContainer")
    .addEventListener("click", function (e) {
        console.log(e.target.tagName);

        if (e.target.tagName === "BUTTON") {
            console.log(e.target.textContent);
            document.querySelector("p").style.color = e.target.textContent;
        }
    });
// Click RED button:
// Click GREEN button:
// Click on DIV (between buttons):`,
      output: ["BUTTON", "RED", "BUTTON", "GREEN", "DIV", "(no action — not a BUTTON)"],
      note: "✅ tagName check filters out div clicks. One handler works for all buttons via bubbling."
    },
    {
      label: "3. Image region detection (clientX/Y)",
      code: `document.querySelector("img").addEventListener("click", function (e) {
    console.log(e.clientX, e.clientY);

    let xRange = e.clientX >= 56 && e.clientX <= 101;
    let yRange = e.clientY >= 66 && e.clientY <= 138;
    let condition = xRange && yRange;

    if (condition) {
        document.querySelector("div").innerHTML = "<p>HEAD</p>";
    } else {
        document.querySelector("div").innerHTML = "<p>NOT HEAD</p>";
    }
});
// Click on head region (79, 89):
// Click elsewhere (200, 300):`,
      output: ["79 89", "HEAD", "200 300", "NOT HEAD"],
      note: "clientX/clientY from PointerEvent gives exact click position. Use ranges to detect image regions."
    }
  ],
  modifier: [
    {
      label: "1. Username availability (keyup)",
      code: `document.querySelector("#userId")
    .addEventListener('keyup', function (e) {
        let msg = document.querySelector("#msg");
        let data = this.value;
        let input = 'sachin'; // simulated DB check

        if (data === input) {
            msg.innerHTML = '<p style="color:red;">username taken</p>';
        } else {
            msg.innerHTML = '<p style="color:green;">username available</p>';
        }
    });
// Type "sachin":
// Type "john":`,
      output: ['(msg) username taken — color: red', '(msg) username available — color: green'],
      note: "keyup fires on every keystroke. this.value = current input. Compare with DB value in real apps."
    },
    {
      label: "2. getModifierState — CapsLock",
      code: `document.querySelector("#userPwd").addEventListener('keyup', function (e) {
    let msg = document.querySelector("#msg2");
    console.log(e.getModifierState("CapsLock"));

    if (e.getModifierState("CapsLock")) {
        msg.style.display = "block";  // show CapsLock warning
    } else {
        msg.style.display = "none";   // hide warning
    }
    console.log(e.keyCode);
});
// Type with CapsLock ON:
// Type with CapsLock OFF:`,
      output: ["true", "(warning shown) CapsLock is ON!", "false", "(warning hidden)"],
      note: "getModifierState('CapsLock') returns true if CapsLock is currently active. Works on any keyup event."
    },
    {
      label: "3. All modifier keys",
      code: `// Every keyboard event object has getModifierState()
// Modifier keys:
//   a. CapsLock
//   b. Shift
//   c. Control
//   d. Alt
//   e. Numlock

document.querySelector("input").addEventListener('keyup', function(e) {
    console.log("CapsLock:", e.getModifierState("CapsLock"));
    console.log("Shift:",    e.getModifierState("Shift"));
    console.log("Control:",  e.getModifierState("Control"));
    console.log("Alt:",      e.getModifierState("Alt"));
    console.log("Numlock:",  e.getModifierState("NumLock"));
});`,
      output: ["CapsLock: false", "Shift: false", "Control: false", "Alt: false", "Numlock: true"],
      note: "Returns true/false for each modifier key state at the time of the keyup event."
    },
    {
      label: "4. focus / blur / keyup — Event State",
      code: `let userName = document.querySelector("#userId");
let msg = document.querySelector("#msg");

// focus → user clicks into input
userName.addEventListener('focus', function (e) {
    msg.innerHTML = "<p style='color:goldenrod'>Name in block letters only</p>";
});

// blur → user clicks away from input
userName.addEventListener("blur", function (e) {
    msg.innerHTML = "<p style='color:red;'>Username is required</p>";
});

// keyup → convert to uppercase in real time
userName.addEventListener('keyup', function (e) {
    let data = this.value;
    this.value = data.toUpperCase();
});`,
      output: ["(focus) Name in block letters only — goldenrod", "(typing 'pw') → 'PW' (auto uppercase)", "(blur) Username is required — red"],
      note: "focus=cursor enters, blur=cursor leaves, keyup=each keystroke. Three events covering full input lifecycle."
    }
  ],
  validation: [
    {
      label: "1. Username length validation",
      code: `let userMsg = document.querySelector("#msg");
document.querySelector("#userId")
    .addEventListener('keyup', function (e) {
        let count = this.value.length;
        console.log(count);

        if (count === 0) {
            userMsg.innerHTML = '<p style="color:red">Name Required</p>';
        } else {
            if (count < 4) {
                userMsg.innerHTML = '<p style="color:red">Name too short</p>';
            } else {
                userMsg.innerHTML = '';  // valid
            }
        }
    });
// Type "" (empty):
// Type "pw":
// Type "pwio":`,
      output: ["0 → Name Required", "2 → Name too short", "4 → (valid — message cleared)"],
      note: "count === 0 → empty. count < 4 → too short. count >= 4 → valid. Uses this.value.length."
    },
    {
      label: "2. Textarea remaining chars counter",
      code: `// <textarea id="userComments" maxlength="20"></textarea>
let outputMsg = document.querySelector("#msg");

document.querySelector("#userComments")
    .addEventListener("keyup", function (e) {
        let userInput = e.target.value;
        let maxLimit = this.maxLength;       // 20 (DOM camelCase)
        let remainingChars = maxLimit - userInput.length;

        outputMsg.textContent = \`\${remainingChars}  no of chars left\`;
    });
// Type "user dt" (7 chars):
// Type "user detail" (11 chars):
// Type 20 chars (maxLength hit):`,
      output: ["13  no of chars left", "9  no of chars left", "0  no of chars left  (typing not permitted)"],
      note: "this.maxLength = DOM camelCase for HTML maxlength attr. Template literal updates count on every keyup."
    },
    {
      label: "3. onChange — Dark/Light theme toggle",
      code: `document.querySelector("#themeCheckbox")
    .addEventListener("change", function (e) {
        let flag = e.target.checked;  // boolean
        console.log(flag);

        if (flag) {
            // Dark Theme
            frmLogin.className = "w-25 border border-3 rounded p-4 bg-dark text-light";
            btnLogin.className = "btn btn-light w-100";
            themeText.textContent = 'Light Theme';
        } else {
            // Light Theme
            frmLogin.className = "w-25 border border-3 rounded p-4 bg-light text-dark";
            btnLogin.className = "btn btn-dark w-100";
            themeText.textContent = 'Dark Theme';
        }
    });
// Check checkbox:
// Uncheck checkbox:`,
      output: ["true → Dark mode applied (bg-dark, text-light)", "false → Light mode applied (bg-light, text-dark)"],
      note: "onChange fires when checkbox state changes. e.target.checked = boolean. Toggle className to switch themes."
    },
    {
      label: "4. onChange vs onchange note",
      code: `// HTML attribute:    onchange  (lowercase)
// JS DOM property:    onChange  (camelCase)
// addEventListener:   "change"  (lowercase string)

// All 3 refer to the SAME event:
element.onchange = handler;                        // property
element.addEventListener("change", handler);       // recommended

// e.target.checked → boolean (for checkbox/radio)
// e.target.value   → string  (for text/select)

// Example: select dropdown
document.querySelector("select").addEventListener("change", function(e) {
    console.log("Selected:", e.target.value);
});
// User selects "Option 2":`,
      output: ["Selected: Option 2"],
      note: "change event fires when: checkbox toggled, radio selected, select option changed, or text input loses focus after change."
    }
  ]
};

// ── QUIZ ─────────────────────────────────────────────────────────────────────
const quiz = [
  { q: "In Event Delegation, why do we check e.target.tagName?", opts: ["To get the element's CSS class","To filter out clicks on the parent container itself","To stop propagation","To detect keyboard events"], ans: 1 },
  { q: "What does e.clientX give you in a click event?", opts: ["Distance from the element's top-left","X position of the click relative to the browser viewport","The element's width","The scroll position"], ans: 1 },
  { q: "e.getModifierState('CapsLock') returns?", opts: ["The CapsLock key code","true if CapsLock is ON, false otherwise","The number of times CapsLock was pressed","A string 'on' or 'off'"], ans: 1 },
  { q: "Which event fires when a user clicks INTO an input field?", opts: ["blur","change","focus","keydown"], ans: 2 },
  { q: "Which event fires when a user clicks AWAY from an input field?", opts: ["focus","keyup","change","blur"], ans: 3 },
  { q: "this.maxLength in a textarea handler corresponds to which HTML attribute?", opts: ["maxSize","max-length","maxlength","maximum"], ans: 2 },
  { q: "The 'change' event on a checkbox fires when?", opts: ["User types in it","The checkbox state is toggled (checked/unchecked)","The page loads","The form is submitted"], ans: 1 },
  { q: "e.target.checked gives what type of value?", opts: ["String ('true'/'false')","Number (0 or 1)","Boolean (true/false)","Object"], ans: 2 },
  { q: "What is the correct way to get remaining chars in a textarea?", opts: ["e.target.length - maxLength","maxLength - e.target.value.length","e.target.maxLength + e.target.value","e.target.value - maxLength"], ans: 1 },
  { q: "Which modifier key list is correct for getModifierState()?", opts: ["CapsLock, Shift, Control, Alt, NumLock","Enter, Tab, Delete, Escape, Space","Ctrl, Alt, Win, Fn, Meta","Backspace, Arrow, Home, End, Insert"], ans: 0 },
];

// ── MAIN COMPONENT ────────────────────────────────────────────────────────────
export default function JSNotes() {
  const [tab, setTab] = useState("notes");
  const [activeLec, setActiveLec] = useState(0);
  const [demoTopic, setDemoTopic] = useState("delegation");
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
    { id: "delegation", label: "🎯 Event Delegation", color: "#f59e0b" },
    { id: "modifier", label: "⌨️ Modifier & State", color: "#06b6d4" },
    { id: "validation", label: "✅ Form Validation", color: "#10b981" },
  ];

  // ── Interactive Demo: Color Buttons ─────────────────────────────────────────
  const [paraColor, setParaColor] = useState("#e2e8f0");
  const [delegLog, setDelegLog] = useState([]);
  const addLog = (msg) => setDelegLog(l => [...l.slice(-4), msg]);

  // ── Interactive Demo: Textarea counter ───────────────────────────────────────
  const [taVal, setTaVal] = useState("");
  const maxLen = 20;

  // ── Interactive Demo: Theme toggle ──────────────────────────────────────────
  const [darkMode, setDarkMode] = useState(false);

  // ── Interactive Demo: Focus/Blur/Keyup ──────────────────────────────────────
  const [inputMsg, setInputMsg] = useState("");
  const [inputVal, setInputVal] = useState("");

  return (
    <div style={{ fontFamily: "monospace", background: "#060d1a", minHeight: "100vh", color: "#e2e8f0" }}>
      {/* Header */}
      <div style={{ background: "linear-gradient(135deg,#0a1628,#0f2040)", borderBottom: "2px solid #f59e0b", padding: "16px 24px", display: "flex", alignItems: "center", gap: 12 }}>
        <div style={{ background: "linear-gradient(135deg,#f59e0b,#10b981)", borderRadius: "50%", width: 42, height: 42, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20 }}>⚡</div>
        <div>
          <h1 style={{ margin: 0, fontSize: 19, color: "#fff" }}>JavaScript — Lec 19 to 21</h1>
          <p style={{ margin: 0, color: "#f59e0b", fontSize: 11 }}>Event Delegation · getModifierState · focus/blur/change · Form Validation · onChange Theme Toggle</p>
        </div>
      </div>

      {/* Nav */}
      <div style={{ background: "#0b1120", borderBottom: "1px solid #1f2937", display: "flex" }}>
        {[{ id: "notes", label: "📖 Notes" }, { id: "demo", label: "▶ Live Demo" }, { id: "interactive", label: "🖥 Interactive" }, { id: "quiz", label: "🧠 Quiz" }].map(n => (
          <button key={n.id} onClick={() => setTab(n.id)} style={{ padding: "11px 22px", background: "none", border: "none", cursor: "pointer", fontSize: 13, fontWeight: 700, fontFamily: "monospace", color: tab === n.id ? "#f59e0b" : "#475569", borderBottom: tab === n.id ? "3px solid #f59e0b" : "3px solid transparent" }}>{n.label}</button>
        ))}
      </div>

      <div style={{ display: "flex", width: "100%" }}>

        {/* ── NOTES ── */}
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

        {/* ── DEMO ── */}
        {tab === "demo" && (
          <div style={{ flex: 1, padding: 28 }}>
            <h2 style={{ color: "#f59e0b", marginTop: 0 }}>▶ Live Output Simulator</h2>
            <p style={{ color: "#475569", fontSize: 13, marginBottom: 18 }}>Select topic and snippet, then click Run.</p>
            <div style={{ display: "flex", gap: 8, marginBottom: 18, flexWrap: "wrap" }}>
              {topicBtns.map(t => (
                <button key={t.id} onClick={() => { setDemoTopic(t.id); setDemoIdx(0); setShowOutput(false); }} style={{ padding: "8px 16px", borderRadius: 8, border: `2px solid ${demoTopic === t.id ? t.color : "#1f2937"}`, background: demoTopic === t.id ? t.color + "22" : "#0b1120", color: demoTopic === t.id ? t.color : "#64748b", cursor: "pointer", fontWeight: 700, fontSize: 12, fontFamily: "monospace" }}>{t.label}</button>
              ))}
            </div>
            <div style={{ display: "flex", gap: 6, marginBottom: 18, flexWrap: "wrap" }}>
              {demoList.map((d, i) => (
                <button key={i} onClick={() => { setDemoIdx(i); setShowOutput(false); }} style={{ padding: "6px 11px", borderRadius: 6, border: `1px solid ${demoIdx === i ? "#f59e0b" : "#1f2937"}`, background: demoIdx === i ? "#f59e0b22" : "#0b1120", color: demoIdx === i ? "#f59e0b" : "#64748b", cursor: "pointer", fontSize: 11, fontFamily: "monospace" }}>{i + 1}. {d.label}</button>
              ))}
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
              <div style={{ background: "#060d1a", border: "1px solid #1f2937", borderRadius: 12, overflow: "hidden" }}>
                <div style={{ background: "#1f2937", padding: "8px 14px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <span style={{ color: "#64748b", fontSize: 12 }}>📄 {demo.label}</span>
                  <button onClick={runDemo} style={{ background: "#f59e0b", border: "none", borderRadius: 6, padding: "5px 14px", color: "#060d1a", fontWeight: 700, cursor: "pointer", fontSize: 12, fontFamily: "monospace" }}>▶ Run</button>
                </div>
                <pre style={{ color: "#a3e635", fontSize: 12.5, margin: 0, padding: "16px", lineHeight: 1.7, whiteSpace: "pre-wrap" }}>{demo.code}</pre>
              </div>
              <div style={{ background: "#060d1a", border: "1px solid #1f2937", borderRadius: 12, overflow: "hidden" }}>
                <div style={{ background: "#1f2937", padding: "8px 14px" }}><span style={{ color: "#64748b", fontSize: 12 }}>💻 Console Output</span></div>
                <div style={{ padding: 16, minHeight: 120 }}>
                  {animating && <div style={{ color: "#475569", fontSize: 13 }}>Running...</div>}
                  {showOutput && !animating && demo.output.map((line, i) => (
                    <div key={i} style={{ fontFamily: "monospace", fontSize: 12.5, padding: "4px 0", color: line.startsWith("❌") ? "#f87171" : line.includes("red") ? "#f87171" : line.includes("green") ? "#6ee7b7" : line.startsWith("(") ? "#94a3b8" : "#a3e635", borderBottom: i < demo.output.length - 1 ? "1px solid #1f293720" : "none" }}>{line}</div>
                  ))}
                  {!showOutput && !animating && <div style={{ color: "#374151", fontSize: 12 }}>Click ▶ Run to see output</div>}
                </div>
                {showOutput && (
                  <div style={{ background: "#1a1a0a", borderTop: "1px solid #5f4a06", padding: "10px 16px" }}>
                    <p style={{ color: "#fde68a", fontSize: 12, margin: 0 }}>💡 {demo.note}</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* ── INTERACTIVE ── */}
        {tab === "interactive" && (
          <div style={{ flex: 1, padding: 28 }}>
            <h2 style={{ color: "#f59e0b", marginTop: 0 }}>🖥 Interactive Playground</h2>
            <p style={{ color: "#475569", fontSize: 13, marginBottom: 24 }}>Live demos of Lec 19–21 concepts in action.</p>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>

              {/* Color Delegation Demo */}
              <div style={{ background: "#0b1120", border: "1px solid #1f2937", borderLeft: "4px solid #f59e0b", borderRadius: 12, padding: 20 }}>
                <h4 style={{ color: "#f59e0b", margin: "0 0 12px" }}>🎯 Event Delegation — Color Buttons</h4>
                <p style={{ color: paraColor, fontWeight: 700, fontSize: 18, margin: "0 0 12px", transition: "color 0.3s" }}>HELLO WORLD</p>
                <div id="btnContainer" style={{ display: "flex", gap: 8, marginBottom: 12 }}>
                  {["RED", "GREEN", "BLUE"].map(c => (
                    <button key={c} onClick={(e) => {
                      const color = e.target.tagName === "BUTTON" ? e.target.textContent.toLowerCase() : null;
                      if (color) { setParaColor(color); addLog(`tagName: BUTTON → color: ${color}`); }
                    }} style={{ padding: "6px 14px", borderRadius: 6, border: "1px solid #374151", background: "#1f2937", color: c === "RED" ? "#f87171" : c === "GREEN" ? "#6ee7b7" : "#60a5fa", fontWeight: 700, cursor: "pointer", fontFamily: "monospace" }}>{c}</button>
                  ))}
                </div>
                <div style={{ background: "#060d1a", borderRadius: 8, padding: 10, minHeight: 60 }}>
                  <div style={{ color: "#475569", fontSize: 11, marginBottom: 4 }}>Console log:</div>
                  {delegLog.map((l, i) => <div key={i} style={{ color: "#a3e635", fontSize: 11 }}>{l}</div>)}
                </div>
              </div>

              {/* Focus / Blur / keyup Demo */}
              <div style={{ background: "#0b1120", border: "1px solid #1f2937", borderLeft: "4px solid #06b6d4", borderRadius: 12, padding: 20 }}>
                <h4 style={{ color: "#06b6d4", margin: "0 0 12px" }}>⌨️ focus / blur / keyup</h4>
                <label style={{ color: "#94a3b8", fontSize: 12 }}>Username</label>
                <input
                  type="text"
                  value={inputVal}
                  placeholder="Type your username..."
                  onFocus={() => setInputMsg("🟡 Name in block letters only")}
                  onBlur={() => setInputMsg("🔴 Username is required")}
                  onKeyUp={(e) => {
                    const up = e.target.value.toUpperCase();
                    setInputVal(up);
                    setInputMsg("🟢 Typing... (auto UPPERCASE)");
                  }}
                  onChange={(e) => setInputVal(e.target.value)}
                  style={{ display: "block", width: "100%", padding: "8px 10px", borderRadius: 6, border: "1px solid #374151", background: "#060d1a", color: "#fde68a", fontFamily: "monospace", fontSize: 13, marginBottom: 10, boxSizing: "border-box" }}
                />
                <div style={{ fontSize: 12, minHeight: 20, color: inputMsg.startsWith("🔴") ? "#f87171" : inputMsg.startsWith("🟡") ? "#fbbf24" : "#6ee7b7" }}>{inputMsg}</div>
              </div>

              {/* Textarea counter */}
              <div style={{ background: "#0b1120", border: "1px solid #1f2937", borderLeft: "4px solid #10b981", borderRadius: 12, padding: 20 }}>
                <h4 style={{ color: "#10b981", margin: "0 0 12px" }}>✅ Textarea Remaining Chars</h4>
                <label style={{ color: "#94a3b8", fontSize: 12 }}>Your comments — max {maxLen} characters</label>
                <textarea
                  maxLength={maxLen}
                  value={taVal}
                  onKeyUp={(e) => setTaVal(e.target.value)}
                  onChange={(e) => setTaVal(e.target.value)}
                  placeholder="Type something..."
                  style={{ display: "block", width: "100%", height: 80, padding: "8px 10px", borderRadius: 6, border: "1px solid #374151", background: "#060d1a", color: "#fde68a", fontFamily: "monospace", fontSize: 13, resize: "none", boxSizing: "border-box", marginBottom: 8 }}
                />
                <div style={{ color: taVal.length >= maxLen ? "#f87171" : "#94a3b8", fontSize: 13 }}>
                  <span style={{ fontWeight: 700 }}>{maxLen - taVal.length}</span> no of chars left
                  {taVal.length >= maxLen && <span style={{ color: "#f87171", marginLeft: 8 }}>(typing not permitted)</span>}
                </div>
              </div>

              {/* Dark/Light theme toggle */}
              <div style={{ background: darkMode ? "#1e293b" : "#f1f5f9", border: "1px solid #1f2937", borderLeft: "4px solid #8b5cf6", borderRadius: 12, padding: 20, transition: "background 0.3s" }}>
                <h4 style={{ color: "#8b5cf6", margin: "0 0 12px" }}>🌗 onChange — Theme Toggle</h4>
                <label style={{ display: "flex", alignItems: "center", gap: 8, cursor: "pointer", color: darkMode ? "#e2e8f0" : "#1e293b", fontSize: 13, marginBottom: 16 }}>
                  <input type="checkbox" checked={darkMode} onChange={(e) => setDarkMode(e.target.checked)} style={{ width: 16, height: 16, cursor: "pointer" }} />
                  {darkMode ? "Light Theme" : "Dark Theme"}
                </label>
                <div style={{ background: darkMode ? "#0f172a" : "#fff", border: `1px solid ${darkMode ? "#334155" : "#cbd5e1"}`, borderRadius: 10, padding: 16, transition: "all 0.3s" }}>
                  <h3 style={{ margin: "0 0 12px", color: darkMode ? "#f1f5f9" : "#1e293b", fontSize: 16 }}>👤 User Login</h3>
                  <div style={{ marginBottom: 10 }}>
                    <label style={{ color: darkMode ? "#94a3b8" : "#475569", fontSize: 12 }}>User Name</label>
                    <input type="text" style={{ display: "block", width: "100%", padding: "6px 10px", borderRadius: 6, border: `1px solid ${darkMode ? "#334155" : "#cbd5e1"}`, background: darkMode ? "#1e293b" : "#f8fafc", color: darkMode ? "#e2e8f0" : "#1e293b", fontFamily: "monospace", boxSizing: "border-box" }} />
                  </div>
                  <button style={{ width: "100%", padding: "8px", borderRadius: 6, border: "none", background: darkMode ? "#e2e8f0" : "#1e293b", color: darkMode ? "#1e293b" : "#f1f5f9", fontWeight: 700, cursor: "pointer", fontFamily: "monospace" }}>Login</button>
                </div>
                <div style={{ marginTop: 10, color: "#64748b", fontSize: 11 }}>e.target.checked = <span style={{ color: darkMode ? "#6ee7b7" : "#f87171" }}>{String(darkMode)}</span></div>
              </div>

            </div>
          </div>
        )}

        {/* ── QUIZ ── */}
        {tab === "quiz" && (
          <div style={{ flex: 1, padding: 28 }}>
            <h2 style={{ color: "#f59e0b", marginTop: 0 }}>🧠 Knowledge Check — Lec 19–21</h2>
            {!quizDone ? (
              <div>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 10 }}>
                  <span style={{ color: "#475569", fontSize: 13 }}>Q {quizQ + 1} / {quiz.length}</span>
                  <span style={{ color: "#34d399", fontWeight: 700 }}>Score: {quizScore}/{quiz.length}</span>
                </div>
                <div style={{ width: "100%", height: 4, background: "#1f2937", borderRadius: 4, marginBottom: 24 }}>
                  <div style={{ width: `${(quizQ / quiz.length) * 100}%`, height: "100%", background: "#f59e0b", borderRadius: 4, transition: "width 0.3s" }} />
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
                    <button onClick={nextQ} style={{ background: "#f59e0b", border: "none", borderRadius: 10, padding: "11px 26px", color: "#060d1a", fontWeight: 700, cursor: "pointer", fontSize: 14, fontFamily: "monospace" }}>
                      {quizQ + 1 >= quiz.length ? "Results →" : "Next →"}
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div style={{ textAlign: "center", background: "#0b1120", border: "1px solid #1f2937", borderRadius: 20, padding: 48 }}>
                <div style={{ fontSize: 60, marginBottom: 14 }}>{quizScore >= 9 ? "🏆" : quizScore >= 7 ? "🎯" : "📚"}</div>
                <h3 style={{ color: "#f59e0b", fontSize: 28 }}>{quizScore}/{quiz.length}</h3>
                <p style={{ color: "#94a3b8", marginBottom: 24 }}>{quizScore === 10 ? "Perfect! Lec 19–21 mastered! 🌟" : quizScore >= 7 ? "Great! Revisit getModifierState and Event State events." : "Head back to Notes and Interactive tabs to review!"}</p>
                <button onClick={resetQuiz} style={{ background: "#f59e0b", border: "none", borderRadius: 10, padding: "12px 28px", color: "#060d1a", fontWeight: 700, cursor: "pointer", fontSize: 15, fontFamily: "monospace" }}>Retry 🔄</button>
              </div>
            )}
          </div>
        )}
      </div>

      <div style={{ background: "#0b1120", borderTop: "1px solid #1f2937", padding: "12px 24px", textAlign: "center" }}>
        <p style={{ color: "#1f2937", fontSize: 11, margin: 0 }}>JavaScript Lec 19–21 · PW Institute of Innovation · BEN01SOTUGBTC25B01</p>
      </div>
    </div>
  );
}
