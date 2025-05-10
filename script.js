const quotes = {
  inspiration: [
    "The best way to get started is to quit talking and begin doing. – Walt Disney",
    "Success is not in what you have, but who you are. – Bo Bennett",
    "Don't watch the clock; do what it does. Keep going. – Sam Levenson",
    "Believe you can and you're halfway there. – Theodore Roosevelt",
    "Your time is limited, don't waste it living someone else's life. – Steve Jobs",
  ],
  science: [
    "Science is magic that works. – Kurt Vonnegut",
    "Somewhere, something incredible is waiting to be known. – Carl Sagan",
    "The good thing about science is that it's true whether or not you believe in it. – Neil deGrasse Tyson",
    "Research is what I'm doing when I don't know what I'm doing. – Wernher von Braun",
    "The important thing is to never stop questioning. – Albert Einstein",
  ],
  love: [
    "Love is composed of a single soul inhabiting two bodies. – Aristotle",
    "To love and be loved is to feel the sun from both sides. – David Viscott",
    "You know you're in love when you can't fall asleep because reality is finally better than your dreams. – Dr. Seuss",
    "Love doesn't make the world go 'round. Love is what makes the ride worthwhile. – Franklin P. Jones",
    "Where there is love, there is life. – Mahatma Gandhi",
  ],
  travel: [
    "The world is a book, and those who do not travel read only one page. – Saint Augustine",
    "Travel makes one modest. You see what a tiny place you occupy in the world. – Gustave Flaubert",
    "Life is short and the world is wide.",
    "Take only memories, leave only footprints. – Chief Seattle",
    "Adventure is worthwhile. – Aesop",
  ],
  meme: [
    "When you open the fridge and forget what you wanted — story of my life.",
    "I paused my game to be here. You're welcome.",
    "I'm not lazy, I'm on energy-saving mode.",
    "404 – Motivation not found.",
    "Running late is my cardio.",
  ],
  joke: [
    "Why don't scientists trust atoms? Because they make up everything!",
    "Why did the scarecrow win an award? Because he was outstanding in his field.",
    "Parallel lines have so much in common… it's a shame they'll never meet.",
    "What do you call fake spaghetti? An impasta.",
    "Why can't you hear a pterodactyl go to the bathroom? Because the 'P' is silent.",
  ],
};

function getEle(Ele) {
  return document.getElementById(Ele);
}

const quoteBox = getEle("quoteBox");
const prevBtn = getEle("prevBtn");
const nextBtn = getEle("nextBtn");
const randomBtn = getEle("randomBtn");
const selectedCategory = getEle("selectedCategory");
const themeToggle = getEle("themeToggle");
const increaseFontBtn = getEle("increaseFont");
const decreaseFontBtn = getEle("decreaseFont");

let currentCategory = "";
let currentIndex = 0;
let currentQuotes = [];
let fontSize = 20;

function getRandomCategory() {
  const categories = Object.keys(quotes);
  return categories[Math.floor(Math.random() * categories.length)];
}

function initRandomQuote() {
  const randomCat = getRandomCategory();
  currentCategory = randomCat;
  currentQuotes = quotes[randomCat];
  currentIndex = Math.floor(Math.random() * currentQuotes.length);
  selectedCategory.value = randomCat;
  displayQuote();
}

function displayQuote() {
  if (currentQuotes.length > 0) {
    quoteBox.textContent = currentQuotes[currentIndex];
    quoteBox.style.fontSize = `${fontSize}px`;
  } else {
    quoteBox.textContent = "Please select a category";
  }
}

function updateQuotes() {
  currentCategory = selectedCategory.value;
  currentQuotes = quotes[currentCategory] || [];
  currentIndex = 0;
  displayQuote();
}

function toggleTheme() {
  document.body.dataset.theme = themeToggle.checked ? "dark" : "";
  localStorage.setItem("darkMode", themeToggle.checked);
}

function updateTheme() {
  const darkMode = localStorage.getItem("darkMode") === "true";
  themeToggle.checked = darkMode;
  document.body.dataset.theme = darkMode ? "dark" : "";
}

function setupEventListeners() {
  selectedCategory.addEventListener("change", () => {
    updateQuotes();
  });

  prevBtn.addEventListener("click", () => {
    if (currentQuotes.length > 0) {
      currentIndex =
        (currentIndex - 1 + currentQuotes.length) % currentQuotes.length;
      displayQuote();
    }
  });

  nextBtn.addEventListener("click", () => {
    if (currentQuotes.length > 0) {
      currentIndex = (currentIndex + 1) % currentQuotes.length;
      displayQuote();
    }
  });

  randomBtn.addEventListener("click", () => {
    if (currentQuotes.length > 0) {
      currentIndex = Math.floor(Math.random() * currentQuotes.length);
      displayQuote();
    }
  });

  themeToggle.addEventListener("change", toggleTheme);

  increaseFontBtn.addEventListener("click", () => {
    fontSize += 2;
    quoteBox.style.fontSize = `${fontSize}px`;
    localStorage.setItem("quoteFontSize", fontSize);
  });

  decreaseFontBtn.addEventListener("click", () => {
    fontSize = Math.max(fontSize - 2, 12);
    quoteBox.style.fontSize = `${fontSize}px`;
    localStorage.setItem("quoteFontSize", fontSize);
  });

  const savedFontSize = localStorage.getItem("quoteFontSize");
  if (savedFontSize) {
    fontSize = parseInt(savedFontSize);
    quoteBox.style.fontSize = `${fontSize}px`;
  }
}

setupEventListeners();
updateTheme();
initRandomQuote();
