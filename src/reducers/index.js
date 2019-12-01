import {combineReducers} from 'redux';
import timeline from "../component/timeline/timeline.reducer";
import profile from "../component/profile/profile.reducer";
const rootReducer = combineReducers({
  timeline,
  profile
});

export default rootReducer;
