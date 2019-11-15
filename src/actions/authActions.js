/*
 * Auth Actions
 *
 * Actions change things in your application
 * Since this boilerplate uses a uni-directional data flow, specifically redux,
 * we have these actions which are the only way your application interacts with
 * your application state. This guarantees that your state is up to date and nobody
 * messes it up weirdly somewhere.
 *
 * To add a new Action:
 * 1) Import your constant
 * 2) Add a function like this:
 *    export function yourAction(var) {
 *        return { type: YOUR_ACTION_CONSTANT, var: var }
 *    }
 */

import {
  FETCH_USER_REQUESTING,
  CHECK_PHONE,
  VERIFY_PHONE,
  SIGN_UP,
  CHECK_NICKNAME,
  SIGN_OUT,
  SIGN_IN,
} from '../constants/authConstants';

export function signUpAction({ signUpObj }) {
  return {
    type: SIGN_UP.REQUEST,
    signUpObj,
  };
}

export function fetchUserAction() {
  return {
    type: FETCH_USER_REQUESTING,
  };
}

export function checkNicknameAction({ nickname }) {
  return {
    type: CHECK_NICKNAME.REQUEST,
    nickname,
  };
}

export function checkPhoneAction({ number }) {
  return {
    type: CHECK_PHONE.REQUEST,
    number,
  };
}

export function verifyPhoneAction({ number }) {
  return {
    type: VERIFY_PHONE.REQUEST,
    number,
  };
}

export function signInAction({ phone, password }) {
  return {
    type: SIGN_IN.REQUEST,
    phone,
    password,
  };
}

export function signOutAction() {
  return {
    type: SIGN_OUT.REQUEST,
  };
}
