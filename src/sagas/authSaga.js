import AsyncStorage from '@react-native-community/async-storage';
import {Navigation} from 'react-native-navigation';
import {call, put, takeLatest, all} from 'redux-saga/effects';
import {getRequest} from '../utils/request';
import {API_URL} from '../constants';

import {
  FETCH_USER_REQUESTING,
  FETCH_USER_FAIL,
  FETCH_USER_SUCCESS,
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

export function* fetchUserFlow({token}) {
  let user;
  const url = `${API_URL}/user/me`;
  const idToken = yield getUserToken() || token;
  // yield put({type: GET_FCM_TOKEN_SUCCESS, fcmToken});
  console.log(idToken);
  if (!idToken || idToken === null || idToken === undefined) {
    user = {result: null};
    yield put({type: FETCH_USER_FAIL});
    yield resetToWelcome();
  } else {
    try {
      user = yield call(getRequest, {url});
      yield put({
        type: FETCH_USER_SUCCESS,
        payload: {user, idToken},
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
      user = {result: null};
      // yield resetToWelcome();
      yield put({type: FETCH_USER_FAIL, error});
    }
  }
  return user.result;
}

export default function* fetchUserSaga() {
  yield all([takeLatest(FETCH_USER_REQUESTING, fetchUserFlow)]);
}
