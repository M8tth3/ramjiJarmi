
let bossHealth = 1000;
let timeRemaining = 5;

function updateHealth() {
    const healthBar = document.getElementById('currentHealth');
    healthBar.style.width = (bossHealth / 10) + '%';
}

function attack1() {
    let damage = 50;
    bossHealth -= damage;
    // if (bossHealth < 0) bossHealth = 0;
    updateHealth();
    // document.getElementById('attack1Message').textContent = 'You did ' + damage + ' damage! Boss health is now ' + bossHealth;
    checkWinCondition();
    console.log(bossHealth);
}

function attack2() {
    let damage = 100;
    bossHealth -= damage;
    if (bossHealth < 0) bossHealth = 0;
    updateHealth();
    document.getElementById('attack2Message').textContent = 'You did ' + damage + ' damage! Boss health is now ' + bossHealth;
    checkWinCondition();
}

function attack3() {
    let damage = 25;
    bossHealth -= damage;
    if (bossHealth < 0) bossHealth = 0;
    updateHealth();
    document.getElementById('attack3Message').textContent = 'You did ' + damage + ' damage! Boss health is now ' + bossHealth;
    checkWinCondition();
}

function checkWinCondition() {
    if (bossHealth <= 0) {
        clearInterval(timerInterval);
        alert("You defeated the boss!");
        document.getElementById('buttons').style.display = 'none'; 
        //Switch to upgrade screen
        // window.location.href = "/ramjiJarmi/souls/upgrade.html";
    }
}

function updateTimerDisplay() {
    document.getElementById('timer').textContent = 'Time remaining: ' + timeRemaining + ' seconds';
}

const timerInterval = setInterval(function() {
    timeRemaining--;
    updateTimerDisplay();

    if (timeRemaining <= 0) {
        clearInterval(timerInterval);
        const bossImage = document.getElementById("bossImg");
        bossImage.style.filter = "grayscale(100%)";
        died = document.getElementById("died");
        died.style.display = "block";
        container = document.getElementById("youDied");
        document.getElementById('buttons').style.display = 'none';
        tryAgain = document.createElement("button");
        tryAgain.classList.add("button");
        tryAgain.innerText = "Try again"
        tryAgain.setAttribute("onclick","window.location.href='/ramjiJarmi/souls/game.html'");
        container.append(tryAgain);
        // window.location.href = "/ramjiJarmi/souls/game.html";
    }

}, 1000);

// Initialization
window.onload = function() {
    updateTimerDisplay();
}