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

export const GET_SIZE_CARD = {
  REQUEST: 'WearBe/Home/GET_SIZE_CARDS_REQUEST',
  SUCCESS: 'WearBe/Home/GET_SIZE_CARDS_SUCCESS',
  FAIL: 'WearBe/Home/GET_SIZE_CARDS_FAIL',
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
