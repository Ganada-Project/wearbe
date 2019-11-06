// Imports: Dependencies
import {all, fork} from 'redux-saga/effects';
import fetchUserSaga from './authSaga';
// Imports: Redux Sagas
// Redux Saga: Root Saga
export function* rootSaga() {
  yield all([fork(fetchUserSaga)]);
}
