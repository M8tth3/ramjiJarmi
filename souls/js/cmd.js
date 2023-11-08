let lineCounter = 1;
var isInBossRoom = false;
var testPlayer = {
    name: 'testPlayer',
    class: 'knight',
    strength: 5,
    vitality: 3
}

var jason = {
    name: 'jason',
    class: 'warrior',
    strength: 5,
    vitality: 4
}
/**
 * The function "newInputLine" creates a new input line with a label and input field, disables the
 * previous input field, and appends the new input line to a container.
 */
function newInputLine()
{
    lineCounter++;
    //Gets container for the inputLines
    const cmd = document.getElementById("commandPrompt");
    //Creating a new input line
    const newInputLine = document.createElement("div");
    newInputLine.setAttribute("id",`inputLine${lineCounter}`);
    newInputLine.classList.add("inputLine");

    //Adds properties to the label TheChosenUndead~
    const label = document.createElement("label");
    label.setAttribute("for", `userInput${lineCounter}`);
    label.classList.add("label")
    label.setAttribute("id",`label${lineCounter}`);
    label.textContent = "TheChosenUndead~ ";

    //Creates new input with properties
    const input = document.createElement("input");
    input.classList.add("commandInput");
    input.setAttribute("id", `userInput${lineCounter}`);
    input.setAttribute("type", "text");

    //Creates Output    

    //Disable the previous input element
    const prevInput = document.getElementById(`userInput${lineCounter-1}`)
    if(prevInput && lineCounter > 1)
    {
        prevInput.setAttribute("disabled",true);
    }
        
    //appends the properties to the newInput line
    newInputLine.appendChild(label);
    newInputLine.appendChild(input);
    
    //Puts new input line into the cmd 
    cmd.appendChild(newInputLine);
    input.focus();
}
//Checks for when the user presses the 'enter key'
window.addEventListener("keypress", function (keyPressed) {
    if(keyPressed.key === 'Enter')
    {
        newInputLine();

        const cmdInput = document.getElementById(`userInput${lineCounter-1}`).value;
        var commandPrompt = document.getElementById(`inputLine${lineCounter}`);
        var line = document.getElementById(`label${lineCounter}`);
        if (cmdInput === 'ls' && isInBossRoom === false)
        {
            const list = document.createElement("div");
            list.classList.add("output");
            outputText = Object.entries(testPlayer).map(([key, value]) => `${key}: ${value}`).join(" ");
            const output = document.createTextNode(outputText);
            const rooms = document.createTextNode("boss_room");
            const lineBreak = document.createElement("br");

            list.appendChild(document.createTextNode("**Rooms**"))
            list.appendChild(document.createElement("br"));
            list.appendChild(rooms);
            list.append(lineBreak);
            list.appendChild(document.createTextNode("leaderBoard.sh"));
            commandPrompt.insertBefore(list,line);
        }
        else if (cmdInput === 'ls' && isInBossRoom === true)
        {
            const list = document.createElement("div");
            list.classList.add("output");
            list.appendChild(document.createTextNode("bossBattle.sh"));
            commandPrompt.insertBefore(list,line);
        }
        if (cmdInput === './leaderBoard.sh') {
            const lineBreak = document.createElement("br");
            const cop = document.createElement("div");
            cop.classList.add("output");
            cop.appendChild(document.createTextNode("Who would you like to engage in jolly cooperation with?:"));
            cop.appendChild(lineBreak);
        
            // Fetch JSON data from the specified link
            fetch('https://ramjijarmi.stu.nighthawkcodingsociety.com/soulsCharacterList')
                .then(response => response.json())
                .then(data => {
                    // Calculate a cumulative score for each character based on their stats
                    data.forEach(item => {
                        //get the overall stats so that it can be ordered
                        item.totalStats = item.health + item.attack + item.resistance + item.power;
                    });
        
                    // Sort the data based on the totalStats
                    data.sort((a, b) => b.totalStats - a.totalStats);
                    let i = 1;
                    // Iterate through the sorted data and display the individual stats of each character
                    data.forEach(item => {
                        const option = document.createElement("option");
                        option.value = item.class_name.toLowerCase();
                        option.textContent = `Numero ${i} | ${item.name} - ${item.class_name} | Gender: ${item.gender} | Attack: ${item.attack} | HP: ${item.health} | Resistance: ${item.resistance} | Power: ${item.power} | Total Level: ${item.totalStats}`;
                        //append to the div for displaying
                        cop.appendChild(option);
                        i++;
                    });
                })
                .catch(error => {
                    console.error("Error fetching data:", error);
                });
        
            commandPrompt.insertBefore(cop, line);
        }
        if (cmdInput === 'cd ..' && isInBossRoom === true)
        {
            isInBossRoom = false;
            const bossExit = document.createElement("div");
            bossExit.classList.add("output");
            const rooms = document.createTextNode("You have exited the boss room");
            const lineBreak = document.createElement("br");

            bossExit.appendChild(rooms);
            bossExit.append(lineBreak);
            commandPrompt.insertBefore(bossExit,line);
        }
            
        if (cmdInput === 'cd boss_room')
        {
            isInBossRoom = true;
            const bossMessage = document.createElement("div");
            bossMessage.classList.add("output");
            const rooms = document.createTextNode("You have entered the boss room");
            const lineBreak = document.createElement("br");

            bossMessage.appendChild(rooms);
            bossMessage.append(lineBreak);
            commandPrompt.insertBefore(bossMessage,line);

            
        }
        if (cmdInput === './bossBattle.sh')
        {
            window.location.href = '/ramjiJarmi/souls/combat.html';
        }
    }
})
