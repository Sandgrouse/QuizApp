export class ObjectUtils {

    // --------------------------------------------------------------------
    public static loadJson(fileName: string): Promise<any> {

        return new Promise(function (resolve, reject) {

            const request = new XMLHttpRequest();

            request.open('GET', fileName, true);
            request.responseType = 'json';

            request.onload = function () {
                if (request.status === 200) {
                    resolve(request.response);
                } else {
                    reject(new Error(`Error loading ${fileName}: ${request.statusText}`));
                }
            };

            request.onerror = function () {
                reject(new Error(`Network error while loading ${fileName}`));
            };

            request.send();
        });
    }

    // --------------------------------------------------------------------
    public static loadValuesIntoObject(jsonData: any, targetObject: any) {

        console.log(`----- loading values into ${targetObject.name} -----`);
        /*
        for (const property of Object.keys(jsonData)) {
            console.log(`name = ${property}, value = ${jsonData[property]}`);
            targetObject[property] = jsonData[property];
        } */

        for (const property in jsonData) {

            if (jsonData.hasOwnProperty(property)) {
                console.log(`name = ${property}, value = ${jsonData[property]}`);
                targetObject[property] = jsonData[property];
            }
        }

        console.log('------------------------------------------------');
    }
}
