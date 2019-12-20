interface IPlayer {
  createPlayer: () => void;
  name: string;
  age: number;
  id: number;
}

/**
 *  Target class, working with client code!
 *  (compatible with IPlayer)
 */
class Player implements IPlayer {
  public name: string;
  public age: number;
  public id: number;

  constructor(name: string, age: number, id: number) {
    this.name = name;
    this.age = age;
    this.id = id;
  }

  public createPlayer() {
    console.log("Player: createPlayer:");
    return {
      name: this.name,
      age: this.age,
      id: this.id
    };
  }
}

interface IAdapteePlayer {
  someCreatePlayer: () => void;
  name: string;
  age: string;
  id: string;
}
// Custom cluss, not compatible with IPlayer
class AdapteePlayer implements IAdapteePlayer {
  public name: string;
  public age: string;
  public id: string;

  constructor(name: string, age: string, id: string) {
    this.name = name;
    this.age = age;
    this.id = id;
  }

  public someCreatePlayer() {
    console.log("AdapteePlayer: someCreatePlayer: (number)", {
      name: this.name,
      age: this.age,
      id: this.id
    });
    return {
      name: this.name,
      age: this.age,
      id: this.id
    };
  }
}

class Adapter extends Player {
  protected adaptee: AdapteePlayer | null;
  constructor(name: string, age: number, id: number) {
    super(name, age, id);
    this.adaptee = null;
  }

  createPlayer() {
    this.adaptee = new AdapteePlayer(
      this.name,
      this.age.toString(),
      this.id.toString()
    );
    const result = this.adaptee.someCreatePlayer();
    console.log("Adapter: transpile => to string:");
    return {
      ...result,
      age: parseInt(result.age),
      id: parseInt(result.id),
      adapter: true
    };
  }
}

const someClientCode = (target: IPlayer) => {
  return target.createPlayer();
};

const player1 = new Player("john", 12, 1120012);
const player2 = new Adapter("john", 13, 1124);

/**
 * all classes compatible are with IPlayer interface
 */
console.log("player1 => interface IPlayer", someClientCode(player1));
console.log("player1 => interface IAdapteePlayer", someClientCode(player2));
