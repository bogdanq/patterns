interface Mediator {
  submitForm: () => void;
  onChange: (name: string, str: string) => void;
  validate: () => boolean;
  addListener: (name: string, listener: Listener) => void;
}

type Listener = Field | Form | SubmitButton;

interface IBaseComponent {}

abstract class BaseComponent implements IBaseComponent {
  protected mediator: Mediator;

  constructor(mediator: Mediator) {
    this.mediator = mediator;
  }
}

class Dialog implements Mediator {
  private listeners: { [key: string]: Listener };
  private isValid: boolean;

  constructor() {
    this.listeners = {};
    this.isValid = true;
  }

  submitForm() {
    const isValid = this.validate();
    if (isValid) {
      const state = (this.listeners.form as Form).getFormState();
      return { isValid, state };
    }

    throw new Error("some error");
  }

  onChange(name: string, str: string) {
    (this.listeners.form as Form).addFieldToState(name, str);
  }

  validate() {
    const isValid = (this.listeners.form as Form).validate();
    return isValid;
  }

  addListener(name: string, listener: Listener) {
    this.listeners[name] = listener;
  }
}

class Form extends BaseComponent {
  private formName: string;
  private isValid: boolean;
  private formState: { [key: string]: string };
  public mediator: Mediator;

  constructor(formName: string, mediator: Mediator) {
    super(mediator);
    this.formName = formName;
    this.mediator = mediator;
    this.formState = {};
    this.isValid = false;
  }

  addFieldToState(name: string, str: string) {
    this.formState[name] = str;
    console.log("Form: addFieldToState - ", name);
  }

  getFormState() {
    return this.formState;
  }

  validate() {
    if (this.formState) {
      return (this.isValid = true);
    }

    return (this.isValid = false);
  }
}

class Field extends BaseComponent {
  public mediator: Mediator;
  public name: string;
  private fieldState: string | null;

  constructor(name: string, mediator: Mediator) {
    super(mediator);
    this.name = name;
    this.mediator = mediator;
    this.fieldState = null;
  }

  onChange(str: string) {
    this.fieldState = str;
    this.mediator.onChange(this.name, this.fieldState);
    console.log("Field: onChange - ", this.name);
  }
}

class SubmitButton extends BaseComponent {
  public mediator: Mediator;

  constructor(mediator: Mediator) {
    super(mediator);
    this.mediator = mediator;
  }

  submitForm() {
    const result = this.mediator.submitForm();
    console.log("SubmitButton: submitForm", result);
  }
}

const mediator = new Dialog();
const form = new Form("sign-in form", mediator);
const firstName = new Field("first-name", mediator);
const lastName = new Field("last-name", mediator);
const submitButton = new SubmitButton(mediator);

mediator.addListener("form", form);
mediator.addListener("firstName", firstName);
mediator.addListener("lastName", lastName);
mediator.addListener("submitButton", submitButton);

firstName.onChange("some string");
lastName.onChange("some string");
form.validate();
submitButton.submitForm();

/** RESULT
  Form: addFieldToState -  first-name
  Field: onChange -  first-name
  Form: addFieldToState -  last-name
  Field: onChange -  last-name
  validate:  true
  SubmitButton: submitForm {isValid: true, state: {…}}isValid: truestate: {first-name: "some string", last-name: "some string"}
 */
