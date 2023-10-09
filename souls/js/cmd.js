let lineCounter = 1;
function validCommand(input)
{
    console.log(input);
    // const validCommands = ["cd","ls","clear"]
    // if (input in validCommands)
    // {

    // }
    // else
    // {
        
    // }
}
function newInputLine()
{
    lineCounter++;
    //Gets container for the inputLines
    const cmd = document.getElementById("commandPrompt");
    //Creating a new input line
    const newInputLine = document.createElement("div");
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
        validCommand(cmdInput);
    }
})
