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
   * @param {string} gunObj.secondaryDamageType
   * @param {number} gunObj.secondaryDamageValue
   * @param {number} gunObj.rateOfFire - Number of shots per second.
   * @param {number} gunObj.reloadTime - Time in seconds to reload the gun.
   * @param {number} gunObj.magazineSize
   * @param {number} gunObj.projectileSpeed - In m/s.
   * @param {number} gunObj.range - In meters.
   * @param {number[]} gunObj.angles - Angles of gun movement in degrees. Left, Right, Up, Down.
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
    /** @prop Number of shots per second. */
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
  }
}

export const guns = [
  new Gun({
    name: "Artemis Light Rocket Launcher",
    type: "Light",
    description: `Launches a single explosive rocket over medium/long range.`,
    effectiveVs: ["Hull", "Guns", "Engines"],
    primaryDamageType: "Explosive",
    primaryDamageValue: 70,
    secondaryDamageType: "Shatter",
    secondaryDamageValue: 120,
    rateOfFire: 0.63,
    reloadTime: 7.0,
    magazineSize: 4,
    projectileSpeed: 575,
    range: 1334,
    angles: [65, 65, 10, 35],
  }),
];
