interface Component {
  accept(v: Visitor): void;
  draw(): void;
}

interface Visitor {
  visitSquare(shape: Square): void;
  visitRectangle(shape: Rectangle): void;
  visitTriangle(shape: Triangle): void;
  visitCircle(shape: Circle): void;
  exportXtml(params: object): object;
}

class CommonShape implements Component {
  accept(v: Visitor) {}
  draw() {}
}

class Square extends CommonShape {
  public width: number;
  constructor(width: number) {
    super();
    this.width = width;
  }
  accept(v: Visitor) {
    return v.visitSquare(this);
  }

  draw() {}
}

class Rectangle extends CommonShape {
  public width: number;
  public height: number;
  constructor(width: number, height: number) {
    super();
    this.width = width;
    this.height = height;
  }
  accept(v: Visitor) {
    return v.visitRectangle(this);
  }
  draw() {}
}

class Triangle extends CommonShape {
  public type: string;
  public leftEdge: number;
  public rightEdge: number;
  public bottomEdge: number;
  constructor() {
    super();
    this.type = "isosceles";
    this.leftEdge = 50;
    this.rightEdge = 50;
    this.bottomEdge = 10;
  }
  accept(v: Visitor) {
    return v.visitTriangle(this);
  }
  draw() {}
}

class Circle extends CommonShape {
  public radius: number;
  constructor(radius: number) {
    super();
    this.radius = radius;
  }

  accept(v: Visitor) {
    return v.visitCircle(this);
  }
  draw() {}
}

class ExportVisitor implements Visitor {
  visitSquare(shape: Square) {
    return this.exportXtml({
      shape: "square",
      width: shape.width
    });
  }
  visitRectangle(shape: Rectangle) {
    return this.exportXtml({
      shape: "rectangle",
      width: shape.width,
      height: shape.height
    });
  }
  visitTriangle(shape: Triangle) {
    return this.exportXtml({
      shape: "triangle",
      type: shape.type,
      leftEdge: shape.leftEdge,
      rightEdge: shape.rightEdge,
      bottomEdge: shape.bottomEdge
    });
  }
  visitCircle(shape: Circle) {
    return this.exportXtml({
      shape: "circle",
      radius: shape.radius
    });
  }

  exportXtml(params: object) {
    return { ...params, exportType: "xtml" };
  }
}

const clientCode = (visitor: Visitor, components: Component[]) => {
  for (const component of components) {
    console.log("export shape - ", component.accept(visitor));
  }
};

const visitor = new ExportVisitor();
const components = [
  new Square(120),
  new Rectangle(50, 60),
  new Triangle(),
  new Circle(180)
];

clientCode(visitor, components);
