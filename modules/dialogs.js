//barkeep first dialog
//tier 1
export const barkeep = {
  npcDialog: 'BARKEEP: Hello! My name is Esmee Fairfoot and this is my tavern, the Moldy Turnip. How can I help ya?',
  playerDialog: [
    {text: 'What do you have to drink in this place?', route: 'drinks'},
    {text: 'What\'s this I hear about a beholder in town hall?', route: 'beholderInfo'},
    {text: 'I just remembered I left my oven on...', route: 'bye'}
  ] 
}

//tier 2
export const drinks = {
  npcDialog: 'BARKEEP: I\'ve got the usual ale, and our special is Unicorn Blood',
  playerDialog: [
    {text: 'I\'ll have the ale', route: 'ale'},
    {text: 'May I please have...2 tofu pups?', route: 'tofuPups'},
    {text: 'Lemme get that Unicorn Blood!', route: 'unicornBlood'},
    {text: 'I just remembered I left my horse stable door open...', route: 'bye'}
  ] 
}

export const beholderInfo = {
  npcDialog: 'BARKEEP: It is true. A beholder has taken up residence in our town hall to the absolute terror of our people. Everyone who has faced the Beholder has died or been turned to stone. People are fleeing Ixonia in droves. Terrible for business I tell ya!',
  playerDialog: [
    {text: 'Well, I ain\'t scared. I\'ll fight that Beholder with one hand tied behind my back!', route: 'beholderInfo2'},    
    {text: 'What do you have to drink in this place?', route: 'drinks'},
    {text: 'I just remembered I have a dentist appointment ...', route: 'bye'}
  ] 
}

export const bye = {
  npcDialog: 'BARKEEP: Ok good, thanks, bye!',
  playerDialog: [
    {text: 'Bye.', type: 'navigation', route: 'tavern'},
    {text: 'Caio', type: 'navigation', route: 'tavern'},
    {text: 'Peace out!', type: 'navigation', route: 'tavern'},    
  ] 
}

//tier 3
export const beholderInfo2 = {
  npcDialog: 'BARKEEP: Ok sure, good luck bud. See the quest board if you\'re serious',
  playerDialog: [
    {text: 'What do you have to drink in this place?', route: 'drinks'},
    {text: 'I just remembered I left dog alone in the buggy.', route: 'bye'},       
  ] 
}

export const ale = {
  npcDialog: 'BARKEEP: That\'ll be 1gp.',
  playerDialog: [
    {text: 'Here\'s 1gp', type: 'buy', item: 'ale', route: 'buyAle'},
    {text: 'Actually I changed my mind, Lemme get that Unicorn Blood', route: 'unicornBlood'},
    {text: 'I just remembered that my house is on fire...', route: 'bye'},
  ]
}

export const tofuPups = {
  npcDialog: 'Ummm...right...uh,  Ok. well... what?',
  playerDialog: [
    {text: 'Um, just kidding, I\'ll have an ale.', route: 'ale'},
    {text: 'I said lemme get that Unicorn Blood!', route: 'unicornBlood'},
    {text: 'I just remembered that I gotta go...', route: 'bye'},
  ]
}

export const unicornBlood = {
  npcDialog: 'Listen, you seem like a nice adventurer and all, but I don\'t think you\'re ready for Unicorn Blood. Tell ya what, come back when you\'ve proven yourself as a real hero and I\'ll give you a Unicorn Blood on the house!',
  playerDialog: [
    {text: 'Ok, I\'ll be BACK', route: 'bye'},
    {text: 'Ok, I\'ll BE back', route: 'bye'},
    {text: 'Ok, I\'LL be back', route: 'bye'},
  ]
}

//tier 4
export const buyAle = {
  npcDialog: 'Thank you!',
  playerDialog: [
    {text: 'Thanks, bye', route: 'bye'},
    {text: 'Lemme get that Unicorn Blood!', route: 'unicornBlood'},
    {text: 'What\'s this I hear about a beholder in town hall?', route: 'beholderInfo'},
  ]
}