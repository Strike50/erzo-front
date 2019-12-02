import axios from 'axios';
export const ACTION_TYPES = {
    FETCH_PROFILE: 'profile/FETCH_PROFILE'
};

const initialState = {
    loading: false,
    profileDetail: {},
    errorMessage: null
};

export default (state = initialState, action) => {
    console.log(action.type);
    switch (action.type) {
        case ACTION_TYPES.FETCH_PROFILE.concat("_PENDING"):
            return {
                ...state,
                loading: true
            };
        case ACTION_TYPES.FETCH_PROFILE.concat("_REJECTED"):
            return {
                ...state,
                loading: false,
                errorMessage: action.payload
            };
        case ACTION_TYPES.FETCH_PROFILE:
            return {
                ...state,
                loading: false,
                profileDetail: action.payload.data
            };
        default:
            return state;
    }
}
export const fetchProfile = () => ({
    type: ACTION_TYPES.FETCH_PROFILE,
    payload: axios.get('http://localhost:3000/users/2326187c-a7ed-489a-991b-53d35da2cc28')
});

