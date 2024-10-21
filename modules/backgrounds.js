//This module contrtains all scene background images

export function preloadImages(backgrounds) {
	for(let i = 0; i < backgrounds.length; i++) {
		const img = new Image;
		img.src = backgrounds[i]
	}
}

export const backgrounds = {
  title: 'images/title.png',
  ixonia: 'images/ixonia.png',
  tavern: 'images/tavern.png',
  barkeep: 'images/barkeep.png',
  patron: 'images/roger.png',
  quests: 'images/quests.png',
  halflingQuest: 'images/aurochsmaw.png',
  shoppe: 'images/shoppe.png',
  inn: 'images/inn.png',
  innRoom: 'images/inn-room.png',
  farmDirections: 'images/inn.png',
  farm: 'images/farm.png',
  abyssal: 'images/abyssal.png',
  barn: 'images/barn.png',
  hayloft: 'images/barn.png',
  barkeep2: 'images/barkeep.png',
  croakersQuest: 'images/marsh.png',
  elf: 'images/elf.png',
  croakersReward: 'images/roger.png',
  beholder: 'images/beholder.png',
  ivy: 'images/elf.png',
  beholder2: 'images/beholder.png',
  dead: 'images/dead.png',
  win: 'images/win.png'
}

preloadImages(backgrounds);
