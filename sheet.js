let characterData = [];

// references the relevant google sheet for stored information
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
    let selectedPlayer = document.getElementById("playerSelect").value;
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

function LoadGear() {
    let selectedCharacter = document.getElementById("characterSelect").value;
    for (let i = 0; i < characterData.length; i++) {
        if (characterData[i].CharacterName == selectedCharacter) {
            document.getElementById("equippedArmor").value = characterData[i].Armor;
            document.getElementById("equippedShield").value = characterData[i].Shield;
        }
    }
}

function UpdateAC() {
    let armor = document.getElementById("equippedArmor").value;
    if (armor == 'padded') {
        document.getElementById("armorClass").value = parseInt(document.getElementById("dexMod").value) + 11;
    } else if (armor == 'leather') {
        document.getElementById("armorClass").value = parseInt(document.getElementById("dexMod").value) + 11;
    } else if (armor == 'studded') {
        document.getElementById("armorClass").value = parseInt(document.getElementById("dexMod").value) + 12;
    } else if (armor == 'hide') {
        let tempArmor = parseInt(document.getElementById("dexMod").value) + 12;
        if (tempArmor > 14) {
            document.getElementById("armorClass").value = 14;
        } else {
            document.getElementById("armorClass").value = tempArmor;
        }
    } else if (armor == 'chain') {
        let tempArmor = parseInt(document.getElementById("dexMod").value) + 13;
        if (tempArmor > 15) {
            document.getElementById("armorClass").value = 15;
        } else {
            document.getElementById("armorClass").value = tempArmor;
        }
    } else if (armor == 'scale') {
        let tempArmor = parseInt(document.getElementById("dexMod").value) + 14;
        if (tempArmor > 16) {
            document.getElementById("armorClass").value = 16;
        } else {
            document.getElementById("armorClass").value = tempArmor;
        }
    } else if (armor == 'breastplate') {
        let tempArmor = parseInt(document.getElementById("dexMod").value) + 14;
        if (tempArmor > 16) {
            document.getElementById("armorClass").value = 16;
        } else {
            document.getElementById("armorClass").value = tempArmor;
        }
    } else if (armor == 'halfplate') {
        let tempArmor = parseInt(document.getElementById("dexMod").value) + 15;
        if (tempArmor > 17) {
            document.getElementById("armorClass").value = 17;
        } else {
            document.getElementById("armorClass").value = tempArmor;
        }
    } else if (armor == 'ringmail') {
        document.getElementById("armorClass").value = 14;
    } else if (armor == 'chainmail') {
        document.getElementById("armorClass").value = 16;
    } else if (armor == 'splint') {
        document.getElementById("armorClass").value = 17;
    } else if (armor == 'plate') {
        document.getElementById("armorClass").value = 18;
    } else {
        document.getElementById("armorClass").value = parseInt(document.getElementById("dexMod").value) + 10;
    }
    if (document.getElementById("equippedShield").value == 'shield') {
        document.getElementById("armorClass").value = parseInt(document.getElementById("armorClass").value) + 2;
    } else {
        document.getElementById("armorClass").value = parseInt(document.getElementById("armorClass").value);
    }
}

