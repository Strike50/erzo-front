import axios from 'axios';

export const ACTION_TYPES = {
  FETCH_TIMELINE: 'timeline/FETCH_TIMELINE'
};

const initialState = {
  loading: false,
  listPost: []
};

export default (state = initialState, action) => {
  switch (action.type) {
    case ACTION_TYPES.FETCH_TIMELINE.concat("_PENDING"):
      return {
        ...state,
        loading: true
      };
    case ACTION_TYPES.FETCH_TIMELINE.concat("_REJECTED"):
      return {
        ...state,
        loading: false
      };
    case ACTION_TYPES.FETCH_TIMELINE.concat("_FULFILLED"):
      return {
        ...state,
        loading: false,
        listPost: action.payload.data
      };
    default:
      return state;
  }
}

export const fetchTimeline = () => ({
  type: ACTION_TYPES.FETCH_TIMELINE,
  payload: axios.get('/posts/timeline')
});
