// ==========================================
// HTML Course - Interactive Content Manager
// ==========================================

class CourseManager {
  constructor() {
    this.totalLessons = 12;
    this.completedLessons = new Set();
    this.storageKey = 'htmlCourse_completedLessons';
    
    this.init();
  }

  // ==========================================
  // Initialization
  // ==========================================
  init() {
    this.loadProgress();
    this.updateProgressBar();
    this.markCompletedCards();
    this.attachEventListeners();
    this.initIntersectionObserver();
    this.initKeyboardNavigation();
    this.addCardHoverEffects();
  }

  // ==========================================
  // Progress Management
  // ==========================================
  loadProgress() {
    try {
      const saved = localStorage.getItem(this.storageKey);
      if (saved) {
        this.completedLessons = new Set(JSON.parse(saved));
      }
    } catch (error) {
      console.warn('Could not load progress:', error);
    }
  }

  saveProgress() {
    try {
      localStorage.setItem(
        this.storageKey,
        JSON.stringify([...this.completedLessons])
      );
    } catch (error) {
      console.warn('Could not save progress:', error);
    }
  }

  markLessonComplete(lessonNumber) {
    this.completedLessons.add(lessonNumber);
    this.saveProgress();
    this.updateProgressBar();
    this.markCompletedCards();
    this.showCompletionNotification(lessonNumber);
  }

  toggleLessonCompletion(lessonNumber) {
    if (this.completedLessons.has(lessonNumber)) {
      this.completedLessons.delete(lessonNumber);
    } else {
      this.completedLessons.add(lessonNumber);
    }
    this.saveProgress();
    this.updateProgressBar();
    this.markCompletedCards();
  }

  resetProgress() {
    if (confirm('Are you sure you want to reset all progress? This cannot be undone.')) {
      this.completedLessons.clear();
      this.saveProgress();
      this.updateProgressBar();
      this.markCompletedCards();
      this.showNotification('Progress reset successfully!', 'info');
    }
  }

  // ==========================================
  // UI Updates
  // ==========================================
  updateProgressBar() {
    const progressBar = document.querySelector('.progress-bar');
    const progressText = document.querySelector('.progress-text');
    
    if (!progressBar || !progressText) return;

    const percentage = (this.completedLessons.size / this.totalLessons) * 100;
    
    // Update progress bar width with animation
    setTimeout(() => {
      progressBar.style.width = `${percentage}%`;
      progressBar.setAttribute('aria-valuenow', this.completedLessons.size);
    }, 100);

    // Update text
    progressText.textContent = `${this.completedLessons.size} of ${this.totalLessons} lessons completed`;

    // Add celebratory animation when course is complete
    if (this.completedLessons.size === this.totalLessons) {
      this.celebrateCompletion();
    }
  }

  markCompletedCards() {
    const cards = document.querySelectorAll('.card[data-lesson]');
    
    cards.forEach(card => {
      const lessonNumber = parseInt(card.getAttribute('data-lesson'));
      const isCompleted = this.completedLessons.has(lessonNumber);
      
      if (isCompleted) {
        card.setAttribute('data-completed', 'true');
        card.setAttribute('aria-label', 
          card.querySelector('a').getAttribute('aria-label') + ' - Completed'
        );
      } else {
        card.removeAttribute('data-completed');
      }
    });
  }

