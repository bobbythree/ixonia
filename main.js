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
  setBackground('title');
  createNarration('title');
  createButtons('title');     
}
 
function setBackground(scene) {
  screen.style.backgroundImage = backgrounds[scene];
}

function createNarration(scene) {
  narrationBox.innerText = narrations[scene];
  const br = document.createElement('br');
  narrationBox.appendChild(br);
}

function createButtons(scene) {
  const btns = buttons[scene].buttonOptions;
  for (let i = 0; i < btns.length; i++) {
    const tempBtn = document.createElement('button');
    tempBtn.innerText = btns[i].text;
    tempBtn.classList.add('btn');    
    narrationBox.appendChild(tempBtn);
    tempBtn.onclick = () => {
      const buttonType = buttons[scene].buttonOptions[i].type;
      const route = buttons[scene].buttonOptions[i].route;    
      const currentMonster = buttons[scene].buttonOptions[i].foe;    
      buttonHandler(route, buttonType, currentMonster);
    }
  }  
}

function buttonHandler(route, buttonType, currentMonster) {  
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
  }
}

function createDialog(dialogName) {  
  narrationBox.innerText = dialogs[dialogName].npcDialog;
  const choices = dialogs[dialogName].playerDialog;
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
        default:
        createDialog(route); 
      }      
    }
  }  
}

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
  if (item[itemName] == 'innRoom') sleep();  
}

function InventoryToButtons() {
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

function damage(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);  
  return Math.floor(Math.random() * (max - min) + min);
}

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

function killMonster(currentMonster) {
  monsters[currentMonster].numberOfFoes--;
  if (monsters[currentMonster].numberOfFoes === 0) {
    winBattle();
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

function winBattle() {
  narrationBox.innerText = 'you won the battle!';
} 

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

function toCamelCase(str) {
  return str.replace(/(?:^\w|[A-Z]|\b\w)/g, function(word, index) {
  return index === 0 ? word.toLowerCase() : word.toUpperCase();
  }).replace(/\s+/g, '');
}

function notEnoughGold() {
  createDialog('notEnoughGold');
}

function sleep() {
  player.hp = 50;
  hpText.innerText = 50;
}
