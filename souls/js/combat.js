let timeRemaining = 30;
const bossAttacks = {'big swing':50, 'fast swing':30, 'sit on you':100};
function updateHealth() {
    const healthBar = document.getElementById('currentHealth');
    healthBar.style.width = (bossHealth / 10) + '%';
}

function damageCalc(){
    return 70;
}
// Initialization
window.onload = function() {
    updateTimerDisplay();
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

// Function to flash the HP bar
function flashHPBar() {
    const hpFill = document.getElementById('hpFill');
    hpFill.classList.add('flash');
    setTimeout(() => {
        hpFill.classList.remove('flash');
    }, 500); // Adjust the duration of the flash as needed
}

nums = 0;

window.addEventListener("keypress", function (keyPressed) {
    if(keyPressed.key === 'f')
    {
        newChatMessage('> ChosenUndead~ ', ' inflicted 70 damage');  
        bossImg.classList.add('bossDamage');
        flashHPBar();

        setTimeout(() => {
            bossImg.classList.remove('bossDamage');
        },300);
        setTimeout(() => {
            bossAttack();
        },2000);
        if (nums === 10)
    {
        window.location.href = "/ramjiJarmi/souls/itemDrop.html"
    }
    }})

updatePlayerHealth(100);
//Boss attacks
