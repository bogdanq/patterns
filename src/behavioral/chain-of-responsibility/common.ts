interface User {
  name: string;
  age: number;
  role: string;
  token: string;
}

interface Handler {
  setNext(handler: Handler): Handler;
  handle(request: User): void;
}

abstract class AbstractHandler implements Handler {
  private nextHandler: Handler | null;
  constructor() {
    this.nextHandler = null;
  }

  public setNext(handler: Handler) {
    this.nextHandler = handler;
    return handler;
  }

  public handle(request: User) {
    if (this.nextHandler) {
      return this.nextHandler.handle(request);
    }
    return `request completed: ${JSON.stringify(request)} - completed `;
  }
}

class Auth extends AbstractHandler {
  public handle(request: User) {
    if (request.token !== "1111111") {
      throw Error("invalid token");
    }
    console.log("Auth: handler - completed! Data - ", request.token);
    return super.handle(request);
  }
}

class MinAge extends AbstractHandler {
  public handle(request: User) {
    if (request.age < 20) {
      throw Error("invalid age");
    }
    console.log("MinAge: handler - completed! Data - ", request.age);
    return super.handle(request);
  }
}

class Role extends AbstractHandler {
  public handle(request: User) {
    if (request.role !== "Manager") {
      throw Error("invalid Role");
    }
    console.log("Role: handler - completed! Data - ", request.role);
    return super.handle(request);
  }
}

// Если удобнее проверять массив
class CheckGuards {
  public checkGuards(handlers: Handler[], request: User) {
    for (const handler of handlers) {
      handler.handle(request);
    }
    console.log(`request - completed: `, request);
  }
}

function clientCodeForSetter(handler: Handler) {
  return handler.handle({
    name: "John",
    age: 21,
    role: "Manager",
    token: "1111111"
  });
}

// Передавать обработчики цепочкой через метод у абстрактного класса обработчика setNext
const auth = new Auth();
const minAge = new MinAge();
const role = new Role();

console.log(": for setter");
auth.setNext(minAge).setNext(role);
console.log(clientCodeForSetter(auth));

///передавать массив обработчиков
console.log(": for guards");
const handlers = [new Auth(), new MinAge(), new Role()];
const checkGuards = new CheckGuards();

function clientCodeForGuards() {
  return checkGuards.checkGuards(handlers, {
    name: "John",
    age: 21,
    role: "Manager",
    token: "1111111"
  });
}

clientCodeForGuards();
