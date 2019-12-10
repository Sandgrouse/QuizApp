import { LabelFactory, ButtonsFactory } from '..';
import { IButtons } from './ui.buttons';
import { IRoundRectangle } from './round.rectangle';
import { IGridTable } from './grid-table';

export interface IUIPlugin extends Phaser.Plugins.ScenePlugin {

    add: IObjectFactory;


}

interface IObjectFactory {
    buttons(config): IButtons;

    label(config): LabelFactory;
    roundRectangle(x: number, y: number, width: number, height: number,
        radiusConfig: number, fillColor?: number, fillAlphafig?: number): IRoundRectangle;
    dialog(config);
    gridTable(config): IGridTable;
}

