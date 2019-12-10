import { Sponsor } from '../sponsor';
import { ISponsorFeatures } from '../features';
import { eSponsorID } from '../list';
import { ISponsorStorage, StorageUtils } from '../../../../utils';

export class EdgiSponsor extends Sponsor implements ISponsorStorage {

    // --------------------------------------------------------------------
    public constructor(features: ISponsorFeatures) {
        super(features);

        StorageUtils.sponsorStorage = this;
    }

    // --------------------------------------------------------------------
    public async startGameSession(...parameters: any[]): Promise<void> {
        console.log(`Sponsor ${eSponsorID[this.id]}: startGameSession() with parameters ${parameters}`);

        await new Promise<void>(function (resolve) {
            console.log('starting timeout - 3 secs');

            setTimeout(function () {
                console.log('timeout over');
                resolve();
            }, 3000);
        });
    }

    // --------------------------------------------------------------------
    public async endGameSession(...parameters: any[]): Promise<void> {
        console.log(`Sponsor ${eSponsorID[this.id]}: endGameSession() with parameters ${parameters}`);

        if (typeof parameters[0] !== 'undefined') {
            console.log('paramaters = ' + JSON.stringify(parameters[0]));
        }

        await new Promise<void>(function (resolve) {
            console.log('starting timeout - 3 secs');

            setTimeout(function () {
                console.log('timeout over');
                resolve();
            }, 3000);
        });
    }

    // #region ISponsorStorage interface implementation

    // --------------------------------------------------------------------
    public async save(key: string, data: any): Promise<void> {

        const storage = window.localStorage;

        await new Promise<void>(function (resolve) {
            console.log('saving somewhere into cloud - it will take 3 seconds');

            setTimeout(function () {
                console.log('data saved');
                storage.setItem(key, JSON.stringify(data));
                resolve();
            }, 3000);
        });
    }

    // --------------------------------------------------------------------
    public async load(key: string): Promise<any> {

        const storage = window.localStorage;

        const result = await new Promise<void>(function (resolve) {
            console.log('loading from cloud - it will take 3 seconds');

            setTimeout(function () {
                console.log('data loaded');
                const data = storage.getItem(key);
                console.log('data  = ' + data);

                resolve(data == null ? null : JSON.parse(data));
            }, 3000);
        });

        return result;
    }

    // --------------------------------------------------------------------
    public fallbackToStandardStorage(): boolean {
        return false;
    }

    // --------------------------------------------------------------------
    public someVerySpecificSponsorFunction(): void {
        console.log('Very sponsor specific function for Edgi');
    }
}
