interface IMediator {
  notify(sender: object, event: string): void;
}

class Mediator implements Mediator {
  private component1: Component1;
  private component2: Component2;

  constructor(c1: Component1, c2: Component2) {
    this.component1 = c1;
    this.component1.setMediator(this);
    this.component2 = c2;
    this.component2.setMediator(this);
  }

  public notify(sender: object, event: string): void {
    if (event === "Component1") {
      console.log("Component1 was trigger, event:", event);
      this.component1.trigger(sender);
    }
    if (event === "Component2") {
      console.log("Component2 was trigger, event:", event);
      this.component2.trigger(sender);
    }
  }
}

class BaseComponent {
  protected mediator: Mediator | null;

  constructor() {
    this.mediator = null;
  }

  public setMediator(mediator: Mediator): void {
    this.mediator = mediator;
  }
}

class Component1 extends BaseComponent {
  trigger(sender: object) {
    console.log("Component1: trigger, data: ", sender);
  }

  init() {
    if (this.mediator) {
      this.mediator.notify({ sender: "Component1" }, "Component1");
    }
  }
}

class Component2 extends BaseComponent {
  trigger(sender: object) {
    console.log("Component2: trigger, data: ", sender);
  }

  create() {
    if (this.mediator) {
      this.mediator.notify({ sender: "Component2" }, "Component2");
    }
  }
}

const component1 = new Component1();
const component2 = new Component2();

const mediator = new Mediator(component1, component2);

component1.init();
component2.create();
