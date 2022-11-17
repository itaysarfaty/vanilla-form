import { Component } from "../components/base-component";

export class UserInput extends Component<HTMLFormElement> {
  private flavorInputEl: HTMLInputElement;
  private submitButtonEl: HTMLButtonElement;
  private messageEl: HTMLParagraphElement;

  constructor() {
    super("vanilla-form", "app");
    this.flavorInputEl = this.element.querySelector("#flavor")!;
    this.submitButtonEl = this.element.querySelector("#submit-button")!;
    this.messageEl = this.element.querySelector("#message")!;

    this.configure();
  }

  public configure(): void {
    this.element.addEventListener("submit", this.handleSubmit.bind(this));
  }

  private handleSubmit(event: SubmitEvent) {
    event.preventDefault();
    this.disable();

    const flavor = this.getFlavor();
    const correctGuess = this.checkFlavor(flavor);
    if (!correctGuess) {
      setTimeout(() => {
        this.disable(false);
        this.newGuess(flavor);
      }, 2000);
    }
  }

  private newGuess(lastGuess: string) {
    this.flavorInputEl.value = "";
    this.messageEl.textContent = `Your last guess was: ${lastGuess}`;
  }

  private disable(disable = true) {
    this.submitButtonEl.disabled = disable;
    this.flavorInputEl.disabled = disable;
  }

  private getFlavor() {
    const flavor = this.flavorInputEl.value;
    return flavor;
  }

  private checkFlavor(flavor: string) {
    if (flavor !== "vanilla") {
      this.messageEl.textContent = "WRONG, Guess another flavor!";
      return false;
    }

    this.messageEl.textContent = "CORRECT. Vanilla is the best JS Flavor!";
    return true;
  }
}
