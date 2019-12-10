import { Sponsor } from '../sponsor';
import { ISponsorFeatures } from '../features';


export class FacebookSponsor extends Sponsor {

    // --------------------------------------------------------------------
    public constructor(features: ISponsorFeatures) {
        super(features);
    }
}
