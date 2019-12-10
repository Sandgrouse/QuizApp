/// <reference types="createjs" />


export declare namespace zim {

     class Container extends createjs.Container {
    
        width;
        height;
        boundsX;
        boundsY;
    
        constructor(a?, b?, c?, d?);
    }
    class Shape extends createjs.Shape {
        type: string;
    
        constructor (a?: number, b?: number, c?: number, d?: number, graphics?: createjs.Graphics);
    }
    class Bitmap extends createjs.Bitmap {
    
        type: string;
        imageData: ImageData;
        width: number;
        height: number;
        widthOnly: number;
        heightOnly: number;
        blendMode;
    
    
        constructor(image, width: number, height: number, id: string);
    
        drawImageData (x?, y?, sourceX?, sourceY?, sourceWidth?, sorceHeight?);
        clone();
    }
  
    export class Rectangle extends Container {
        _color: any;
        shape: createjs.Shape;
        type: string;
    
        colorCommand;
        borderColorCommand;
        borderWidthCommand;
        borderDashedCommand;
        _borderColor;
        _borderWidth;
    
        colorObj;
        borderColorObj;
        borderWidthObj;
        borderDashedObj;
    
        corner;
        flatBottom;
        dashed;
    
        color (value?);
    
        borderColor (value?);
    
        borderWidth(value?);

    
        constructor(width, height, color, borderColor, borderWidth, corner, flatBottom, dashed);
    
        drawShape();
    }
    export class Label extends Container {
        fontOptions: any;
        lineHeight: any;
        _enabled: boolean;
        outlineWidth: any;
        outlineColor: any;
        lineWidth: any;
        valign: any;
        align: any;
        shadowBlur: any;
        shadowColor: any;
        rollColor: any;
        color: any;
        font: any;
        size: any;
        text: any;
        backing: any;
        outlineLabel: createjs.Text;
        label: createjs.Text;
    
        type;
    
        // tslint:disable-next-line:max-line-length
        constructor(text, size, font, color, rollColor, shadowColor, shadowBlur, align, valign, lineWidth?, lineHeight?, fontOptions?, backing?, outlineColor?, outlineWidth?);
    
        dispose ();
    
        showRollColor (yes?);
    }
    export class Button extends Container {
        type: string;
        buttonBacking;
        swapObj;
    
        width;
        height;
        widthOnly;
        heightOnly;
        text;
        label;
        backing;
        rollBacking;
        icon;
        rollIcon;
        toggleObj;
        rollToggle;
        toggled;
        waiting;
        enabled;
        rollPersist;
        rollColor;
        borderRollColor;
        focus;
        blendMode;
    
        // Other Payload Properties
        borderColor;
        borderWidth;
        corner;
        shadowColor;
        shadowBlur;
        hitPadding;
        gradient;
        gloss;
        flatBottom;
        toggleEvent;
        dashed;
    
        
        color (value);
    
        constructor(width, height, label, color,
            rollColor?, borderColor?, borderWidth?,
            corner?, shadowColor?, shadowBlur?, hitPadding?,
            gradient?, gloss?, flatBottom?, backing?, rollBacking?,
            rollPersist?, icon?, rollIcon?, toggle?, rollToggle?, toggleEvent?, dashed?);
    
        setToggled();
    
        setBackings (newBacking, newRollBacking);
        setIcons (newIcon, newRollIcon);
    
        toggle (state);
    
        dispose ();
    
    }

    export class Dictionary {
        length;
        unique;
        objects;
        values;
        constructor(unique?);
    
        add (o, v);
    
        at(o);
    
        remove(o);
    
        dispose ();
    }

    export class Queue extends createjs.EventDispatcher {
    
        isLoading;
        loadAssetsCount: number;
        preload;
        constructor()
    }
    export class Frame extends createjs.EventDispatcher {
        
        canvas: HTMLElement;
        // readonly stage: createjs.StageGL;
        color;
        outerColor;
        tag: HTMLElement;
        isLoading: boolean;
        readonly width: number;
        readonly height: number;
        scale: number;
        orientation: string;
        zil;
        altKey: boolean;
        ctrlKey: boolean;
        metaKey: boolean;
        shiftKey: boolean;
        loadFailObj: object;
    
        colors: string[];
        
    
        constructor(scaling: string, width?, height?, color?,
            rollover?, touch?, scrollTop?, align?, valign?,
            canvasID?, rollPerSecond?, delay?, canvasCheck?,
            gpu?, gpuObj?, nextFrame?, nextStage?, allowDefault?, outerColor?, loadFailObj?
        );
    
        loadAssets (assets: string | string[], path: string, xhr: boolean, time: number, loadTimeout: number, outputAudioSprite: boolean): zim.Queue;
    
        asset(file: string): File;
    
        remakeCanvas (width: number, height: number): zim.Frame;
    
        dispose(): void;
    
        makeCircles (radius: number): createjs.Shape;
    }
   
    export function shuffle(array);
    export function rand(a, b, integer, negative);
    export function loop(obj, call, reverse, step, start, end);
    export function timeout(time, call);
    export function interval(time, call, total, immediate);
    export function copy(obj);
    export function arraysEqual(a, b, strict);
    export function isEmpty(obj);
    export function isJSON(str);
    export function merge(objects);
    export function decimals(num, places, addZeros, includeZero, time);
    export function sign(num);
    export function constrain(num, min, max, negative);
    export function dist(x1, y1, x2, y2);
    export function angle(x1, y1, x2, y2);
    export function makeID(length, type, letterCase);
    export function smoothStep(min, max, value);
    export function swapProperties(property, objA, objB);
    export function swapHTML(idA, idB);
    export function scrollX(num, time);
    export function scrollY(num, time);
    export function windowWidth();
    export function windowHeight();
    export function getQueryString(string);
    export function urlEncode(string);
    export function urlDecode(string);
    export function setCookie(name, value, days);
    export function getCookie(name);
    export function deleteCookie(name);
    export function convertColor(color, hexToWord);
    export function mobile(orientation);
    export function async(url, callback);
    export function extend(subclass, superclass, override, prefix, prototype);

    /**
     * @function
     * 
     * Centers the object on the container.
     * Will default to adding the object to the container.
     * Also see centerReg() for centering registration point at same time.
     * @param container - centers the object on and adds to the container
     * @param index - (default null) if provided will addChildAt the object at the index (0 being bottom)
     * @param add - (default true) set to false to only center and not add the object to the container
    */
    export function center(obj: createjs.DisplayObject, container?, index?: number, add?: boolean): createjs.DisplayObject;
    export function scaleTo (obj, boundObj?, percentX?: number, percentY?: number, type?, boundsOnly?);
}