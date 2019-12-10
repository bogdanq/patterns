// import {
//   StreamObservable,
//   StreamObserver,
//   StreamObserverSecond,
// } from './actions'
// const observer = new StreamObserver()
// // const observer2 = new StreamObserverSecond()

// const observable = new StreamObservable()

// const foo = () => {
//   const element = document.querySelectorAll('.product')
//   element[0].addEventListener('click', () => {
//     observable.filter().map().subscribe(observer).next('first')
//   })
//   element[1].addEventListener('click', () => {
//     observable.subscribe(observer).next('second')
//   })
// }

// foo()

// const filterCustom = predicate => ({ name: 'filter', fn: predicate })
// const mapCustom = callback => ({ name: 'map', fn: callback })

// const observer = new StreamObserver()
// const observer2 = new StreamObserverSecond()

// const observable = new StreamObservable()
// const destination = observable.pipe(
//   filterCustom(item => true),
//   mapCustom(item => item.toUpperCase()),
// )

// destination.subscribe(observer)

// const foo = () => {
//   const element = document.querySelectorAll('.product')
//   element[0].addEventListener('click', () => {
//     observable.next('first')
//   })
//   element[1].addEventListener('click', () => {
//     observable.next('second')
//   })
// }

// foo()

// const filterCustom = predicate => ({ name: 'filter', fn: predicate })
// const mapCustom = callback => ({ name: 'map', fn: callback })
// const observer = new StreamObserver()

// const observable = new StreamObservable(subscriber => {
//   subscriber.next('first open constructor')
// })

// const destination = observable.pipe(
//   filterCustom(item => true),
//   mapCustom(item => item.toUpperCase()),
// )

// destination.subscribe(observer)

// class Store {
//   getInstance() {
//     if (!Store.instance) {
//       return (Store.instance = new Store());
//     }

//     return Store.instance;
//   }
// }

// class Basket {
//   constructor() {
//     this.wrapper = document.querySelector(".basket");
//     this.favoriteProducts = [];
//     this.observable = null;
//   }

//   init(id) {
//     const elements = document.querySelectorAll(".product_remove");
//     elements.forEach(item => {
//       item.addEventListener("click", () => {
//         this.favoriteProducts = this.favoriteProducts.filter(
//           item => item.id !== id
//         );
//         this.render();
//       });
//     });
//   }

//   create(id) {
//     const element = document.createElement("div");
//     element.innerHTML = `
//       <div data-id=${id} class="product_item">
//         <h3>product ${id}</h3>
//         <button class="product_remove">remove</button>
//       </div>
//     `;

//     this.favoriteProducts.push({ id, element });
//     this.render();
//   }

//   render() {
//     this.wrapper.innerHTML = "";
//     this.favoriteProducts.forEach(item => {
//       this.wrapper.appendChild(item.element);
//     });
//   }

//   update({ id }) {
//     console.log("update");
//     this.create(id);
//     this.init(id);
//   }
// }

// class Products {
//   constructor(selector) {
//     this.productsList = document.querySelectorAll(selector);
//   }

//   init() {
//     for (const product of this.productsList) {
//       product.addEventListener("click", () => {
//         const id = parseInt(product.dataset.id);
//         observable.next({ id });
//       });
//     }
//   }
// }

class Input {
  constructor() {
    this.observable = null;
    this.element = document.createElement("input");
  }

  update({ value }) {
    console.log("Observer1: update");
    this.updateInputValue(value);
  }

  updateInputValue(value) {
    this.element.value = value;
  }

  create() {
    const wrapper = document.querySelector(".basket");
    this.element.placeholder = "test";
    this.element.disabled = true;
    wrapper.appendChild(this.element);
  }
}

class Parent {
  constructor() {
    this.value = null;
  }

  onChange(value) {
    this.value = value;
    observable.next(this);
  }
}

const observable = new Observable();
const inputObserver = new Input();
inputObserver.create();

// const filterCustom = predicate => ({ name: "filter", fn: predicate });
// const mapCustom = callback => ({ name: "map", fn: callback });
// const someProcessing = data => {
//   const newData = { ...data, value: data.value.toUpperCase() };
//   return newData;
// };

// const destination = observable.pipe(
//   filterCustom(data => true),
//   mapCustom(data => data),
//   someProcessing
// );
// destination.subscribe(inputObserver);

observable
  .filter(item => item !== "zalupa")
  .map(item => {
    const newItem = { ...item, value: item.value.toUpperCase() };
    return newItem;
  })
  .subscribe(inputObserver);

const parent = new Parent();

const productsList = document.querySelectorAll(".product");
const input = document.querySelector(".action-input");
input.addEventListener("input", e => {
  const value = e.currentTarget.value;
  return parent.onChange(value);
});
