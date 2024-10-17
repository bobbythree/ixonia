import { player } from './modules/player.js'
import { backgrounds } from './modules/backgrounds.js'
import { narrations } from './modules/narrations.js'
import { buttons } from './modules/buttons.js'
import * as dialogs from './modules/dialogs.js'
import * as items from './modules/items.js'
import * as monsters from './modules/monsters.js'



//selectors
const screen = document.getElementById('screen');
const text = document.getElementById('text');
const dialogBox = document.getElementById('dialog');
const narrationBox = document.getElementById('narration');
const hpText = document.getElementById('hpText');
const gpText = document.getElementById('gpText');
const weaponsText = document.getElementById('weaponsText');
const invText = document.getElementById('invText');
const monsterStats = document.getElementById('monsterStats');
const monsterHpText = document.getElementById('monsterHpText');
const backgroundImg = document.getElementById('backgroundImg');

//start game
window.addEventListener('load', () => {
  startGame();
});

function startGame() {
  player.hp = 50;
  player.gp = 100;  
  player.weapons = ['Wooden Sword'];  
  player.inv = [];
  hpText.innerText = player.hp;
  gpText.innerText = player.gp;
  weaponsText.innerText = player.weapons;
  invText.innerText = player.inv;
  monsterStats.style.display = 'none';
  player.killedChickens = false;
  setBackground('title');
  createNarration('title');
  createButtons('title');     
}

//set scene background
function setBackground(scene) {  
  backgroundImg.src = backgrounds[scene];
}

//desplay narration text on screen
function createNarration(scene) {
  if (player.killedChickens && !player.killedCroakers) {
    narrationBox.innerText = narrations[scene][1];
  } else if (player.killedChickens && player.killedCroakers) {
    narrationBox.innerText = narrations[scene][2];
  } else {
    narrationBox.innerText = narrations[scene][0];
  } 
  const br = document.createElement('br');
  narrationBox.appendChild(br);
}

//create buttons for everything except dialog
function createButtons(scene) {
  let btns = [];  
  if (player.killedChickens && !player.killedCroakers) {
    btns = buttons[scene].buttonOptions2; 
  } else if (player.killedCroakers && player.killedChickens) {
    btns = buttons[scene].buttonOptions3;
  } else {
    btns = buttons[scene].buttonOptions;
  }

  for (let i = 0; i < btns.length; i++) {    
    const tempBtn = document.createElement('button');
    tempBtn.innerText = btns[i].text;
    tempBtn.classList.add('btn');    
    narrationBox.appendChild(tempBtn);
    tempBtn.onclick = () => {
      const buttonType = btns[i].type;
      const route = btns[i].route;    
      const currentMonster = btns[i].foe;    
      const questName = btns[i].quest;    
      buttonHandler(route, buttonType, currentMonster, questName);
    }
  }
} 

//handle button clicks
function buttonHandler(route, buttonType, currentMonster, questName) {  
  switch(buttonType) {
    case 'navigation':
      setBackground(route);
      createNarration(route);
      createButtons(route);
      break;
    case 'dialog':
      setBackground(route);
      createDialog(route);
      break;       
    case 'battle':
      createNarration(route);
      battle(currentMonster);
      break;       
    case 'reward':
      getReward(questName);
      setBackground(route);
      createNarration(route);
      createButtons(route);
      break;
      case 'win':        
        winGame();
        break;       
  }
}

//display dialog
function createDialog(dialogName) {
  let npc = '';
  if (player.killedChickens && !player.killedCroakers) {
   npc = dialogs[dialogName].npcDialog2;
  } else if (player.killedChickens && player.killedCroakers) {
    npc = dialogs[dialogName].npcDialog3;
  } else {
    npc = dialogs[dialogName].npcDialog;
  }  
  narrationBox.innerText = npc;
  
  let choices = [];
  if (player.killedChickens && !player.killedCroakers){
    choices = dialogs[dialogName].playerDialog2;
  } else if (player.killedChickens && player.killedCroakers) {
    choices = dialogs[dialogName].playerDialog3;
  } else {
    choices = dialogs[dialogName].playerDialog;
  }

  for (let i = 0; i < choices.length; i++) {
    const tempBtn = document.createElement('button');
    tempBtn.innerHTML = choices[i].text;
    tempBtn.classList.add('playerDialog');    
    dialogBox.appendChild(tempBtn);
    tempBtn.onclick = () => {
      dialogBox.innerHTML = '';
      const buttonType = choices[i].type;
      const route = choices[i].route;
      const item = choices[i].item;
      switch(buttonType) {
        case 'navigation':
          buttonHandler(route, buttonType);
          break;        
        case 'buy':
          createDialog(route);
          buyItem(item);
          break;
        case 'sell':
          createNarration(route);
          InventoryToButtons();
          break;
        case 'sleep':
          sleep();
          createDialog(route);
          break;
        default:
        createDialog(route); 
      }      
    }
  }  
}

