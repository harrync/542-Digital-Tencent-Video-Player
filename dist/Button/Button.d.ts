import "./button.css";
export declare class Button {
    text: string;
    onClick: () => void;
    constructor(text: string, onClick: () => void);
    render(): HTMLElement;
}
