//Retrieve the user's stats
const playerData = JSON.parse(localStorage.getItem('playerData'));
let playerDamage;
const atk = playerData.attack;
const health = playerData.health;
const res = playerData.resistance;
const power = playerData.power;
let currentHealth = health;

//Boss Stats
const bossAttacks = {'BIG SWING':120, 'FAST SWING':125, 'CLUB SMASH':145};
var bossHealth = 500;
//
var numChat = 0;
var tracker = 0;

updateUIStats();
function newChatMessage(attacker, damageMessage)
{
    
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
    const charImg = document.getElementById('charImg');
    //Takes the key names of the dictionary and makes it into a list
    const attackKeys = Object.keys(bossAttacks);
    //Picks a random index number based on the length of the array of key names
    const randomIndex = Math.floor(Math.random()*attackKeys.length);
    //Gets a random key name
    const randomAttackKey = attackKeys[randomIndex];
    //Puts the random key name into bossAttacks to get the damage value :)
    var bossAttack = bossAttacks[randomAttackKey];
    // console.log(bossAttack);
    newChatMessage('Boss~ ', `${randomAttackKey} did ${bossAttack-res} damage`)
    currentHealth -= (bossAttack-res);
    updateUIStats();
    //Add filter when player gets attacked
    charImg.classList.add('bossDamage');
    setTimeout(() => {
        charImg.classList.remove('bossDamage');
    },200);
    if (currentHealth <= 0)
    {
        charImg.style.filter = "grayscale(100%)";
        bossImg.style.filter = "grayscale(100%)";
        newChatMessage("YOU DIED", '');
        canPress = false;
        setTimeout(() => {
            window.location.href = "/ramjiJarmi/souls/game.html";
        },2000);
    }
}
setTimeout(() => {
    newChatMessage('> RAAHHHHH', '');
},1000);

let canPress = true;
window.addEventListener("keypress", function (keyPressed) {
    if(keyPressed.key === 'f' && canPress === true)
    {
        var playerDamage = atk*power*(Math.floor(Math.random()*(0.14-0.1)) + 0.1);
        newChatMessage('> ChosenUndead~ ', ` inflicted ${playerDamage} damage`);  
        bossImg.classList.add('bossDamage');
        bossHealth -= playerDamage;
        console.log(bossHealth);
        setTimeout(() => {
            bossImg.classList.remove('bossDamage');
        },300);
        if (bossHealth <= 0)
        {
            canPress = false;
            newChatMessage('Boss~', 'Ahhhhhh');
            newChatMessage('VICTORY!','');
            setTimeout(() => {
                window.location.href="/ramjiJarmi/souls/upgrade.html";
            },3000);
        }
    }})

//Boss attack at an interval
function bossAttackInterval(){
    const minInterval = 1000;
    const maxInterval = 3000;

    function attackWithRandomInterval(){
        const randomInterval = Math.floor(Math.random()*(maxInterval-minInterval)) + minInterval;
        bossAttack();
        if (currentHealth > 0 && bossHealth > 0){
            setTimeout(attackWithRandomInterval,randomInterval);
        }
    }
    attackWithRandomInterval();
}
setTimeout(() => {
    bossAttackInterval();
},2000);
//UI

function updateUIStats(){
    const statsDiv = document.getElementById('stats');
    const statsHTML = `
        <p>Attack: ${atk}</p>
        <p>Health: ${currentHealth}</p>
        <p>Resistance: ${res}</p>
        <p>Power: ${power}</p>
    `;
    statsDiv.innerHTML = statsHTML;
}



