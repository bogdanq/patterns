interface ISubject {
  getSum(a: number, b: number): void;
}
/**
 * Структурный паттерн Заместитель
 * предоставляет такой же интерфейс как и родительский обьект
 * используется
 * Контроль доступа / кеширование / изменение запроса
 *
 * получает вызовы от клиента, выполняя запрос, меньше напрягает сервис
 */

class Subject implements ISubject {
  public getSum(a: number, b: number) {
    console.log("Subject: Handling request.");
    return a + b;
  }
}

class SubjectProxy implements ISubject {
  private memoizeFn: any;
  constructor() {
    this.memoizeFn = this.memoize((a: number, b: number) => a + b);
  }

  public getSum(a: number, b: number) {
    return this.memoizeFn(a, b);
  }

  public memoize(fn: (...args: number[]) => number) {
    const cache: { [key: string]: { args: number[]; result: number } } = {};

    return function(...args: any) {
      if (args in cache) {
        console.log("Proxy: in memo", cache);
        return cache[args].result;
      } else {
        const result = fn(...args);
        cache[args] = { args, result };
        console.log("Proxy: is not memo", result);
        return result;
      }
    };
  }
}

function clientCode(subject: ISubject, a: number) {
  subject.getSum(1, a);
}

const realSubject = new Subject();
clientCode(realSubject, 12);

const subjectProxy = new SubjectProxy();
clientCode(subjectProxy, 12);
clientCode(subjectProxy, 12);
clientCode(subjectProxy, 12);
clientCode(subjectProxy, 120);

/**
 * Subject: Handling request.
  Proxy: is not memo 13
  Proxy: in memo {1,12: {…}}
  Proxy: in memo {1,12: {…}}
  Proxy: is not memo 121
 */
