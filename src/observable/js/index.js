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

class ProductsObserver {
  constructor() {
    this.observable = null;
    this.favoriteProducts = [];
    this.wrapper = document.querySelector(".basket");
  }

  update({ node, type }) {
    if (type === "add product to basket") {
      console.log("ProductsObserver: update");
      this.createNode(node);
      this.render();
    }
  }

  createNode(node) {
    node.classList.add("isBasket");
    const actionButton = document.createElement("button");
    actionButton.classList.add("product_in_basket");
    actionButton.innerText = "remove";
    this.favoriteProducts.push(node);
    node.appendChild(actionButton);
    this.init(actionButton);

    observable.next({ type: "update node area", nodes: this.favoriteProducts });
  }

  init(actionButton) {
    actionButton.addEventListener("click", e => {
      const node = e.currentTarget.parentNode;
      this.remove(node);
    });
  }

  remove(node) {
    const index = this.favoriteProducts.indexOf(node);
    this.favoriteProducts.splice(index, 1);
    this.render();

    observable.next({ type: "update node area", nodes: this.favoriteProducts });
  }

  render() {
    this.wrapper.innerHTML = "";
    for (const product of this.favoriteProducts) {
      this.wrapper.appendChild(product);
    }
  }
}

class Products {
  constructor() {
    this.products = document.querySelectorAll(".product");
  }

  init() {
    for (const product of this.products) {
      product.addEventListener("click", e => {
        const node = e.target.parentNode;
        observable.next({
          type: "add product to basket",
          node: node.cloneNode({ deep: true })
        });
      });
    }
  }
}

class AreaObserver {
  constructor() {
    this.observable = null;
    this.title = document.querySelector(".title");
  }

  update({ type, nodes }) {
    if (type === "update node area") {
      this.title.innerHTML = "";
      this.title.innerHTML = nodes.length;
    }
  }
}

const observable = new Observable();
const productsObserver = new ProductsObserver();
const areaObserver = new AreaObserver();

const product = new Products();
product.init();

observable.subscribe(areaObserver);
observable.subscribe(productsObserver);