//buying
function buyItem(itemName) {
  const item = items[itemName].item;
  const cost = items[itemName].buyPrice;
  if (player.gp >= cost) {
    player.gp -= cost;
    player.gp = player.gp;
    gpText.innerText = player.gp;    
    if (items[itemName].itemType === 'inv') {
      player.inv.push(item);      
      updateItemInv();      
    } else if (items[itemName].itemType === 'weapon') {
      player.weapons.push(item);      
      updateWeaponInv();
    }    
  } else {
    notEnoughGold();
  }
  if (items[itemName] === 'innRoom') sleep();
}

//display sellable items on screen as buttons
function InventoryToButtons() {
  if (player.weapons.length == 0) {
    const tempBtn = document.createElement('button');
    tempBtn.innerText = 'Back';
    tempBtn.classList.add('btn');
    narrationBox.appendChild(tempBtn);
    tempBtn.onclick = () => {
      createDialog('shoppe');      
    }
  } else {
    player.weapons.forEach(e => {
      const tempBtn = document.createElement('button');
      tempBtn.innerText = e;
      tempBtn.classList.add('btn');
      narrationBox.appendChild(tempBtn);
      tempBtn.onclick = () => {
        const str = e;
        const saleItem = toCamelCase(str);
        sellItem(saleItem);
        createDialog('sold');      
      } 
    })    
  }  
}

//selling
function sellItem(itemName) {
  const item = items[itemName].item;
  const price = items[itemName].sellPrice;
  player.gp += price;
  player.gp = player.gp;
  gpText.innerText = player.gp;      
  const weaponIndex = player.weapons.indexOf(item);
  player.weapons.splice(weaponIndex, 1);
  weaponsText.innerText = player.weapons;
}

//update inventories after buying or selling
function updateItemInv() {
  let itemInv = player.inv;
  let newItemInv = [...new Set(itemInv)]; //gets rid of dupes
  player.inv = newItemInv;
  invText.innerHTML = newItemInv; 

}

function updateWeaponInv() {
  let weaponInv = player.weapons;
  let newWeaponInv = [...new Set(weaponInv)]; //gets rid of dupes
  player.weapons = newWeaponInv;
  weaponsText.innerHTML = newWeaponInv; 
}

//fighting
function battle(currentMonster) {
  //select weapon
  player.weapons.forEach(e => {
    const tempBtn = document.createElement('button');
    tempBtn.innerText = e;
    tempBtn.className = 'btn';
    narrationBox.appendChild(tempBtn);
    tempBtn.onclick = () => {
      let str = e;
      const currentWeapon = toCamelCase(str);
      attack(currentWeapon, currentMonster);
    }
  })
}

//player attacks monster
function attack(currentWeapon, currentMonster) {
  const minDamage = items[currentWeapon].minDamage;
  const maxDamage = items[currentWeapon].maxDamage;
  let monsterHp = monsters[currentMonster].hp;
  monsterStats.style.display = 'flex';
  monsterHpText.innerText = monsterHp;

  const accuracy = Math.random();
  if (accuracy <= 2/3) {
    monsterHp -= damage(minDamage, maxDamage);
    monsters[currentMonster].hp = monsterHp;
    monsterHpText.innerText = monsterHp;
    narrationBox.innerText = `HIT! ${currentMonster} takes damage!`;
    const br = document.createElement('br');
    narrationBox.appendChild(br);
    const tempBtn = document.createElement('button');
    tempBtn.innerText = 'Next';
    tempBtn.className = 'btn';
    narrationBox.appendChild(tempBtn);
    if (monsterHp <= 0) killMonster(currentMonster);
    tempBtn.onclick = () => monsterAttack(currentMonster);
  } else {
    narrationBox.innerText = 'You attack and....MISS!';
    const br = document.createElement('br');
    narrationBox.appendChild(br);
    const tempBtn = document.createElement('button');
    tempBtn.innerText = 'Next';
    tempBtn.className = 'btn';
    narrationBox.appendChild(tempBtn);
    tempBtn.onclick = () => monsterAttack(currentMonster);
  }
}

//damage for player or monster
function damage(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);  
  return Math.floor(Math.random() * (max - min) + min);
}

