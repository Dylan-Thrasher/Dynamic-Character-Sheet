let characterData = [];

function LoadSheet() {
    const file = "https://docs.google.com/spreadsheets/d/e/2PACX-1vTIvCXjJPwM1bnO-O9CmbB6VtbYLmVzBFpPohg3Bb2vfDxhoZwS-tJIZgyC2KagCiOGU3Owlky6jddx/pub?gid=0&single=true&output=csv"

    Papa.parse(file, {
        download: true,
        header: true,
        complete: function (results) {
            characterData = results.data;
            PopulateData(characterData);
        }
    })
}

function PopulateData(data) {
    let playerList;
    let uniquePlayers = [];
    for (var i = 0; i < data.length; i++) {
        // if player name does not exist, it will add the player to the list
        if (!uniquePlayers.includes(data[i].PlayerName))
            {uniquePlayers.push(data[i].PlayerName);
                playerList += '<option>' + data[i].PlayerName + '</option>'
            }
    }
    document.getElementById("players").innerHTML = playerList;
    LoadPlayer()
}

function LoadPlayer() {
    let selectedPlayer = document.getElementById("playerSelect").ariaValueMax;
    let playerCharacters;
    for (let i = 0; i < characterData.length; i++) {
        if (characterData[i].PlayerName == selectedPlayer)
            {
                playerCharacters += '<option>' + characterData[i].CharacterName + '</option>'
            }   
    }
    document.getElementById("characters").innerHTML = playerCharacters;
    LoadCharacter()
}

function LoadCharacter() {
    SetLevel();
    UpdateAbilityScores();
    UpdateSkillProficiency();
    UpdateHP();
    UpdateHitDice();
    LoadGear();
    UpdateAC();
}