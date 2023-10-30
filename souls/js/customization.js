let hp, atk, res, pwr;
const selectElement = document.getElementById("charClass");
// Checks when the user changes the option and selects a class
selectElement.addEventListener("change", function() {
    // Get the selected value
    const selectedClass = selectElement.value;
    
    
    // Get a reference to the result div
    const resultDiv = document.getElementById("result");
    // Make an API request to the soulsList database
    fetch(`https://ramjijarmi.stu.nighthawkcodingsociety.com/soulsList`)
        .then(response => response.json())
        .then(data => {
            // Find the data of the specific class selected
            const selectedData = data.find(item => item.class_name.toLowerCase() === selectedClass);

            // Put the class data into the html
            if (selectedData) {
                class_name = selectedData.class_name;
                hp = selectedData.health;
                atk = selectedData.attack;
                res = selectedData.resistance;
                pwr = selectedData.power;
                resultDiv.innerHTML = `
                    <h2>${selectedData.class_name}</h2>
                    <p>Health: ${selectedData.health}</p>
                    <p>Attack: ${selectedData.attack}</p>
                    <p>Resistance: ${selectedData.resistance}</p>
                    <p>Power: ${selectedData.power}</p>
                `;
            } else {
                //If the data isn't found
                resultDiv.innerHTML = "Class not found.";
            }
        })
});

function getClass()
{
    const charClass = document.getElementById("charClass");
    //Gets the option that is currently selected for the class
    let currentClass = charClass.selectedOptions[0].text;
    return currentClass;
}
function checkStats()
{
    //Fetch the values that the user inputted
    const name = document.getElementById("name").value;
    const charClass = getClass();
    const sex = document.getElementById("sex").value;
    const age = document.getElementById("age").value;
    
    const soulsCharEndpoint = `https://ramjijarmi.stu.nighthawkcodingsociety.com/soulsCharacter`;
    charData = {
        name: name,
        gender: sex,
        age: age,
        class_name: charClass,
        health: hp,
        attack: atk,
        resistance: res,
        power: pwr
    };
    const requestMethod = {
        method: 'POST',
        mode: 'cors',
        headers: {
            'Content-Type': 'application/json',
            // 'Access-Control-Allow-Origin': '*'
        },
        body: JSON.stringify(charData)
    }

    fetch(soulsCharEndpoint, requestMethod)
        .then(response => {
            if(!response.ok){
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            console.log('POST request successful:', data);
            window.location.href = "/ramjiJarmi/souls/game.html";
            localStorage.setItem('playerData', JSON.stringify(charData));
        })
        .catch(error => {
            console.error('Problem with post request:', error);
        });
        
}