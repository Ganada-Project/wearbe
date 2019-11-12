// Imports: Dependencies
import { all } from 'redux-saga/effects';
import authSaga from './authSaga';
// Imports: Redux Sagas
// Redux Saga: Root Saga
export function* rootSaga() {
  yield all([authSaga()]);
}
