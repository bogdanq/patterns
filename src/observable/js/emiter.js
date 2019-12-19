class EventEmiter {
  constructor() {
    this.subscribers = {};
    this.operators = [];
  }

  on(type, listener) {
    if (!this.subscribers[type]) {
      this.subscribers[type] = { observers: [] };
    }
    this.subscribers[type].observers.push(listener);

    return this;
  }

  once(type, listener) {
    const newlistener = { update: listener, once: true };
    this.on(type, newlistener);
    return this;
  }

  emit(type, data) {
    if (!this.subscribers[type]) {
      return;
    }

    const filtredData = this.setOperators(data);

    if (filtredData || !data) {
      this.notifyObservers(type, filtredData);
    }
  }

  off(type, listener) {
    this.remove(type, listener);
    return this;
  }

  remove(type, listener) {
    if (this.subscribers[type]) {
      const index = this.subscribers[type].observers.indexOf(listener);
      this.subscribers[type].observers.splice(index, 1);
    }

    if (!listener) {
      this.subscribers[type].observers = [];
    }

    return this;
  }

  notifyObservers(type, filtredData) {
    const observers = this.subscribers[type].observers;

    for (const observer of observers) {
      if (typeof observer === "function") {
        observer(filtredData || {});
      } else {
        observer.update(filtredData || {});
        if (observer.once) {
          this.remove(type, observer);
        }
      }
    }
  }

  setOperators(data) {
    let filtredData = data;
    for (const operator of this.operators) {
      if (operator.name === "filter") {
        if (!operator.fn(data)) return;
      }

      if (operator.name === "map") {
        filtredData = operator.fn(data);
      }

      if (typeof operator === "function") {
        filtredData = operator(data);
      }
    }

    return filtredData;
  }

  map(callback) {
    this.operators.push({ name: "map", fn: callback });
    return this;
  }

  filter(predicate) {
    this.operators.push({ name: "filter", fn: predicate });
    return this;
  }

  pipe(...operator) {
    this.operators.push(...operator);
    return this;
  }
}
