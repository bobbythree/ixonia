export const buttons = {
  title: {
    buttonOptions: [
      {text: 'Start', type: 'navigation', route: 'ixonia'}      
    ]
  },
  ixonia: {
    buttonOptions: [{text: 'Enter Tavern', type: 'navigation', route: 'tavern'}]    
  },
  tavern: {
    buttonOptions: [
      {text: 'Talk to barkeep', type: 'dialog', route: 'barkeep'},
      {text: 'Talk to patron', type: 'dialog', route: 'patron'},
      {text: 'Look at Quests', type: 'dialog', route: 'quests'}
    ]    
  },
  halflingQuest: {
    buttonOptions: [
      {text: 'Go to Shoppe', type: 'dialog', route: 'barkeep'},
      {text: 'Go to Inn', type: 'dialog', route: 'patron'},
      {text: 'Back to Ixonia', type: 'navigation', route: 'ixonia'}
    ]
  }
} 