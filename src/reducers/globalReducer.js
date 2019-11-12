import { fromJS } from 'immutable';
import {
  FETCH_USER_FAIL,
  FETCH_USER_SUCCESS,
  FETCH_USER_REQUESTING,
  CHECK_PHONE,
} from '../constants/authConstants';

// Initial State
const initialState = fromJS({
  userData: {
    id: null,
  },
  phoneVerify: {
    overlap: false,
    checking: false,
  },
});

function globalReducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_USER_REQUESTING:
      return state.set('loading', true);
    case FETCH_USER_SUCCESS:
      return state
        .set('userData', fromJS({ ...action.payload.user }))
        .set('idToken', action.payload.idToken)
        .set('loading', false);
    // case GET_FCM_TOKEN_SUCCESS:
    //   return state.set('fcmToken', action.fcmToken);
    case FETCH_USER_FAIL:
      return state.set('loading', false).set('error', action.error);
    case CHECK_PHONE.REQUEST:
      return state.setIn(['phoneVerify', 'checking'], true);
    case CHECK_PHONE.SUCCESS:
      return state
        .setIn(['phoneVerify', 'overlap'], action.overlap)
        .setIn(['phoneVerify', 'checking'], false);
    // case TRY_SIGN_OUT_SUCCESS:
    //   return state.set('userData', state.get('userData')).set('idToken', null);
    default:
      return state;
  }
}

export default globalReducer;
