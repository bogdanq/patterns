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

const filterCustom = predicate => ({ name: 'filter', fn: predicate })
const mapCustom = callback => ({ name: 'map', fn: callback })
const observer = new StreamObserver()

const observable = new StreamObservable(subscriber => {
  subscriber.next('first open constructor')
})

const destination = observable.pipe(
  filterCustom(item => true),
  mapCustom(item => item.toUpperCase()),
)

destination.subscribe(observer)
