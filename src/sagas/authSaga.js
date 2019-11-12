import AsyncStorage from '@react-native-community/async-storage';
import { Navigation } from 'react-native-navigation';
import { call, put, takeLatest, all } from 'redux-saga/effects';
import { getRequest } from '../utils/request';
import { API_URL } from '../constants';

import {
  FETCH_USER_REQUESTING,
  FETCH_USER_FAIL,
  FETCH_USER_SUCCESS,
  CHECK_PHONE,
  VERIFY_PHONE,
  // GET_FCM_TOKEN_SUCCESS,
} from '../constants/authConstants';

const resetToWelcome = () => {
  Navigation.setRoot({
    root: {
      stack: {
        children: [
          {
            component: {
              name: 'wearbe.welcome',
              statusBar: {
                style: 'light',
              },
              options: {
                topBar: {
                  visible: false,
                },
              },
            },
          },
        ],
      },
    },
  });
};

const getUserToken = async () => {
  let idToken;
  try {
    idToken = await AsyncStorage.getItem('wave.idToken');
  } catch (error) {
    // Error retrieving data
    idToken = null;
  }
  return idToken;
};

export function* fetchUserFlow({ token }) {
  let user;
  const url = `${API_URL}/user/me`;
  const idToken = yield getUserToken() || token;
  // yield put({type: GET_FCM_TOKEN_SUCCESS, fcmToken});
  if (!idToken || idToken === null || idToken === undefined) {
    user = { result: null };
    yield put({ type: FETCH_USER_FAIL });
    yield resetToWelcome();
  } else {
    try {
      user = yield call(getRequest, { url });
      yield put({
        type: FETCH_USER_SUCCESS,
        payload: { user, idToken },
      });
      // yield Navigation.setRoot({
      //   root: {
      //     stack: {
      //       children: [
      //         {
      //           component: {
      //             name: 'wearbe.home',
      //           },
      //         },
      //       ],
      //     },
      //   },
      // });
    } catch (error) {
      user = { result: null };
      // yield resetToWelcome();
      yield put({ type: FETCH_USER_FAIL, error });
    }
  }
  return user.result;
}

function* verifyPhoneNumberSaga(action) {
  const { number } = action.payload;
  const url = `${API_URL}/auth/check/user/phone`;
  try {
    const result = yield call(getRequest, { url });
    yield put({ type: VERIFY_PHONE.SUCCESS, payload: { result } });
  } catch (error) {
    yield put({ type: VERIFY_PHONE.FAIL, error });
  }
}

function* checkPhoneNumberSaga(action) {
  const { number } = action;
  const url = `${API_URL}/auth/check/phone?phone=${number}`;
  try {
    const result = yield call(getRequest, { url });
    yield put({ type: CHECK_PHONE.SUCCESS, overlap: result.isOverlap });
  } catch (error) {
    console.log(error);
    yield put({ type: CHECK_PHONE.FAIL, error });
  }
}

export default function* authSaga() {
  yield all([
    takeLatest(FETCH_USER_REQUESTING, fetchUserFlow),
    takeLatest(CHECK_PHONE.REQUEST, checkPhoneNumberSaga),
    takeLatest(VERIFY_PHONE.REQUEST, verifyPhoneNumberSaga),
  ]);
}