  // ==========================================
  // Event Listeners
  // ==========================================
  attachEventListeners() {
    // Card click tracking
    const cards = document.querySelectorAll('.card[data-lesson]');
    cards.forEach(card => {
      card.addEventListener('click', (e) => {
        const lessonNumber = parseInt(card.getAttribute('data-lesson'));
        this.handleCardClick(lessonNumber, e);
      });

      // Right-click context menu for marking complete
      card.addEventListener('contextmenu', (e) => {
        e.preventDefault();
        const lessonNumber = parseInt(card.getAttribute('data-lesson'));
        this.toggleLessonCompletion(lessonNumber);
      });
    });

    // Add reset button (Ctrl+Shift+R)
    document.addEventListener('keydown', (e) => {
      if (e.ctrlKey && e.shiftKey && e.key === 'R') {
        e.preventDefault();
        this.resetProgress();
      }
    });

    // Add debug info (Ctrl+Shift+D)
    document.addEventListener('keydown', (e) => {
      if (e.ctrlKey && e.shiftKey && e.key === 'D') {
        e.preventDefault();
        this.showDebugInfo();
      }
    });
  }

  handleCardClick(lessonNumber, event) {
    // Add ripple effect
    const card = event.currentTarget;
    this.createRipple(card, event);

    // Store the lesson being accessed
    try {
      sessionStorage.setItem('currentLesson', lessonNumber);
    } catch (error) {
      console.warn('Could not store current lesson:', error);
    }
  }

  // ==========================================
  // Visual Effects
  // ==========================================
  createRipple(element, event) {
    const ripple = document.createElement('div');
    const rect = element.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = event.clientX - rect.left - size / 2;
    const y = event.clientY - rect.top - size / 2;

    ripple.style.cssText = `
      position: absolute;
      width: ${size}px;
      height: ${size}px;
      border-radius: 50%;
      background: rgba(102, 126, 234, 0.4);
      left: ${x}px;
      top: ${y}px;
      pointer-events: none;
      transform: scale(0);
      animation: rippleEffect 0.6s ease-out;
      z-index: 0;
    `;

    // Add ripple animation
    if (!document.querySelector('#rippleStyle')) {
      const style = document.createElement('style');
      style.id = 'rippleStyle';
      style.textContent = `
        @keyframes rippleEffect {
          to {
            transform: scale(2);
            opacity: 0;
          }
        }
      `;
      document.head.appendChild(style);
    }

    const cardInner = element.querySelector('.card-inner');
    if (cardInner) {
      cardInner.style.position = 'relative';
      cardInner.appendChild(ripple);
      setTimeout(() => ripple.remove(), 600);
    }
  }

