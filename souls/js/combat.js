// Retrieve the user's stats from local storage and parse them from JSON
const playerData = JSON.parse(localStorage.getItem('playerData'));
let playerDamage;
const atk = playerData.attack;
const health = playerData.health;
const res = playerData.resistance;
const power = playerData.power;
let currentHealth = health;

// Selection of bosses with their image paths
const bosses = [
  '/ramjiJarmi/souls/images/lion.png',
  '/ramjiJarmi/souls/images/golem.png',
  '/ramjiJarmi/souls/images/boss.png'
];
// Randomly select a boss
const bossIndex = Math.floor(Math.random() * bosses.length);
const theBoss = bosses[bossIndex];

// Boss Stats - Dictionary with attack types and their damage values
const bossAttacks = {
  'BIG SWING': 120,
  'FAST SWING': 125,
  'SMASH': 145
};
var bossHealth = 500;

// Variables for chat functionality
var numChat = 0;
var tracker = 0;

// Call a function to update the UI with player's stats
updateUIStats();

// Set the boss image in the document
theBossImage = document.getElementById('bossImg');
theBossImage.setAttribute("src", `${theBoss}`);

// Function to add a new chat message for the combat log
function newChatMessage(attacker, damageMessage) {
  // Create the text node and div element for the new message
  const message = document.createTextNode(`${attacker} ${damageMessage}`);
  const chat = document.getElementById('chat');
  const atkMessage = document.createElement('div');
  atkMessage.setAttribute('id', `${numChat}`);
  atkMessage.classList.add('newMessage');
  atkMessage.appendChild(message);
  chat.appendChild(atkMessage);
  
  // Style the new chat message with padding
  const newChat = document.getElementById(numChat);
  newChat.style.padding = '6px';

  // Increment chat message count
  numChat++;
  
  // If chat messages exceed maxMessages, remove the oldest one
  const maxMessages = 13;
  if (numChat > maxMessages) {
    const messageToRemove = document.getElementById(tracker);
    messageToRemove.remove();
    tracker++;
  }
}

// Boss attack function
function bossAttack() {
  const charImg = document.getElementById('charImg');
  const attackKeys = Object.keys(bossAttacks); // Get keys from bossAttacks dictionary
  const randomIndex = Math.floor(Math.random() * attackKeys.length); // Select random attack
  const randomAttackKey = attackKeys[randomIndex];
  var bossAttack = bossAttacks[randomAttackKey];
  
  // Display the boss attack and its damage after resistance
  newChatMessage('Boss~ ', `${randomAttackKey} did ${bossAttack - res} damage`);
  
  // Subtract damage from player's current health
  currentHealth -= (bossAttack - res);
  updateUIStats();
  
  // Add visual feedback when player gets attacked
  charImg.classList.add('bossDamage');
  setTimeout(() => {
    charImg.classList.remove('bossDamage');
  }, 200);

  // Check if player is dead and end the game
  if (currentHealth <= 0) {
    charImg.style.filter = "grayscale(100%)"; // Visual feedback for player's death
    bossImg.style.filter = "grayscale(100%)"; // Visual feedback for game over
    newChatMessage("YOU DIED", '');
    canPress = false; // Disable further keypresses
    setTimeout(() => {
      window.location.href = "/ramjiJarmi/souls/game.html"; // Redirect to game over page
    }, 2000);
  }
}

// Initialize boss roar message
setTimeout(() => {
  newChatMessage('> RAAHHHHH', '');
}, 1000);

// Function to stop the boss from attacking
function stopBossAttack() {
  clearTimeout(bossAttackTimeout);
}

// Variable to control whether the player can attack
let canPress = true;

// Event listener for keypresses in the window
window.addEventListener("keypress", function (keyPressed) {
  if (keyPressed.key === 'f' && canPress === true) {
    // Calculate damage from the player to the boss
    var playerDamage = Math.round(atk * power * (Math.floor(Math.random() * (0.14 - 0.1)) + 0.1));
    newChatMessage('> ChosenUndead~ ', ` inflicted ${playerDamage} damage`);
    
    // Visual feedback for boss damage
    bossImg.classList.add('bossDamage');
    bossHealth -= playerDamage; // Subtract damage from boss's health
    setTimeout(() => {
      bossImg.classList.remove('bossDamage');
    }, 300);
    
    // Check if the boss is defeated and end the battle
    if (bossHealth <= 0) {
      canPress = false;
      newChatMessage('Boss~', 'Ahhhhhh');
      newChatMessage('VICTORY!', '');
      stopBossAttack(); // Stop the boss attack cycle
      setTimeout(() => {
        window.location.href = "/ramjiJarmi/souls/itemDrop.html"; // Redirect to victory page
      }, 3000);
    }
  }
});

// Function to initiate boss attacks at random intervals
function bossAttackInterval() {
  const minInterval = 1000;
  const maxInterval = 3000;

  // Function to perform an attack and schedule the next one
  function attackWithRandomInterval() {
    const randomInterval = Math.floor(Math.random() * (maxInterval - minInterval)) + minInterval;
    bossAttack();
    // Continue attacking at intervals if both the player and boss are alive
    if (currentHealth > 0 && bossHealth > 0) {
      bossAttackTimeout = setTimeout(attackWithRandomInterval, randomInterval);
    }
  }

  attackWithRandomInterval();
}

// Start boss attacks after a delay
setTimeout(() => {
  bossAttackInterval();
}, 2000);

// Function to update the player's stats in the UI
function updateUIStats() {
  const statsDiv = document.getElementById('stats');
  const statsHTML = `
    <p>Health: ${currentHealth}</p>
    <p>Attack: ${atk}</p>
    <p>Resistance: ${res}</p>
    <p>Power: ${power}</p>
  `;
  statsDiv.innerHTML = statsHTML;
}