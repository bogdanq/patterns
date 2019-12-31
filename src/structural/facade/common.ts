// Структурный паттерн
/**
 * Принимает класс в
 * конструктор или вызывает его сам,
 * предоставит юзеру конкретные методы
 */
class Facade {
  protected decodeNumber: DecodeNumber;

  constructor(decodeNumber?: DecodeNumber) {
    this.decodeNumber = decodeNumber || new DecodeNumber();
  }

  public decode(num: number) {
    return this.decodeNumber.fromNumToStr(num);
  }

  public decodeArr(num: number) {
    return this.decodeNumber.fromNumToArray(num);
  }
}

/**
 * Класс библиотеки, скрывает всю
 * сложную логику логику
 * предоставляет нужное api для фасада
 */
class DecodeNumber {
  public fromNumToStr(num: number) {
    const value = String(num);
    return value;
  }

  public fromNumToArray(num: number) {
    const value = String(num);
    return value.split("");
  }

  //скрытые методы от пользователя
  private someMethood1() {}
  private someMethood2() {}
  private someMethood3() {}
}

//Клиентский код, знает о двух методах decode / decodeArr
function clientCode(facade: Facade) {
  console.log(facade.decode(123132));
  console.log(facade.decodeArr(123132));
}

const decoder = new DecodeNumber();
const facade = new Facade(decoder);
clientCode(facade);
