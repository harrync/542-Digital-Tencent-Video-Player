import "./button.css";
export class Button {
  text: string;
  onClick: () => void;

  constructor(text: string, onClick: () => void) {
    this.text = text;
    this.onClick = onClick;
  }

  render(): HTMLElement {
    const button = document.createElement("button");
    button.innerHTML = this.text;
    button.onclick = this.onClick;
    button.className = "custom-button";
    return button;
  }
}
