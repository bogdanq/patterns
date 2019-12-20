// import Observable from './observable'
// import Observer from './observer'

class StreamObservable extends Observable {
  constructor(subscribe) {
    super(subscribe);
  }
}

class StreamObserver extends Observer {
  constructor() {
    super();
    this.observable = null;
  }

  update(data) {
    console.log(`CharStreamObserver: update { data: ${data} }`);
  }
}

class BasketObserver extends Observer {
  constructor() {
    super();
    this.observable = null;
  }

  update(data) {
    console.log(`BasketObserver: update`);
  }
}

// export { StreamObservable, StreamObserver, StreamObserverSecond }
