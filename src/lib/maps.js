import { slugify } from "./util";

export const maps = [
  {
    areaTitle: "Arashi Desert",
    text: [
      "Sand, bluffs, and peril await those who trespass in the skies of the Arashi.",
      `Deep beneath the sand, there's evidence that this hell on earth was actually a body of
    water. Maybe a great lake, or a splendid sea. Anything would be better than unrelenting
    heat that makes everything burn to a crisp. The blue ocean may have dried up, but the black
    one lies buried below. Harvesting the crude oil has attracted many to risk the dangers of
    this forsaken place.`,
    ],
    maps: [
      {
        mapTitle: "Drowning Wastes (+ Night)",
        mapImage: "drowning-wastes.png",
        gamemode: "Search & Destroy",
        ships: "1-4",
        difficulty: "Easy",
        text: "",
      },
      {
        mapTitle: "Seas of Alleron",
        mapImage: "seas-of-alleron.png",
        gamemode: "Search & Destroy",
        ships: "1-4",
        difficulty: "Easy",
        text: "",
      },
    ],
  },
  {
    areaTitle: "Burren",
    text: ["Some say this is the cradle of the new age of air, if legends are true."],
    maps: [
      {
        mapTitle: "City Hunter",
        mapImage: "city-hunter.png",
        gamemode: "VIP Deathmatch",
        ships: "1v1, 3v3, 4v4",
        difficulty: "Intermediate",
        text: `The ruined cities may be a scenic detour for some, but for others it is a refuge. 
        The impossibly tall buildings and narrow avenues make it great for clandestine meetings 
        and getaway. Maybe there's a chance for the city to be crowded again.`,
      },
      {
        mapTitle: "Crown Summit",
        mapImage: "crown-summit.png",
        gamemode: "Blockade",
        ships: "2-4",
        difficulty: "Easy",
        text: `Unable to penetrate the walled city of Anvala, attackers shift their attention to the Crown Mountain range that
        house industrial complexes used by the city. However, privateers always arrive at the sound of coins clinking in a
        bag, and Anvala has plenty of it, even if it means going up against explosive laden convoys. So long as the price
        is right!`,
      },
      {
        mapTitle: "Devil's Eye",
        mapImage: "devils-eye.png",
        gamemode: "Defense",
        ships: "1-4",
        difficulty: "Easy",
        text: `There's nothing forgiving about this place. Devastated by dust storms, and plagued by disease. It makes you
        wonder what's left? Some don't have the luxury to choose where to live or to migrate to a distant land. There is
        only perseverance, and it sometimes pays off for the lucky few. I bet we'd outlive the roaches.`,
      },
      {
        mapTitle: "Paritan Rumble",
        mapImage: "paritan-rumble.png",
        gamemode: "Deathmatch",
        ships: "2v2, 3v3, 4v4",
        difficulty: "Hard",
        text: `Bent beams, shattered glass-husks of the past. Merchants, scavengers, and raiders alike travel to the ruins to
        look for what was buried in dust. Perhaps a great technology? More likely the barrel of a gun pointed straight at
        you, but that never stopped anyone from coming back.`,
      },
      {
        mapTitle: "Pilot Training",
        mapImage: "pilot-training.png",
        gamemode: "Tutorial",
        ships: "1",
        difficulty: "Intermediate",
        text: `Arguably the most important role, Pilots have the responsibility of getting the airship where it needs to go and
        getting it's guns lined up. More often than not they also direct the crew of their ship, and it's their leadership
        which can determine victory or defeat.`,
      },
      {
        mapTitle: "The Labyrinth",
        mapImage: "the-labyrinth.png",
        gamemode: "King of the Hill",
        ships: "2v2",
        difficulty: "Intermediate",
        text: `Amidst the ruins of a forgotten city, scavengers explore crumbling towers for traces of the past. What secrets
        remain in the dust? The tunnels run deep where whispers are heard. Ghosts? Bah, superstition. Only secrets lie
        beneath the rubble, waiting to be unearthed.`,
      },
    ],
  },
  {
    areaTitle: "Black Channel",
    text: [
      "The beauty of the isles belays the dangerous teeth hidden just below the surface.",
      `The Fjord Baronies control many industrial assets, including the Blackcliff Metal Works. Baronites must be
      vigilant while transporting their labor forces from factory to factory because brigands wait for the chance to
      plunder their rich ore and steel.`,
      `Even after contesting the control for Blackcliff Metal Works, there are always reinforcements arriving to put up
      a final fight. An already tired day turns to an even longer one as necessary cleanup transpires. Those who
      quaffed moonshine in premature celebration are those in for trouble.`,
    ],
    maps: [
      {
        mapTitle: "Blackcliff Butchery",
        mapImage: "blackcliff-butchery.png",
        gamemode: "King of the Hill",
        ships: "2v2, 3v3",
        difficulty: "Intermediate",
        text: "",
      },
      {
        mapTitle: "Blackcliff Entourage",
        mapImage: "blackcliff-entourage-and-clash-at-blackcliff.png",
        gamemode: "VIP Deathmatch",
        ships: "1v1, 3v3",
        difficulty: "Intermediate",
        text: "",
      },
      {
        mapTitle: "Brawl at Blackcliff",
        mapImage: "brawl-at-blackcliff.png",
        gamemode: "Deathmatch",
        ships: "2v2v2v2",
        difficulty: "Intermediate",
        text: "",
      },
      {
        mapTitle: "Clash at Blackcliff",
        mapImage: "blackcliff-entourage-and-clash-at-blackcliff.png",
        gamemode: "Deathmatch",
        ships: "2v2, 3v3, 4v4",
        difficulty: "Intermediate",
        text: "",
      },
      {
        mapTitle: "Raid on the Refinery",
        mapImage: "raid-on-the-refinery.png",
        gamemode: "Crazy King",
        ships: "2v2, 3v3",
        difficulty: "Intermediate",
        text: "",
      },
    ],
  },
  {
    areaTitle: "Chattering Fjords",
    text: [
      "Even paradise can succumb to the darkness of war.",
      `Ruins of old cities remain hidden under murky waters. The ancestors' tall 
      obelisks only provide glimpses of lives past. They mainly serve as reminders of 
      what could become. Will we ever be able to prevent such calamity? -Sage Arrat`,
    ],
    maps: [
      {
        mapTitle: "Misty Mutiny (+ Night)",
        mapImage: "misty-mutiny.webp",
        gamemode: "Deathmatch",
        ships: "2v2, 3v3",
        difficulty: "Intermediate",
        text: "",
      },
      {
        mapTitle: "Voyager's Cove (+ Night)",
        mapImage: "voyagers-cove.webp",
        gamemode: "Defense",
        ships: "1-4",
        difficulty: "Easy",
        text: "",
      },
    ],
  },
  {
    areaTitle: "Firnfeld",
    text: [
      "The frigid north welcomes no one with its deathly chill embrace.",
      `Those in Anglea live in austerity, wedged into frozen skyscrapers and husks 
      of military bases. Their surroundings, though, are rich in old technology, 
      attracting raiders to the poor town of Hanat. The tundra in disarray, none to 
      keep raiders at bay.`,
      `The hardy settlers of Hanat held their ground for generations, surviving harsh 
      surroundings and perpetual onslaught of pillagers and bandits. They've found a 
      new ally to aid in their protection. Can Chaladonian alliances protect the town 
      from the Anglean Raiders?`,
      `How many battles has Hanat seen recently? The sound of airships exploding is 
      their morning call like the cock's crow everywhere else in the world. One more 
      fleet hunting its prey won't make a difference. At least the skies are alight 
      with daily fireworks.`,
    ],
    maps: [
      {
        mapTitle: "Anglean Raiders",
        mapImage: "anglean-raiders-and-fight-over-firnfield.webp",
        gamemode: "Crazy King",
        ships: "2v2, 3v3",
        difficulty: "Intermediate",
        text: "",
      },
      {
        mapTitle: "Breach Occupation",
        mapImage: "breach-occupation-and-hunting-raiders.webp",
        gamemode: "King of the Hill",
        ships: "3v3, 4v4",
        difficulty: "Intermediate",
        text: "",
      },
      {
        mapTitle: "Fight Over Firnfeld",
        mapImage: "anglean-raiders-and-fight-over-firnfield.webp",
        gamemode: "Deathmatch",
        ships: "2v2, 3v3, 4v4",
        difficulty: "Intermediate",
        text: "",
      },
      {
        mapTitle: "Hunting Raiders",
        mapImage: "breach-occupation-and-hunting-raiders.webp",
        gamemode: "VIP Deathmatch",
        ships: "1v1, 3v3, 4v4",
        difficulty: "Intermediate",
        text: "",
      },
    ],
  },
];

export function getToc() {
  let processed = maps.map((areaObj) => {
    return {
      name: areaObj.areaTitle,
      link: `#${slugify(areaObj.areaTitle)}`,
      children: areaObj.maps.map((mapObj) => {
        return {
          name: mapObj.mapTitle,
          link: `#${slugify(mapObj.mapTitle)}`,
        };
      }),
    };
  });

  return [...processed];
}
