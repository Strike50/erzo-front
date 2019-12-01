import axios from 'axios';
export const ACTION_TYPES = {
    FETCH_PROFILE: 'profile/FETCH_PROFILE'
};

const initialState = {
    loading: false,
    listProfile: []
};

export default (state = initialState, action) => {
    switch (action.type) {
        case ACTION_TYPES.FETCH_PROFILE.concat("_PENDING"):
            return {
                ...state,
                loading: true
            };
        case ACTION_TYPES.FETCH_PROFILE.concat("_REJECTED"):
            return {
                ...state,
                loading: false
            };
        case ACTION_TYPES.FETCH_PROFILE.concat("_FULFILLED"):
            return {
                ...state,
                loading: false,
                listProfile: action.payload.data
            };
        default:
            return state;
    }
}
export const fetchProfile = () => ({
    type: ACTION_TYPES.FETCH_PROFILE,
    payload: axios.get('http://localhost:3000/users/')
});

