// Imports: Dependencies
import { combineReducers } from 'redux-immutable';

import globalReducer from './globalReducer';
// Redux: Root Reducer
const rootReducer = combineReducers({
  global: globalReducer,
});
// Exports
export default rootReducer;
