import { Navigation } from 'react-native-navigation';
import randomColor from 'randomcolor';
import { call, put, takeLatest, all } from 'redux-saga/effects';
import {
  POST_SIZE_CARD_REQUESTING,
  POST_SIZE_CARD_REQUESTING_FAIL,
  POST_SIZE_CARD_REQUESTING_SUCCESS,
} from '../constants/SizeCardConstants';
import { API_URL, theme } from '../constants';
import { postRequest } from '../utils/request';

function* postSizeCardSaga(action) {
  const url = `${API_URL}/card`;

  const {
    weight,
    sizeCardName,
    gender,
    height,
    age,
    headOffset,
    footOffset,
    leftNeckOffset,
    leftShulderOffset,
    leftElbowOffset,
    leftHandOffset,
    rightNeckOffset,
    rightShulderOffset,
    rightElbowOffset,
    rightHandOffset,
    leftChestOffset,
    leftWaistOffset,
    leftPelvisOffset,
    rightChestOffset,
    rightWaistOffset,
    rightPelvisOffset,
    leftThighOffset,
    leftAnkleOffset,
    rightThighOffset,
    rightAnkleOffset,
    isMe,
  } = action.payload;
  const cardColor = randomColor({
    luminosity: 'light',
    hue: theme.subColor,
  });
  const payload = {
    name: sizeCardName,
    gender,
    weight,
    height,
    age,
    bodyPoints: {
      head: headOffset,
      foot: footOffset,
      leftNeck: leftNeckOffset,
      leftShoulder: leftShulderOffset,
      leftElbow: leftElbowOffset,
      leftHand: leftHandOffset,
      rightNeck: rightNeckOffset,
      rightShoulder: rightShulderOffset,
      rightElbow: rightElbowOffset,
      rightHand: rightHandOffset,
      leftChest: leftChestOffset,
      leftWaist: leftWaistOffset,
      leftPelvis: leftPelvisOffset,
      rightChest: rightChestOffset,
      rightWaist: rightWaistOffset,
      rightPelvis: rightPelvisOffset,
      leftThigh: leftThighOffset,
      leftAnkle: leftAnkleOffset,
      rightThigh: rightThighOffset,
      rightAnkle: rightAnkleOffset,
    },
    bodyShape: 'f',
    preferColor: '#ffffff',
    preferStyle: 'f',
    preferSize: '3',
    cardColor,
    mine: isMe ? 1 : 0,
  };
  try {
    console.log(payload);
    const result = yield call(postRequest, { url, payload });
    yield put({ type: POST_SIZE_CARD_REQUESTING_SUCCESS, payload: { result } });
    yield Navigation.setRoot({
      root: {
        stack: {
          children: [
            {
              component: {
                name: 'wave.home',
              },
            },
          ],
        },
      },
    });
  } catch (error) {
    console.log(error);
    yield put({ type: POST_SIZE_CARD_REQUESTING_FAIL, error });
  }
}

export default function* sizeCardSaga() {
  yield all([takeLatest(POST_SIZE_CARD_REQUESTING, postSizeCardSaga)]);
}
