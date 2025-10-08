// Projects Data
const projects = [
    // Beginner Projects
    {
        id: 1,
        title: "Personal Portfolio Website",
        description: "Create a stunning personal website to showcase your skills and projects.",
        icon: "💎",
        category: "Beginner",
        features: [
            "About section with bio",
            "Skills showcase",
            "Projects gallery",
            "Contact form"
        ]
    },
    {
        id: 2,
        title: "Resume Webpage",
        description: "Design a professional online resume with structured layout.",
        icon: "💎",
        category: "Beginner",
        features: [
            "Education & experience",
            "Skills table",
            "Professional styling",
            "Downloadable version"
        ]
    },
    {
        id: 3,
        title: "Online Quiz Page",
        description: "Interactive quiz with multiple choice questions and instant feedback.",
        icon: "💎",
        category: "Beginner",
        features: [
            "Radio & checkbox inputs",
            "Score calculation",
            "Hover effects",
            "Results display"
        ]
    },
    {
        id: 4,
        title: "Product Landing Page",
        description: "Attractive landing page to showcase and sell products.",
        icon: "💎",
        category: "Beginner",
        features: [
            "Hero section",
            "Product features",
            "Call-to-action button",
            "Background images"
        ]
    },
    {
        id: 5,
        title: "Restaurant Menu Page",
        description: "Delicious menu display with categories and prices.",
        icon: "💎",
        category: "Beginner",
        features: [
            "Food categories",
            "Image gallery",
            "Pricing table",
            "Gradient backgrounds"
        ]
    },
    {
        id: 6,
        title: "Image Gallery",
        description: "Responsive photo gallery with modern grid layout.",
        icon: "💎",
        category: "Beginner",
        features: [
            "Grid/Flexbox layout",
            "Hover zoom effects",
            "Opacity transitions",
            "Responsive design"
        ]
    },
    {
        id: 7,
        title: "Blog Template",
        description: "Clean blog layout with semantic HTML structure.",
        icon: "💎",
        category: "Beginner",
        features: [
            "Header & navigation",
            "Article sections",
            "Sidebar widgets",
            "Footer layout"
        ]
    },
    {
        id: 8,
        title: "Online Registration Form",
        description: "User-friendly registration form with validation styling.",
        icon: "💎",
        category: "Beginner",
        features: [
            "Input fields & dropdowns",
            "Checkboxes & radio buttons",
            "Focus styles",
            "Hover effects"
        ]
    },
    {
        id: 9,
        title: "Pricing Table",
        description: "Compare pricing plans with attractive table design.",
        icon: "💎",
        category: "Beginner",
        features: [
            "3-4 pricing tiers",
            "Feature comparison",
            "Highlighted plan",
            "Styled borders"
        ]
    },
    {
        id: 10,
        title: "Photo Slideshow",
        description: "Manual image carousel with CSS animations.",
        icon: "💎",
        category: "Beginner",
        features: [
            "Multiple images",
            "Fade transitions",
            "CSS animations",
            "Navigation indicators"
        ]
    },
    // Intermediate Projects
    {
        id: 11,
        title: "Responsive Portfolio Website",
        description: "Advanced portfolio that adapts to all screen sizes.",
        icon: "💎",
        category: "Intermediate",
        features: [
            "Media queries",
            "Mobile-first design",
            "Breakpoints",
            "Flexible layouts"
        ]
    },
    {
        id: 12,
        title: "Navigation Bar with Dropdown",
        description: "Professional navbar with multi-level dropdown menus.",
        icon: "💎",
        category: "Intermediate",
        features: [
            "Horizontal layout",
            "Dropdown on hover",
            "Smooth transitions",
            "Mobile menu"
        ]
    },
    {
        id: 13,
        title: "Animated Login Page",
        description: "Beautiful login form with advanced CSS effects.",
        icon: "💎",
        category: "Intermediate",
        features: [
            "Box shadows",
            "Rounded corners",
            "Button transitions",
            "Input animations"
        ]
    },
    {
        id: 14,
        title: "E-commerce Product Card",
        description: "Interactive product display with hover effects.",
        icon: "💎",
        category: "Intermediate",
        features: [
            "Product image",
            "Price display",
            "Zoom on hover",
            "Add to cart button"
        ]
    },
    {
        id: 15,
        title: "Interactive Timeline",
        description: "Visual timeline showing milestones and events.",
        icon: "💎",
        category: "Intermediate",
        features: [
            "Vertical layout",
            "Pseudo-elements",
            "Milestone markers",
            "Connecting lines"
        ]
    },
    {
        id: 16,
        title: "CSS Image Hover Effects Gallery",
        description: "Showcase various transform effects on images.",
        icon: "💎",
        category: "Intermediate",
        features: [
            "Rotate effects",
            "Scale transforms",
            "Skew animations",
            "Filter effects"
        ]
    },
    {
        id: 17,
        title: "Gradient Background Website",
        description: "Multi-section site with stunning gradient backgrounds.",
        icon: "💎",
        category: "Intermediate",
        features: [
            "Linear gradients",
            "Radial gradients",
            "Color transitions",
            "Section dividers"
        ]
    },
    {
        id: 18,
        title: "CSS3 Animated Loader/Spinner",
        description: "Create smooth loading animations using keyframes.",
        icon: "💎",
        category: "Intermediate",
        features: [
            "@keyframes animation",
            "Spinning effect",
            "Infinite loop",
            "Multiple styles"
        ]
    },
    {
        id: 19,
        title: "Flip Card Effect",
        description: "3D card flip revealing information on both sides.",
        icon: "💎",
        category: "Intermediate",
        features: [
            "3D transforms",
            "rotateY animation",
            "Backface visibility",
            "Front & back content"
        ]
    },
    {
        id: 20,
        title: "Digital Business Card",
        description: "Professional digital card with modern design.",
        icon: "💎",
        category: "Intermediate",
        features: [
            "Profile section",
            "Contact info",
            "Box shadows",
            "Hover animations"
        ]
    }
];

