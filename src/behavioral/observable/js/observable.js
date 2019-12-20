// export default class Observable {
class Observable {
  constructor(subscribe) {
    this.observers = [];
    this.operators = [];
    if (subscribe) {
      const that = this;
      setTimeout(subscribe, 0, that);
    }
  }

  subscribe(observer) {
    observer.observable = this;
    this.observers.push(observer);
    return this;
  }

  next(data) {
    if (this.observers.length === 0) return;
    for (const operator of this.operators) {
      if (operator.name === "filter") {
        if (!operator.fn(data)) return;
      }

      if (operator.name === "map") {
        data = operator.fn(data);
      }

      if (typeof operator === "function") {
        data = operator(data);
      }
    }

    for (const observer of this.observers) {
      if (typeof observer === "function") {
        observer(data);
      } else {
        observer.update(data);
      }
    }
  }

  complete(name) {
    console.log(`complete ${name}`);
  }

  error(name) {
    console.log(`При выполнении ${name} произошла ошибка`);
  }

  pipe(...args) {
    this.operators.push(...args);
    const destination = new Observable();
    this.subscribe(data => destination.next(data));
    return destination;
  }

  filter(predicate) {
    this.operators.push({ name: "filter", fn: predicate });
    return this;
  }

  map(callback) {
    this.operators.push({ name: "map", fn: callback });
    return this;
  }
}
