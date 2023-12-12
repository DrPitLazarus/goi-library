class Gun {
  /**
   * Create a gun.
   * @param {Object} gunObj
   * @param {string} gunObj.name
   * @param {string} gunObj.type - Light or Heavy gun.
   * @param {string} gunObj.description
   * @param {string[]} gunObj.effectiveVs
   * @param {string} gunObj.primaryDamageType
   * @param {number} gunObj.primaryDamageValue
   * @param {string} [gunObj.secondaryDamageType]
   * @param {number} [gunObj.secondaryDamageValue]
   * @param {number} gunObj.rateOfFire - Number of shots per second. Time between shots = 1/rateOfFire.
   * @param {number} gunObj.reloadTime - Time in seconds to reload the gun.
   * @param {number} gunObj.magazineSize
   * @param {number} gunObj.projectileSpeed - In m/s.
   * @param {number} gunObj.range - In meters.
   * @param {number[]} gunObj.angles - Angles of gun movement in degrees. Left, Right, Up, Down.
   * @param {number} [gunObj.optAdditionalShellDrop] - In m/s^2.
   * @param {number} [gunObj.optFireChance] - Fire Ignition percent chance.
   * @param {number[]} [gunObj.optFireChanceStacks] - Fire Ignition stacks. Array to specify range of stacks.
   * @param {number} [gunObj.optAoeRadius] - In meters.
   * @param {number} [gunObj.optBuckshots]
   * @param {number} [gunObj.optPullStrength] - In kN*s.
   * @param {number} [gunObj.optPullDuration] - In seconds.
   * @param {number} [gunObj.optFlareIllumination] - In lx (lux).
   * @param {number} [gunObj.optFlareDuration] - In seconds.
   * @param {number} [gunObj.optMineImpulse] - In kN*s.
   */
  constructor(gunObj) {
    this.name = gunObj.name;
    /** @prop Light or Heavy gun. */
    this.type = gunObj.type;
    this.description = gunObj.description;
    this.effectiveVs = gunObj.effectiveVs;
    this.primaryDamageType = gunObj.primaryDamageType;
    this.primaryDamageValue = gunObj.primaryDamageValue;
    this.secondaryDamageType = gunObj.secondaryDamageType;
    this.secondaryDamageValue = gunObj.secondaryDamageValue;
    /** @prop Number of shots per second. Time between shots = 1/rateOfFire. */
    this.rateOfFire = gunObj.rateOfFire;
    /** @prop Time in seconds to reload the gun. */
    this.reloadTime = gunObj.reloadTime;
    this.magazineSize = gunObj.magazineSize;
    /** @prop In m/s. */
    this.projectileSpeed = gunObj.projectileSpeed;
    /** @prop In meters. */
    this.range = gunObj.range;
    /** @prop Angles of gun movement in degrees. Left, Right, Up, Down. */
    this.angles = gunObj.angles;
    /** @prop In m/s^2. */
    this.optAdditionalShellDrop = gunObj.optAdditionalShellDrop;
    /** @prop Fire Ignition percent chance. */
    this.optFireChance = gunObj.optFireChance;
    /** @prop Fire Ignition stacks. Array to specify range of stacks. */
    this.optFireChanceStacks = gunObj.optFireChanceStacks;
    /** @prop In meters. */
    this.optAoeRadius = gunObj.optAoeRadius;
    this.optBuckshots = gunObj.optBuckshots;
    /** @prop In kN*s. */
    this.optPullStrength = gunObj.optPullStrength;
    /** @prop In seconds. */
    this.optPullDuration = gunObj.optPullDuration;
    /** @prop In lx (lux). */
    this.optFlareIllumination = gunObj.optFlareIllumination;
    /** @prop In seconds. */
    this.optFlareDuration = gunObj.optFlareDuration;
    /** @prop In kN*s */
    this.optMineImpulse = gunObj.optMineImpulse;
  }
}

export const COMPONENTS = {
  ARMOR: "Armor",
  BALLOON: "Balloon",
  ENGINES: "Engines",
  GUNS: "Guns",
  HULL: "Hull",
};

export const DAMAGE_TYPES = {
  EXPLOSIVE: "Explosive",
  FIRE: "Fire",
  FLECHETTE: "Flechette",
  IMPACT: "Impact",
  PIERCING: "Piercing",
  SHATTER: "Shatter",
};

