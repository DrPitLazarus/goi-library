import { slugify } from "./util";

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
   * @param {Object} [gunObj.opt] - Optional properties.
   * @param {number} [gunObj.opt.additionalShellDrop] - In m/s^2.
   * @param {number} [gunObj.opt.fireChance] - Fire Ignition percent chance.
   * @param {number[]} [gunObj.opt.fireChanceStacks] - Fire Ignition stacks. Array for range.
   * @param {number[]} [gunObj.opt.aoeRadius] - In meters. Array for range.
   * @param {number} [gunObj.opt.buckshots]
   * @param {number} [gunObj.opt.pullStrength] - In kN*s.
   * @param {number} [gunObj.opt.pullDuration] - In seconds.
   * @param {number} [gunObj.opt.flareIllumination] - In lx (lux).
   * @param {number} [gunObj.opt.flareDuration] - In seconds.
   * @param {number} [gunObj.opt.mineImpulse] - In kN*s.
   * @param {number} [gunObj.opt.knockback] - In kN*s.
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
    /** @prop Optional properties. */
    this.opt = gunObj.opt || {};
    /** @prop In m/s^2. */
    gunObj.opt?.additionalShellDrop &&
      (this.opt.additionalShellDrop = gunObj.opt?.additionalShellDrop);
    /** @prop Fire Ignition percent chance. */
    gunObj.opt?.fireChance && (this.opt.fireChance = gunObj.opt?.fireChance);
    /** @prop Fire Ignition stacks. Array for range. */
    gunObj.opt?.fireChanceStacks && (this.opt.fireChanceStacks = gunObj.opt?.fireChanceStacks);
    /** @prop In meters. Array for range. */
    gunObj.opt?.aoeRadius && (this.opt.aoeRadius = gunObj.opt?.aoeRadius);
    gunObj.opt?.buckshots && (this.opt.buckshots = gunObj.opt?.buckshots);
    /** @prop In kN*s. */
    gunObj.opt?.pullStrength && (this.opt.pullStrength = gunObj.opt?.pullStrength);
    /** @prop In seconds. */
    gunObj.opt?.pullDuration && (this.opt.pullDuration = gunObj.opt?.pullDuration);
    /** @prop In lx (lux). */
    gunObj.opt?.flareIllumination &&
      (this.opt.flareIllumination = gunObj.opt?.flareIllumination);
    /** @prop In seconds. */
    gunObj.opt?.flareDuration && (this.opt.flareDuration = gunObj.opt?.flareDuration);
    /** @prop In kN*s. */
    gunObj.opt?.mineImpulse && (this.opt.mineImpulse = gunObj.opt?.mineImpulse);
    /** @prop In kN*s. */
    gunObj.opt?.knockback && (this.opt.knockback = gunObj.opt?.knockback);
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

/**
 *  @param {string} type - Light or Heavy gun.
 */
