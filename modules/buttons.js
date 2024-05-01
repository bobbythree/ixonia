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
      {text: 'Go to Shoppe', type: 'dialog', route: 'shoppe'},
      {text: 'Go to Inn', type: 'dialog', route: 'inn'},
      {text: 'Back to Ixonia', type: 'navigation', route: 'ixonia'}
    ]
  },
  innRoom: {
    buttonOptions: [      
      {text: 'Leave', type: 'navigation', route: 'halflingQuest'}
    ]
  },
  farmDirections: {
    buttonOptions: [      
      {text: 'Head to the chicken farm!', type: 'navigation', route: 'farm'}
    ]
  },
  farm: {
    buttonOptions: [      
      {text: 'Get a closer look', type: 'navigation', route: 'abyssal'}
    ]
  },
  abyssal: {
    buttonOptions: [      
      {text: 'FIGHT!', type: 'battle', foe: 'chicken', route: 'chickenBattle'}
    ]
  },
} 