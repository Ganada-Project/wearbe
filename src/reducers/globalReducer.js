import { fromJS } from 'immutable';
import {
  FETCH_USER_FAIL,
  FETCH_USER_SUCCESS,
  FETCH_USER_REQUESTING,
  CHECK_PHONE,
  CHECK_NICKNAME,
  SIGN_UP,
  SIGN_OUT,
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
  nickname: {
    overlap: false,
    checking: false,
  },
  userLoading: false,
  signUpLoading: false,
});

function globalReducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_USER_REQUESTING:
      return state.set('userLoading', true);
    case FETCH_USER_SUCCESS:
      return state
        .set('userData', fromJS({ ...action.payload.user }))
        .set('idToken', action.payload.idToken)
        .set('userLoading', false);
    // case GET_FCM_TOKEN_SUCCESS:
    //   return state.set('fcmToken', action.fcmToken);
    case FETCH_USER_FAIL:
      return state.set('userLoading', false).set('error', action.error);
    case CHECK_PHONE.REQUEST:
      return state.setIn(['phoneVerify', 'checking'], true);
    case CHECK_PHONE.SUCCESS:
      return state
        .setIn(['phoneVerify', 'overlap'], action.overlap)
        .setIn(['phoneVerify', 'checking'], false);
    case CHECK_NICKNAME.REQUEST:
      return state.setIn(['nickname', 'checking'], true);
    case CHECK_NICKNAME.SUCCESS:
      return state
        .setIn(['nickname', 'overlap'], action.overlap)
        .setIn(['nickname', 'checking'], false);
    case SIGN_UP.REQUEST:
      return state.set('signUpLoading', true);
    case SIGN_UP.SUCCESS:
      return state.set('signUpLoading', false);
    case SIGN_OUT.SUCCESS:
      return state.set('userData', state.get('userData')).set('idToken', null);
    default:
      return state;
  }
}

export default globalReducer;
