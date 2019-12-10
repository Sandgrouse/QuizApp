import { Sponsor } from './sponsor';
import { eSponsorID } from './list';
import { ISponsorFeatures } from './Features';
import { api, id } from './sponsor';




    // --------------------------------------------------------------------
    export function is(sponsorID: eSponsorID): boolean {
        return id === sponsorID;
    }

    // --------------------------------------------------------------------
    export function getfeatures(): ISponsorFeatures {
        return api.features;
    }

    // --------------------------------------------------------------------
    export function hasFeature(featureName: string): boolean {
        return typeof api.features[featureName] !== 'undefined';
    }

    // --------------------------------------------------------------------
    export function isFeatureOn(featureName: string): boolean {
        const featureValue = api.features[featureName];

        return typeof featureValue === 'boolean' && featureValue;
    }

