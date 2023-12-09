class Ship {
  name = "";
  difficulty = "";
  description = "";
  longitudinalSpeed = "";
  longitudinalAccel = "";
  turnSpeed = "";
  turnAccel = "";
  mass = "";
  verticalSpeed = "";
  verticalAccel = "";
  ratingSpeed = "";
  ratingManeuverability = "";
  ratingDurability = "";
  ratingArmor = "";
  ratingFirepower = 0;

  /**
   * Create a ship.
   * @param {Object} shipObj
   * @param {string} shipObj.name
   * @param {string} shipObj.difficulty
   * @param {string} shipObj.description
   * @param {Number} shipObj.longitudinalSpeed
   * @param {Number} shipObj.longitudinalAccel
   * @param {Number} shipObj.turnSpeed
   * @param {Number} shipObj.turnAccel
   * @param {Number} shipObj.mass
   * @param {Number} shipObj.verticalSpeed
   * @param {Number} shipObj.verticalAccel
   * @param {Number} shipObj.ratingSpeed
   * @param {Number} shipObj.ratingManeuverability
   * @param {Number} shipObj.ratingDurability
   * @param {Number} shipObj.ratingArmor
   * @param {Number} shipObj.ratingFirepower
   */
  constructor(shipObj) {
    Object.assign(this, shipObj);
  }
}

