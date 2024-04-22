export const barkeep = {
  npcDialog: 'Hello! My name is Esmee Fairfoot and this is my tavern, the Moldy Turnip. How can I help ya?',
  playerDialog: [
    {text: 'What do you have to drink in this place?', route: 'ale'},
    {text: 'What\'s this I hear about a beholder in town hall?'},
    {text: 'I just remembered I left my oven on...'}
  ] 
}

export const ale = {
  npcDialog: 'I\'ve got the usual ale, and our special is Unicorn Blood',
  playerDialog: [
    {text: 'I\'ll have the ale', route: 'ale'},
    {text: 'May I please have...2 tofu pups?'},
    {text: 'Lemme get that Unicorn Blood!'},
    {text: 'I just remembered I left my oven on...'}
  ] 
}