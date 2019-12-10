/**
 * Convert an integer to its words representation
 *
 * @author McShaman (http://stackoverflow.com/users/788657/mcshaman)
 * @source http://stackoverflow.com/questions/14766951/convert-digits-into-words-with-javascript
 */
function numberToEnglish(n: number, custom_join_character: string) {

    const string = n.toString();
    let units: string[];
    let tens: string[];
    let scales: string[];
    let start: number;
    let end: number;
    let chunks: string[];
    let chunksLen: number;
    let chunk: number;
    let ints: number[];
    let i: number;
    let word: string;
    let words: string[];

    const and = custom_join_character || 'and';

    /* Is number zero? */
    // tslint:disable-next-line:radix
    if ( parseInt(string) === 0) {
        return 'zero';
    }

    /* Array of units as words */
    units = ['', 'one', 'two', 'three', 'four', 'five',
               'six', 'seven', 'eight', 'nine', 'ten',
               'eleven', 'twelve', 'thirteen', 'fourteen',
               'fifteen', 'sixteen', 'seventeen', 'eighteen', 'nineteen'
    ];

    /* Array of tens as words */
    tens = ['', '', 'twenty', 'thirty', 'forty', 'fifty', 'sixty', 'seventy', 'eighty', 'ninety'];

    /* Array of scales as words */
    scales = ['', 'thousand', 'million', 'billion',
        'trillion', 'quadrillion', 'quintillion', 'sextillion',
        'septillion', 'octillion', 'nonillion', 'decillion', 'undecillion',
        'duodecillion', 'tredecillion', 'quatttuor-decillion', 'quindecillion',
        'sexdecillion', 'septen-decillion', 'octodecillion', 'novemdecillion',
        'vigintillion', 'centillion'
    ];

    /* Split user arguemnt into 3 digit chunks from right to left. Example = 10,000 */
    start = string.length;
    chunks = [];
    while (start > 0) {
        end = start;
        chunks.push(string.slice((start = Math.max(0, start - 3)), end));
    }

    /* Check if function has enough scale words to be able to stringify the user argument */
    chunksLen = chunks.length;
    if (chunksLen > scales.length) {
        return '';
    }

    /* Stringify each integer in each chunk */
    words = [];
    for (i = 0; i < chunksLen; i++) {

        // tslint:disable-next-line:radix
        chunk = parseInt(chunks[i]);

        if (chunk) {

            /* Split chunk into array of individual integers */
            ints = chunks[i].split('').reverse().map(parseFloat);

            /* If tens integer is 1, i.e. 10, then add 10 to units integer */
            if (ints[1] === 1) {
                ints[0] += 10;
            }

            /* Add scale word if chunk is not zero and array item exists */
            if ((word = scales[i])) {
                words.push(word);
            }

            /* Add unit word if array item exists */
            if ((word = units[ints[0]])) {
                words.push(word);
            }

            /* Add tens word if array item exists */
            if ((word = tens[ints[1]])) {
                words.push(word);
            }

            /* Add 'and' string after units or tens integer if: */
            if (ints[0] || ints[1]) {

                /* Chunk has a hundreds integer or chunk is the first of multiple chunks */
                if (ints[2] || !i && chunksLen) {
                    words.push(and);
                }

            }

            /* Add hundreds word if array item exists */
            if ((word = units[ints[2]])) {
                words.push(word + ' hundred');
            }

        }

    }

    return words.reverse().join(' ');

}

// one hundred and twenty three million four hundred and fifty six thousand seven hundred and eighty nine
// numberToEnglish(123456789);

// Use a custom separator (like , instead of "and")
// one hundred , twenty three million four hundred , fifty six thousand seven hundred , eighty nine
// numberToEnglish(123456789, ",");
