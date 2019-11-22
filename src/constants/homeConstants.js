/*
 * HomeConstants
 * Each action has a corresponding type, which the reducer knows and picks up on.
 * To avoid weird typos between the reducer and the actions, we save them as
 * constants here. We prefix them with 'yourproject/YourComponent' so we avoid
 * reducers accidentally picking up actions they shouldn't.
 *
 * Follow this format:
 * export const YOUR_ACTION_CONSTANT = 'yourproject/YourContainer/YOUR_ACTION_CONSTANT';
 */
export const sizeDetail = [
  {
    id: 0,
    key: 'shoulder',
    name: '어깨너비',
    url: 'https://i.ytimg.com/vi/u2pXOlx9xTw/maxresdefault.jpg',
  },
  {
    id: 1,
    key: 'chest',
    name: '가슴너비',
    url: 'https://i.ytimg.com/vi/P4kcunqpQRo/maxresdefault.jpg',
  },
  {
    id: 2,
    key: 'arm',
    name: '팔',
    url: 'https://i.ytimg.com/vi/P4kcunqpQRo/maxresdefault.jpg',
  },
  {
    id: 3,
    key: 'waist',
    name: '허리너비',
    url:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQwA3tO-7fXCSDGODOH5FCaIxzAvoreZ7UMd2b9DvRYXTF31S4y',
  },
  {
    id: 4,
    key: 'hip',
    name: '골반너비',
    url:
      'https://static.jumia.co.ke/cms/external/pet/GE840AA0ESCENNAFAMZ/0ce09af41c157cf5f7fce184a9becd48.jpg',
  },
  {
    id: 5,
    key: 'leg',
    name: '다리길이',
  },
  {
    id: 6,
    key: 'crotch',
    name: '밑위',
  },
  {
    id: 7,
    key: 'thigh',
    name: '허벅지',
  },
];

export const GET_SIZE_CARD = {
  REQUEST: 'WearBe/Home/GET_SIZE_CARDS_REQUEST',
  SUCCESS: 'WearBe/Home/GET_SIZE_CARDS_SUCCESS',
  FAIL: 'WearBe/Home/GET_SIZE_CARDS_FAIL',
};

export const GET_SIZE_CARD_DETAIL = {
  REQUEST: 'WearBe/Home/GET_SIZE_CARD_DETAIL_REQUEST',
  SUCCESS: 'WearBe/Home/GET_SIZE_CARD_DETAIL_SUCCESS',
  FAIL: 'WearBe/Home/GET_SIZE_CARD_DETAIL_FAIL',
};

export const SET_SIZE_CARD = {
  REQUEST: 'WearBe/Home/SET_SIZE_CARD_REQUEST',
  SUCCESS: 'WearBe/Home/SET_SIZE_CARD_SUCCESS',
  FAIL: 'WearBe/Home/SET_SIZE_CARD_FAIL',
};

export const GET_ITEMS = {
  REQUEST: 'WearBe/Home/GET_ITEMS_REQUEST',
  SUCCESS: 'WearBe/Home/GET_ITEMS_SUCCESS',
  FAIL: 'WearBe/Home/GET_ITEMS_FAIL',
};
