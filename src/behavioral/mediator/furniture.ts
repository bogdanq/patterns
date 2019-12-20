interface Mediator {
  notify(sender: object, event: string): void;
}

interface Sender {
  customer: Sofa | Shelf;
  name: string;
  model: string;
  info: string;
}

class FurnitureFactory implements Mediator {
  public customers: { [key: string]: Shelf | Sofa };

  constructor() {
    this.customers = {};
  }

  notify(sender: Sender, event: "sofa" | "shelf") {
    this.customers[event] = sender.customer;
    console.log(
      `Order name: ${sender.name}. Model ${sender.model}. Info ${sender.info}`
    );
    this.customers[event].update({ event });
  }
}

interface IBaseComponent {
  setMediator: (mediator: Mediator) => void;
}

abstract class BaseComponent implements IBaseComponent {
  protected mediator: Mediator;

  constructor(mediator: Mediator) {
    this.mediator = mediator;
  }

  public setMediator(mediator: Mediator) {
    this.mediator = mediator;
  }
}

class Sofa extends BaseComponent {
  public name: string;
  constructor(name: string, mediator: Mediator) {
    super(mediator);
    this.name = name;
  }

  update(data: object) {
    console.log("Sofa: created", data);
  }

  makeFurniture(model: string, info: string) {
    return (
      this.mediator &&
      this.mediator.notify(
        {
          customer: this,
          name: this.name,
          model,
          info
        },
        "Sofa"
      )
    );
  }
}

class Shelf extends BaseComponent {
  public name: string;
  constructor(name: string, mediator: Mediator) {
    super(mediator);
    this.name = name;
  }

  update(data: object) {
    console.log("Shelf: created", data);
  }

  makeFurniture(model: string, info: string) {
    return (
      this.mediator &&
      this.mediator.notify(
        {
          customer: this,
          name: this.name,
          model,
          info
        },
        "Shelf"
      )
    );
  }
}

const mediator = new FurnitureFactory();
const sofa = new Sofa("sofa", mediator);
const shelf = new Shelf("shelf", mediator);
sofa.makeFurniture("12321", "info sofa");
shelf.makeFurniture("1110", "info");
