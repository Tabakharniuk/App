import lodashGet from 'lodash/get';
import Onyx from 'react-native-onyx';
import _ from 'underscore';
import ONYXKEYS from '../../ONYXKEYS';

let credentials;
let authToken;
let currentUserEmail;
let networkReady = false;

function setIsReady(ready) {
    networkReady = ready;
}

function checkRequiredDataAndSetNetworkReady() {
    if (_.isUndefined(authToken) || _.isUndefined(credentials)) {
        return;
    }

    setIsReady(true);
}

Onyx.connect({
    key: ONYXKEYS.SESSION,
    callback: (val) => {
        authToken = lodashGet(val, 'authToken', null);
        currentUserEmail = lodashGet(val, 'email', null);
        checkRequiredDataAndSetNetworkReady();
    },
});

Onyx.connect({
    key: ONYXKEYS.CREDENTIALS,
    callback: (val) => {
        credentials = val || null;
        checkRequiredDataAndSetNetworkReady();
    },
});

function getAuthToken() {
    return authToken;
}

function setAuthToken(newAuthToken) {
    authToken = newAuthToken;
}

function getCredentials() {
    return credentials;
}

function getCurrentUserEmail() {
    return currentUserEmail;
}

function isReady() {
    return networkReady;
}

export {
    getAuthToken,
    setAuthToken,
    getCredentials,
    getCurrentUserEmail,
    isReady,
    setIsReady,
};
