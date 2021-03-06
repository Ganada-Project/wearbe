/*
 * AuthConstants
 * Each action has a corresponding type, which the reducer knows and picks up on.
 * To avoid weird typos between the reducer and the actions, we save them as
 * constants here. We prefix them with 'yourproject/YourComponent' so we avoid
 * reducers accidentally picking up actions they shouldn't.
 *
 * Follow this format:
 * export const YOUR_ACTION_CONSTANT = 'yourproject/YourContainer/YOUR_ACTION_CONSTANT';
 */

export const FETCH_USER_REQUESTING = 'WearBe/App/FETCH_USER_REQUESTING';
export const FETCH_USER_FAIL = 'WearBe/App/FETCH_USER_FAIL';
export const FETCH_USER_SUCCESS = 'WearBe/App/FETCH_USER_SUCCESS';

export const SIGN_IN = {
  REQUEST: 'Wearbe/SignIn/SIGN_IN_REQUEST',
  SUCCESS: 'Wearbe/SignIn/SIGN_IN_SUCCESS',
  FAIL: 'Wearbe/SignIn/SIGN_IN_FAIL',
};

export const SIGN_UP = {
  REQUEST: 'WearBe/SignUp/SIGN_UP_REQUEST',
  SUCCESS: 'WearBe/SignUp/SIGN_UP_SUCCESS',
  FAIL: 'WearBe/SignUp/SIGN_UP_FAIL',
};

export const SIGN_OUT = {
  REQUEST: 'WearBe/Profile/SIGN_OUT_REQUEST',
  SUCCESS: 'WearBe/Profile/SIGN_OUT_SUCCESS',
  FAIL: 'WearBe/Profile/SIGN_OUT_FAIL',
};

export const GET_FCM_TOKEN_SUCCESS = 'WearBe/App/GET_FCM_TOKEN_SUCCESS';
export const GET_FCM_TOKEN_FAIL = 'WearBe/App/GET_FCM_TOKEN_FAIL';

export const VERIFY_PHONE = {
  REQUEST: 'WearBe/PhoneVerify/VERIFY_PHONE_REQUEST',
  SUCCESS: 'WearBe/PhoneVerify/VERIFY_PHONE_SUCCESS',
  FAIL: 'WearBe/PhoneVerify/VERIFY_PHONE_FAIL',
};

export const CHECK_PHONE = {
  REQUEST: 'WearBe/PhoneVerify/CHECK_PHONE_REQUEST',
  SUCCESS: 'WearBe/PhoneVerify/CHECK_PHONE_SUCCESS',
  FAIL: 'WearBe/PhoneVerify/CHECK_PHONE_FAIL',
};

export const CHECK_NICKNAME = {
  REQUEST: 'WearBe/SignUp/CHECK_NICKNAME_REQUEST',
  SUCCESS: 'WearBe/SignUp/CHECK_NICKNAME_SUCCESS',
  FAIL: 'WearBe/SignUp/CHECK_NICKNAME_FAIL',
};
