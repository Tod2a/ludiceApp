import Constants from 'expo-constants';

const isExpoGo = Constants.appOwnership === 'expo';

let analytics: any;

if (!isExpoGo) {
    analytics = require('@react-native-firebase/analytics').default;
}

export async function logEvent(eventName: string, params?: { [key: string]: any }) {
    if (!isExpoGo) {
        await analytics().logEvent(eventName, params);
    }
}
