interface Component {
  accept(visitor: Visitor): void;
}

interface Visitor {
  visitConcreteComponentA(element: ConcreteComponentA): void;
  visitConcreteComponentB(element: ConcreteComponentB): void;
}

class ConcreteComponentA implements Component {
  public accept(visitor: Visitor): void {
    visitor.visitConcreteComponentA(this);
  }

  public createRectangle() {
    console.log("trigger: createRectangle");
  }
}

class ConcreteComponentB implements Component {
  public accept(visitor: Visitor): void {
    visitor.visitConcreteComponentB(this);
  }

  public createCircle() {
    console.log("trigger: createCircle");
  }
}

class ConcreteVisitor implements Visitor {
  public visitConcreteComponentA(element: ConcreteComponentA) {
    return element.createRectangle();
  }

  public visitConcreteComponentB(element: ConcreteComponentB) {
    return element.createCircle();
  }
}

function clientCode(components: Component[], visitor: Visitor) {
  for (const component of components) {
    component.accept(visitor);
  }
}

const components = [new ConcreteComponentA(), new ConcreteComponentB()];

const сoncreteVisitor = new ConcreteVisitor();
clientCode(components, сoncreteVisitor);
