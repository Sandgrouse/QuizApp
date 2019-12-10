import { ISizer } from './sizer';

export interface ILabel extends ISizer {
    text: string;

    setText(value: string): this;

    appendText(value: string): void;

    layout(parent, newWidth: number, newHeight: number): this;

    resize(width: number, height: number): this;
}
