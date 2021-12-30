import _ from "lodash";

export default class Monster {
  /**
   * Do not call the constructor directly, use the static helper to create a new monster.
   */
  constructor(
    name = "",
    health = 0,
    attack = 0,
    skill = 0,
    defense = 0,
    resistence = 0,
    speed = 0,
    luck = 0,
    rating = 0,
    lastMeal = 0,
    stamina = 0,
    img = ""
  ) {
    this.name = name;
    this.health = health;
    this.attack = attack;
    this.skill = skill;
    this.defense = defense;
    this.resistence = resistence;
    this.speed = speed;
    this.luck = luck;
    this.rating = rating;
    this.lastMeal = lastMeal;
    this.stamina = stamina;
    this.img = img;
  }

  static createNewMonster(name = "", rating = 1, img = "") {
    // Randomly define the monster's stats based on the raitings.
    let stats = Monster.determineRandomStats(rating);
    // Set the stamina of the monster.
    let health = _.round(
      rating * 100 +
        stats[2 /*defense*/] * 0.75 +
        stats[3 /*resistence*/] * 0.5,
      0
    );
    let stamina = rating * 200;

    const baby = new Monster(
      name,
      health,
      stats[0], // attack
      stats[1], // skill
      stats[2], // defense
      stats[3], // resistance
      stats[4], // speed
      stats[5], // luck
      rating,
      Date.now(),
      stamina,
      img
    );
  }

  static determineRandomStats(rating) {
    let statMax = rating * 45;
    let statMin = rating * 30;
    let stats = [0, 0, 0, 0, 0, 0];

    // Choose random base stats based on rating.
    do {
      stats = [0, 0, 0, 0, 0, 0];
      for (let i = 0; i < stats.length; ++i) {
        stats[i] = _.random(
          _.floor(statMin / stats.lenght),
          _.ceil(statMax / stats.length),
          false
        );
      }
    } while (_.sum(stats) > statMax);

    // Add bonus stats randomly based on rating
    let bonusStats = 6 * Math.log(rating) + 4;
    for (let i = 0; i < bonusStats; ++i) {
      stats[_.random(0, 5, false)] += 1;
    }
    return stats;
  }
}
