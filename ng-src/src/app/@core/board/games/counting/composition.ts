declare var AdobeAn: any;


/* export const spaceComp = AdobeAn.getComposition('A160767E22CD56478E31F2535800C0F4');
export const lib = spaceComp.getLibrary();
export const ss = spaceComp.getSpriteSheet();
export const compLoaded = AdobeAn.compositionLoaded(lib.properties.id); */


export interface IPage {
    page: zim.Container;
    // swipe: any[];
}
export interface INavButton {
    name: string;
    direction: string;
}

export interface IQuestion {
    text;
    type;
    label;

    ask(stage);
    show();
    answer(stage);
    explain();
    review();
}

export interface IFeedbackMessage {
    header: string;
    content: string;
    status: boolean;
}

export interface ITimer {
    time;
    seconds;
    minutes: number;
    label: string;
}

export interface IStopWatch {
    startTime;
    endTime;
}

export function positionUniqueShapes (shape: zim.Shape, triangleX: number, triangleY: number, circleX: number, circleY: number,
    rectangleX: number, rectangleY: number, x: number, y: number, container?: zim.Container) {
    if ( shape.type === 'Triangle') {
        shape.pos(triangleX, triangleY, true, true, container).alp(0).animate({obj: {alpha: 1 }, time: 500});
    } else if (shape.type === 'Circle') {
        shape.pos(circleX, circleY, true, true, container).alp(0).animate({obj: {alpha: 1 }, time: 500});
    } else if (shape.type === 'Rectangle') {
        shape.pos(rectangleX, rectangleY, true, true, container).alp(0).animate({obj: {alpha: 1 }, time: 500});
    } else {
        shape.pos(x, y, true, true, container).alp(0).animate({obj: {alpha: 1 }, time: 500});
    }
}

export function positionInARow (s_clone: zim.Shape, row: zim.Container, x1: number, x2: number) {
    s_clone.center(row);

    if (s_clone.type === 'Triangle' || 'Rectangle' || 'Circle') {
        // s_clone.pos(x1);
        s_clone.animate({obj: {x: x1}, time: 700, ease: 'bounceOut' });
    } else {
        s_clone.pos(x2);
    }
}