export function getToc(type) {
  return guns
    .filter((gun) => gun.type === type)
    .map((gun) => {
      return {
        name: gun.name,
        link: `#${slugify(gun.name)}`,
      };
    });
}

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
    opt: {
      fireChance: 17.5,
      fireChanceStacks: [1],
      aoeRadius: [2.5],
    },
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
    opt: {
      additionalShellDrop: 5,
      fireChance: 7.5,
      fireChanceStacks: [1],
      aoeRadius: [4],
    },
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
    opt: {},
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
    opt: {
      aoeRadius: [7],
      fireChance: 22,
      fireChanceStacks: [1],
    },
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
    opt: {
      buckshots: 16,
    },
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
    opt: {
      additionalShellDrop: 12,
      pullStrength: 1500,
      pullDuration: 6,
    },
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
    opt: {
      additionalShellDrop: 3,
      fireChance: 100,
      fireChanceStacks: [15],
      aoeRadius: [3],
      flareIllumination: 600,
      flareDuration: 25,
    },
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
    opt: {
      additionalShellDrop: 15,
      aoeRadius: [1.25],
    },
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
    opt: {
      additionalShellDrop: 7,
      fireChance: 7.5,
      fireChanceStacks: [1],
      aoeRadius: [8],
    },
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
    opt: {
      additionalShellDrop: 7,
      fireChance: 32,
      fireChanceStacks: [1, 2],
      aoeRadius: [3],
    },
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
    opt: {
      additionalShellDrop: 13,
      fireChance: 25,
      fireChanceStacks: [5],
      aoeRadius: [60],
      mineImpulse: 80,
    },
  }),
  new Gun({
    name: "Hades Light Cannon",
    type: "Light",
    description: `A mid to long-range armor melting weapon with arcing shots. A higher 
    skilled gun that can be terrifying in the right hands. Arming time of 0.6s, no AoE 
    under 150m with default ammo. Ammo types that will reduce arming range list either 
    reduced velocity or reduced arming time.`,
    effectiveVs: [COMPONENTS.BALLOON, COMPONENTS.HULL, COMPONENTS.ARMOR],
    primaryDamageType: DAMAGE_TYPES.FIRE,
    primaryDamageValue: 30,
    secondaryDamageType: DAMAGE_TYPES.PIERCING,
    secondaryDamageValue: 45,
    rateOfFire: 1.25,
    reloadTime: 5.5,
    magazineSize: 8,
    projectileSpeed: 250,
    range: 1400,
    angles: [40, 40, 40, 50],
    opt: {
      additionalShellDrop: 15,
      fireChance: 45,
      fireChanceStacks: [1],
      aoeRadius: [5],
    },
  }),
  new Gun({
    name: "Februus Weaponized Coil",
    type: "Light",
    description: `Fires an electrical discharge that arcs between multiple enemies. 
    Hold the trigger to charge up to 5 seconds; damage and number of jumps increases
    with charge time. Minimum charge time of 1.25s.`,
    effectiveVs: [COMPONENTS.GUNS, COMPONENTS.ENGINES, COMPONENTS.ARMOR],
    primaryDamageType: DAMAGE_TYPES.PIERCING,
    primaryDamageValue: 20,
    secondaryDamageType: DAMAGE_TYPES.SHATTER,
    secondaryDamageValue: 22.5,
    rateOfFire: 2.0,
    reloadTime: 1.0,
    magazineSize: 1,
    projectileSpeed: -1,
    range: 1000,
    angles: [55, 55, 40, 50],
    opt: {
      fireChance: 25,
      fireChanceStacks: [2, 4],
      aoeRadius: [6, 75],
    },
  }),
  new Gun({
    name: "Kalakuta Gas Mortar",
    type: "Light",
    description: `Fires canisters of caustic chemicals, which create a cloud of 
    disabling gas when they explode. Gas clouds slow and deals damage over time, each 
    cloud lasts 13 seconds. Secondary-fire detonates the canister. Arming distance of 60m.`,
    effectiveVs: [COMPONENTS.GUNS, COMPONENTS.ENGINES, COMPONENTS.ARMOR],
    primaryDamageType: DAMAGE_TYPES.SHATTER,
    primaryDamageValue: 3,
    secondaryDamageType: DAMAGE_TYPES.PIERCING,
    secondaryDamageValue: 5,
    rateOfFire: 0.5,
    reloadTime: 8.0,
    magazineSize: 2,
    projectileSpeed: 200,
    range: 800,
    angles: [30, 30, 25, 25],
    opt: {
      additionalShellDrop: 8,
      aoeRadius: [100],
    },
  }),
  new Gun({
    name: "Seraph Tempest Missiles",
    type: "Light",
    description: `Fires remote-guided missiles; reticle must bet kept on a target to 
    direct missiles towards it. Main missile splits into guided submunitions after 0.25
    seconds (50m). Submunitions have random velocity between 150m/s and 200m/s. 
    Submunitions begin randomly detonating after 600m with missiles rarely reaching 
    beyond 1700m.`,
    effectiveVs: [COMPONENTS.HULL, COMPONENTS.GUNS, COMPONENTS.ENGINES],
    primaryDamageType: DAMAGE_TYPES.EXPLOSIVE,
    primaryDamageValue: 19,
    secondaryDamageType: DAMAGE_TYPES.SHATTER,
    secondaryDamageValue: 11,
    rateOfFire: 0.5,
    reloadTime: 7.0,
    magazineSize: 2,
    projectileSpeed: 150,
    range: 600,
    angles: [50, 50, 40, 40],
    opt: {
      fireChance: 7,
      fireChanceStacks: [1, 2],
      aoeRadius: [7],
    },
  }),
  new Gun({
    name: "Aten Lens Array",
    type: "Light",
    description: `Hold down trigger to start charging. Starts dealing damage after 0.75
    seconds of charge. Will increase damage to 400% base damage over 4 seconds of 
    continuous fire at the cost of 30% reduced turn speed. Releasing trigger restarts 
    the charge and damage ramp. Reduced damage starting after 300m. 50% damage at 
    800m. Passes through targets, damaging all components and ships in line-of-sight.`,
    effectiveVs: [COMPONENTS.BALLOON, COMPONENTS.HULL, COMPONENTS.ARMOR],
    primaryDamageType: DAMAGE_TYPES.PIERCING,
    primaryDamageValue: 2,
    secondaryDamageType: DAMAGE_TYPES.FIRE,
    secondaryDamageValue: 1,
    rateOfFire: 10.0,
    reloadTime: 10.0,
    magazineSize: 200,
    projectileSpeed: 2000,
    range: 1100,
    angles: [35, 35, 25, 25],
    opt: {
      fireChance: 3,
      fireChanceStacks: [1],
    },
  }),
  new Gun({
    name: "Februus Weaponized Coil [Mk. II]",
    type: "Light",
    description: `Modified coils allows for short charge time and multiple shots per clip.
    Despite 400m range, it is highly effective against groups of enemies with its
    higher chance to arc.`,
    effectiveVs: [COMPONENTS.GUNS, COMPONENTS.ENGINES, COMPONENTS.ARMOR],
    primaryDamageType: DAMAGE_TYPES.PIERCING,
    primaryDamageValue: 25,
    secondaryDamageType: DAMAGE_TYPES.SHATTER,
    secondaryDamageValue: 25,
    rateOfFire: 1.0,
    reloadTime: 6.0,
    magazineSize: 6,
    projectileSpeed: -1,
    range: 400,
    angles: [55, 55, 40, 50],
    opt: {
      fireChance: 25,
      fireChanceStacks: [2, 4],
      aoeRadius: [16],
    },
  }),
  new Gun({
    name: "Aten Lens Array [Mk. II]",
    type: "Light",
    description: `Large burst of super heated beams that extend to 450m. Slightly reduced
    damage after 150m.`,
    effectiveVs: [COMPONENTS.BALLOON, COMPONENTS.HULL],
    primaryDamageType: DAMAGE_TYPES.FIRE,
    primaryDamageValue: 14.00001,
    secondaryDamageType: DAMAGE_TYPES.FIRE,
    secondaryDamageValue: 14.00001,
    rateOfFire: 5.0,
    reloadTime: 6.0,
    magazineSize: 60,
    projectileSpeed: 2000,
    range: 450,
    angles: [40, 40, 40, 40],
    opt: {
      fireChance: 3,
      fireChanceStacks: [1],
      buckshots: 3,
    },
  }),
  new Gun({
    name: "Kalakuta Gas Mortar [Mk. II]",
    type: "Light",
    description: `Higher rate of fire with experimental gas shells that deals high 
    damage but dissipates quickly.`,
    effectiveVs: [COMPONENTS.GUNS, COMPONENTS.ENGINES, COMPONENTS.ARMOR],
    primaryDamageType: DAMAGE_TYPES.SHATTER,
    primaryDamageValue: 16,
    secondaryDamageType: DAMAGE_TYPES.PIERCING,
    secondaryDamageValue: 22,
    rateOfFire: 2.0,
    reloadTime: 8.0,
    magazineSize: 5,
    projectileSpeed: 600,
    range: 798,
    angles: [30, 30, 25, 25],
    opt: {
      fireChance: 5,
      fireChanceStacks: [1],
      aoeRadius: [60],
    },
  }),
  new Gun({
    name: "Seraph Tempest Missiles [Mk. II]",
    type: "Light",
    description: `Fires a single slow moving incendiary missile that can be guided to 
    a target. Deals substantial hull damage and starts fires in a large radius.`,
    effectiveVs: [COMPONENTS.BALLOON, COMPONENTS.HULL],
    primaryDamageType: DAMAGE_TYPES.EXPLOSIVE,
    primaryDamageValue: 240,
    secondaryDamageType: DAMAGE_TYPES.FIRE,
    secondaryDamageValue: 1,
    rateOfFire: 0.87,
    reloadTime: 3.0,
    magazineSize: 1,
    projectileSpeed: 150,
    range: 1500,
    angles: [65, 65, 30, 30],
    opt: {
      fireChance: 40,
      fireChanceStacks: [2],
      aoeRadius: [10],
    },
  }),
  new Gun({
    name: "Seraph Tempest Missiles [Mk. S]",
    type: "Light",
    description: `Fires remote-guided missiles; reticle must be kept on a target to direct
    missiles towards it. Main missile splits into 7 guided submunitions after 0.01
    seconds. Submunitions have random velocity between 250m/s and 300m/s. Submunitions 
    begin randomly detonating after 600m with missiles rarely reaching beyond 1700m.`,
    effectiveVs: [COMPONENTS.BALLOON, COMPONENTS.HULL],
    primaryDamageType: DAMAGE_TYPES.EXPLOSIVE,
    primaryDamageValue: 9,
    secondaryDamageType: DAMAGE_TYPES.FIRE,
    secondaryDamageValue: 9,
    rateOfFire: 0.5,
    reloadTime: 8.0,
    magazineSize: 3,
    projectileSpeed: 250,
    range: 600,
    angles: [50, 50, 30, 10],
    opt: {
      fireChance: 7,
      fireChanceStacks: [1],
      aoeRadius: [7],
    },
  }),
  new Gun({
    name: "Aten Lens Array [Mk. S]",
    type: "Light",
    description: `Hold down trigger to start charging. Starts dealing damage after 1.75
    seconds of charge. Will increase damage to 400% base damage over 8 seconds of 
    continuous fire at the cost of 30% reduced turn speed. Releasing trigger restarts 
    the charge and damage ramp. Reduced damage starting after 300m. 50% damage at 800m. 
    Passes through targets, damaging all components and ships in line-of-sight.`,
    effectiveVs: [COMPONENTS.BALLOON, COMPONENTS.HULL, COMPONENTS.ARMOR],
    primaryDamageType: DAMAGE_TYPES.PIERCING,
    primaryDamageValue: 1,
    secondaryDamageType: DAMAGE_TYPES.FIRE,
    secondaryDamageValue: 0.4,
    rateOfFire: 10.0,
    reloadTime: 10.0,
    magazineSize: 200,
    projectileSpeed: 2000,
    range: 800,
    angles: [35, 35, 15, 10],
    opt: {
      fireChance: 3,
      fireChanceStacks: [1],
    },
  }),
  // heavy guns
  new Gun({
    name: "Typhon Heavy Flak Cannon [Mk. I]",
    type: "Heavy",
    description: `A medium/long-range cannon that fires explosive projectiles dealing
    substantial damage with a wide area of effect. Arming time of 2/3s, no
    secondary AoE under 200m.`,
    effectiveVs: [COMPONENTS.HULL],
    primaryDamageType: DAMAGE_TYPES.EXPLOSIVE,
    primaryDamageValue: 115,
    secondaryDamageType: DAMAGE_TYPES.EXPLOSIVE,
    secondaryDamageValue: 50,
    rateOfFire: 2.0,
    reloadTime: 4.0,
    magazineSize: 4,
    projectileSpeed: 300,
    range: 2400,
    angles: [40, 40, 30, 40],
    opt: {
      additionalShellDrop: 6,
      fireChance: 12.5,
      fireChanceStacks: [1, 3],
      aoeRadius: [7],
    },
  }),
  new Gun({
    name: "Manticore Heavy Hwacha",
    type: "Heavy",
    description: `Fires a blinding barrage of 20 rockets for a powerful area-of-denial 
    effect in close to mid range engagements. While devastating up close, this gun 
    quickly loses effectiveness due to a high missile spread and jaw rattling gun recoil.
    
    Missiles will start detonating at 750 meters due to crude and inaccurate
    timer fuses. Detonations will continue for approximately 1 more second with
    a few missiles reaching targets 1060 meters away. Don't let this range fool
    you, as this beast can't barely hit the broad side of a Galleon at those ranges.
    Best to hold your shots and wait for the buggers to get closer. -Wilson`,
    effectiveVs: [COMPONENTS.HULL, COMPONENTS.GUNS, COMPONENTS.ENGINES],
    primaryDamageType: DAMAGE_TYPES.EXPLOSIVE,
    primaryDamageValue: 15,
    secondaryDamageType: DAMAGE_TYPES.SHATTER,
    secondaryDamageValue: 50,
    rateOfFire: 8.33,
    reloadTime: 14.0,
    magazineSize: 20,
    projectileSpeed: 300,
    range: 750,
    angles: [30, 30, 20, 20],
    opt: {
      fireChance: 6.3,
      fireChanceStacks: [1],
      aoeRadius: [5],
    },
  }),
  new Gun({
    name: "Hellhound Heavy Twin Carronade",
    type: "Heavy",
    description: `A larger, slower, more powerful Carronade that fires a piercing 
    short-range shotgun burst. Effective against balloons and components.`,
    effectiveVs: [COMPONENTS.BALLOON, COMPONENTS.GUNS, COMPONENTS.ENGINES],
    primaryDamageType: DAMAGE_TYPES.FLECHETTE,
    primaryDamageValue: 350,
    secondaryDamageType: DAMAGE_TYPES.SHATTER,
    secondaryDamageValue: 200,
    rateOfFire: 0.83,
    reloadTime: 7.5,
    magazineSize: 2,
    projectileSpeed: 800,
    range: 400,
    angles: [35, 35, 30, 10],
    opt: {
      buckshots: 20,
    },
  }),
  new Gun({
    name: "Lumberjack Heavy Mortar",
    type: "Heavy",
    description: `High arcing weapon with balloon damaging Flechette AoE. Arming time of
    0.727s, Guns with arming time do not inflict the second listed damage before
    arming. No AoE damage under 200m.
    
    High parabolic arc, narrow range of motion, and slow projectile velocity
    make this a difficult gun to master, requiring high skill and experience.`,
    effectiveVs: [COMPONENTS.BALLOON],
    primaryDamageType: DAMAGE_TYPES.FLECHETTE,
    primaryDamageValue: 50,
    secondaryDamageType: DAMAGE_TYPES.FLECHETTE,
    secondaryDamageValue: 250,
    rateOfFire: 0.8,
    reloadTime: 8.0,
    magazineSize: 6,
    projectileSpeed: 275,
    range: 1650,
    angles: [15, 15, 65, 25],
    opt: {
      additionalShellDrop: 20,
      aoeRadius: [8],
    },
  }),
  new Gun({
    name: "Minotaur Heavy Cannon",
    type: "Heavy",
    description: `A specialized support weapon that knocks back enemy ships. The 
    farther you shoot from a ship's center of mass, the more spin it will add to push a 
    ship off its gun arcs.`,
    effectiveVs: [COMPONENTS.GUNS, COMPONENTS.ENGINES, COMPONENTS.ARMOR],
    primaryDamageType: DAMAGE_TYPES.PIERCING,
    primaryDamageValue: 72,
    secondaryDamageType: DAMAGE_TYPES.SHATTER,
    secondaryDamageValue: 180,
    rateOfFire: 0.67,
    reloadTime: 10.0,
    magazineSize: 5,
    projectileSpeed: 700,
    range: 1800,
    angles: [40, 40, 30, 20],
    opt: {
      buckshots: 4,
      knockback: 120,
    },
  }),
  new Gun({
    name: "Roaring Tiger Heavy Detonator",
    type: "Heavy",
    description: `Launches a volley of slow-moving projectiles that will detonate 4 times
    when Secondary Fire is pressed. Otherwise, projectile will hit enemy and detonate once.`,
    effectiveVs: [COMPONENTS.BALLOON, COMPONENTS.HULL],
    primaryDamageType: DAMAGE_TYPES.FLECHETTE,
    primaryDamageValue: 30,
    secondaryDamageType: DAMAGE_TYPES.EXPLOSIVE,
    secondaryDamageValue: 30,
    rateOfFire: 2.5,
    reloadTime: 10.0,
    magazineSize: 4,
    projectileSpeed: 80,
    range: 800,
    angles: [40, 40, 40, 30],
    opt: {
      additionalShellDrop: 2,
      aoeRadius: [70],
    },
  }),
  new Gun({
    name: "Immortal Gaze Heavy Accelerator",
    type: "Heavy",
    description: `Fires magnetically charged, ultra-high-velocity shells capable of 
    piercing through ships. Damages and pulls in its wake any enemy unit it passes near.
    Charge to increase damage and radius.`,
    effectiveVs: [COMPONENTS.ARMOR],
    primaryDamageType: DAMAGE_TYPES.PIERCING,
    primaryDamageValue: 250,
    secondaryDamageType: DAMAGE_TYPES.PIERCING,
    secondaryDamageValue: 125,
    rateOfFire: 2.0,
    reloadTime: 10.0,
    magazineSize: 4,
    projectileSpeed: 800,
    range: 2400,
    angles: [60, 60, 40, 40],
    opt: {
      aoeRadius: [6],
      knockback: 400,
    },
  }),
  new Gun({
    name: "Roaring Tiger Heavy Detonator [Mk. II]",
    type: "Heavy",
    description: `Multiple mines per shot that detonate once, Secondary Fire to detonate.
    Arming distance 100m.`,
    effectiveVs: [COMPONENTS.BALLOON, COMPONENTS.HULL],
    primaryDamageType: DAMAGE_TYPES.FLECHETTE,
    primaryDamageValue: 15,
    secondaryDamageType: DAMAGE_TYPES.EXPLOSIVE,
    secondaryDamageValue: 30,
    rateOfFire: 0.5,
    reloadTime: 8.0,
    magazineSize: 4,
    projectileSpeed: 200,
    range: 600,
    angles: [40, 40, 40, 30],
    opt: {
      additionalShellDrop: 16,
      aoeRadius: [50],
    },
  }),
  new Gun({
    name: "Immortal Gaze Heavy Accelerator [Mk. II]",
    type: "Heavy",
    description: `Short charging high velocity rounds that pierces through and pulls 
    enemy ships trapped in the weapon's wake towards your ship. Modified rounds to
    deal more killing damage.`,
    effectiveVs: [COMPONENTS.BALLOON, COMPONENTS.HULL, COMPONENTS.GUNS, COMPONENTS.ENGINES],
    primaryDamageType: DAMAGE_TYPES.SHATTER,
    primaryDamageValue: 130,
    secondaryDamageType: DAMAGE_TYPES.FIRE,
    secondaryDamageValue: 70,
    rateOfFire: 0.5,
    reloadTime: 10.0,
    magazineSize: 8,
    projectileSpeed: 800,
    range: 1600,
    angles: [40, 40, 60, 30],
    opt: {
      aoeRadius: [10],
    },
  }),
  new Gun({
    name: "Typhon Heavy Flak Cannon [Mk. II]",
    type: "Heavy",
    description: `Same DPS but packed into 2 shots instead of 4. A medium/long-range
    cannon that fires explosive projectiles dealing substantial damage with a
    wide area of effect. Arming time of 2/3s, no secondary AoE under 200m.`,
    effectiveVs: [COMPONENTS.HULL],
    primaryDamageType: DAMAGE_TYPES.EXPLOSIVE,
    primaryDamageValue: 150,
    secondaryDamageType: DAMAGE_TYPES.EXPLOSIVE,
    secondaryDamageValue: 180,
    rateOfFire: 0.8,
    reloadTime: 4.0,
    magazineSize: 2,
    projectileSpeed: 300,
    range: 2400,
    angles: [40, 40, 30, 40],
    opt: {
      additionalShellDrop: 6,
      fireChance: 12.5,
      fireChanceStacks: [1, 5],
      aoeRadius: [7],
    },
  }),
  new Gun({
    name: "Nemesis Heavy Carronade",
    type: "Heavy",
    description: `Harkening to the olden days of naval warfare, this powerful 
    carronade fires iron cannonballs instead of buckshot. High damage to guns and engines.
    Moderate damage to Armor and Hull integrity.`,
    effectiveVs: [COMPONENTS.BALLOON, COMPONENTS.HULL, COMPONENTS.GUNS, COMPONENTS.ENGINES],
    primaryDamageType: DAMAGE_TYPES.SHATTER,
    primaryDamageValue: 125,
    secondaryDamageType: DAMAGE_TYPES.IMPACT,
    secondaryDamageValue: 100,
    rateOfFire: 0.6,
    reloadTime: 6.0,
    magazineSize: 4,
    projectileSpeed: 400,
    range: 1500,
    angles: [40, 40, 25, 15],
    opt: {
      additionalShellDrop: 11,
      aoeRadius: [2],
      knockback: 200,
    },
  }),
  new Gun({
    name: "Nemesis Heavy Carronade",
    type: "Heavy",
    description: `Harkening to the olden days of naval warfare, this powerful 
    carronade fires iron cannonballs instead of buckshot. High damage to guns and engines.
    Moderate damage to Armor and Hull integrity.`,
    effectiveVs: [COMPONENTS.BALLOON, COMPONENTS.HULL, COMPONENTS.GUNS, COMPONENTS.ENGINES],
    primaryDamageType: DAMAGE_TYPES.SHATTER,
    primaryDamageValue: 125,
    secondaryDamageType: DAMAGE_TYPES.IMPACT,
    secondaryDamageValue: 100,
    rateOfFire: 0.6,
    reloadTime: 6.0,
    magazineSize: 4,
    projectileSpeed: 400,
    range: 1500,
    angles: [40, 40, 25, 15],
    opt: {
      additionalShellDrop: 11,
      aoeRadius: [2],
      knockback: 200,
    },
  }),
  new Gun({
    name: "Roaring Tiger Heavy Detonator [Mk. S]",
    type: "Heavy",
    description: `Launches a volley of 5 slow-moving projectiles that will detonate twice
    when Secondary Fire is pressed. Direct hits will only do flechette damage and then 
    explode once. Practice detonating just after the projectiles start lighting up the target.`,
    effectiveVs: [COMPONENTS.BALLOON, COMPONENTS.HULL],
    primaryDamageType: DAMAGE_TYPES.FLECHETTE,
    primaryDamageValue: 8,
    secondaryDamageType: DAMAGE_TYPES.EXPLOSIVE,
    secondaryDamageValue: 34,
    rateOfFire: 0.5,
    reloadTime: 5.0,
    magazineSize: 1,
    projectileSpeed: 150,
    range: 300,
    angles: [50, 50, 30, 30],
    opt: {
      additionalShellDrop: 2,
      fireChance: 4,
      fireChanceStacks: [1],
      aoeRadius: [20],
    },
  }),
];
