class ScrollImageAnimation {
  constructor() {
    this.images = document.querySelectorAll('.image-item');
    this.animationSection = document.querySelector('.animation-section');
    this.isAnimating = false;
    
    this.init();
  }
  
  init() {
    this.setupInitialPositions();
    this.bindEvents();
    this.handleScroll();
  }
  
  setupInitialPositions() {
    // Store original positions and target positions
    this.images.forEach((image, index) => {
      const rect = image.getBoundingClientRect();
      image.dataset.originalX = 0;
      image.dataset.originalY = 0;
      
      // Add some initial random stacking
      const randomX = (Math.random() - 0.5) * 40;
      const randomY = (Math.random() - 0.5) * 40;
      const randomRotation = (Math.random() - 0.5) * 20;
      
      image.style.transform = `translate(${randomX}px, ${randomY}px) rotate(${randomRotation}deg)`;
    });
  }
  
  bindEvents() {
    window.addEventListener('scroll', () => {
      if (!this.isAnimating) {
        requestAnimationFrame(() => {
          this.handleScroll();
          this.isAnimating = false;
        });
        this.isAnimating = true;
      }
    });
    
    // Add resize handler
    window.addEventListener('resize', () => {
      this.handleScroll();
    });
  }
  
  handleScroll() {
    const scrollTop = window.pageYOffset;
    const windowHeight = window.innerHeight;
    const sectionTop = this.animationSection.offsetTop;
    const sectionHeight = this.animationSection.offsetHeight;
    
    // Calculate scroll progress through the animation section
    const scrollProgress = Math.max(0, Math.min(1, 
      (scrollTop - sectionTop + windowHeight) / (sectionHeight + windowHeight)
    ));
    
    // Apply easing function for smoother animation
    const easedProgress = this.easeOutCubic(scrollProgress);
    
    this.images.forEach((image, index) => {
      const targetX = parseFloat(image.dataset.targetX) || 0;
      const targetY = parseFloat(image.dataset.targetY) || 0;
      
      // Calculate current position based on scroll progress
      const currentX = targetX * easedProgress;
      const currentY = targetY * easedProgress;
      
      // Add rotation based on scroll progress
      const initialRotation = this.getInitialRotation(index);
      const targetRotation = easedProgress * 15 * (index % 2 === 0 ? 1 : -1);
      const currentRotation = initialRotation + (targetRotation - initialRotation) * easedProgress;
      
      // Apply transform
      image.style.transform = `translate(${currentX}px, ${currentY}px) rotate(${currentRotation}deg)`;
      
      // Add detached class when images start moving
      if (easedProgress > 0.1) {
        image.classList.add('detached');
      } else {
        image.classList.remove('detached');
      }
      
      // Scale effect based on scroll progress
      const scale = 1 + (easedProgress * 0.1);
      image.style.transform += ` scale(${scale})`;
      
      // Opacity effect
      const opacity = 0.7 + (easedProgress * 0.3);
      image.style.opacity = opacity;
    });
    
    // Update center text opacity
    const centerText = document.querySelector('.center-text');
    if (centerText) {
      const textOpacity = Math.max(0.3, 1 - (easedProgress * 0.7));
      centerText.style.opacity = textOpacity;
    }
  }
  
  getInitialRotation(index) {
    const rotations = [-5, 8, -3, 12, -8];
    return rotations[index] || 0;
  }
  
  easeOutCubic(t) {
    return 1 - Math.pow(1 - t, 3);
  }
}

// Initialize the animation when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  new ScrollImageAnimation();
});

// Add some interactive hover effects
document.addEventListener('DOMContentLoaded', () => {
  const images = document.querySelectorAll('.image-item');
  
  images.forEach(image => {
    image.addEventListener('mouseenter', () => {
      image.style.zIndex = '100';
      image.style.transition = 'transform 0.3s ease, z-index 0s';
    });
    
    image.addEventListener('mouseleave', () => {
      setTimeout(() => {
        image.style.zIndex = '';
        image.style.transition = 'transform 0.1s ease-out, z-index 0.3s';
      }, 300);
    });
  });
});


