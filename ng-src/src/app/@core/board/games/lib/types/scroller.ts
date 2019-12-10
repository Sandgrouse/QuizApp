import { ISizer } from './sizer';

export interface IScroller extends ISizer {

    t;

    childOY;

    topChildOY;

    bottomChildOY;

    sliderEnable;

    scrollerEnable;



    layout(parent?, newWidth?: number, newHeight?: number): this;

    resizeController(): this;

    updateController(): void;


    setChildOY(value): this;

    setT(value): this;

    scrollToTop(): this;

    scrollToBottom(): this;


    setSliderEnable(enabled: boolean): this;


    setScrollerEnable(enabled: boolean): this;
}
