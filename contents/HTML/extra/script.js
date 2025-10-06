// contents/HTML/extra/script.js
// Global non-copy deterrent (except form fields) + improved MCQ + smooth scroll + animations
document.addEventListener("DOMContentLoaded", function () {
  // Entrance animation
  (function entrance() {
    const main = document.getElementById("content");
    if (!main) return;
    main.style.opacity = 0;
    main.style.transform = "translateY(8px)";
    requestAnimationFrame(() => {
      main.style.transition =
        "opacity .45s ease, transform .45s cubic-bezier(.2,.9,.25,1)";
      main.style.opacity = 1;
      main.style.transform = "translateY(0)";
    });
  })();

  // Accessible live region (fallback for notifications)
  let live = document.getElementById("mcq-live");
  if (!live) {
    live = document.createElement("div");
    live.id = "mcq-live";
    live.setAttribute("aria-live", "polite");
    live.setAttribute("aria-atomic", "true");
    live.style.position = "absolute";
    live.style.left = "-9999px";
    live.style.width = "1px";
    live.style.height = "1px";
    live.style.overflow = "hidden";
    document.body.appendChild(live);
  }

  function notify(opts) {
    if (window.Swal && typeof Swal.fire === "function") {
      Swal.fire(opts);
    } else {
      live.textContent =
        (opts.title || "") + (opts.text ? " — " + opts.text : "");
      setTimeout(() => {
        live.textContent = "";
      }, opts.timer || 1300);
    }
  }

  // ----------------------------
  // MCQ handling (delegated)
  // ----------------------------
  function parseChoiceLetter(text) {
    if (!text) return null;
    const t = text.trim();
    const m = t.match(/^\s*([A-Za-z])[\).\-\s]/);
    if (m && /^[A-Za-z]$/.test(m[1])) return m[1].toLowerCase();
    return null;
  }

  function markAnswered(qEl) {
    if (qEl) qEl.dataset.answered = "true";
  }
  
  function isAnswered(qEl) {
    return qEl && qEl.dataset.answered === "true";
  }

  function handleChoice(btn) {
    if (!btn) return;
    const qEl = btn.closest(".question");
    if (!qEl || isAnswered(qEl)) return;

    const correct = (qEl.getAttribute("data-answer") || "").toLowerCase();
    const choices = Array.from(qEl.querySelectorAll(".choice"));

    // disable choices (keep keyboard focusability removed)
    choices.forEach((c) => {
      c.classList.remove("correct", "wrong");
      c.disabled = true;
      c.setAttribute("tabindex", "-1");
      c.setAttribute("aria-pressed", "false");
    });

    // determine chosen letter
    let chosenLetter =
      parseChoiceLetter(btn.textContent) ||
      ["a", "b", "c", "d", "e", "f"][choices.indexOf(btn)];

    if (chosenLetter === correct && correct) {
      btn.classList.add("correct");
      btn.setAttribute("aria-pressed", "true");
      markAnswered(qEl);
      notify({
        icon: "success",
        title: "Correct!",
        text: "Good job — that is correct.",
        timer: 1500,
        showConfirmButton: false,
        position: "top",
        toast: true,
      });
      live.textContent = "Correct answer.";
    } else {
      btn.classList.add("wrong");
      btn.setAttribute("aria-pressed", "true");

      // highlight correct
      let found = false;
      choices.forEach((c, i) => {
        const letter =
          parseChoiceLetter(c.textContent) || ["a", "b", "c", "d", "e", "f"][i];
        if (letter === correct) {
          c.classList.add("correct");
          found = true;
        }
      });

      if (!found && /^[a-z]$/.test(correct)) {
        const idx = correct.charCodeAt(0) - 97;
        if (choices[idx]) choices[idx].classList.add("correct");
      }

      const correctTextEl = qEl.querySelector(".choice.correct");
      const correctLabel = correctTextEl
        ? correctTextEl.textContent.trim()
        : correct || "N/A";

      notify({
        icon: "error",
        title: "Incorrect",
        text: "Correct answer: " + correctLabel,
        confirmButtonText: "OK",
        position: "top",
      });
      live.textContent = "Incorrect. Correct answer shown.";
      markAnswered(qEl);
    }
  }

  // delegated click + keyboard handling
  document.addEventListener("click", function (e) {
    const btn = e.target.closest && e.target.closest(".mcq .choice");
    if (!btn) return;
    handleChoice(btn);
  });

  document.addEventListener("keydown", function (e) {
    const active = document.activeElement;
    if (active && active.matches && active.matches(".mcq .choice")) {
      if (e.key === "Enter" || e.key === " " || e.key === "Spacebar") {
        e.preventDefault();
        handleChoice(active);
      }
    }
  });

  // make .choice accessible if not buttons
  document.querySelectorAll(".mcq .choice").forEach((el) => {
    if (!el.hasAttribute("role")) el.setAttribute("role", "button");
    if (!el.hasAttribute("tabindex")) el.setAttribute("tabindex", "0");
    if (!el.hasAttribute("aria-pressed"))
      el.setAttribute("aria-pressed", "false");
  });

  // minimal MCQ styles
  (function mcqStyles() {
    const s = document.createElement("style");
    s.textContent = `
      .mcq .choice.correct { 
        outline: 3px solid rgba(46,204,113,.25); 
        background-color: rgba(46,204,113,.08); 
      }
      .mcq .choice.wrong { 
        outline: 3px solid rgba(231,76,60,.2); 
        background-color: rgba(231,76,60,.06); 
      }
      .mcq .choice[disabled] { 
        opacity: .95; 
        cursor: not-allowed; 
      }
    `;
    document.head.appendChild(s);
  })();

  // ----------------------------
  // GLOBAL non-copy deterrent (EXCEPT inputs, textareas, and contenteditable)
  // ----------------------------
  (function globalCopyBlock() {
    // CSS: disable selection globally except form fields & contenteditable elements
    const css = `
      :root { 
        -webkit-user-select: none; 
        -moz-user-select: none; 
        -ms-user-select: none; 
        user-select: none; 
      }
      input, textarea, [contenteditable="true"], [contenteditable=""] { 
        user-select: auto !important; 
        -webkit-user-select: text !important; 
      }
    `;
    const st = document.createElement("style");
    st.appendChild(document.createTextNode(css));
    document.head.appendChild(st);

    // helper to check if event target is in an allowed area
    function isInAllowedArea(el) {
      if (!el) return false;
      if (el.closest) {
        if (
          el.closest(
            'input, textarea, [contenteditable="true"], [contenteditable=""]'
          )
        )
          return true;
      }
      // also allow selection if element itself is input/textarea/contenteditable
      if (el.matches && (el.matches("input") || el.matches("textarea")))
        return true;
      return false;
    }

    // contextmenu (right click)
    document.addEventListener("contextmenu", function (e) {
      if (isInAllowedArea(e.target)) return; // allow on inputs/editable
      e.preventDefault();
      notify({
        icon: "info",
        title: "Copy Disabled",
        text: "Content protection is enabled for educational purposes.",
        showConfirmButton: false,
        timer: 1200,
        position: "top-end",
        toast: true,
      });
    });

    // prevent selectstart where not allowed
    document.addEventListener("selectstart", function (e) {
      if (isInAllowedArea(e.target)) return;
      e.preventDefault();
    });

    // block clipboard events originating outside allowed areas
    ["copy", "cut", "paste"].forEach((evName) => {
      document.addEventListener(evName, function (e) {
        if (isInAllowedArea(e.target)) return;
        e.preventDefault();
        notify({
          icon: "info",
          title: "Copy Disabled",
          text: "Please practice typing the code yourself.",
          showConfirmButton: false,
          timer: 1200,
          position: "top-end",
          toast: true,
        });
      });
    });

    // keyboard shortcuts (Ctrl/Cmd + C/X/S/U) — allow inside inputs/editables
    document.addEventListener("keydown", function (e) {
      const k = (e.key || "").toLowerCase();
      if ((e.ctrlKey || e.metaKey) && ["c", "x", "s", "u"].includes(k)) {
        const focused = document.activeElement;
        if (isInAllowedArea(focused)) return; // allow shortcuts in inputs/editable
        e.preventDefault();
        notify({
          icon: "info",
          title: "Copy Disabled",
          text: "Shortcut disabled for learning purposes.",
          showConfirmButton: false,
          timer: 1200,
          position: "top-end",
          toast: true,
        });
      }
    });
  })();

  // ----------------------------
  // Smooth scroll for in-page anchors
  // ----------------------------
  (function smoothScrollAnchors() {
    document.querySelectorAll('a[href^="#"]').forEach((link) => {
      link.addEventListener("click", function (e) {
        const href = this.getAttribute("href") || "";
        if (href.length <= 1) return; // allow href="#" default
        const target = document.querySelector(href);
        if (!target) return;
        e.preventDefault();
        target.scrollIntoView({ behavior: "smooth", block: "start" });
        try {
          history.pushState(null, "", href);
        } catch (err) {
          /* ignore */
        }
      });
    });
  })();

  // ----------------------------
  // Progress tracking (optional feature)
  // ----------------------------
  (function progressTracking() {
    // Check if window.ebookApp exists (from main script.js)
    if (typeof window.ebookApp === 'undefined') return;

    // Auto-save progress when quiz is completed
    const quizSection = document.querySelector('.mcq');
    if (quizSection) {
      const lessonId = document.title.split('—')[0].trim();
      
      // Check all questions periodically
      const checkCompletion = setInterval(() => {
        const questions = document.querySelectorAll('.question');
        const answered = document.querySelectorAll('.question[data-answered="true"]');
        
        if (questions.length > 0 && questions.length === answered.length) {
          clearInterval(checkCompletion);
          
          // Mark lesson as complete
          if (window.ebookApp.markLessonComplete) {
            window.ebookApp.markLessonComplete(lessonId);
            console.log('Lesson completed:', lessonId);
          }
        }
      }, 1000);
    }
  })();

  // ----------------------------
  // Console message for developers
  // ----------------------------
  console.log('%c📚 HTML CSS EBOOK', 'font-size: 20px; font-weight: bold; color: #5eead4;');
  console.log('%cScript loaded successfully!', 'color: #7c3aed;');
  console.log('%cCopy protection enabled for educational purposes.', 'color: #ff6b6b;');
}); // end DOMContentLoaded