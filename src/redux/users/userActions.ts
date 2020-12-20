export const SET_AUTHENTICATED = 'SET_AUTHENTICATED';
type SET_AUTHENTICATED_TYPE = typeof SET_AUTHENTICATED;

export interface setAuthenticated {
    type: SET_AUTHENTICATED_TYPE;
}

export const setAuthenticated = (): setAuthenticated => {
    return { type: SET_AUTHENTICATED };
};
