import { ISponsorFeatures } from '../features';
import { Sponsor } from '../sponsor';

export class NoneSponsor extends Sponsor {

    // --------------------------------------------------------------------
    public constructor(features: ISponsorFeatures) {
        super(features);
    }
}
