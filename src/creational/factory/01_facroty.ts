interface IBmw {
  getInfo: () => object
}

class Bmw implements IBmw {
  public model: string
  public price: number
  public maxSpeed: number
  public description: string

  constructor(model: string, price: number, maxSpeed: number) {
    this.model = model
    this.price = price
    this.maxSpeed = maxSpeed
    this.description = 'bmw factory'
  }

  getInfo() {
    return {
      info: this.description,
      model: this.model,
    }
  }
}

class BmwFactory {
  create(model: 'X5' | 'X6'): Bmw | boolean {
    if (model === 'X5') return new Bmw(model, 121212, 300)
    if (model === 'X6') return new Bmw(model, 1232534, 320)
    return false
  }
}

const bmwFactory = new BmwFactory()
const X5 = (bmwFactory as BmwFactory).create('X5')
// console.log((X5 as IBmw).getInfo())

const X6 = bmwFactory.create('X6')
// console.log((X as IBmw).getInfo())
