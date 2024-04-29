import { player } from './modules/player.js';
import { backgrounds } from './modules/backgrounds.js';
import { narrations } from './modules/narrations.js'
import { buttons } from './modules/buttons.js'
import * as dialogs from './modules/dialogs.js'
import * as items from './modules/items.js'


//selectors
const screen = document.getElementById('screen');
const text = document.getElementById('text');
const dialogBox = document.getElementById('dialog');
const narrationBox = document.getElementById('narration');
const hpText = document.getElementById('hpText');
const gpText = document.getElementById('gpText');
const weaponsText = document.getElementById('weaponsText');
const invText = document.getElementById('invText');

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
      buttonHandler(route, buttonType);
    }
  }  
}

function buttonHandler(route, buttonType) {  
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
          buyItem(item);
          createDialog(route);
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
    if (items[itemName].type = 'inv') {
      player.inv.push(item);
      invText.innerText = player.inv;
      updateItemInv();      
    } else if (items[itemName].type = 'weapon') {
      player.weapons.push(item);
      invText.innerText = player.inv;
      updateWeaponInv();
    }    
  } else {
    narrationBox.innerText = 'you do not have enough gold'
  }  
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
  player.inv = newWeaponInv;
  invText.innerHTML = newWeaponInv; 
}

function toCamelCase(str) {
  return str.replace(/(?:^\w|[A-Z]|\b\w)/g, function(word, index) {
  return index === 0 ? word.toLowerCase() : word.toUpperCase();
  }).replace(/\s+/g, '');
}