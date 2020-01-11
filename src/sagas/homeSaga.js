import { call, put, takeLatest, all, take } from 'redux-saga/effects';
import { Navigation } from 'react-native-navigation';
import { getRequest } from '../utils/request';
import { API_URL } from '../constants';
import {
  GET_SIZE_CARD,
  SET_SIZE_CARD,
  GET_ITEMS,
  GET_SIZE_CARD_DETAIL,
  sizeDetail,
} from '../constants/homeConstants';

function* getSizeCardsSaga() {
  const url = `${API_URL}/card`;
  try {
    let selectedSizeCard;
    const result = yield call(getRequest, { url });
    if (result.cards.length === 0) {
      // 사이즈카드가 없을시에, 사이즈 카드 등록으로 초기화.
      selectedSizeCard = { name: '사이즈카드 등록' };
    } else {
      selectedSizeCard = result.cards[0]; //eslint-disable-line
      yield put({
        type: GET_SIZE_CARD_DETAIL.REQUEST,
        sizeCardId: result.cards[0].id,
      });
    }

    yield put({
      type: GET_SIZE_CARD.SUCCESS,
      cards: result.cards,
      selectedSizeCard,
    });
    yield put({ type: GET_ITEMS.REQUEST, sizeCard: result.cards[0] });
  } catch (error) {
    yield put({ type: GET_SIZE_CARD.FAIL, error });
  }
}

function* getSizeCardDetailSaga(action) {
  try {
    const url = `${API_URL}/card/size?card=${action.sizeCardId}`;
    const sizeCardDetail = yield call(getRequest, { url });
    const mergedSizeCardDetail = sizeDetail.map(detail => ({
      ...detail,
      measurement: sizeCardDetail.size[detail.key],
    }));
    yield put({
      type: GET_SIZE_CARD_DETAIL.SUCCESS,
      sizeCardDetail: mergedSizeCardDetail,
    });
  } catch (error) {
    yield put({ type: GET_SIZE_CARD_DETAIL.FAIL, error });
  }
}

function* setSizeCardSaga(action) {
  const { sizeCard, cId } = action;
  try {
    yield put({ type: SET_SIZE_CARD.SUCCESS, sizeCard });
    yield put({ type: GET_SIZE_CARD_DETAIL.REQUEST, sizeCardId: sizeCard.id });
    yield put({ type: GET_ITEMS.REQUEST, sizeCard });
    yield Navigation.dismissModal(cId);
  } catch (error) {
    yield put({ type: SET_SIZE_CARD.FAIL });
  }
}

function* getItemsSaga(action) {
  const { sizeCard } = action;
  const gender = sizeCard.gender === '남' ? 'm' : 'w';
  const url = `${API_URL}/item/all?gender=${gender}`;
  try {
    const { filtered } = yield call(getRequest, { url });
    const transformed = filtered.map(x => ({
      ...x,
      uri: x.main_img,
      // headers: { Authorization: 'Basic AuthToken' },
    }));
    yield put({ type: GET_ITEMS.SUCCESS, items: transformed });
  } catch (error) {
    yield put({ type: GET_ITEMS.FAIL, error });
    console.log(error);
  }
}

export default function* homeSaga() {
  yield all([
    takeLatest(GET_SIZE_CARD.REQUEST, getSizeCardsSaga),
    takeLatest(SET_SIZE_CARD.REQUEST, setSizeCardSaga),
    takeLatest(GET_ITEMS.REQUEST, getItemsSaga),
    takeLatest(GET_SIZE_CARD_DETAIL.REQUEST, getSizeCardDetailSaga),
  ]);
}
