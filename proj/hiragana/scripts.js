const flashcards = [
  { front: 'img/card1.png', back: 'img/card1a.png' },
  { front: 'img/card2.png', back: 'img/card2a.png' },
  { front: 'img/card3.png', back: 'img/card3a.png' },
  // Add more card pairs as needed
];

let currentCardIndex = 0;

function createFlashcards() {
  const container = document.getElementById('flashcard-container');
  flashcards.forEach((card, index) => {
    const flashcard = document.createElement('div');
    flashcard.className = 'flashcard';
    if (index === 0) flashcard.classList.add('active');
    flashcard.innerHTML = `
      <div class="flashcard-inner" onclick="flipCard(this)">
        <div class="flashcard-front">
          <img src="${card.front}" alt="Character ${index + 1}">
        </div>
        <div class="flashcard-back">
          <img src="${card.back}" alt="Explanation for Character ${index + 1}">
        </div>
      </div>
    `;
    container.appendChild(flashcard);
  });
}

function flipCard(element) {
  element.parentElement.classList.toggle('flipped');
}

function showCard(index) {
  const cards = document.querySelectorAll('.flashcard');
  cards.forEach((card, i) => {
    card.classList.remove('active', 'flipped');
    if (i === index) {
      card.classList.add('active');
    }
  });
  updateNavigationButtons();
}

function nextCard() {
  if (currentCardIndex < flashcards.length - 1) {
    currentCardIndex++;
    showCard(currentCardIndex);
  }
}

function prevCard() {
  if (currentCardIndex > 0) {
    currentCardIndex--;
    showCard(currentCardIndex);
  }
}

function updateNavigationButtons() {
  document.getElementById('prevBtn').disabled = currentCardIndex === 0;
  document.getElementById('nextBtn').disabled = currentCardIndex === flashcards.length - 1;
}

// Initialize the flashcards on page load
document.addEventListener('DOMContentLoaded', () => {
  createFlashcards();
  updateNavigationButtons();
});
