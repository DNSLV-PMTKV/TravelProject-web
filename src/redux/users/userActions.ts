export const SET_AUTHENTICATED = 'SET_AUTHENTICATED';
type SET_AUTHENTICATED_TYPE = typeof SET_AUTHENTICATED;

export const SET_USERNAME = 'SET_USERNAME';
type SET_USERNAME_TYPE = typeof SET_USERNAME;

export interface setAuthenticated {
    type: SET_AUTHENTICATED_TYPE;
    value: boolean;
}

export interface setUsername {
    type: SET_USERNAME_TYPE;
    value: string;
}

export const setAuthenticated = (value: boolean): setAuthenticated => {
    return { type: SET_AUTHENTICATED, value: value };
};

export const setUsername = (value: string): setUsername => {
    return { type: SET_USERNAME, value: value };
};