function SetSkills() {
    let profBonus = parseInt(document.getElementById("profBonus").value);
    let strMod = parseInt(document.getElementById("strMod").value);
    let dexMod = parseInt(document.getElementById("dexMod").value);
    let conMod = parseInt(document.getElementById("conMod").value);
    let intMod = parseInt(document.getElementById("intMod").value);
    let wisMod = parseInt(document.getElementById("wisMod").value);
    let chaMod = parseInt(document.getElementById("chaMod").value);

    if (document.getElementById("acroProf").checked == true) {
        document.getElementById("acroProf").value = true;
        document.getElementById("acroScore").value = dexMod + profBonus;
    } else {
        document.getElementById("acroProf").value = false;
        document.getElementById("acroScore").value = dexMod;
    }
    if (document.getElementById("animProf").checked == true) {
        document.getElementById("animProf").value = true;
        document.getElementById("animScore").value = wisMod + profBonus;
    } else {
        document.getElementById("animProf").value = false;
        document.getElementById("animScore").value = wisMod;
    }
    if (document.getElementById("arcaProf").checked == true) {
        document.getElementById("arcaProf").value = true;
        document.getElementById("arcaScore").value = intMod + profBonus;
    } else {
        document.getElementById("arcaProf").value = false;
        document.getElementById("arcaScore").value = intMod;
    }
    if (document.getElementById("athlProf").checked == true) {
        document.getElementById("athlProf").value = true;
        document.getElementById("athlScore").value = strMod + profBonus;
    } else {
        document.getElementById("athlProf").value = false;
        document.getElementById("athlScore").value = strMod;
    }
    if (document.getElementById("decProf").checked == true) {
        document.getElementById("decProf").value = true;
        document.getElementById("decScore").value = chaMod + profBonus;
    } else {
        document.getElementById("decProf").value = false;
        document.getElementById("decScore").value = chaMod;
    }
    if (document.getElementById("hisProf").checked == true) {
        document.getElementById("hisProf").value = true;
        document.getElementById("hisScore").value = intMod + profBonus;
    } else {
        document.getElementById("hisProf").value = false;
        document.getElementById("hisScore").value = intMod;
    }
    if (document.getElementById("insProf").checked == true) {
        document.getElementById("insProf").value = true;
        document.getElementById("insScore").value = wisMod + profBonus;
    } else {
        document.getElementById("insProf").value = false;
        document.getElementById("insScore").value = wisMod;
    }
    if (document.getElementById("intiProf").checked == true) {
        document.getElementById("intiProf").value = true;
        document.getElementById("intiScore").value = chaMod + profBonus;
    } else {
        document.getElementById("intiProf").value = false;
        document.getElementById("intiScore").value = chaMod;
    }
    if (document.getElementById("invProf").checked == true) {
        document.getElementById("invProf").value = true;
        document.getElementById("invScore").value = intMod + profBonus;
    } else {
        document.getElementById("invProf").value = false;
        document.getElementById("invScore").value = intMod;
    }
    if (document.getElementById("medProf").checked == true) {
        document.getElementById("medProf").value = true;
        document.getElementById("medScore").value = wisMod + profBonus;
    } else {
        document.getElementById("medProf").value = false;
        document.getElementById("medScore").value = wisMod;
    }
    if (document.getElementById("natProf").checked == true) {
        document.getElementById("natProf").value = true;
        document.getElementById("natScore").value = intMod + profBonus;
    } else {
        document.getElementById("natProf").value = false;
        document.getElementById("natScore").value = intMod;
    }
    if (document.getElementById("percProf").checked == true) {
        document.getElementById("percProf").value = true;
        document.getElementById("percScore").value = wisMod + profBonus;
    } else {
        document.getElementById("percProf").value = false;
        document.getElementById("percScore").value = wisMod;
    }
    if (document.getElementById("perfProf").checked == true) {
        document.getElementById("perfProf").value = true;
        document.getElementById("perfScore").value = chaMod + profBonus;
    } else {
        document.getElementById("perfProf").value = false;
        document.getElementById("perfScore").value = chaMod;
    }
    if (document.getElementById("persProf").checked == true) {
        document.getElementById("persProf").value = true;
        document.getElementById("persScore").value = chaMod + profBonus;
    } else {
        document.getElementById("persProf").value = false;
        document.getElementById("persScore").value = chaMod;
    }
    if (document.getElementById("relProf").checked == true) {
        document.getElementById("relProf").value = true;
        document.getElementById("relScore").value = intMod + profBonus;
    } else {
        document.getElementById("relProf").value = false;
        document.getElementById("relScore").value = intMod;
    }
    if (document.getElementById("sleiProf").checked == true) {
        document.getElementById("sleiProf").value = true;
        document.getElementById("sleiScore").value = dexMod + profBonus;
    } else {
        document.getElementById("sleiProf").value = false;
        document.getElementById("sleiScore").value = dexMod;
    }
    if (document.getElementById("steProf").checked == true) {
        document.getElementById("steProf").value = true;
        document.getElementById("steScore").value = dexMod + profBonus;
    } else {
        document.getElementById("steProf").value = false;
        document.getElementById("steScore").value = dexMod;
    }
    if (document.getElementById("survProf").checked == true) {
        document.getElementById("survProf").value = true;
        document.getElementById("survScore").value = wisMod + profBonus;
    } else {
        document.getElementById("survProf").value = false;
        document.getElementById("survScore").value = wisMod;
    }

}

function TakeDamage() {
    let amount = document.getElementById("modHP").value;
    let currentHP = document.getElementById("currentHP").value;
    if ((currentHP - amount) >= 0) {
        document.getElementById("currentHP").value = currentHP - amount;
    } else {
        document.getElementById("currentHP").value = 0
    }
}

function HealHP() {
    let amount = parseInt(document.getElementById("modHP").value);
    let currentHP = parseInt(document.getElementById("currentHP").value);
    let maxHP = parseInt(document.getElementById("maxHP").value);
    if ((currentHP + amount) <= maxHP) {
        document.getElementById("currentHP").value = currentHP + amount;
    } else {
        document.getElementById("currentHP").value = maxHP;
    }
}

function LongRest() {
    ResetHP();
    ResetHitDice();
}

function ShortRest() {
    let currentDice = parseInt(document.getElementById("hitDice").value);
    if (currentDice > 0) {
        let currentHP = parseInt(document.getElementById("currentHP").value);
        let maxHP = parseInt(document.getElementById("maxHP").value);
        let maxDie = parseInt(document.getElementById("hitDie").value);
        let hitDieRoll = Math.floor(Math.random() * Math.floor(maxDie));
        if ((currentHP + hitDieRoll) <= maxHP) {
            document.getElementById("currentHP").value = currentHP + hitDieRoll;
        } else {
            document.getElementById("currentHP").value = maxHP;
        }
        document.getElementById("hitDice").value = currentDice - 1;
    }
}

function ResetHP() {
    document.getElementById("currentHP").value = document.getElementById("maxHP").value;
}

function ResetHitDice() {
    document.getElementById("hitDice").value = document.getElementById("playerLevel").value;
}

// google sheets checkbox returns true in all capitals, this changes it to lowercase to translate information
function IsTrue() {
    if (string.toLowerCase() == 'true') { return true; }
}

function SaveData() {
    let formData = new FormData(document.getElementById("charSheet"));
    // references the relevant apps script in order to allow updating of sheet outside of google sheet
    fetch('https://script.google.com/macros/s/AKfycbzjtm8LiRmld7ct0DoDrl-pXg6v_vAUQiw_pFQkJ49cSP_YnkSKFbvbueiiQ13CR4-1/exec',
        {
            method: 'post',
            body: formData,
        }
    )
}

// when window is loaded, execute LoadSheet function
window.onload = LoadSheet();