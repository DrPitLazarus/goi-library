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
  {
    areaTitle: "Midland Plains",
    text: [
      `Sometimes the most unremarkable places become the stage to enact the most 
      influential moments in history.`,
      `The Oblivion River holds a great enigma of the past: a black ship of unimaginable 
      scale. It may even be larger than those consumed by The Wastes. Due to its 
      dilapidation, its function is uncertain. Did it travel on the air, the sea, or 
      even under the waves? Maybe by land? Further study is difficult, though, as 
      the ruins hide as many enemies as it does secrets.`,
      `The rocky mountains that run through the western territories have always been a 
      favorite amongst smugglers and those who don't want to be seen. Deep canyons and 
      crevices make for the perfect getaway routes and hiding holes. Anyone with half a 
      brain knows these routes are best for smuggling, but anyone with the other half 
      knows to avoid these treacherous passes.`,
      `There's always ruckus near the Oblivion River. Excavation sites spring up like 
      weeds. Rumors speak of a lost artifact with the destructive power of the black 
      leviathan. Or it could just be a cache of gold, which is still good. Whatever it 
      may be, scavengers are quick to move during any lulls in battle. Fortune and 
      destruction tend to lead to the same result.`,
    ],
    maps: [
      {
        mapTitle: "Derelict Deception",
        mapImage: "derelict-deception-and-relic.webp",
        gamemode: "Deathmatch",
        ships: "2v2, 3v3, 4v4",
        difficulty: "Hard",
        text: "",
      },
      {
        mapTitle: "Downfall Departure",
        mapImage: "downfall-departure.webp",
        gamemode: "Infiltration",
        ships: "1-4",
        difficulty: "Hard",
        text: "",
      },
      {
        mapTitle: "Oblivion Approach",
        mapImage: "oblivion-approach.webp",
        gamemode: "Intercept",
        ships: "2-4",
        difficulty: "Hard",
        text: "",
      },
      {
        mapTitle: "Relic",
        mapImage: "derelict-deception-and-relic.webp",
        gamemode: "King of the Hill",
        ships: "2v2, 3v3, 4v4",
        difficulty: "Hard",
        text: "",
      },
    ],
  },
  {
    areaTitle: "Northern Fjords",
    text: [
      `When traveling the fjords, one must wonder if the chill felt is born of the 
      inclement weather, or the eyes of death watching from the ice.`,
      `King Greger's influence, of the Fjord Baronies, is weak in this icy stretch 
      north of Glowwater Bay. While an important foothold in Firnfeld, the area is rife 
      with pirates and marauders that often come into contact with patrol ship from the 
      Baronites. Cold cloudy combat climbs.`,
      `All kinds of dignitaries travel back and forth through Glowwater Bay. Many are 
      Baronite lords and ladies while others are unknown and on more secretive missions. 
      Who knows who you might find. Cautious caravans cruelly caught.`,
    ],
    maps: [
      {
        mapTitle: "Northern Fjords",
        mapImage: "northern-fjords-and-northern-hunt.webp",
        gamemode: "Deathmatch",
        ships: "2v2, 3v3, 4v4",
        difficulty: "Easy",
        text: "",
      },
      {
        mapTitle: "Northern Hunt",
        mapImage: "northern-fjords-and-northern-hunt.webp",
        gamemode: "VIP Deathmatch",
        ships: "1v1, 3v3, 4v4",
        difficulty: "Hard",
        text: "",
      },
    ],
  },
  {
    areaTitle: "Rusted Range",
    text: [
      `Only a fool would think to travel the entire untamed badlands stretching from 
      the Arashi Desert to the Anglean Sea of Graves.`,
      `Merchants look at two things when deciding on a route: distance and chance of an 
      ambush. While the Red Canyon is the shortest distance between the Yesha Empire 
      and Anglean Republic, it is also littered with chasms and gullies—happy hunting, 
      safe travels!`,
      `The Flayed Hills harbor immense wealth and fortune for those brave enough to mine 
      in disputed territory bordering the Yeshan Empire. Buried oil caches, forgotten 
      wartime munitions, collapsed mines. Can you outrun the Yeshans with hulls 
      brimming with cargo?`,
      `Veins of the earth carry precious ores. Split the veins, process the ore, and 
      create death machines to spill more precious resources from veins of our brothers. 
      The earth weeps and our brethren scream in agony as their vessels fall out of 
      the sky.`,
    ],
    maps: [
      {
        mapTitle: "Canyon Ambush",
        mapImage: "canyon-ambush.webp",
        gamemode: "Deathmatch",
        ships: "2v2, 3v3, 4v4",
        difficulty: "Intermediate",
        text: "",
      },
      {
        mapTitle: "King of the Flayed Hills",
        mapImage: "king-of-the-flayed-hills.webp",
        gamemode: "Crazy King",
        ships: "2v2, 3v3, 4v4",
        difficulty: "Hard",
        text: "",
      },
      {
        mapTitle: "Red Sepulcher",
        mapImage: "red-sepulcher.webp",
        gamemode: "Deathmatch",
        ships: "4v4",
        difficulty: "Intermediate",
        text: "",
      },
    ],
  },
  {
    areaTitle: "Vastness",
    text: [
      `This poisoned land spews forth the most toxic of dangers. Be wary the foot that 
      treads here.`,
      `They the narrows are haunted. The streams used to run clear but now they are red. 
      Red with what? If you're so inclined to believe a spooky tale then its red with 
      those who died from the accidents that were common in the refineries. It's unclear 
      why there were so many mishaps, but it's clear that something doesn't want 
      outsiders from staying too long.`,
      `What flows through the massive pipes twisting through coastline of the Vastness? 
      A Merchant would pretend not to hear. Ask again, and he'll tell your friends that 
      you wandered off. Still, that doesn't stop raiders from crossing the Abyssal Gulf 
      to try their luck leaching the pipes dry of whatever flows within. A risky endeavor
      where many seemed to have wandered off.`,
      `The land is unpredictable. On some days, villages are swallowed whole by floods. 
      On others, mountains shear creating daunting cliff faces into nothingness. 
      Occasionally, the changes reveal secrets and hidden treasure, but who knows when 
      the earth will swallow it all again.`,
    ],
    maps: [
      {
        mapTitle: "Blood Narrows",
        mapImage: "blood-narrows.webp",
        gamemode: "Infiltration",
        ships: "1-4",
        difficulty: "Easy",
        text: "",
      },
      {
        mapTitle: "Raid in the Abyss",
        mapImage: "raid-in-the-abyss.webp",
        gamemode: "Crazy King",
        ships: "2v2, 3v3, 4v4",
        difficulty: "Easy",
        text: "",
      },
      {
        mapTitle: "Sunken Reach",
        mapImage: "sunken-reach.webp",
        gamemode: "Blockade",
        ships: "2-4",
        difficulty: "Easy",
        text: "",
      },
    ],
  },
  {
    areaTitle: "The Wastes",
    text: [
      `Bitter battles are fought to this day over bones of the old world buried in the 
      sands of the Wastes. More than a few brave, or perhaps foolhardy, souls have 
      added their own bones to these relics.`,
      `The cities of Nalm and Sylka—siblings locked in rivalry where both border opposite 
      edges of a deadly stretch of barren wasteland. Sands that bind the family together. 
      Rights to scraps littering the dunes, rights to route trade through its airspace. 
      Generations of conflict.`,
      `Over time, the forgotten are reclaimed by the earth. If one acts quickly enough, 
      remains can be salvaged from the grips of nonexistence. After cutting into the 
      ground, deep gashes are left behind and its treasures hauled out. No matter how 
      much digging, riches are still unearthed. Excavations across the desert all look 
      the same. Even the sand cannot outpace the shoveling to heal the scars and 
      pockmarks that mark the earth.`,
      `Sand slowly consumes the remains of the Juggernaut, a ship designed to end the 
      Nalm-Sylka war. Slow but persistent, the desert eats the vessel away. Scavengers 
      race against sandstorms that scour away. Maybe the Juggernaut will fly again.`,
      `Some disputes are not about survival. Some are just a show of might. The Dust 
      brought fierce winds Combined with the obelisk-like ribs of old vessels of 
      destruction, battles fought in this edge of the desert are only for those with 
      cunning... or nothing to lose.`,
      `The ruins of forgotten machines lay scattered in seas of sand. No one claims the 
      misplaced apparatuses except for pirates and scavengers. Who knows what's 
      valuable and what's junk! The greedy opportunists will fight over
      the smallest scrap.`,
      `Violent winds are just a part of life in the desert. Sand is swept into the air 
      and clogs any engine that may find its sorry way through the storm. Can you 
      blame the navigator for this unforeseen force of nature? Is being thrown
      overboard a yes?`,
    ],
    maps: [
      {
        mapTitle: "Battle on the Dunes",
        mapImage: "battle-on-the-dunes.webp",
        gamemode: "Deathmatch",
        ships: "2v2, 3v3, 4v4",
        difficulty: "Easy",
        text: "",
      },
      {
        mapTitle: "Blistered Abyss",
        mapImage: "blistered-abyss.webp",
        gamemode: "Defense",
        ships: "1-3",
        difficulty: "Easy",
        text: "",
      },
      {
        mapTitle: "Desert Scrap",
        mapImage: "desert-scrap.webp",
        gamemode: "King of the Hill",
        ships: "2v2, 3v3, 4v4",
        difficulty: "Hard",
        text: "",
      },
      {
        mapTitle: "Duel at Dawn",
        mapImage: "duel-at-dawn.webp",
        gamemode: "Deathmatch",
        ships: "2v2, 3v3",
        difficulty: "Intermediate",
        text: "",
      },
      {
        mapTitle: "Graveyard Rumble",
        mapImage: "graveyard-rumble.webp",
        gamemode: "Deathmatch",
        ships: "2v2, 3v3, 4v4",
        difficulty: "Intermediate",
        text: "",
      },
      {
        mapTitle: "Hunt at Dawn",
        mapImage: "hunt-at-dawn.webp",
        gamemode: "VIP Deathmatch",
        ships: "1v1, 3v3",
        difficulty: "Intermediate",
        text: "",
      },
    ],
  },
  {
    areaTitle: "Ash Mountains",
    text: [
      `Char and ash leave a bitter taste on the tongue. This has little comparison with 
      the bitterness of the battles that one partakes in over these desolate lands of 
      molten rock and fire.`,
      `Northern territories have been known to hide caches of ancient technology. Buried 
      deep and frozen over by ice, only those with indomitable determination can find 
      them. Even if something is found, even fewer have the minds to decipher and restore 
      these machines. Who can whisper and coax the secrets out of these metal souls?`,
      `Beyond treacherous lava fields, in the northern edge of the Ash Mountain range, 
      lie Yeshan strongholds of Yao Ling Pass. Previously inaccessible, air travel has 
      allowed the snowy cliffs and wandering ridges to prosper. Though not as active as 
      the central Ash Mountains, volcanic steam clouds blanket the industrial area. The
      warmth trapped the mountains fuel the power of the Yeshan war machine.`,
    ],
    maps: [
      {
        mapTitle: "Ashen King",
        mapImage: "ashen-king-and-ashen-scuffle.webp",
        gamemode: "King of the Hill",
        ships: "2v2, 3v3",
        difficulty: "Intermediate",
        text: "",
      },
      {
        mapTitle: "Ashen Scuffle (+ Night)",
        mapImage: "ashen-king-and-ashen-scuffle.webp",
        gamemode: "Deathmatch",
        ships: "2v2, 3v3",
        difficulty: "Intermediate",
        text: "",
      },
      {
        mapTitle: "Burning Valley",
        mapImage: "burning-valley.webp",
        gamemode: "Search & Destroy",
        ships: "1-4",
        difficulty: "Easy",
        text: "",
      },
      {
        mapTitle: "Parous Glen (+ Night)",
        mapImage: "parous-glen.webp",
        gamemode: "Assault",
        ships: "1-4",
        difficulty: "Intermediate",
        text: "",
      },
      {
        mapTitle: "Wandering Ridge",
        mapImage: "wandering-ridge.webp",
        gamemode: "Infiltration",
        ships: "1-4",
        difficulty: "Hard",
        text: "",
      },
    ],
  },
  {
    areaTitle: "Isles of Chaladon",
    text: [
      `The Isles of Chaladon are a green jewel in the sands and dust of the war torn 
      lands. As with any jewel, this makes it of great value. This often leads to 
      strife for those that do not possess such lands of their own.`,
      `Many attempt to use the dense fogs and towering rock outcroppings to hide their 
      getaway between the Black Channel and Chattering Fjords close to the Chaladon 
      coastline. However, the same perceived advantages can also pose as significant 
      threats to one's escape.`,
      `Lutessa seems like an idyllic land on the southern tip of the Isles of Chaladon. 
      The water is clear, and green fills the eye. On closer inspection, though, scars 
      of the past reveal themselves readily. Recently, when a dam of the old world was 
      repaired, further wounds were shown in the landscape. Massive bunkers hinted at 
      mighty battles that happened in the past. Though these guns are no longer 
      functional, the skies above often thunder with the sound of new strife, and the 
      threat of new scars. The skies hold new danger.`,
      `Anglean Raiders roam the Black Channel to hunt down Chaladonian freighters, 
      hoping to steal technology. Fighting spills into the Chattering Fjords and north 
      coast of Chaladon. Deadly raiders, research vessels, and vigilant patrols clash 
      amongst the jagged spires. Watery graves await.`,
    ],
    maps: [
      {
        mapTitle: "Hazardous Hunt",
        mapImage: "hazardous-hunt-and-water-hazard.webp",
        gamemode: "VIP Deathmatch",
        ships: "1v1, 3v3, 4v4",
        difficulty: "Easy",
        text: "",
      },
      {
        mapTitle: "Scars of Lutessa",
        mapImage: "scars-of-lutessa.webp",
        gamemode: "Assault",
        ships: "1-4",
        difficulty: "Hard",
        text: "",
      },
      {
        mapTitle: "Water Hazard",
        mapImage: "hazardous-hunt-and-water-hazard.webp",
        gamemode: "Deathmatch",
        ships: "2v2, 3v3, 4v4, 2v2v2v2",
        difficulty: "Easy",
        text: "",
      },
    ],
  },
  {
    areaTitle: "Ridge Forest",
    text: [
      `Occupying a large swath of Aspara and extending into Lookout, Sunder, and 
      Bannen's Rest, the Ridge Forest and mountain range of the same name are equally 
      wild and rough. There are rumors of pirates in the crags of the tall mountains 
      and tree-filled valleys. The weather is often harsh and unpredictable. Often 
      times, ships that enter never return, or sometimes drift back out, devoid of 
      crew. Superstitious men whisper of voices being heard on any wind that passes the 
      peaks. Be it rumors of pirates, or the untamed weather, normal trade ships avoid 
      this area, lest they be added to the growing list of missing ships and crews.`,
      `High in the Ridge Forest Mountains on the border of Aspara and Skyend resides a 
      vast complex of uninhabited buildings. The crumbling buildings are plain on the 
      outside, but adorned with what seems to be ornate religious carvings on the 
      interior. Despite the age of the structures, there are many functional sky docks 
      upon the rooftops. Until recently, the Fjord Baronites had kept this temple 
      hidden from the outside world. An Anglean invasion stumbled upon the complex 
      after cutting the Baronite territory in half. It is unknown what the Baronites 
      were protecting here, but invaders and treasure hunters aim to find out. Outposts 
      and mining rigs spring up like forests. Will their answers be found, or will 
      they all be reduced to rubble?`,
      `Over hundreds of years, river rapids carved out beautiful and treacherous 
      canyons into the base of the Forest Ridge Mountains. The rivers are long gone, 
      but they exposed valuable mineral deposits. Most would think it a fool's errand 
      to work this particular land, but with enough time and desperation anything is 
      possible. Maybe someday, we'll see the fish swim through these streams again.`,
    ],
    maps: [
      {
        mapTitle: "Hidden Temple",
        mapImage: "hidden-temple.webp",
        gamemode: "Assault",
        ships: "1-4",
        difficulty: "Easy",
        text: "",
      },
      {
        mapTitle: "Thornholt Crest",
        mapImage: "thornholt-crest.webp",
        gamemode: "Intercept",
        ships: "2-4",
        difficulty: "Hard",
        text: "",
      },
      {
        mapTitle: "Thornholt Throwdown",
        mapImage: "thornholt-throwdown.webp",
        gamemode: "Deathmatch",
        ships: "2v2",
        difficulty: "Hard",
        text: "",
      },
    ],
  },
  {
    areaTitle: "Anglea",
    text: [
      `The frozen Island of Anglea is home to the Anglean Republic. Little is known 
      about the inter workings of the cities hidden in the Anglean snow and ice.`,
      `A massive glacier marks the entrance to the Anglean capital of Kinforth. Almost 
      nothing is known about what lies beyond the glacier, as trespass is met with 
      instant and deadly force. The ruins of the ancient city at the base of the glacier 
      are of little concern to the Angleans, however, having been picked clean of 
      technology long ago. Squabbles between pirates on their doorstep are most often 
      left to themselves, with crews emerging to salvage the aftermath. In a show of 
      dark humor, the crews have been known to build large snowmen to observe the
      battles from hidden places around the broken city.`,
    ],
    maps: [
      {
        mapTitle: "Assault on Kinforth",
        mapImage: "assault-on-kinforth.webp",
        gamemode: "Deathmatch",
        ships: "2v2, 3v3, 4v4, 2v2v2v2",
        difficulty: "Hard",
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

  return processed;
}
