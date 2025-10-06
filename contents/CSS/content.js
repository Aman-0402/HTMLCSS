// Add interactive features to the CSS content page

// Add smooth scroll behavior
document.documentElement.style.scrollBehavior = 'smooth';

// Add copy functionality to code examples
document.addEventListener('DOMContentLoaded', () => {
    const codeBlocks = document.querySelectorAll('.code-example');
    
    codeBlocks.forEach(block => {
        // Create copy button
        const copyBtn = document.createElement('button');
        copyBtn.textContent = '📋 Copy';
        copyBtn.className = 'copy-btn';
        copyBtn.style.cssText = `
            position: absolute;
            top: 10px;
            right: 10px;
            background: #667eea;
            color: white;
            border: none;
            padding: 5px 10px;
            border-radius: 5px;
            cursor: pointer;
            font-size: 0.8rem;
            opacity: 0;
            transition: opacity 0.3s ease;
        `;
        
        // Make code block relative for absolute positioning
        block.style.position = 'relative';
        block.appendChild(copyBtn);
        
        // Show button on hover
        block.addEventListener('mouseenter', () => {
            copyBtn.style.opacity = '1';
        });
        
        block.addEventListener('mouseleave', () => {
            copyBtn.style.opacity = '0';
        });
        
        // Copy functionality
        copyBtn.addEventListener('click', () => {
            const code = block.textContent.replace('📋 Copy', '').trim();
            navigator.clipboard.writeText(code).then(() => {
                copyBtn.textContent = '✅ Copied!';
                setTimeout(() => {
                    copyBtn.textContent = '📋 Copy';
                }, 2000);
            });
        });
    });
    
    // Add card entrance animation on scroll
    const cards = document.querySelectorAll('.card');
    
    const observerOptions = {
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
    }, observerOptions);
    
    cards.forEach(card => {
        observer.observe(card);
    });
    
    // Add interactive demo to the demo box
    const demoBox = document.querySelector('.demo-box');
    if (demoBox) {
        demoBox.addEventListener('click', () => {
            const colors = [
                'linear-gradient(135deg, #667eea, #764ba2)',
                'linear-gradient(135deg, #f093fb, #f5576c)',
                'linear-gradient(135deg, #4facfe, #00f2fe)',
                'linear-gradient(135deg, #43e97b, #38f9d7)',
                'linear-gradient(135deg, #fa709a, #fee140)'
            ];
            
            const randomColor = colors[Math.floor(Math.random() * colors.length)];
            demoBox.style.background = randomColor;
        });
    }
    
    // Console message for developers
    console.log('%c🎨 CSS Content Page Loaded! ', 'background: #667eea; color: white; font-size: 16px; padding: 10px;');
    console.log('Tip: Hover over code examples to copy them!');
});