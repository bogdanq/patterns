type Ship = 'ship1' | 'ship2'
type Car = 'car1' | 'car2'
type TypeLogistic = 'road' | 'sea'
type Destination = {
  from: string
  to: string
  dateStart: string
  dateEnd: string
}

interface ILogistics {
  create: (name: string, destination: Destination) => void
}

abstract class Logistics implements ILogistics {
  protected type: TypeLogistic
  protected state: { [key: string]: any }
  constructor(type: TypeLogistic) {
    this.type = type
    this.state = {}
  }

  public create(name: string, destination: Destination) {}
}

class SeaLogistics extends Logistics {
  constructor(type: 'sea') {
    super(type)
  }

  create(name: Ship, destination: Destination) {
    const newRoute = {
      id: 'test sea',
      name,
      type: this.type,
      destination,
    }

    return newRoute
  }
}

class RoadLogistics extends Logistics {
  constructor(type: 'road') {
    super(type)
  }

  create(name: Car, destination: Destination) {
    const newRoute = {
      id: 'test road',
      name,
      type: this.type,
      destination,
    }

    return newRoute
  }
}

class CreateFactory {
  create(type: TypeLogistic): Logistics | boolean {
    if (type === 'sea') {
      return new SeaLogistics(type)
    }

    if (type === 'road') {
      return new RoadLogistics(type)
    }

    return false
  }
}

const factory = new CreateFactory()
const seaLogistic = factory.create('sea')
const roadLogistic = factory.create('road')

const ship1 = (seaLogistic as SeaLogistics).create('ship1', {
  from: 'Port1',
  to: 'Port2',
  dateStart: '01/10/12',
  dateEnd: '04/10/12',
})

const car1 = (roadLogistic as RoadLogistics).create('car1', {
  from: 'Canada',
  to: 'New Yourk',
  dateStart: '01/10/12',
  dateEnd: '01/11/12',
})

const car2 = (roadLogistic as RoadLogistics).create('car2', {
  from: 'Canada',
  to: 'New Yourk',
  dateStart: '01/10/12',
  dateEnd: '01/11/12',
})
