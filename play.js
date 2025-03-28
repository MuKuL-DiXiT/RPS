// Game state variables
let x = 0, y = 0, z = 0;
let autoMode = true;

// DOM elements
const elements = {
    playButton: document.querySelector(".btn1"),
    resetButton: document.querySelector(".btn2"),
    revealButton: document.querySelector(".btn3"),
    modeButton: document.querySelector(".btn4"),
    manualButtons: document.querySelector(".manual"),
    countDisplay: document.querySelector("#inh2"),
    positiveDisplay: document.querySelector("#inh1"),
    negativeDisplay: document.querySelector("#inh3"),
    leftImage: document.querySelector("#left_"),
    rightImage: document.querySelector("#right_"),
    heading: document.querySelector(".heading")
};

// Game logic constants
const CHOICES = {
    0: {name: "Rock", image: "fist.png"},
    1: {name: "Paper", image: "paper.png"},
    2: {name: "Scissors", image: "scissor.png"}
};

// Event Listeners
elements.playButton.addEventListener("click", playRound);
elements.resetButton.addEventListener("click", resetGame);
elements.revealButton.addEventListener("click", revealScores);
elements.modeButton.addEventListener("click", toggleMode);
document.querySelector(".rock").addEventListener("click", () => manualPlay(0));
document.querySelector(".paper").addEventListener("click", () => manualPlay(1));
document.querySelector(".scissor").addEventListener("click", () => manualPlay(2));

function updateImages(leftChoice, rightChoice) {
    elements.leftImage.src = CHOICES[leftChoice].image;
    elements.rightImage.src = CHOICES[rightChoice].image;
}

function calculateResult(player, computer) {
    if (player === computer) return "draw";
    if ((player === 0 && computer === 2) || 
        (player === 1 && computer === 0) || 
        (player === 2 && computer === 1)) {
        return "win";
    }
    return "lose";
}

function updateScores(result) {
    elements.countDisplay.textContent = ++x;
    
    if (result === "win") y++;
    if (result === "lose") z--;
}

function playRound() {
    const leftChoice = Math.floor(Math.random() * 3);
    const rightChoice = Math.floor(Math.random() * 3);
    
    updateImages(leftChoice, rightChoice);
    updateScores(calculateResult(leftChoice, rightChoice));
}

function manualPlay(choice) {
    const computerChoice = Math.floor(Math.random() * 3);
    
    updateImages(choice, computerChoice);
    updateScores(calculateResult(choice, computerChoice));
}

function resetGame() {
    x = y = z = 0;
    elements.countDisplay.textContent = "0";
    elements.positiveDisplay.textContent = "Positive";
    elements.negativeDisplay.textContent = "Negative";
    elements.leftImage.src = "left.png";
    elements.rightImage.src = "right.png";
}

function revealScores() {
    elements.positiveDisplay.textContent = y;
    elements.negativeDisplay.textContent = z;
}

function toggleMode() {
    autoMode = !autoMode;
    
    elements.modeButton.textContent = autoMode ? "Manual" : "Auto Play";
    elements.heading.textContent = autoMode ? "Automated Play" : "Manual Play";
    elements.playButton.style.visibility = autoMode ? "visible" : "hidden";
    elements.manualButtons.style.display = autoMode ? "none" : "flex";
    
    if (autoMode) {
        elements.positiveDisplay.textContent = "Positive";
        elements.negativeDisplay.textContent = "Negative";
    }
}