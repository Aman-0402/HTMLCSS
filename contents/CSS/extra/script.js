// Enhanced Interactive Features for CSS Topics

document.addEventListener("DOMContentLoaded", () => {
  // Smooth scroll to top on page load
  window.scrollTo(0, 0);

  // Disable right-click (context menu)
  document.addEventListener("contextmenu", (e) => {
    e.preventDefault();
    showNotification("Right-click is disabled! 🚫");
  });

  // Disable copy
  document.addEventListener("copy", (e) => {
    e.preventDefault();
    showNotification("Copying is disabled! 🚫");
  });

  // Disable cut
  document.addEventListener("cut", (e) => {
    e.preventDefault();
    showNotification("Cutting is disabled! 🚫");
  });

  // Disable inspect element shortcuts
  document.addEventListener("keydown", (e) => {
    // F12
    if (e.key === "F12") {
      e.preventDefault();
      showNotification("Developer tools are disabled! 🚫");
      return false;
    }

    // Ctrl+Shift+I
    if (e.ctrlKey && e.shiftKey && e.key === "I") {
      e.preventDefault();
      showNotification("Developer tools are disabled! 🚫");
      return false;
    }

    // Ctrl+Shift+J
    if (e.ctrlKey && e.shiftKey && e.key === "J") {
      e.preventDefault();
      showNotification("Developer tools are disabled! 🚫");
      return false;
    }

    // Ctrl+U
    if (e.ctrlKey && e.key === "u") {
      e.preventDefault();
      showNotification("View source is disabled! 🚫");
      return false;
    }

    // Ctrl+Shift+C
    if (e.ctrlKey && e.shiftKey && e.key === "C") {
      e.preventDefault();
      showNotification("Inspect element is disabled! 🚫");
      return false;
    }

    // Allow keyboard navigation
    // Alt + Left Arrow: Go back
    if (e.altKey && e.key === "ArrowLeft") {
      const backBtn = document.querySelector(".btn-back");
      if (backBtn) backBtn.click();
    }

    // Alt + Right Arrow: Go next
    if (e.altKey && e.key === "ArrowRight") {
      const nextBtn = document.querySelector(".btn-next");
      if (nextBtn) nextBtn.click();
    }
  });

  // Show notification function
  function showNotification(message) {
    const notification = document.createElement("div");
    notification.textContent = message;
    notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: #dc3545;
            color: white;
            padding: 15px 25px;
            border-radius: 8px;
            z-index: 10000;
            font-weight: 600;
            box-shadow: 0 5px 15px rgba(220, 53, 69, 0.4);
            animation: slideInRight 0.3s ease-out;
        `;

    document.body.appendChild(notification);

    setTimeout(() => {
      notification.style.animation = "slideOutRight 0.3s ease-out";
      setTimeout(() => notification.remove(), 300);
    }, 2000);
  }

  // Add notification animations
  const notificationStyle = document.createElement("style");
  notificationStyle.textContent = `
        @keyframes slideInRight {
            from {
                transform: translateX(400px);
                opacity: 0;
            }
            to {
                transform: translateX(0);
                opacity: 1;
            }
        }
        
        @keyframes slideOutRight {
            from {
                transform: translateX(0);
                opacity: 1;
            }
            to {
                transform: translateX(400px);
                opacity: 0;
            }
        }
    `;
  document.head.appendChild(notificationStyle);

  // Create Night Mode Toggle Button
  const nightModeBtn = document.createElement("button");
  nightModeBtn.innerHTML = "🌙";
  nightModeBtn.className = "night-mode-btn";
  nightModeBtn.title = "Toggle Night Mode";
  nightModeBtn.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: #667eea;
        color: white;
        border: none;
        width: 50px;
        height: 50px;
        border-radius: 50%;
        font-size: 24px;
        cursor: pointer;
        z-index: 1000;
        box-shadow: 0 5px 15px rgba(102, 126, 234, 0.4);
        transition: all 0.3s ease;
    `;

  document.body.appendChild(nightModeBtn);

  // Check for saved night mode preference
  const isNightMode = localStorage.getItem("nightMode") === "true";
  if (isNightMode) {
    enableNightMode();
  }

  // Night mode toggle functionality
  nightModeBtn.addEventListener("click", () => {
    const isCurrentlyNight = document.body.classList.contains("night-mode");

    if (isCurrentlyNight) {
      disableNightMode();
    } else {
      enableNightMode();
    }
  });

  function enableNightMode() {
    document.body.classList.add("night-mode");
    nightModeBtn.innerHTML = "☀️";
    localStorage.setItem("nightMode", "true");

    // Apply night mode styles
    const nightModeStyles = document.createElement("style");
    nightModeStyles.id = "night-mode-styles";
    nightModeStyles.textContent = `
            body.night-mode {
                background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%) !important;
            }
            
            body.night-mode .topic-container {
                background: #0f1419 !important;
                color: #e0e0e0 !important;
            }
            
            body.night-mode .topic-header h1 {
                color: #667eea !important;
            }
            
            body.night-mode .topic-subtitle {
                color: #b0b0b0 !important;
            }
            
            body.night-mode .content-section h2 {
                color: #667eea !important;
                border-bottom-color: #333 !important;
            }
            
            body.night-mode .content-section h3 {
                color: #9d7cbf !important;
            }
            
            body.night-mode .content-section p,
            body.night-mode .content-section li {
                color: #c0c0c0 !important;
            }
            
            body.night-mode .info-box {
                background: #1a1f2e !important;
                border-left-color: #667eea !important;
            }
            
            body.night-mode .example-box {
                background: #1a1f2e !important;
                border-color: #667eea !important;
            }
            
            body.night-mode .live-demo {
                background: #1a1f2e !important;
            }
            
            body.night-mode .demo-output {
                background: #0f1419 !important;
                color: #e0e0e0 !important;
            }
            
            body.night-mode .mcq-container {
                background: #1a1f2e !important;
            }
            
            body.night-mode .mcq-question {
                background: #0f1419 !important;
                color: #e0e0e0 !important;
            }
            
            body.night-mode .mcq-options label {
                background: #1a1f2e !important;
                color: #e0e0e0 !important;
            }
            
            body.night-mode .mcq-options label:hover {
                background: #2a2f3e !important;
            }
            
            body.night-mode .practice-box {
                background: #2a2000 !important;
                border-left-color: #ffc107 !important;
            }
            
            body.night-mode .practice-box li {
                color: #e0e0e0 !important;
            }
        `;

    if (!document.getElementById("night-mode-styles")) {
      document.head.appendChild(nightModeStyles);
    }
  }

  function disableNightMode() {
    document.body.classList.remove("night-mode");
    nightModeBtn.innerHTML = "🌙";
    localStorage.setItem("nightMode", "false");

    const nightModeStyles = document.getElementById("night-mode-styles");
    if (nightModeStyles) {
      nightModeStyles.remove();
    }
  }

  // Night mode button hover effect
  nightModeBtn.addEventListener("mouseenter", () => {
    nightModeBtn.style.transform = "scale(1.1) rotate(15deg)";
  });

  nightModeBtn.addEventListener("mouseleave", () => {
    nightModeBtn.style.transform = "scale(1) rotate(0deg)";
  });

  // Add scroll animations
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = "1";
        entry.target.style.transform = "translateY(0)";
      }
    });
  }, observerOptions);

  // Observe content sections
  const sections = document.querySelectorAll(".content-section");
  sections.forEach((section) => {
    observer.observe(section);
  });

  // Add interactive highlights to code examples
  const codeElements = document.querySelectorAll("code");
  codeElements.forEach((code) => {
    code.addEventListener("mouseenter", function () {
      this.style.background = "rgba(102, 126, 234, 0.1)";
      this.style.transition = "background 0.3s ease";
    });

    code.addEventListener("mouseleave", function () {
      this.style.background = "";
    });
  });

  // Progress tracker
  let totalSections = sections.length;
  let viewedSections = new Set();

  sections.forEach((section, index) => {
    const sectionObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            viewedSections.add(index);
            updateProgress();
          }
        });
      },
      { threshold: 0.5 }
    );

    sectionObserver.observe(section);
  });

  function updateProgress() {
    const progress = (viewedSections.size / totalSections) * 100;
    console.log(`Reading progress: ${Math.round(progress)}%`);
  }

  // Add scroll to top button
  const scrollTopBtn = document.createElement("button");
  scrollTopBtn.innerHTML = "↑";
  scrollTopBtn.className = "scroll-top-btn";
  scrollTopBtn.style.cssText = `
        position: fixed;
        bottom: 30px;
        right: 30px;
        background: #667eea;
        color: white;
        border: none;
        width: 50px;
        height: 50px;
        border-radius: 50%;
        font-size: 24px;
        cursor: pointer;
        opacity: 0;
        visibility: hidden;
        transition: all 0.3s ease;
        z-index: 1000;
        box-shadow: 0 5px 15px rgba(102, 126, 234, 0.4);
    `;

  document.body.appendChild(scrollTopBtn);

  // Show/hide scroll to top button
  window.addEventListener("scroll", () => {
    if (window.pageYOffset > 300) {
      scrollTopBtn.style.opacity = "1";
      scrollTopBtn.style.visibility = "visible";
    } else {
      scrollTopBtn.style.opacity = "0";
      scrollTopBtn.style.visibility = "hidden";
    }
  });

  scrollTopBtn.addEventListener("click", () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  });

  // Add hover effect to scroll top button
  scrollTopBtn.addEventListener("mouseenter", () => {
    scrollTopBtn.style.transform = "scale(1.1)";
    scrollTopBtn.style.background = "#5568d3";
  });

  scrollTopBtn.addEventListener("mouseleave", () => {
    scrollTopBtn.style.transform = "scale(1)";
    scrollTopBtn.style.background = "#667eea";
  });

  // Highlight current section in viewport
  const highlightCurrentSection = () => {
    const sections = document.querySelectorAll(".content-section");

    sections.forEach((section) => {
      const rect = section.getBoundingClientRect();

      if (rect.top >= 0 && rect.top <= window.innerHeight / 2) {
        section.style.borderLeft = "4px solid #667eea";
        section.style.paddingLeft = "1rem";
        section.style.transition = "all 0.3s ease";
      } else {
        section.style.borderLeft = "none";
        section.style.paddingLeft = "0";
      }
    });
  };

  window.addEventListener("scroll", highlightCurrentSection);

  // Add animation to MCQ options when selected
  const radioButtons = document.querySelectorAll('input[type="radio"]');

  radioButtons.forEach((radio) => {
    radio.addEventListener("change", function () {
      const label = this.parentElement;
      const allLabels = this.closest(".mcq-options").querySelectorAll("label");

      allLabels.forEach((lbl) => {
        lbl.style.background = "#f8f9fa";
        lbl.style.border = "none";
      });

      label.style.background = "#e3f2fd";
      label.style.border = "2px solid #667eea";
      label.style.transition = "all 0.3s ease";
    });
  });

  // Add confetti effect for correct answers
  function createConfetti() {
    const colors = ["#667eea", "#764ba2", "#ffc107", "#28a745"];

    for (let i = 0; i < 30; i++) {
      const confetti = document.createElement("div");
      confetti.style.cssText = `
                position: fixed;
                width: 10px;
                height: 10px;
                background: ${
                  colors[Math.floor(Math.random() * colors.length)]
                };
                left: ${Math.random() * 100}vw;
                top: -10px;
                opacity: 1;
                transform: rotate(${Math.random() * 360}deg);
                animation: confettiFall ${
                  2 + Math.random() * 2
                }s linear forwards;
                z-index: 9999;
                pointer-events: none;
            `;

      document.body.appendChild(confetti);

      setTimeout(() => confetti.remove(), 4000);
    }
  }

  // Add confetti animation style
  const style = document.createElement("style");
  style.textContent = `
        @keyframes confettiFall {
            to {
                top: 100vh;
                opacity: 0;
                transform: translateX(${Math.random() * 200 - 100}px) rotate(${
    Math.random() * 720
  }deg);
            }
        }
    `;
  document.head.appendChild(style);

  // Enhance check answer function to use confetti
  window.addEventListener("click", (e) => {
    if (e.target.classList.contains("check-btn")) {
      setTimeout(() => {
        const feedback = e.target.nextElementSibling;
        if (feedback && feedback.querySelector(".correct")) {
          createConfetti();
        }
      }, 100);
    }
  });

  // Add print styles
  const printStyle = document.createElement("style");
  printStyle.textContent = `
        @media print {
            .topic-nav, .scroll-top-btn, .copy-code-btn {
                display: none !important;
            }
            
            .topic-container {
                box-shadow: none;
                padding: 1rem;
            }
            
            .content-section {
                page-break-inside: avoid;
            }
        }
    `;
  document.head.appendChild(printStyle);

  // Console welcome message
  console.log(
    "%c🎨 CSS Learning Platform",
    "background: #667eea; color: white; font-size: 20px; padding: 10px; border-radius: 5px;"
  );
  console.log(
    "%c✨ Interactive features loaded!",
    "color: #667eea; font-size: 14px;"
  );
  console.log(
    "%cKeyboard shortcuts: Alt+← (Back) | Alt+→ (Next)",
    "color: #666; font-size: 12px;"
  );

  // Track time spent on page
  let startTime = Date.now();

  window.addEventListener("beforeunload", () => {
    const timeSpent = Math.round((Date.now() - startTime) / 1000);
    console.log(`Time spent on this page: ${timeSpent} seconds`);
  });
});
