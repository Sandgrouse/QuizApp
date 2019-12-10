interface Zet {
    tags;
    on();
    off();
    css();
}

/**
 * @function
 * 
 * Short version of console.log()
 * to log the item(s) to the console.
 * Use F12 to open your Browser console.
 * @param item1 - item (expressions) to log to the console
 * @param item2 (optional), etc. - items (expressions) to log to the console
 */
 export declare function zog(item1: string, item2?: string): Console;


 export declare function zid(s: string): HTMLElement; // -1


 export declare function zss(s: string) ;

 /**
 * @function
 * 
 * Short version of either window.location.href or window.open 
 * to open a link in the same window or a specified window.
 * @param url - the link to use (Absolute, Relative or Virtual)
 * @param target - (default null) the string name of a window (tab) _blank for new window each time
 * @param modal - (default false) set to true to force user to close window
 */
 export declare function zgo(u: string, t?: string, w?, h?, f?, m?: boolean);

 export declare function zum(s: string): number;

 export declare function zot(v: any): boolean;


 export declare function zop(e: Event): null;

 export declare function zil(): any[];

 export declare function zet (selector): Zet;

 export declare function isDUO(a);
 export declare function zob(func, args, sig: string, scope?);

/// +7.5
 export declare function zik(v: any[] | object);

 export declare function z_d(n);