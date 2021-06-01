export const SET_AUTHENTICATED = 'SET_AUTHENTICATED';
type SET_AUTHENTICATED_TYPE = typeof SET_AUTHENTICATED;

export interface setAuthenticated {
    type: SET_AUTHENTICATED_TYPE;
    value: boolean;
}

export const setAuthenticated = (value: boolean): setAuthenticated => {
    return { type: SET_AUTHENTICATED, value: value };
};
