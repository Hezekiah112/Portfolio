class CardStack {
  constructor() {
    this.cards = document.querySelectorAll('.card');
    this.upBtn = document.getElementById('upBtn');
    this.downBtn = document.getElementById('downBtn');
    this.currentIndex = 0;
    this.isAnimating = false;
    
    this.init();
  }
  
  init() {
    this.updateCardPositions();
    this.bindEvents();
    this.updateButtonStates();
  }
  
  bindEvents() {
    this.upBtn.addEventListener('click', () => this.navigateUp());
    this.downBtn.addEventListener('click', () => this.navigateDown());
  }
  
  updateCardPositions() {
    this.cards.forEach((card, index) => {
      card.classList.remove('active', 'moving-up', 'moving-down');
      
      const relativeIndex = index - this.currentIndex;
      
      if (relativeIndex === 0) {
        // Current card
        card.style.zIndex = 3;
        card.style.transform = 'translateY(0) scale(1)';
        card.style.opacity = '1';
        card.classList.add('active');
      } else if (relativeIndex === 1) {
        // Next card
        card.style.zIndex = 2;
        card.style.transform = 'translateY(10px) scale(0.95)';
        card.style.opacity = '0.8';
      } else if (relativeIndex === 2) {
        // Third card
        card.style.zIndex = 1;
        card.style.transform = 'translateY(20px) scale(0.9)';
        card.style.opacity = '0.6';
      } else if (relativeIndex > 2) {
        // Hidden cards behind
        card.style.zIndex = 0;
        card.style.transform = 'translateY(30px) scale(0.85)';
        card.style.opacity = '0.4';
      } else if (relativeIndex < 0) {
        // Previous cards (hidden)
        card.style.zIndex = 0;
        card.style.transform = 'translateY(-20px) scale(1.05)';
        card.style.opacity = '0';
      }
    });
  }
  
  navigateDown() {
    if (this.isAnimating || this.currentIndex >= this.cards.length - 1) return;
    
    this.isAnimating = true;
    const currentCard = this.cards[this.currentIndex];
    
    // Animate current card moving up
    currentCard.classList.add('moving-up');
    
    setTimeout(() => {
      this.currentIndex++;
      this.updateCardPositions();
      this.updateButtonStates();
      
      // Add new card sliding in from behind
      const newCard = this.cards[this.currentIndex];
      newCard.style.transform = 'translateY(100%) scale(0.8)';
      newCard.style.opacity = '0';
      
      setTimeout(() => {
        newCard.style.transition = 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
        this.updateCardPositions();
        this.isAnimating = false;
      }, 50);
    }, 300);
  }
  
  navigateUp() {
    if (this.isAnimating || this.currentIndex <= 0) return;
    
    this.isAnimating = true;
    
    // Prepare previous card to slide in from behind
    const previousCard = this.cards[this.currentIndex - 1];
    previousCard.style.transform = 'translateY(-100%) scale(1.1)';
    previousCard.style.opacity = '0';
    previousCard.style.zIndex = 4;
    
    setTimeout(() => {
      this.currentIndex--;
      
      // Animate previous card sliding down
      previousCard.style.transition = 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
      this.updateCardPositions();
      this.updateButtonStates();
      
      setTimeout(() => {
        this.isAnimating = false;
      }, 600);
    }, 50);
  }
  
  updateButtonStates() {
    this.upBtn.disabled = this.currentIndex <= 0;
    this.downBtn.disabled = this.currentIndex >= this.cards.length - 1;
  }
}

// Initialize the card stack when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  new CardStack();
});

// Add smooth scrolling for card content
document.querySelectorAll('.card').forEach(card => {
  card.addEventListener('wheel', (e) => {
    e.stopPropagation();
  });
});