export const ships = [
  new Ship({
    name: "Goldfish",
    difficulty: "Hard",
    description: `The Goldfish is one of the earliest airships still in production and 
    use today. First manufactured in the independent midland territories before their 
    collapse, it is often seen as the basis for other ship designs. With a powerful 
    fore-mounted weapon and multiple side weapon slots, it requires some skill and 
    maneuvering to utilize the full potential of this ship. Best used as a flanking 
    and ambush ship. Weaker builds include Flak and Minotaur as front guns. Stronger 
    builds are Hwacha and Carronade.`,
    longitudinalSpeed: 42.0,
    longitudinalAccel: 3.6,
    turnSpeed: 14.0,
    turnAccel: 13.0,
    mass: 150,
    verticalSpeed: 17.0,
    verticalAccel: 3.25,
    ratingSpeed: 42,
    ratingManeuverability: 0.23,
    ratingDurability: 900,
    ratingArmor: 431,
    ratingFirepower: 4.25,
  }),
  new Ship({
    name: "Junker",
    difficulty: "Easy",
    description: `From an Arashi blueprint for building an airworthy ship with a 
    minimum of materials, this spare, skeletal ship has found favor with mercenaries 
    and freelancers who make their living from salvage, trade, and other odd jobs. 
    Though its improvised scrap-metal construction is not the sturdiest, the Junker is 
    very well armed and relies on its weapon-studded gun deck and nimble ship turning 
    to help ward off trouble. While the Junker has a thin hull profile, its main 
    weakness is its large balloon, which is a prime target for Flechette and fire attacks.`,
    longitudinalSpeed: 30.0,
    longitudinalAccel: 6.0,
    turnSpeed: 16.01,
    turnAccel: 15.24,
    mass: 140,
    verticalSpeed: 14.0,
    verticalAccel: 5.5,
    ratingSpeed: 30,
    ratingManeuverability: 0.27,
    ratingDurability: 500,
    ratingArmor: 731,
    ratingFirepower: 5,
  }),
  new Ship({
    name: "Squid",
    difficulty: "Hard",
    description: `A catamaran originally of Chaladonian design, the delicate Squid cuts 
    a distinctive figure with its split deck, off-center helm, and tripartite hull. 
    Prized for its speed and maneuverability, the Squid is popular as an assault and 
    raiding vessel. In battle, the nimble Squid can gain a positional advantage and 
    protect its unarmed port-side flank by outmaneuvering heavier, slower ships.`,
    longitudinalSpeed: 47.0,
    longitudinalAccel: 9.2,
    turnSpeed: 25.0,
    turnAccel: 23.0,
    mass: 95,
    verticalSpeed: 17.0,
    verticalAccel: 4,
    ratingSpeed: 47,
    ratingManeuverability: 0.4,
    ratingDurability: 450,
    ratingArmor: 313,
    ratingFirepower: 3,
  }),
  new Ship({
    name: "Galleon",
    difficulty: "Intermediate",
    description: `A sturdily-built warship with an imposing vertical silhouette, the 
    Galleon was introduced by Yesha shipbuilders as a sentinel to patrol the borders of 
    the Empire and keep the peace. With its isolated aftcastle helm and multiple lower 
    decks, the Galleon requires a large, coordinated crew to operate. Though the 
    weighty, bulky hull limits its mobility, the Galleon asserts its authority with 
    powerful arrays of medium weapons that spell doom for opponents caught in range 
    of its deadly broadsides.`,
    longitudinalSpeed: 36.0,
    longitudinalAccel: 3.2,
    turnSpeed: 8.01,
    turnAccel: 6.01,
    mass: 320,
    verticalSpeed: 17.0,
    verticalAccel: 2.5,
    ratingSpeed: 36,
    ratingManeuverability: 0.1,
    ratingDurability: 1750,
    ratingArmor: 820,
    ratingFirepower: 7,
  }),
  new Ship({
    name: "Spire",
    difficulty: "Easy",
    description: `The towering Spire is a sentry ship originally built to guard the 
    mountain passes of the Fjordlanders. The earliest models were nearly stationary, 
    with weak thruster engines and a weapon pointed in every cardinal direction to cover 
    all approaches. When decommissioned Spires were later modified for use in battle 
    fleets, the rear gun was moved to concentrate fire forward. While their forward 
    speed is limited, they can rotate easily around their center to bring their guns 
    to bear and protect their exposed stern.`,
    longitudinalSpeed: 28.0,
    longitudinalAccel: 4.5,
    turnSpeed: 20.01,
    turnAccel: 15.0,
    mass: 210,
    verticalSpeed: 17.0,
    verticalAccel: 3.75,
    ratingSpeed: 28,
    ratingManeuverability: 0.26,
    ratingDurability: 1200,
    ratingArmor: 400,
    ratingFirepower: 4.25,
  }),
  new Ship({
    name: "Pyramidion",
    difficulty: "Easy",
    description: `The Pyramidion is a modified version of a Yesha warship used in the 
    vanguard of an offensive fleet formation, often backed by a line of smaller striker 
    craft. With its narrow head-on profile and armor-plated balloon, it is a front-line 
    charger of the first order, able to soften a target with concentrated fire from its 
    twin forward guns before ramming for the kill with its reinforced beak. Despite its 
    wide turn radius, it is prized for its overall durability and ability to concentrate fire.`,
    longitudinalSpeed: 34.0,
    longitudinalAccel: 3.5,
    turnSpeed: 11.0,
    turnAccel: 8.0,
    mass: 200,
    verticalSpeed: 17.76,
    verticalAccel: 3.0,
    ratingSpeed: 34,
    ratingManeuverability: 0.14,
    ratingDurability: 700,
    ratingArmor: 650,
    ratingFirepower: 4.0,
  }),
  new Ship({
    name: "Mobula",
    difficulty: "Hard",
    description: `Legend has it that the first Mobula was constructed by Vastness 
    shipwrights for a princess or wealthy merchant who demanded a pleasure barge from 
    which she might enjoy an unobstructed view of the night sky, though most assume 
    that is just a sales pitch. Aside from legends, they are one of the first ships 
    mass produced in Mercantile Guild lands, often used as sentinels and city guards 
    due to their slow speed and plentiful guns. The subducted balloon and broad, 
    exposed weather deck of the Mobula lend it an unmistakable silhouette quite unlike 
    that of typical suspended-gondola designs. With its low profile and fore-mounted 
    weapons, the Mobula is adept at coasting at high altitudes and attacking from above 
    or long range. It is relatively weak in close combat vs faster ships.`,
    longitudinalSpeed: 32.0,
    longitudinalAccel: 4.5,
    turnSpeed: 14.0,
    turnAccel: 5.0,
    mass: 175,
    verticalSpeed: 17.0,
    verticalAccel: 7.5,
    ratingSpeed: 32,
    ratingManeuverability: 0.09,
    ratingDurability: 750,
    ratingArmor: 600,
    ratingFirepower: 5.0,
  }),
  new Ship({
    name: "Magnate",
    difficulty: "Easy",
    description: `Drawing inspiration from the much older Goldfish hull design, the 
    grandiose Magnate is often the crown of a privateer's collection. The Mercantile 
    Guild's signature clusters of round balloons, based on earlier Baronite design and 
    later sold to Yesha, adorn the ship like a crown. With ample guns and gilding, it 
    shines in the sky under the watch of a skilled crew. However, its large size and 
    somewhat complex deck layout also make it a difficult ship for new crew, and a 
    prime target in the sky.`,
    longitudinalSpeed: 34.0,
    longitudinalAccel: 4.0,
    turnSpeed: 15.07,
    turnAccel: 4.04,
    mass: 200,
    verticalSpeed: 16.01,
    verticalAccel: 3.0,
    ratingSpeed: 34,
    ratingManeuverability: 0.07,
    ratingDurability: 850,
    ratingArmor: 620,
    ratingFirepower: 6.5,
  }),
  new Ship({
    name: "Crusader",
    difficulty: "Intermediate",
    description: `The venerable Crusader harkens to an older age, exemplifying the 
    Creed of the Fjord Baronies. Primarily designed to replace the even older Spire in 
    guarding against Anglean raids, the stable, vertical design has been abandoned in 
    favor of a long, nimble gun ship. The stately armor is more show than function, 
    relying on overwhelming firepower and ambush rather than survivability. Like the 
    Anglean ships, Baronite design is rumored to come from a source other than the 
    legendary Icarus war.`,
    longitudinalSpeed: 30.0,
    longitudinalAccel: 3.75,
    turnSpeed: 13.15,
    turnAccel: 9.3,
    mass: 180,
    verticalSpeed: 16.0,
    verticalAccel: 2.5,
    ratingSpeed: 30,
    ratingManeuverability: 0.16,
    ratingDurability: 650,
    ratingArmor: 650,
    ratingFirepower: 6.5,
  }),
  new Ship({
    name: "Judgement",
    difficulty: "Easy",
    description: `While earlier ship designs had been purchased and adapted from the 
    Mercantile Guild, the Judgement pays homage only to its own masters. Utilizing 
    advanced Yeshan metalworking and newly designed balloons, it has been crafted from 
    bow to stern to cut an imposing figure across the horizon. Ships must be wary of 
    being caught in its massive frontal barrage. To the woe of a lone privateer, the 
    Judgement was intended to fly in tight formation. As such, little thought has been 
    given to its exposed flanks.`,
    longitudinalSpeed: 28.0,
    longitudinalAccel: 3.31,
    turnSpeed: 16.06,
    turnAccel: 5.01,
    mass: 290,
    verticalSpeed: 17.01,
    verticalAccel: 3.31,
    ratingSpeed: 28,
    ratingManeuverability: 0.09,
    ratingDurability: 1200,
    ratingArmor: 650,
    ratingFirepower: 5.5,
  }),
  new Ship({
    name: "Corsair",
    difficulty: "Easy",
    description: `The Angleans hold their secrets in the icy vault of the north. Little 
    is known about their ships, other than they started appearing in the skies at the 
    same time as the Baronies and sparked an arms race between the two factions. The 
    Corsair is the latest entry, presenting massive armor, plentiful guns, and no 
    quarter given. Literally meaning 'pirate', this ship is granted to aspiring 
    priveteers raiding for the Republic. With multiple decks and limited visibility, 
    the Corsair can be difficult to crew and pilot.`,
    longitudinalSpeed: 35.0,
    longitudinalAccel: 5.0,
    turnSpeed: 12.0,
    turnAccel: 8.0,
    mass: 250,
    verticalSpeed: 15.0,
    verticalAccel: 4.0,
    ratingSpeed: 35,
    ratingManeuverability: 0.14,
    ratingDurability: 1200,
    ratingArmor: 650,
    ratingFirepower: 6.75,
  }),
  new Ship({
    name: "Shrike",
    difficulty: "Hard",
    description: `Lacking the industry of the other factions, Chaladon ships focus on 
    light weight, maneuverability, and a unique flair. Though originally based on 
    Baronite design, the intensive study of lift gas has greatly advanced their ship 
    technology. The Shrike is the pinnacle of these innovations, with a sleek balloon 
    and lightweight frame supporting a pair of heavy guns and engines that almost 
    outweigh the ship itself. Onboard lift gas processing creates an eerie mist about 
    the ship, resulting in either fear or rude jokes.`,
    longitudinalSpeed: 38.01,
    longitudinalAccel: 8.0,
    turnSpeed: 13.01,
    turnAccel: 9.0,
    mass: 82.5,
    verticalSpeed: 17.0,
    verticalAccel: 2.5,
    ratingSpeed: 38.01,
    ratingManeuverability: 0.16,
    ratingDurability: 650,
    ratingArmor: 425,
    ratingFirepower: 4.5,
  }),
  new Ship({
    name: "Stormbreaker",
    difficulty: "Hard",
    description: `Storms break quickly in the desert, swiftly causing destruction and 
    then fading away. This is also the way of the Arashi Stormbreakers. They are 
    quickly constructed with whatever is at hand, without much thought given to safety. 
    Some flights are as short-lived as the desert storms that give them their namesake. 
    Despite their haphazard fragility, they are a well-armed raider powered by engines 
    salvaged from larger ships. This gives them the unique ability to rapidly change 
    direction in combat.`,
    longitudinalSpeed: 32.0,
    longitudinalAccel: 9.5,
    turnSpeed: 15.9,
    turnAccel: 6.43,
    mass: 95,
    verticalSpeed: 16.0,
    verticalAccel: 3.0,
    ratingSpeed: 32,
    ratingManeuverability: 0.11,
    ratingDurability: 400,
    ratingArmor: 420,
    ratingFirepower: 4.25,
  }),
];
