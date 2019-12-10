import { ISponsorFeatures } from '../sponsors/Features';
import { eSponsorID } from '../sponsors/list';


// extend sponsor features with game specific properties
export type SponsorFeatures = ISponsorFeatures & {
    defaultLanguage: string;
    showFlags: boolean;
};

// define features for each single sponsor
export const SPONSOR_FEATURES: { [key: number]: SponsorFeatures } = {

    [eSponsorID.NONE]: {
        id: eSponsorID.NONE,
        name: 'none',
        hasConfig: false,

        defaultLanguage: 'cs',
        showFlags: false
    },

    [eSponsorID.EDGI]: {
        id: eSponsorID.EDGI,
        name: 'edgi',
        hasConfig: true,

        defaultLanguage: 'en',
        showFlags: true
    },

    [eSponsorID.FACEBOOK]: {
        id: eSponsorID.FACEBOOK,
        name: 'facebook',
        hasConfig: true,

        defaultLanguage: 'en',
        showFlags: true
    }
};

// --------------------------------------------------------------------
export function getSponsorFeatures(id: eSponsorID): SponsorFeatures {

    // are features for sponsor in list?
    if (SPONSOR_FEATURES[id] == null) {
        throw new Error(`Features for sponsor ${eSponsorID[id]} are not in SPONSOR_FEATURES list.`);
    }

    return SPONSOR_FEATURES[id];
}

