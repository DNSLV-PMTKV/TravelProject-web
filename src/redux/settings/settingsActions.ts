export const SET_DEVICE_WIDTH = 'SET_DEVICE_WIDTH';
type SET_DEVICE_WIDTH_T = typeof SET_DEVICE_WIDTH;

export interface setDeviceWidth {
    type: SET_DEVICE_WIDTH_T;
    value: number;
}

export const setDeviceWidth = (deviceWidth: number): setDeviceWidth => {
    return { type: SET_DEVICE_WIDTH, value: deviceWidth };
};
