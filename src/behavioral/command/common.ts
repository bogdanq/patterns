interface Command {
  execute(): void;
  undo(): void;
}

type Commands = { income: typeof Income; withdrow: typeof Withdraw };

class Withdraw implements Command {
  private receiver: BankAccount;
  private amount: number;
  constructor(receiver: BankAccount, amount: number) {
    this.receiver = receiver;
    this.amount = amount;
    this.undo = this.undo.bind(this);
  }

  public undo() {
    this.receiver.balance += this.amount;
  }

  public execute() {
    this.receiver.balance -= this.amount;
    return {
      amount: this.amount,
      name: this.receiver.name
    };
  }
}

class Income implements Command {
  private receiver: BankAccount;
  private amount: number;
  constructor(receiver: BankAccount, amount: number) {
    this.receiver = receiver;
    this.amount = amount;
    this.undo = this.undo.bind(this);
  }

  undo() {
    this.receiver.balance -= this.amount;
  }

  execute() {
    this.receiver.balance += this.amount;
    return {
      amount: this.amount,
      name: this.receiver.name
    };
  }
}
/**
 * Receiver (получатель) - обьект, над которым
 * выполняются операции. Имеет свою бизнесс логику
 */
class BankAccount {
  public name: string;
  public balance: number;
  constructor(name: string) {
    this.name = name;
    this.balance = 0;
  }
}

/**
 * Sender (отправитель) - обьект, который делегирует работу
 * конкретным командам (хранит ссылки на команды)
 * выполняет методы команд
 * может иметь промежуточную(простую) логику и хранит состояние
 */
class Bank {
  private operationsHistory: Array<{
    name: string;
    amount: number;
    account: string;
    operation: string;
    undo: () => void;
  }>;
  private commands: Commands | null;
  constructor() {
    this.operationsHistory = [];
    this.commands = null;
  }

  undo(countOperations: number) {
    for (let i = 0; i < countOperations; i++) {
      const command = this.operationsHistory.pop();
      command && command.undo();
    }
  }

  income(receiver: BankAccount, amount: number) {
    if (this.commands && amount > 0) {
      const command = new this.commands.income(receiver, amount);
      const result = command.execute();
      this.operationsHistory.push({
        ...result,
        account: receiver.name,
        operation: command.constructor.name,
        undo: command.undo
      });
    }

    if (this.commands && amount < 0) {
      const command = new this.commands.withdrow(receiver, Math.abs(amount));
      const result = command.execute();
      this.operationsHistory.push({
        ...result,
        account: receiver.name,
        operation: command.constructor.name,
        undo: command.undo
      });
    }
  }

  setCommands(command: Commands): Commands {
    this.commands = command;
    return this.commands;
  }

  showHistory() {
    const output = [];
    for (const command of this.operationsHistory) {
      output.push({
        operation: command.operation,
        account: command.account,
        amount: command.amount
      });
    }
    return output;
  }
}

const account1 = new BankAccount("Bogdan"); // receiver - получает запрос от команды
const account2 = new BankAccount("John");

const bank = new Bank(); // sender - вызывает команды
bank.setCommands({
  income: Income,
  withdrow: Withdraw
});

bank.income(account1, 100);
bank.income(account1, 500);
bank.income(account1, 400);
bank.income(account1, -7400);
bank.income(account1, -400);
bank.income(account1, 14400);
bank.undo(1);
bank.undo(1);

bank.income(account2, -7400);
bank.income(account2, -400);
bank.income(account2, 14400);

console.table(bank.showHistory());
console.table([account1, account2]);
