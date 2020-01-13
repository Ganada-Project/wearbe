// Imports: Dependencies
import { all } from 'redux-saga/effects';
import authSaga from './authSaga';
import homeSaga from './homeSaga';
import sizeCardSaga from './sizeCardSaga';
// Imports: Redux Sagas
// Redux Saga: Root Saga
export function* rootSaga() {
  yield all([authSaga(), homeSaga(), sizeCardSaga()]);
}
