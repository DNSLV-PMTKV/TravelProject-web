import { SET_DEVICE_WIDTH, setDeviceWidth } from './settingsActions';

export interface SettingsState {
    width: number;
}

export const InitialState: SettingsState = {
    width: 0
};

type Action = setDeviceWidth;

export const settingsReducer = (state: SettingsState = InitialState, action: Action): SettingsState => {
    switch (action.type) {
        case SET_DEVICE_WIDTH:
            return {
                ...state,
                width: action.value
            };

        default:
            return state;
    }
};