// Shuffle function
function shuffleArray(array) {
    const newArray = [...array];
    for (let i = newArray.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
    }
    return newArray;
}

// Create project card HTML
function createProjectCard(project) {
    const levelClass = project.category === 'Beginner' ? 'level-beginner' : 'level-intermediate';
    
    return `
        <div class="project-card" data-id="${project.id}">
            <div class="project-card-inner">
                <div class="project-card-front">
                    <div class="project-icon">${project.icon}</div>
                   
                </div>
                <div class="project-card-back">
                    <h3 class="project-title">${project.title}</h3>
                    <p class="project-description">${project.description}</p>
                    <ul class="project-features">
                        ${project.features.map(feature => `<li>${feature}</li>`).join('')}
                    </ul>
                    <span class="project-level ${levelClass}">${project.category} Level</span>
                </div>
            </div>
        </div>
    `;
}

// Render projects
function renderProjects(projectsToRender) {
    const grid = document.getElementById('projectsGrid');
    grid.innerHTML = '';
    
    projectsToRender.forEach(project => {
        grid.innerHTML += createProjectCard(project);
    });
    
    // Add click event listeners to cards
    addCardListeners();
}

// Add click event listeners
function addCardListeners() {
    const cards = document.querySelectorAll('.project-card');
    
    cards.forEach(card => {
        card.addEventListener('click', function() {
            // Remove flipped class from all other cards
            cards.forEach(c => {
                if (c !== this) {
                    c.classList.remove('flipped');
                }
            });
            
            // Toggle flipped class on clicked card
            this.classList.toggle('flipped');
        });
    });
}

// Shuffle button functionality
function setupShuffleButton() {
    const shuffleBtn = document.getElementById('shuffleBtn');
    
    shuffleBtn.addEventListener('click', function() {
        // Add animation effect to button
        this.style.transform = 'rotate(360deg)';
        setTimeout(() => {
            this.style.transform = 'rotate(0deg)';
        }, 600);
        
        // Shuffle and re-render projects
        const shuffledProjects = shuffleArray(projects);
        
        // Fade out effect
        const grid = document.getElementById('projectsGrid');
        grid.style.opacity = '0';
        
        setTimeout(() => {
            renderProjects(shuffledProjects);
            grid.style.opacity = '1';
        }, 300);
    });
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', function() {
    // Shuffle projects on initial load
    const shuffledProjects = shuffleArray(projects);
    renderProjects(shuffledProjects);
    
    // Setup shuffle button
    setupShuffleButton();
    
    // Add smooth transition to grid
    const grid = document.getElementById('projectsGrid');
    grid.style.transition = 'opacity 0.3s ease';
});

// Close flipped cards when clicking outside
document.addEventListener('click', function(e) {
    if (!e.target.closest('.project-card')) {
        const cards = document.querySelectorAll('.project-card');
        cards.forEach(card => card.classList.remove('flipped'));
    }
});
