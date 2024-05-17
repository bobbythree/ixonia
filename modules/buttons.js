export const buttons = {
  title: {
    buttonOptions: [
      {text: 'Start', type: 'navigation', route: 'ixonia'}      
    ]
  },
  ixonia: {
    buttonOptions: [
      {text: 'Enter Tavern', type: 'navigation', route: 'tavern'},
    ],
    buttonOptions2: [
      {text: 'Enter Tavern', type: 'navigation', route: 'tavern'},
      {text: 'To Aurochsmaw', type: 'navigation', route: 'halflingQuest'}
    ],    
  },
  tavern: {
    buttonOptions: [
      {text: 'Talk to barkeep', type: 'dialog', route: 'barkeep'},
      {text: 'Talk to patron', type: 'dialog', route: 'patron'},
      {text: 'Look at Quests', type: 'dialog', route: 'quests'}
    ],
    buttonOptions2: [
      {text: 'Talk to Esmee', type: 'dialog', route: 'barkeep'},
      {text: 'Talk to Roger', type: 'dialog', route: 'patron'},
      {text: 'Leave Tavern', type: 'navigation', route: 'ixonia'}
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
      {text: 'FIGHT!', type: 'battle', foe: 'chicken', route: 'battle'}
    ]
  },
  killChickens: {
    buttonOptions: [      
      {text: 'Explore barn', type: 'navigation', route: 'barn'}
    ]
  },
  barn: {
    buttonOptions: [      
      {text: 'Explore hayloft', type: 'dialog', route: 'hayloft'}
    ]
  },
  barkeep2: {
    buttonOptions: [      
      {text: 'accept rewards', type: 'reward', quest: 'halfling', route: 'ixonia'}
    ]
  },
  croakersQuest: {
    buttonOptions: [
      {text: 'retreat', type: 'navigation', route: 'ixonia'}
    ],
    buttonOptions2: [
      {text: 'FIGHT!', type: 'battle', foe: 'croaker', route: 'battle'}
    ]
  },
  killedCroakers: {
    buttonOptions2: [
      {text: 'Approach Elf', type: 'dialog', route: 'elf'}
    ]
  }
} 