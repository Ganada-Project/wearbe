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

export const TRY_SIGN_OUT = 'WearBe/App/TRY_SIGN_OUT';
export const TRY_SIGN_OUT_SUCCESS = 'WearBe/App/TRY_SIGN_OUT_SUCCESS';
export const TRY_SIGN_OUT_FAIL = 'WearBe/App/TRY_SIGN_OUT_FAIL';

export const GET_FCM_TOKEN_SUCCESS = 'WearBe/App/GET_FCM_TOKEN_SUCCESS';
export const GET_FCM_TOKEN_FAIL = 'WearBe/App/GET_FCM_TOKEN_FAIL';
