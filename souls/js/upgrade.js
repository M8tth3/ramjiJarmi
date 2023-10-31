const playerData = JSON.parse(localStorage.getItem('playerData'));
const playerID = JSON.parse(localStorage.getItem('userID'));
console.log(playerID);
const attributesDiv = document.getElementById('attributes');
const upgradeButton = document.getElementById('upgradeButton');
const confirmButton = document.getElementById('confirmButton');

if (playerData) {
    for (const attribute in playerData) {
        if (!['name', 'gender', 'age', 'class_name'].includes(attribute)) {
            const attributeInput = document.createElement('div');
            attributeInput.classList.add('attribute');
            attributeInput.innerHTML = `
                <label>${attribute}</label>
                <input id="${attribute}" type="number" value="${playerData[attribute]}" min="${playerData[attribute]}" max="${playerData[attribute] + 5}">
            `;
            attributesDiv.appendChild(attributeInput);
        }
    }
}

let totalUpgrades = 0;

upgradeButton.addEventListener('click', function() {
    const attributeInputs = attributesDiv.querySelectorAll('input');
    let total = 0;
    attributeInputs.forEach(input => {
        total += parseInt(input.value);
    });

    if (total < 5) {
        attributeInputs.forEach(input => {
            input.removeAttribute('disabled');
        });
    } else {
        attributeInputs.forEach(input => {
            input.setAttribute('disabled', 'true');
        });
        upgradeButton.style.display = 'none';
        confirmButton.style.display = 'block';
    }
});

confirmButton.addEventListener('click', function() {
    const upgradedData ={

    }
    const attributeInputs = attributesDiv.querySelectorAll('input');
    attributeInputs.forEach(input => {
        upgradedData[input.id] = parseInt(input.value);
    });
    console.log(upgradedData);
    alert(JSON.stringify(upgradedData));
    const hp = {
        id: playerID,
        health: upgradedData.health
    };
    const atk = {
        id: playerID,
        attack: upgradedData.attack
    };
    const power = {
        id: playerID,
        power: upgradedData.power
    };
    const resistance = {
        id: playerID,
        resistance: upgradedData.resistance
    };
    //window.location.href = "/ramjiJarmi/souls/game.html";
    // Here you could save the upgraded data back to localStorage or send it to the server.
    const soulsCharEndpoint = `https://ramjijarmi.stu.nighthawkcodingsociety.com/soulsCharacter`;
    
    //New upgraded player Data
    charData = {
        name: playerData.name,
        gender: playerData.gender,
        age: playerData.age,
        class_name: playerData.charClass,
        health: upgradedData.health,
        attack: upgradedData.attack,
        resistance: upgradedData.resistance,
        power: upgradedData.power
    }
    //Stores the upgraded player data
    localStorage.setItem('playerData', JSON.stringify(charData));
    
    //Update the user's stats 
    function putCharData(charData)
    {
        const requestMethod = {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(charData)
        }
        //Fetches the page with the user's ID at the endpoint then makes a PUT request
        fetch(`${soulsCharEndpoint}?id=${playerID}`, requestMethod)
        .then(response => {
            if(!response.ok){
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            console.log('PUT request successful:', data);
            
        })
        .catch(error => {
            console.error('Problem with PUT request:', error);
        });
    }
    putCharData(hp);
    putCharData(atk);
    putCharData(resistance);
    putCharData(power);
    setTimeout(() => {
        window.location.href = "/ramjiJarmi/souls/game.html";
    },2000);
    

});