export const guns = [
  new Gun({
    name: "Artemis Light Rocket Launcher",
    type: "Light",
    description: `Launches a single explosive rocket over medium/long range.`,
    effectiveVs: [COMPONENTS.HULL, COMPONENTS.GUNS, COMPONENTS.ENGINES],
    primaryDamageType: DAMAGE_TYPES.EXPLOSIVE,
    primaryDamageValue: 70,
    secondaryDamageType: DAMAGE_TYPES.SHATTER,
    secondaryDamageValue: 120,
    rateOfFire: 0.63,
    reloadTime: 7.0,
    magazineSize: 4,
    projectileSpeed: 575,
    range: 1334,
    angles: [65, 65, 10, 35],
    optFireChance: 17.5,
    optFireChanceStacks: [1],
    optAoeRadius: 2.5,
  }),
  new Gun({
    name: "Echidna Light Flak Cannon",
    type: "Light",
    description: `A smaller Flak Cannon, this gun fires explosive rounds over a medium 
    to long range with a high rate of fire. Arming time of 0.5 seconds, no AoE Burst 
    damage under 200m.`,
    effectiveVs: [COMPONENTS.HULL],
    primaryDamageType: DAMAGE_TYPES.EXPLOSIVE,
    primaryDamageValue: 25,
    secondaryDamageType: DAMAGE_TYPES.EXPLOSIVE,
    secondaryDamageValue: 55,
    rateOfFire: 2.86,
    reloadTime: 4.0,
    magazineSize: 6,
    projectileSpeed: 400,
    range: 1200,
    angles: [65, 65, 35, 35],
    optAdditionalShellDrop: 5,
    optFireChance: 7.5,
    optFireChanceStacks: [1],
    optAoeRadius: 4,
  }),
  new Gun({
    name: "Whirlwind Light Gatling Gun",
    type: "Light",
    description: `A close-range piercing weapon with a very high rate of fire, 
    singularly effective against armor.`,
    effectiveVs: [COMPONENTS.GUNS, COMPONENTS.ENGINES, COMPONENTS.ARMOR],
    primaryDamageType: DAMAGE_TYPES.PIERCING,
    primaryDamageValue: 7.5,
    secondaryDamageType: DAMAGE_TYPES.SHATTER,
    secondaryDamageValue: 10,
    rateOfFire: 8.33,
    reloadTime: 5.0,
    magazineSize: 82,
    projectileSpeed: 500,
    range: 405,
    angles: [50, 50, 25, 50],
  }),
  new Gun({
    name: "Dragon Tongue Light Flamethrower",
    type: "Light",
    description: `Unleash all hell on an enemy ship at close range with a jet of fire.`,
    effectiveVs: [COMPONENTS.BALLOON, COMPONENTS.HULL],
    primaryDamageType: DAMAGE_TYPES.FIRE,
    primaryDamageValue: 1.7,
    rateOfFire: 16.67,
    reloadTime: 6.0,
    magazineSize: 250,
    projectileSpeed: 180,
    range: 158,
    angles: [70, 70, 35, 35],
    optAoeRadius: 7,
    optFireChance: 22,
    optFireChanceStacks: [1],
  }),
  new Gun({
    name: "Barking Dog Light Carronade",
    type: "Light",
    description: `Fires a wide shotgun burst of shredding projectiles at close range.`,
    effectiveVs: [COMPONENTS.BALLOON, COMPONENTS.GUNS, COMPONENTS.ENGINES],
    primaryDamageType: DAMAGE_TYPES.FLECHETTE,
    primaryDamageValue: 196,
    secondaryDamageType: DAMAGE_TYPES.SHATTER,
    secondaryDamageValue: 144,
    rateOfFire: 1.1,
    reloadTime: 6.0,
    magazineSize: 5,
    projectileSpeed: 600,
    range: 375,
    angles: [55, 55, 40, 15],
    optBuckshots: 16,
  }),
  new Gun({
    name: "Javelin Light Harpoon Gun",
    type: "Light",
    description: `Will attach to hulls and reel enemies in when secondary fire button is held.`,
    effectiveVs: [COMPONENTS.BALLOON, COMPONENTS.ARMOR],
    primaryDamageType: DAMAGE_TYPES.FLECHETTE,
    primaryDamageValue: 135,
    secondaryDamageType: DAMAGE_TYPES.PIERCING,
    secondaryDamageValue: 80,
    rateOfFire: 0.2,
    reloadTime: 10.0,
    magazineSize: 1,
    projectileSpeed: 250,
    range: 600,
    angles: [60, 60, 40, 20],
    optAdditionalShellDrop: 12,
    optPullStrength: 1500,
    optPullDuration: 6,
  }),
  new Gun({
    name: "Beacon Flare Gun",
    type: "Light",
    description: `Fires a brightly burning flare that hovers in the air to reveal ships 
    hidden in cloud cover. Can also be used as a weapon to cause fire damage. 
    Arming time of 0.6667s.`,
    effectiveVs: [COMPONENTS.BALLOON, COMPONENTS.HULL],
    primaryDamageType: DAMAGE_TYPES.FIRE,
    primaryDamageValue: 10,
    secondaryDamageType: DAMAGE_TYPES.FIRE,
    secondaryDamageValue: 5,
    rateOfFire: 0.5,
    reloadTime: 20.0,
    magazineSize: 2,
    projectileSpeed: 300,
    range: 750,
    angles: [80, 80, 50, 50],
    optAdditionalShellDrop: 3,
    optFireChance: 100,
    optFireChanceStacks: [15],
    optAoeRadius: 3,
    optFlareIllumination: 600,
    optFlareDuration: 25,
  }),
  new Gun({
    name: "Mercury Field Gun",
    type: "Light",
    description: `A slow-firing, long-range scoped cannon that fires powerful explosive rounds.`,
    effectiveVs: [COMPONENTS.GUNS, COMPONENTS.ENGINES, COMPONENTS.ARMOR],
    primaryDamageType: DAMAGE_TYPES.SHATTER,
    primaryDamageValue: 300,
    secondaryDamageType: DAMAGE_TYPES.PIERCING,
    secondaryDamageValue: 75,
    rateOfFire: 0.5,
    reloadTime: 6.0,
    magazineSize: 2,
    projectileSpeed: 750,
    range: 2250,
    angles: [15, 15, 15, 5],
    optAdditionalShellDrop: 15,
    optAoeRadius: 1.25,
  }),
  new Gun({
    name: "Scylla Double-Barreled Mortar",
    type: "Light",
    description: `Capable of firing heavy explosive shells over short/medium range, 
    but with limited accuracy.`,
    effectiveVs: [COMPONENTS.HULL],
    primaryDamageType: DAMAGE_TYPES.EXPLOSIVE,
    primaryDamageValue: 30,
    secondaryDamageType: DAMAGE_TYPES.EXPLOSIVE,
    secondaryDamageValue: 60,
    rateOfFire: 1.82,
    reloadTime: 6.0,
    magazineSize: 12,
    projectileSpeed: 125,
    range: 400,
    angles: [40, 40, 30, 50],
    optAdditionalShellDrop: 7,
    optFireChance: 7.5,
    optFireChanceStacks: [1],
    optAoeRadius: 8,
  }),
  new Gun({
    name: "Banshee Light Rocket Carousel",
    type: "Light",
    description: `Rapidly fires a stream of explosive rockets that have a chance to 
    light components on fire.`,
    effectiveVs: [COMPONENTS.BALLOON, COMPONENTS.HULL],
    primaryDamageType: DAMAGE_TYPES.EXPLOSIVE,
    primaryDamageValue: 28.2,
    secondaryDamageType: DAMAGE_TYPES.FIRE,
    secondaryDamageValue: 21.55,
    rateOfFire: 2.0,
    reloadTime: 6.0,
    magazineSize: 8,
    projectileSpeed: 450,
    range: 1170,
    angles: [60, 60, 35, 35],
    optAdditionalShellDrop: 7,
    optFireChance: 32,
    optFireChanceStacks: [1, 2],
    optAoeRadius: 3,
  }),
  new Gun({
    name: "Phobos Light Mine Launcher",
    type: "Light",
    description: `Lays proximity-detonated floating mines at short range. Mines will 
    arm and deploy after 3 seconds. Each gun supports 5 mines at a time; extras will 
    self-destruct.`,
    effectiveVs: [COMPONENTS.BALLOON, COMPONENTS.HULL, COMPONENTS.ARMOR],
    primaryDamageType: DAMAGE_TYPES.PIERCING,
    primaryDamageValue: 125,
    secondaryDamageType: DAMAGE_TYPES.IMPACT,
    secondaryDamageValue: 100,
    rateOfFire: 0.5,
    reloadTime: 4.0,
    magazineSize: 1,
    projectileSpeed: 55,
    range: 200,
    angles: [60, 60, 45, 15],
    optAdditionalShellDrop: 13,
    optFireChance: 25,
    optFireChanceStacks: [5],
    optAoeRadius: 60,
    optMineImpulse: 80,
  }),
];
