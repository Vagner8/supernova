const enemyPrototype = {
  position: {
    x: 0,
    y: 0,
  },
  health: 100,
  name: "Wolf",
  setPosition(x: number, y: number) {
    this.position = {
      x,
      y,
    };
    return this;
  },
};

const wolf1: typeof enemyPrototype = Object.create(enemyPrototype);
const wolf2: typeof enemyPrototype = Object.create(enemyPrototype);

wolf1.setPosition(10, 15);

console.log("wolf1", wolf1.position);
console.log("wolf2", wolf2.position);

console.log("enemyPrototype", enemyPrototype.position);
