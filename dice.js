document.addEventListener('DOMContentLoaded', () => {
    const diceList = document.getElementById('dice-list');
    const resultsDiv = document.getElementById('results');
    const totalDiv = document.getElementById('total');
    const diceTypeSelect = document.getElementById('dice-type');
    const addDiceButton = document.getElementById('add-dice');
    const rollDiceButton = document.getElementById('roll-dice');
    const resetDiceButton = document.getElementById('reset-dice');
    const modifierInput = document.getElementById('modifier');

    const dice = [];

    addDiceButton.addEventListener('click', () => {
        // prevents reload from selecting button
        event.preventDefault();
        const diceType = diceTypeSelect.value;
        const diceLabel = `d${diceType}`;
        const diceElement = document.createElement('div');
        diceElement.textContent = diceLabel;
        diceList.appendChild(diceElement);
        dice.push(parseInt(diceType));
    });

    rollDiceButton.addEventListener('click', () => {
        event.preventDefault();
        // adds results to the html
        resultsDiv.innerHTML = '';
        totalDiv.innerHTML = '';
        
        let total = 0;
        dice.forEach(die => {
            const result = rollDie(die);
            total += result;
            const resultElement = document.createElement('div');
            resultElement.textContent = `d${die}: ${result}`;
            resultsDiv.appendChild(resultElement);
        });

        const modifier = parseInt(modifierInput.value) || 0;
        // adds modifier to existing total variable
        total += modifier;
        // adds a plus sign for any modifier over zero
        const formattedModifier = modifier > 0 ? `+${modifier}` : `${modifier}`;

        totalDiv.textContent = `Total: ${total} (Modifier: ${formattedModifier})`;
    });

    resetDiceButton.addEventListener('click', (event) => {
        event.preventDefault();
        dice.length = 0; // Clear the dice array
        diceList.innerHTML = ''; // Clear the dice list display
        resultsDiv.innerHTML = ''; // Clear the results display
        totalDiv.innerHTML = ''; // Clear the total display
        modifierInput.value = 0; // Reset the modifier input
    });

    function rollDie(sides) {
        return Math.floor(Math.random() * sides) + 1;
    }
});