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

import { POST_SIZE_CARD } from '../constants/SizeCardConstants';

export function postSizeCardAction({
  gender,
  sizeCardName,
  age,
  height,
  weight,
  base64,
  headOffset,
  footOffset,
  leftShulderOffset,
  rightShulderOffset,
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
  crotchOffset,
  leftNeckOffset,
  rightNeckOffset,
  leftHandOffset,
  rightHandOffset,
  rightElbowOffset,
  leftElbowOffset,
  isMe,
}) {
  return {
    type: POST_SIZE_CARD.REQUEST,
    gender,
    sizeCardName,
    age,
    height,
    weight,
    base64,
    headOffset,
    footOffset,
    leftShulderOffset,
    rightShulderOffset,
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
    crotchOffset,
    leftNeckOffset,
    rightNeckOffset,
    leftHandOffset,
    rightHandOffset,
    rightElbowOffset,
    leftElbowOffset,
    isMe,
  };
}
