// предоставляет методы извлечения данных снимка, но не расскрывает сосстояние Creator
interface ISnapshot {
  getState(): number;
}

/**
 * содержит начальный стейт, которые передает Создатель через конструктор
 *
 * Создать методы для получения состояния
 * Создать методы для получения метаданных снимка (дата, имя..)
 */
class ConcreteSnapshot implements ISnapshot {
  private state: number;
  constructor(state: number) {
    this.state = state;
  }

  getState() {
    return this.state;
  }
}

/**
 * Создать метод для сохранения состояния внутри снимка
 * Создать метод для восстановления обьекта из снимка
 *
 * Реализовать приватную безнес-логику
 */
class Creator {
  private state: number;
  constructor(state: number) {
    this.state = state;
  }

  private someLogic(num: number): number {
    return Math.floor(Math.random() * num);
  }

  public setState(num: number): void {
    this.state = this.someLogic(num);
    console.log("Creator: change state to", this.state);
  }

  public save(): ConcreteSnapshot {
    return new ConcreteSnapshot(this.state);
  }

  public restore(shapshot: ISnapshot): void {
    this.state = shapshot.getState();
    console.log("Creator: restore state to", this.state);
  }
}

/**
 * Опекун не зависит от снимка. Он не имеет доступа к состоянию создателя (Creator)
 * Работает со снимками через базовый интерфейс снимка
 * содержит ссылку на Создателя
 */
class Caretaker {
  private shapshots: ISnapshot[];
  private creator: Creator;
  constructor(creator: Creator) {
    this.shapshots = [];
    this.creator = creator;
  }

  public save(): void {
    const state = this.creator.save();
    this.shapshots.push(state);
    console.log("Caretaker: save", state);
  }

  public restore(): void {
    if (this.shapshots.length === 0) {
      return;
    }

    const lastShapshot = this.shapshots.pop();

    if (lastShapshot) {
      this.creator.restore(lastShapshot);
    }
  }

  public showHistory(): void {
    console.log("Caretaker: show history", this.shapshots);
  }
}

const originator = new Creator(1111111);
const caretaker = new Caretaker(originator);

originator.setState(12);
caretaker.save();

originator.setState(2);
caretaker.save();

originator.setState(22);
caretaker.save();

caretaker.showHistory();

caretaker.restore();
caretaker.restore();

caretaker.showHistory();
