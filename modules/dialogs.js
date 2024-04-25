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
  npcDialog: 'BARKEEP: Ummm...right...uh,  Ok. well... what?',
  playerDialog: [
    {text: 'Um, just kidding, I\'ll have an ale.', route: 'ale'},
    {text: 'I said lemme get that Unicorn Blood!', route: 'unicornBlood'},
    {text: 'I just remembered that I gotta go...', route: 'bye'},
  ]
}

export const unicornBlood = {
  npcDialog: 'BARKEEP: Listen, you seem like a nice adventurer and all, but I don\'t think you\'re ready for Unicorn Blood. Tell ya what, come back when you\'ve proven yourself as a real hero and I\'ll give you a Unicorn Blood on the house!',
  playerDialog: [
    {text: 'Ok, I\'ll be BACK', route: 'bye'},
    {text: 'Ok, I\'ll BE back', route: 'bye'},
    {text: 'Ok, I\'LL be back', route: 'bye'},
  ]
}

//tier 4
export const buyAle = {
  npcDialog: 'BARKEEP: Thank you!',
  playerDialog: [
    {text: 'Thanks, bye', route: 'bye'},
    {text: 'Lemme get that Unicorn Blood!', route: 'unicornBlood'},
    {text: 'What\'s this I hear about a beholder in town hall?', route: 'beholderInfo'},
  ]
}


//Roger first dialog
//tier 1
export const patron = {
  npcDialog: 'PATRON: Hello.',
  playerDialog: [
    {text: 'Hell...HEY, don\'t I know you from somewhere?', route: 'dontIKnowYou'},
    {text: 'Are you Roger?', route: 'roger'}    
  ]
}

//tier 2
export const dontIKnowYou = {
  npcDialog: 'ROGER: Hmm...not sure. Name\'s Roger. Ever been to Pestulon? Hey are you the one that beat my high score on Astro Chicken?',
  playerDialog: [
    {text: 'Umm, actually I was wanting to get details about the Quests on the board over there.', route: 'quests'}    
  ]
}

export const roger = {
  npcDialog: 'ROGER: Yep, that\'s me.',
  playerDialog: [
    {text: 'The quest board over there says to ask you for details.', route: 'quests'},    
    {text: 'What the heck are ya wearing???', route: 'outfit'},
  ]
}

export const outfit = {
  npcDialog: 'ROGER: What, this old thing? It\'s just my space-janitor uniform..',
  playerDialog: [
    {text: 'Umm, actually I was wanting to get details about the Quests on the board over there.', route: 'quests'}    
  ]
}

//tier 3
export const quests = {
  npcDialog: 'ROGER: Sure thing, which quest are you wondering about??',
  playerDialog: [
    {text: 'Tell me about the halfling quest.', route: 'halflingDetails'},    
    {text: 'Let\'s hear about those Bullywug Croakers.', route: 'croakersDetails'},
    {text: 'I want to fight that Beholder! Tell me all about it.', route: 'beholderDetails'}
  ]
}

//tier 4
export const halflingDetails = {
  npcDialog: 'ROGER: The Barkeep\'s daughter has gone missing. Last we heard, she was heading up to Aurochsmow for the day to look for work. She should\'ve been back days ago. You must go to Aurochsmow and find her. The reward for this quest is 500gp.',
  playerDialog: [
    {text: 'I accept this quest!', route: 'halflingQuest', type: 'navigation'},    
    {text: 'Let\'s hear about those Bullywug Croakers.', route: 'croakersDetails'},
    {text: 'I want to fight that Beholder! Tell me all about it.', route: 'beholderDetails'},
    {text: 'I just remembered there\'s an alien about to pop put of my chest...BYE!', route: 'tavern', type: 'navigation'}
  ]
}

export const croakersDetails = {
  npcDialog: 'ROGER: Just outside of town the Bullywug Croakers are blocking the main road. They ambush anyone who tries to cross into the marshes. Defeat them and recieve an exuisite longbow of immense power.',
  playerDialog: [
    {text: 'I accept this quest!', route: 'croakersQuest', type: 'navigation'},    
    {text: 'Tell me about the halfling quest.', route: 'halflingDetails'},
    {text: 'I want to fight that Beholder! Tell me all about it.', route: 'beholderDetails'},
    {text: 'I just remembered I don\'t want to go on any more of your Goonie adventures...BYE!', route: 'tavern', type: 'navigation'}
  ]
}

export const beholderDetails = {
  npcDialog: 'ROGER: A terrible Beholder has taken up residence in the town hall. He is a vicious beast who is far beyond the abilities of any of us. You must help us! Defeat the Beholder, be the hero of this town, and recieve 10,000gp.',
  playerDialog: [
    {text: 'I accept this quest!', route: 'beholderQuest', type: 'navigation'},    
    {text: 'Tell me about the halfling quest.', route: 'halflingDetails'},
    {text: 'Let\'s hear about those Bullywug Croakers.', route: 'croakersDetails'},
    {text: 'I just remembered that all phenomenon are empty of any intrinsic nature and thus are all inter-dependent and, well I just gotta go...BYE!', route: 'tavern', type: 'navigation'}
  ]
}
