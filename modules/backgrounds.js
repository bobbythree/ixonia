//This module contrtains all scene background images

export function preloadImages(backgrounds) {
	for(let i = 0; i < backgrounds.length; i++) {
		const img = new Image;
		img.src = backgrounds[i]
	}
}

export const backgrounds = {
  title: 'images/title.jpg',
  ixonia: 'images/ixonia.jpg',
  tavern: 'images/tavern.jpg',
  barkeep: 'images/barkeep.jpg',
  patron: 'images/roger.jpg',
  quests: 'images/quests.jpg',
  halflingQuest: 'images/aurochsmaw.jpg',
  shoppe: 'images/shoppe.jpg',
  inn: 'images/inn.jpg',
  innRoom: 'images/inn-room.jpg',
  farmDirections: 'images/inn.jpg',
  farm: 'images/farm.jpg',
  abyssal: 'images/abyssal.jpg',
  barn: 'images/barn.jpg',
  hayloft: 'images/barn.jpg',
  barkeep2: 'images/barkeep.jpg',
  croakersQuest: 'images/marsh.jpg',
  elf: 'images/elf.jpg',
  croakersReward: 'images/roger.jpg',
  beholder: 'images/beholder.jpg',
  ivy: 'images/elf.jpg',
  beholder2: 'images/beholder.jpg',
  dead: 'images/dead.jpg',
  win: 'images/win.jpg'
}

preloadImages(backgrounds);
