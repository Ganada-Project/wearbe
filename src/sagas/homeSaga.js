import { call, put, takeLatest, all } from 'redux-saga/effects';
import { getRequest, postRequest } from '../utils/request';
import { API_URL } from '../constants';
import { GET_SIZE_CARD } from '../constants/homeConstants';

function* getSizeCardsSaga() {
  const url = `${API_URL}/card`;
  try {
    let selectedSizeCard;
    const result = yield call(getRequest, { url });
    if (result.cards.length === 0) {
      selectedSizeCard = { name: '사이즈카드 등록' };
    } else {
      selectedSizeCard = result.cards[0]; //eslint-disable-line
    }
    yield put({
      type: GET_SIZE_CARD.SUCCESS,
      cards: result.cards,
      selectedSizeCard,
    });
  } catch (error) {
    console.log(error);
    yield put({ type: GET_SIZE_CARD.FAIL, error });
  }
}

export default function* homeSaga() {
  yield all([takeLatest(GET_SIZE_CARD.REQUEST, getSizeCardsSaga)]);
}
