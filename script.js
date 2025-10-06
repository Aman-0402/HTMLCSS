// ====================================
// HTML CSS EBOOK - Main Script
// ====================================

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    console.log('Script loaded successfully!');
    
    // Initialize all features
    init();
  });
  
  // Initialize all functions
  function init() {
    setupSmoothScroll();
    setupCardInteractions();
    setupProgressTracking();
    setupThemeToggle();
  }
  
  // ====================================
  // SMOOTH SCROLLING
  // ====================================
  function setupSmoothScroll() {
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
      link.addEventListener('click', function(e) {
        const href = this.getAttribute('href');
        
        // Only smooth scroll for hash links
        if (href.startsWith('#') && href !== '#') {
          e.preventDefault();
          const target = document.querySelector(href);
          
          if (target) {
            target.scrollIntoView({
              behavior: 'smooth',
              block: 'start'
            });
          }
        }
      });
    });
  }
  
  // ====================================
  // CARD INTERACTIONS
  // ====================================
  function setupCardInteractions() {
    const cards = document.querySelectorAll('.card');
    
    cards.forEach(card => {
      // Add click sound effect (optional)
      card.addEventListener('click', function() {
        // You can add sound effects here later
        console.log('Card clicked:', this.querySelector('.card-title').textContent);
      });
      
      // Track card hover analytics (optional)
      card.addEventListener('mouseenter', function() {
        console.log('Card hovered:', this.querySelector('.card-title').textContent);
      });
    });
  }
  
  // ====================================
  // PROGRESS TRACKING
  // ====================================
  function setupProgressTracking() {
    // Check if localStorage is available
    if (typeof(Storage) !== "undefined") {
      console.log('Progress tracking enabled');
      
      // Get user progress from localStorage
      const userProgress = getProgress();
      console.log('Current progress:', userProgress);
    }
  }
  
  // Get user progress
  function getProgress() {
    const progress = localStorage.getItem('userProgress');
    return progress ? JSON.parse(progress) : {
      completedLessons: [],
      quizScores: {},
      lastVisited: null
    };
  }
  
  // Save user progress
  function saveProgress(data) {
    const currentProgress = getProgress();
    const updatedProgress = { ...currentProgress, ...data };
    localStorage.setItem('userProgress', JSON.stringify(updatedProgress));
    console.log('Progress saved:', updatedProgress);
  }
  
  // Mark lesson as completed
  function markLessonComplete(lessonId) {
    const progress = getProgress();
    
    if (!progress.completedLessons.includes(lessonId)) {
      progress.completedLessons.push(lessonId);
      saveProgress(progress);
      console.log(`Lesson ${lessonId} marked as complete`);
    }
  }
  
  // Save quiz score
  function saveQuizScore(quizId, score) {
    const progress = getProgress();
    progress.quizScores[quizId] = score;
    saveProgress(progress);
    console.log(`Quiz ${quizId} score saved: ${score}`);
  }
  
  // ====================================
  // THEME TOGGLE (Dark/Light Mode)
  // ====================================
  function setupThemeToggle() {
    // Get saved theme preference
    const savedTheme = localStorage.getItem('theme') || 'dark';
    document.documentElement.setAttribute('data-theme', savedTheme);
    
    console.log('Current theme:', savedTheme);
  }
  
  function toggleTheme() {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    
    console.log('Theme changed to:', newTheme);
  }
  
  // ====================================
  // QUIZ FUNCTIONALITY (Template)
  // ====================================
  const quizModule = {
    currentQuestion: 0,
    score: 0,
    
    // Start quiz
    startQuiz: function(quizData) {
      this.currentQuestion = 0;
      this.score = 0;
      console.log('Quiz started:', quizData);
      // Add quiz logic here
    },
    
    // Check answer
    checkAnswer: function(selectedAnswer, correctAnswer) {
      if (selectedAnswer === correctAnswer) {
        this.score++;
        return true;
      }
      return false;
    },
    
    // Next question
    nextQuestion: function() {
      this.currentQuestion++;
      // Add logic to display next question
    },
    
    // End quiz
    endQuiz: function(quizId) {
      saveQuizScore(quizId, this.score);
      console.log('Quiz ended. Final score:', this.score);
      // Show results page
    }
  };
  
  // ====================================
  // SEARCH FUNCTIONALITY (Template)
  // ====================================
  function searchContent(query) {
    console.log('Searching for:', query);
    // Add search logic here
    // Filter lessons, topics, etc.
  }
  
  // ====================================
  // UTILITY FUNCTIONS
  // ====================================
  
  // Debounce function (useful for search, scroll events)
  function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
      const later = () => {
        clearTimeout(timeout);
        func(...args);
      };
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
    };
  }
  
  // Format time (for progress tracking)
  function formatTime(seconds) {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  }
  
  // Show notification (for user feedback)
  function showNotification(message, type = 'info') {
    console.log(`[${type.toUpperCase()}]`, message);
    // You can add visual notifications here later
  }
  
  // ====================================
  // EXPORT FUNCTIONS (for use in other files)
  // ====================================
  window.ebookApp = {
    // Progress tracking
    getProgress,
    saveProgress,
    markLessonComplete,
    saveQuizScore,
    
    // Theme
    toggleTheme,
    
    // Quiz
    quiz: quizModule,
    
    // Search
    searchContent,
    
    // Utilities
    showNotification
  };
  
  console.log('All functions initialized and ready to use!');