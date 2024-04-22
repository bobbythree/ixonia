import { backgrounds } from './modules/backgrounds.js';
import { narrations } from './modules/narrations.js'
import { buttons } from './modules/buttons.js'
import * as dialogs from './modules/dialogs.js'

const screen = document.getElementById('screen');
const text = document.getElementById('text');
const dialogBox = document.getElementById('dialog');
const narrationBox = document.getElementById('narration');

//start game
window.addEventListener('load', () => {
  setBackground('title');
  createNarration('title');
  createButtons('title');
});

function clickHandler(route, buttonType) {  
  switch(buttonType) {
    case 'navigation':
      setBackground(route);
      createNarration(route);
      createButtons(route);
      break;
      case 'dialog':
        setBackground(route);
        createDialog(route);       
  }
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
      clickHandler(route, buttonType);
    }
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
      if (buttonType == 'navigation') clickHandler(route, buttonType)    
      else createDialog(route, buttonType)
    }
  }  
}  
