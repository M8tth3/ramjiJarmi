
let timeRemaining = 30;
const bossAttacks = {'big swing':50, 'fast swing':30, 'sit on you':100};
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

function checkWinCondition() {
    if (bossHealth <= 0) {
        clearInterval(timerInterval);
        alert("You defeated the boss!");
        document.getElementById('buttons').style.display = 'none'; 
        //Switch to upgrade screen
        window.location.href = "/ramjiJarmi/souls/upgrade.html";
    }
}

function updatePlayerHealth(playerHealth)
{
    currentHealth = playerHealth
    const healthBar = document.getElementById('stats');
    const remainingHealth = "#".repeat(currentHealth) + ".".repeat(playerHealth-currentHealth);
    healthBar.textContent = "HP: [" + remainingHealth + "]";
}

function damageCalc(){
    return 70;
}
// Initialization
window.onload = function() {
    updateTimerDisplay();
}

//boss defeat and item drop
function defeatBoss() {
    if (bossHealth <= 0) {
        dropItem();
    }
}

function dropItem() {
    // Create an item element and set properties
    var item = document.createElement("img");
    item.setAttribute("src", "/ramjiJarmi/souls/images/bananaitem.png");
    //item.alt = "Dropped Item";
    //item.style.width = "100px";
    //item.style.height = "100px";

    // Append the item to the document
    document.getElementById('commandPrompt').appendChild(item);

    //add item to the player's inventory here:
}

var numChat = 0;
var tracker = 0;
function newChatMessage(attacker, damageMessage)
{
    // const attacker = '> ChosenUndead~ ';
    const message = document.createTextNode(`${attacker} ${damageMessage}`);
    const chat = document.getElementById('chat');

    const atkMessage = document.createElement('div');
    atkMessage.setAttribute('id', `${numChat}`);
    atkMessage.classList.add('newMessage');
    atkMessage.appendChild(message);
    chat.appendChild(atkMessage);
    const newChat = document.getElementById(numChat);
    newChat.style.padding = '6px';

    numChat++;
    const maxMessages = 13;
    if(numChat > maxMessages)
    {
        const messageToRemove = document.getElementById(tracker);
        messageToRemove.remove();
        tracker++;
    }
}
const bossImg = document.getElementById('bossImg');
function bossAttack()
{
    //Takes the key names of the dictionary and makes it into a list
    const attackKeys = Object.keys(bossAttacks);
    //Picks a random index number based on the length of the array of key names
    const randomIndex = Math.floor(Math.random()*attackKeys.length);
    //Gets a random key name
    const randomAttackKey = attackKeys[randomIndex];
    //Puts the random key name into bossAttacks to get the damage value :)
    var bossAttack = bossAttacks[randomAttackKey];
    console.log(bossAttack);
    newChatMessage('> Boss~ ', `did ${bossAttack} damage`)
}
nums = 0;
window.addEventListener("keypress", function (keyPressed) {
    if(keyPressed.key === 'f')
    {
        nums +=1;
        newChatMessage('> ChosenUndead~ ', ' inflicted 70 damage');  
        bossImg.classList.add('bossDamage');

        setTimeout(() => {
            bossImg.classList.remove('bossDamage');
        },300);
        setTimeout(() => {
            bossAttack();
        },2000);
        if (nums === 10)
    {
        window.location.href = "/ramjiJarmi/souls/upgrade.html";
    }
    }})

updatePlayerHealth(100);
//Boss attacks
