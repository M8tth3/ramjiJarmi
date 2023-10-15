let lineCounter = 1;
var Player = {
    name: "Test Player",
    strength: 1,
    vitality: 2
}

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
    label.setAttribute("id","label");
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
        if (cmdInput === 'ls')
        {
            const list = document.createElement("div");
            const output = document.createTextNode(Player.name);
            list.appendChild(output);
            commandPrompt.appendChild(list);
        }
    }
})
