/*
 * DefaultScreenReducer
 *
 * The reducer takes care of our data. Using actions, we can change our
 * application state.
 * To add a new action, add it to the switch statement in the reducer function
 *
 * Example:
 * case YOUR_ACTION_CONSTANT:
 *   return state.set('yourStateVariable', true);
 */
import { fromJS } from 'immutable';

import {
  POST_SIZE_CARD_REQUESTING,
  POST_SIZE_CARD_REQUESTING_FAIL,
  POST_SIZE_CARD_REQUESTING_SUCCESS,
} from '../constants/SizeCardConstants';

// The initial state of the App
export const initialState = fromJS({
  registerLoading: false,
});

function sizeCardReducer(state = initialState, action) {
  switch (action.type) {
    case POST_SIZE_CARD_REQUESTING:
      return state.set('registerLoading', true);
    case POST_SIZE_CARD_REQUESTING_SUCCESS:
      return state.set('registerLoading', false);
    case POST_SIZE_CARD_REQUESTING_FAIL:
      return state.set('registerLoading', false);

    default:
      return state;
  }
}

export default sizeCardReducer;
