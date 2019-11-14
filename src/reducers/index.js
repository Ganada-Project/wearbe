// Imports: Dependencies
import { combineReducers } from 'redux-immutable';

import globalReducer from './globalReducer';
import homeReducer from './homeReducer';
// Redux: Root Reducer
const rootReducer = combineReducers({
  global: globalReducer,
  home: homeReducer,
});
// Exports
export default rootReducer;