  addCardHoverEffects() {
    const cards = document.querySelectorAll('.card');
    
    cards.forEach(card => {
      card.addEventListener('mouseenter', (e) => {
        this.createParticles(card);
      });

      // 3D tilt effect
      card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const rotateX = (y - centerY) / 20;
        const rotateY = (centerX - x) / 20;
        
        card.style.transform = `
          translateY(-8px) 
          perspective(1000px) 
          rotateX(${rotateX}deg) 
          rotateY(${rotateY}deg)
        `;
      });

      card.addEventListener('mouseleave', () => {
        card.style.transform = '';
      });
    });
  }

  createParticles(element) {
    // Create subtle particle effect on hover
    if (Math.random() > 0.7) { // 30% chance
      const particle = document.createElement('div');
      const rect = element.getBoundingClientRect();
      
      particle.style.cssText = `
        position: fixed;
        width: 4px;
        height: 4px;
        background: rgba(102, 126, 234, 0.6);
        border-radius: 50%;
        left: ${rect.left + Math.random() * rect.width}px;
        top: ${rect.top + Math.random() * rect.height}px;
        pointer-events: none;
        z-index: 9999;
        animation: particleFloat 1s ease-out forwards;
      `;

      if (!document.querySelector('#particleStyle')) {
        const style = document.createElement('style');
        style.id = 'particleStyle';
        style.textContent = `
          @keyframes particleFloat {
            to {
              transform: translateY(-50px);
              opacity: 0;
            }
          }
        `;
        document.head.appendChild(style);
      }

      document.body.appendChild(particle);
      setTimeout(() => particle.remove(), 1000);
    }
  }

  // ==========================================
  // Intersection Observer for Scroll Animations
  // ==========================================
  initIntersectionObserver() {
    const options = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0)';
        }
      });
    }, options);

    // Observe lesson groups
    const groups = document.querySelectorAll('.lesson-group');
    groups.forEach(group => {
      group.style.opacity = '0';
      group.style.transform = 'translateY(30px)';
      group.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
      observer.observe(group);
    });
  }

  // ==========================================
  // Keyboard Navigation
  // ==========================================
  initKeyboardNavigation() {
    const cards = Array.from(document.querySelectorAll('.card'));
    let currentIndex = -1;

    document.addEventListener('keydown', (e) => {
      // Only activate when no input is focused
      if (document.activeElement.tagName === 'INPUT' || 
          document.activeElement.tagName === 'TEXTAREA') {
        return;
      }

      switch(e.key) {
        case 'ArrowRight':
        case 'ArrowDown':
          e.preventDefault();
          currentIndex = Math.min(currentIndex + 1, cards.length - 1);
          this.focusCard(cards[currentIndex]);
          break;
          
        case 'ArrowLeft':
        case 'ArrowUp':
          e.preventDefault();
          currentIndex = Math.max(currentIndex - 1, 0);
          this.focusCard(cards[currentIndex]);
          break;
          
        case 'Enter':
          if (currentIndex >= 0 && currentIndex < cards.length) {
            cards[currentIndex].querySelector('a').click();
          }
          break;
      }
    });
  }

  focusCard(card) {
    if (card) {
      card.scrollIntoView({ behavior: 'smooth', block: 'center' });
      card.querySelector('a').focus();
    }
  }

  // ==========================================
  // Notifications
  // ==========================================
  showCompletionNotification(lessonNumber) {
    const message = `Lesson ${lessonNumber} marked as complete! 🎉`;
    this.showNotification(message, 'success');
  }

  showNotification(message, type = 'info') {
    // Remove existing notification
    const existing = document.querySelector('.course-notification');
    if (existing) existing.remove();

    const notification = document.createElement('div');
    notification.className = `course-notification ${type}`;
    notification.textContent = message;
    
    notification.style.cssText = `
      position: fixed;
      top: 20px;
      right: 20px;
      background: ${type === 'success' ? '#48bb78' : type === 'info' ? '#4299e1' : '#667eea'};
      color: white;
      padding: 16px 24px;
      border-radius: 12px;
      box-shadow: 0 4px 16px rgba(0, 0, 0, 0.3);
      z-index: 10000;
      font-weight: 600;
      animation: slideInRight 0.3s ease, slideOutRight 0.3s ease 2.7s;
      max-width: 300px;
    `;

    if (!document.querySelector('#notificationStyle')) {
      const style = document.createElement('style');
      style.id = 'notificationStyle';
      style.textContent = `
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
      document.head.appendChild(style);
    }

    document.body.appendChild(notification);
    setTimeout(() => notification.remove(), 3000);
  }

  celebrateCompletion() {
    // Add confetti effect when all lessons are complete
    this.createConfetti();
    this.showNotification('🎊 Congratulations! You completed all lessons! 🎊', 'success');
    
    // Make progress bar pulse
    const progressBar = document.querySelector('.progress-bar');
    if (progressBar) {
      progressBar.style.animation = 'pulse 1s ease-in-out 3';
    }

    if (!document.querySelector('#celebrationStyle')) {
      const style = document.createElement('style');
      style.id = 'celebrationStyle';
      style.textContent = `
        @keyframes pulse {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.05); }
        }
      `;
      document.head.appendChild(style);
    }
  }

  createConfetti() {
    const colors = ['#667eea', '#764ba2', '#f093fb', '#48bb78', '#4299e1'];
    const confettiCount = 50;

    for (let i = 0; i < confettiCount; i++) {
      setTimeout(() => {
        const confetti = document.createElement('div');
        confetti.style.cssText = `
          position: fixed;
          width: 10px;
          height: 10px;
          background: ${colors[Math.floor(Math.random() * colors.length)]};
          left: ${Math.random() * 100}%;
          top: -20px;
          opacity: 1;
          z-index: 9999;
          pointer-events: none;
          animation: confettiFall ${2 + Math.random() * 2}s ease-in forwards;
          transform: rotate(${Math.random() * 360}deg);
        `;

        if (!document.querySelector('#confettiStyle')) {
          const style = document.createElement('style');
          style.id = 'confettiStyle';
          style.textContent = `
            @keyframes confettiFall {
              to {
                transform: translateY(100vh) rotate(${360 + Math.random() * 360}deg);
                opacity: 0;
              }
            }
          `;
          document.head.appendChild(style);
        }

        document.body.appendChild(confetti);
        setTimeout(() => confetti.remove(), 4000);
      }, i * 30);
    }
  }

  // ==========================================
  // Debug & Utilities
  // ==========================================
  showDebugInfo() {
    const info = `
