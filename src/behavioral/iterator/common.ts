/**
 * Паттерн Итератор (Поведенческий)
 *
 * Назначение: Даёт возможность последовательно обходить элементы составных
 * объектов, не раскрывая их внутреннего представления.
 */

interface Iterator<T> {
  current(): string;
  next(): T;
  isValid(): boolean;
}

interface Aggregator {
  getIterator(): Iterator<string>;
  getCount(): number;
  getItems(): string[];
  addItem(item: string): void;
}

class ConcreteIterator implements Iterator<string> {
  private collection: WordsCollection;
  private position: number;

  constructor(collection: WordsCollection) {
    this.collection = collection;
    this.position = 0;
  }

  current() {
    return this.collection.getItems()[this.position];
  }

  next(): any {
    const result = {
      name: this.current(),
      position: this.position,
      reverse: false,
      info: {
        collection: this.collection.getItems(),
        length: this.collection.getCount()
      }
    };
    this.position += 1;
    return this.isValid() ? result : false;
  }

  isValid() {
    return this.position <= this.collection.getCount();
  }
}

class WordsCollection implements Aggregator {
  private items: string[];
  constructor() {
    this.items = [];
  }

  public getItems() {
    return this.items;
  }

  public getCount() {
    return this.items.length;
  }

  public addItem(item: string) {
    this.items.push(item);
  }

  getIterator() {
    return new ConcreteIterator(this);
  }
}

const collection = new WordsCollection();
collection.addItem("First");
collection.addItem("Second");
collection.addItem("Third");

const iterator = collection.getIterator();

const drowIterator = () => {
  const timer = setInterval(() => {
    console.log("next", iterator.next());
    if (!iterator.isValid()) {
      clearInterval(timer);
    }
  }, 1000);
};

drowIterator();
/**
  name: "First"
  position: 2
  reverse: false
  info: {collection: Array(3), length: 3}
 */
