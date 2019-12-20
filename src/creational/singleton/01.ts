/**
 * Класс Одиночка предоставляет метод getInstance, который позволяет клиентам
 * получить доступ к уникальному экземпляру одиночки.
 */
class Singleton {
  // указать тип инстансу класса
  private static instance: Singleton

  /** сделать конструктор приватным, 
    что бы запретить вызов через оператор new */
  private constructor() {}

  /**
   * Статический метод, управляющий доступом к экземпляру одиночки.
   * Эта реализация позволяет вам расширять класс Одиночки,
   * сохраняя повсюду
   * только один экземпляр каждого подкласса.
   */
  public static getInstance() {
    if (!Singleton.instance) {
      return (Singleton.instance = new Singleton())
    }

    return Singleton.instance
  }

  /**
   * Наконец, любой одиночка должен содержать некоторую бизнес-логику, которая
   * может быть выполнена на его экземпляре.
   */
  public create() {
    return {
      description: 'some logic',
    }
  }
}

//client code
const foo = () => {
  const s1 = Singleton.getInstance()
  const s2 = Singleton.getInstance()
  // const s3 = new Singleton => error

  if (s1 === s2) {
    console.log('Singleton works')
  } else {
    console.log('Singleton failed')
  }
}

foo() // => Singleton work