HTML Course Progress Debug Info
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Total Lessons: ${this.totalLessons}
Completed: ${this.completedLessons.size}
Percentage: ${((this.completedLessons.size / this.totalLessons) * 100).toFixed(1)}%
Completed Lessons: ${[...this.completedLessons].sort((a, b) => a - b).join(', ') || 'None'}

Keyboard Shortcuts:
- Ctrl+Shift+R: Reset progress
- Ctrl+Shift+D: Show debug info
- Arrow keys: Navigate cards
- Enter: Open focused lesson
- Right-click card: Toggle completion
    `;
    
    console.log(info);
    alert(info);
  }

  // Export progress as JSON
  exportProgress() {
    const data = {
      completedLessons: [...this.completedLessons],
      totalLessons: this.totalLessons,
      percentage: (this.completedLessons.size / this.totalLessons) * 100,
      exportDate: new Date().toISOString()
    };
    
    console.log('Progress Data:', data);
    return data;
  }

  // Import progress from JSON
  importProgress(data) {
    if (data.completedLessons && Array.isArray(data.completedLessons)) {
      this.completedLessons = new Set(data.completedLessons);
      this.saveProgress();
      this.updateProgressBar();
      this.markCompletedCards();
      this.showNotification('Progress imported successfully!', 'success');
    }
  }
}

// ==========================================
// Initialize Course Manager
// ==========================================
let courseManager;

document.addEventListener('DOMContentLoaded', () => {
  courseManager = new CourseManager();
  
  // Expose to window for console access
  window.courseManager = courseManager;
  
  // Add smooth scroll behavior
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  // Log initialization
  console.log('%cHTML Course Manager Initialized! 🚀', 
    'color: #667eea; font-size: 16px; font-weight: bold;');
  console.log('%cKeyboard Shortcuts:', 'color: #764ba2; font-weight: bold;');
  console.log('• Ctrl+Shift+R: Reset progress');
  console.log('• Ctrl+Shift+D: Show debug info');
  console.log('• Arrow keys: Navigate between cards');
  console.log('• Enter: Open focused lesson');
  console.log('• Right-click card: Toggle completion status');
  console.log('%cAccess via: window.courseManager', 'color: #48bb78; font-weight: bold;');
});

// ==========================================
// Page Visibility API - Track when user returns
// ==========================================
document.addEventListener('visibilitychange', () => {
  if (!document.hidden && courseManager) {
    courseManager.updateProgressBar();
    courseManager.markCompletedCards();
  }
});

// ==========================================
// Prevent accidental page unload with unsaved work
// ==========================================
window.addEventListener('beforeunload', (e) => {
  // Only show warning if course is in progress (not 0% or 100%)
  if (courseManager && 
      courseManager.completedLessons.size > 0 && 
      courseManager.completedLessons.size < courseManager.totalLessons) {
    // Note: Modern browsers ignore custom messages
    e.preventDefault();
    e.returnValue = '';
  }
});