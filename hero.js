document.addEventListener('DOMContentLoaded', () => {
    const video = document.getElementById('myVideo');
    const heroH1 = document.querySelector('.hero-content h1');
    const heroH3 = document.querySelector('.hero-content h3'); // Select h3 separately
    const heroH4 = document.querySelector('.hero-content h4'); // Select h4 separately
    const heroContainer = document.querySelector('.hero-container');
    
    // Animate the video reveal and text after a brief delay
    setTimeout(() => {
        // Correct the final video transform
        video.style.transform = 'scale(1) translate(-50%, -50%)';
        video.style.top = '50%';
        video.style.left = '50%';

        // Fade in the h1 text
        heroH1.style.opacity = 1;
        heroH1.style.transform = 'translate(-50%, -50%)';

        // Fade in the h3 text with a delay
        heroH3.style.opacity = 1;
        heroH3.style.transform = 'translate(-50%, -50%)';

         // Fade in the h4 text with a delay
         heroH4.style.opacity = 1;
         heroH4.style.transform = 'translate(-50%, -50%)';
    }, 100);
    

    // Scroll-based shrinking animation
    window.addEventListener('scroll', () => {
        const scrollPosition = window.scrollY;
        
        const animationStart = 0;
        const animationEnd = 200;
        
        const clampedScroll = Math.min(Math.max(scrollPosition, animationStart), animationEnd);
        const progress = (clampedScroll - animationStart) / (animationEnd - animationStart);
        
        const startScale = 1;
        const endScale = 0.5;
        
        const startTranslateX = 0;
        const endTranslateX = 0;
        
        const startTranslateY = 0;
        const endTranslateY = -35;
        
        const startBorderRadius = 0;
        const endBorderRadius = 20;

        const currentScale = startScale + (endScale - startScale) * progress;
        const currentTranslateX = startTranslateX + (endTranslateX - startTranslateX) * progress;
        const currentTranslateY = startTranslateY + (endTranslateY - startTranslateY) * progress;
        const currentBorderRadius = startBorderRadius + (endBorderRadius - startBorderRadius) * progress;

        heroContainer.style.setProperty('--hero-scale', currentScale);
        heroContainer.style.setProperty('--hero-translate-x', `${currentTranslateX}%`);
        heroContainer.style.setProperty('--hero-translate-y', `${currentTranslateY}%`);
        heroContainer.style.setProperty('--hero-border-radius', `${currentBorderRadius}px`);
    });
});