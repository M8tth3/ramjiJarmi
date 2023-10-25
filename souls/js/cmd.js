let lineCounter = 1;

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
/* The commented code block is checking if the user input in the previous input line is equal to 'ls'.
If it is, it creates a new `<div>` element called `list`, creates a text node with the value of
`Player.name`, appends the text node to the `list` element, and inserts the `list` element before
the current input line in the `commandPrompt` container. Essentially, it is adding a new line of
output to the command prompt if the user input matches a specific command. */
        const cmdInput = document.getElementById(`userInput${lineCounter-1}`).value;
        var commandPrompt = document.getElementById(`inputLine${lineCounter}`);
        var line = document.getElementById(`label${lineCounter}`);
        let jasonText;
        if (cmdInput === 'ls')
        {
            const list = document.createElement("div");
            list.classList.add("output");
            outputText = Object.entries(testPlayer).map(([key, value]) => `${key}: ${value}`).join(" ");
            const output = document.createTextNode(outputText);
            const rooms = document.createTextNode("boss_room");
            const lineBreak = document.createElement("br");

            list.appendChild(document.createTextNode("**Stats**"))
            list.appendChild(document.createElement("br"));
            list.appendChild(output);
            list.appendChild(document.createElement("br"));
            list.appendChild(document.createTextNode("**Rooms**"))
            list.appendChild(document.createElement("br"));
            list.appendChild(rooms);
            list.append(lineBreak);
            list.appendChild(document.createTextNode("engage_in_jollyCoop.sh"));
            commandPrompt.insertBefore(list,line);
        }
        if (cmdInput === './engage_in_jollyCoop.sh') {
            const lineBreak = document.createElement("br");
            const cop = document.createElement("div");
            cop.classList.add("output");
            cop.appendChild(document.createTextNode("Who would you like to engage in jolly cooperation with?:"));
            cop.appendChild(lineBreak);
        
            // Fetch JSON data from the specified DuckDNS link
            fetch('https://ramjijarmi.duckdns.org/soulsList')
                .then(response => response.json())
                .then(data => {
                    // Iterate through the data and create options for each class
                    data.forEach(item => {
                        const option = document.createElement("option");
                        option.value = item.class_name.toLowerCase();
                        option.textContent = item.class_name;
                        cop.appendChild(option);
                    });
                })
                .catch(error => {
                    console.error("Error fetching data:", error);
                });
        
            commandPrompt.insertBefore(cop, line);
        }
        
        if (cmdInput === 'cd boss_room')
        {
            const list = document.createElement("div");
            list.classList.add("output");
            list.appendChild(document.createTextNode("bossBattle.sh"));
            
            commandPrompt.insertBefore(list,line);
           
        }
        if (cmdInput === './bossBattle.sh')
        {
            window.location.href = '/ramjiJarmi/souls/combat.html';
        }
    }
})
