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
    for (let i = 0; i < data.length; i++) {
        // if player name does not exist, it will add the player to the list
        if (!uniquePlayers.includes(data[i].PlayerName)) {
            uniquePlayers.push(data[i].PlayerName);
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
        if (characterData[i].PlayerName == selectedPlayer) {
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

function SetLevel() {
    let selectedCharacter = document.getElementById("characterSelect").value;
    for (let i = 0; i < characterData.length; i++) {
        if (characterData[i].CharacterName == selectedCharacter) {
            document.getElementById("playerLevel").value = characterData[i].Level;
            SetProficiencyBonus();
            return;
        }
    }
}

function SetProficiencyBonus() {
    let level = document.getElementById("playerLevel").value;
    document.getElementById("profBonus").value = Math.floor(2 + ((level - 1) / 4));
}

function UpdateAbilityScores() {
    let selectedCharacter = document.getElementById("characterSelected").value;
    for (let i = 0; i < characterData.length; i++) {
        if (characterData[i].CharacterName == selectedCharacter) {
            document.getElementById("strScore").value = characterData[i].STR;
            document.getElementById("dexScore").value = characterData[i].DEX;
            document.getElementById("conScore").value = characterData[i].CON;
            document.getElementById("intScore").value = characterData[i].INT;
            document.getElementById("wisScore").value = characterData[i].WIS;
            document.getElementById("chaScore").value = characterData[i].CHA;
            UpdateModifiers();
            return;
        }
    }
}

function UpdateModifiers() {
    let strScore = document.getElementById("strScore").value;
    document.getElementById("strMod").value = Math.floor((strScore - 10) / 2);
    let dexScore = document.getElementById("dexScore").value;
    document.getElementById("dexMod").value = Math.floor((dexScore - 10) / 2);
    let conScore = document.getElementById("conScore").value;
    document.getElementById("conMod").value = Math.floor((conScore - 10) / 2);
    let intScore = document.getElementById("intScore").value;
    document.getElementById("intMod").value = Math.floor((intScore - 10) / 2);
    let wisScore = document.getElementById("wisScore").value;
    document.getElementById("wisMod").value = Math.floor((wisScore - 10) / 2);
    let chaScore = document.getElementById("chaScore").value;
    document.getElementById("chaMod").value = Math.floor((chaScore - 10) / 2);
    SetSkills();
    UpdateAC();
}

function UpdateSkillProficiency() {
    let selectedCharacter = document.getElementById("characterSelect").value;
    for (let i = 0; i < characterData.length; i++) {
        if (characterData[i].CharacterName == selectedCharacter) {
            document.getElementById("acroProf").checked = IsTrue(characterData[i].Acrobatics);
            document.getElementById("animProf").checked = IsTrue(characterData[i].AnimalHandling);
            document.getElementById("arcaProf").checked = IsTrue(characterData[i].Arcana);
            document.getElementById("athlProf").checked = IsTrue(characterData[i].Athletics);
            document.getElementById("decProf").checked = IsTrue(characterData[i].Deception);
            document.getElementById("hisProf").checked = IsTrue(characterData[i].History);
            document.getElementById("insProf").checked = IsTrue(characterData[i].Insight);
            document.getElementById("intiProf").checked = IsTrue(characterData[i].Intimidation);
            document.getElementById("invProf").checked = IsTrue(characterData[i].Investigation);
            document.getElementById("medProf").checked = IsTrue(characterData[i].Medicine);
            document.getElementById("natProf").checked = IsTrue(characterData[i].Nature);
            document.getElementById("percProf").checked = IsTrue(characterData[i].Perception);
            document.getElementById("perfProf").checked = IsTrue(characterData[i].Performance);
            document.getElementById("persProf").checked = IsTrue(characterData[i].Persuasion);
            document.getElementById("relProf").checked = IsTrue(characterData[i].Religion);
            document.getElementById("sleiProf").checked = IsTrue(characterData[i].SleightOfHand);
            document.getElementById("steProf").checked = IsTrue(characterData[i].Stealth);
            document.getElementById("survProf").checked = IsTrue(characterData[i].Survival);
            SetSkills();
            return;
        }
    }
}

function UpdateHP() {
    let selectedCharacter = document.getElementById("characterSelect").value;
    for (let i = 0; i < characterData.length; i++) {
        if (characterData[i].CharacterName == selectedCharacter) {
            document.getElementById("maxHP").value = characterData[i].MaxHP;
            document.getElementById("currentHP").value = characterData[i].HP;
        }
    }
}


function UpdateHitDice() {
    let selectedCharacter = document.getElementById("characterSelect").value;
    for (let i = 0; i < characterData.length; i++) {
        if (characterData[i].CharacterName == selectedCharacter) {
            document.getElementById("hitDice").value = characterData[i].HitDice;
            document.getElementById("hitDie").value = characterData[i].HitDie;
        }
    }
}