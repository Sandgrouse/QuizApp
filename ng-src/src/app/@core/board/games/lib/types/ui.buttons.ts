import { ISizer } from './sizer';
import { IButton } from 'selenium-webdriver';

export interface IButtons extends ISizer {
    childrenMap: any;
    sizerChildren: any;

    addButton(gameObject, proportion: number, align: string, paddingConfig, expand?: boolean, clickConfig?): IButtons;

    removeButton (button: IButton): IButtons;

    forEachButtton(callback: Function, scope?): void;

    showButton(index: number): void;

    hideButton(index: number): void;

}
