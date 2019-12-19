// methoods decorators --> start
const deprecate = (
  target: any,
  key: string,
  descriptor: TypedPropertyDescriptor<any>
) => {
  if (typeof descriptor.value !== "function") {
    throw new SyntaxError("Only functions can be marked as deprecated");
  }

  return {
    ...descriptor,
    value: function<T>(...args: T[]) {
      console.warn("this function will be removed in future version");
      return descriptor.value.apply(this, args);
    }
  };
};

const readonly = (target: any, key: string, descriptor: any) => {
  descriptor.writable = false;
  return descriptor;
};

const loggerMethood = (name: string) => (
  target: any,
  key: string,
  descriptor: TypedPropertyDescriptor<any>
) => {
  return {
    ...descriptor,
    value: function<T>(...args: T[]) {
      const result = descriptor.value.apply(this, args);
      const a = args.map(item => item);
      console.log(
        `Logger method: ${name} = ${key}(${a}) => ${JSON.stringify(result)}`
      );
      return result;
    }
  };
};
// methoods decorators --> end

// class decorators --> start
interface Props {
  new (...args: any[]): any;
}

const logClass = (target: Props): any => {
  const copy = target;
  function constructor(...args: any[]) {
    const newArgs = args.map(item =>
      typeof item === "string" ? item.toUpperCase() : item
    );

    console.log(`Logger: constructor (${newArgs})`);
    return new copy(newArgs);
  }

  constructor.prototype = copy.prototype;

  return constructor;
};

const withRender = <T>(target: Props): any => {
  const copy = target;
  function WithRender(...args: T[]) {
    Object.defineProperty(target.prototype, "render", {
      value: () => console.log("render init")
    });

    return new copy(args);
  }

  WithRender.prototype = copy.prototype;
  return WithRender;
};
// class decorators --> start

@logClass
@withRender
class Example {
  public name: string;

  constructor(name: string) {
    this.name = name;
  }

  @readonly
  @loggerMethood("some string")
  @deprecate
  sum(a: number, b: number) {
    return a + b;
  }
}

const example = new Example("some name"); // => Logger: constructor (SOME NAME)
example.sum(12, 8); // => Logger method: some string = sum(12,8) => 20 || warning
console.log(example instanceof Example); // => true
// example.render() // => render init