// monster attacks player
function monsterAttack(currentMonster) {
  const minDamage = monsters[currentMonster].minDamage;
  const maxDamage = monsters[currentMonster].maxDamage;
  const accuracy = Math.random();
  if (accuracy <= 2/3) {
    player.hp -= damage(minDamage, maxDamage);
    hpText.innerText = player.hp;
    narrationBox.innerText = `the ${currentMonster} attacks....HIT! Player takes damage!`;
    const br = document.createElement('br');
    narrationBox.appendChild(br);
    const tempBtn = document.createElement('button');
    tempBtn.innerText = 'Attack!';
    tempBtn.className = 'btn';
    narrationBox.appendChild(tempBtn);
    if (player.hp <= 0) killPlayer();
    tempBtn.onclick = () => {
      createNarration('battle');
      battle(currentMonster); 
    }
  } else {
    narrationBox.innerText = ` The ${currentMonster} attacks...MISS!`;
    const br = document.createElement('br');
    narrationBox.appendChild(br);
    const tempBtn = document.createElement('button');
    tempBtn.innerText = 'Attack';
    tempBtn.className = 'btn';
    narrationBox.appendChild(tempBtn);
    tempBtn.onclick = () => {
      createNarration('battle');
      battle(currentMonster);
    }
  }
}

//defeat monster
function killMonster(currentMonster) {
  monsters[currentMonster].numberOfFoes--;
  console.log(monsters[currentMonster].numberOfFoes);
  if (monsters[currentMonster].numberOfFoes === 0) {
    winBattle(currentMonster);
  } else {
    narrationBox.innerText = `You killed the ${currentMonster}, but another one approaches!!`;
    const br = document.createElement('br');
    narrationBox.appendChild(br);
    monsters[currentMonster].hp = monsters[currentMonster].initHp;
    monsterHpText.innerText = monsters[currentMonster].hp;
    const tempBtn = document.createElement('button');
    tempBtn.innerText = 'Attack';
    tempBtn.className = 'btn';
    narrationBox.appendChild(tempBtn);
    tempBtn.onclick = () => {
      createNarration('battle');
      battle(currentMonster);
    }
  }
}

//navigation and monster stat reset after winning battles
function winBattle(currentMonster) {
  if (currentMonster === 'chicken') {
    monsterStats.style.display = 'none';
    monsters.chicken.hp = 20  
    monsters.chicken.numberOfFoes = 3;    
    setBackground('farm');
    createNarration('killChickens');
    createButtons('killChickens');
  } else if (currentMonster === 'croaker') {
    monsterStats.style.display = 'none';
    monsters.croaker.hp = 40  
    monsters.chicken.numberOfFoes = 1;
    createNarration('killedCroakers');
    createButtons('killedCroakers');
  }
  
} 

//player losses battle
function killPlayer() {
  setBackground('dead');
  createNarration('dead');
  const tempBtn = document.createElement('button');
    tempBtn.innerText = 'Restart';
    tempBtn.className = 'btn';
    narrationBox.appendChild(tempBtn);
    tempBtn.onclick = () => {
      startGame();
    }
  
}

//quest rewards
function getReward(questName) {
  if (questName === 'halfling') {
    buyItem('unicornBlood');
    player.gp += 500;
    gpText.innerText = player.gp;
    player.killedChickens = true;    
  } else if (questName === 'croakers') {
    buyItem('longbow');
    player.killedCroakers = true;
  }
}

//camelCase util for game items 
function toCamelCase(str) {
  return str.replace(/(?:^\w|[A-Z]|\b\w)/g, function(word, index) {
  return index === 0 ? word.toLowerCase() : word.toUpperCase();
  }).replace(/\s+/g, '');
}

//if not enough gold for buying
function notEnoughGold() {
  createDialog('notEnoughGold');
}

//sleep at inn
function sleep() {
  player.hp = 50;
  player.hp = player.hp;
  hpText.innerText = player.hp;
  player.gp -= 20;
  player.gp = player.gp;
  gpText.innerText = player.gp;
}

//winning the game
function winGame() {
  createButtons('beholder2');
  createNarration('beholder2');
  setBackground('beholder2')
  const questWeapon = player.weapons.indexOf('longbow');
  player.weapons.splice(questWeapon, 1) 
  const questItem = player.inv.indexOf('unicornBlood');
  player.inv.splice(questItem, 1);
  updateItemInv();
  updateWeaponInv();
  const tempBtn = document.createElement('button');
  tempBtn.innerText = 'Next';
  tempBtn.className = 'btn';
  narrationBox.appendChild(tempBtn);
  tempBtn.onclick = () => {
    player.gp += 10000;
    gpText.innerText = player.gp;
    setBackground('win');
    createNarration('win');
  } 
}
