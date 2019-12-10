import { IScroller } from './scroller';

export interface IGridTable extends IScroller {

    setCreateCellContainerCallback(callback: object, scope: object): this;

    refresh(): this;
}
