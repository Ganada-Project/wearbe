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

import { POST_SIZE_CARD_REQUESTING } from '../constants/SizeCardConstants';

export function postSizeCardAction({
  gender,
  sizeCardName,
  age,
  height,
  weight,
  base64,
  headOffsetY,
  footOffsetY,
  bellyOffsetX,
  shoulderOffsetY,
  wristOffsetY,
  crotchOffsetY,
  pelvisOffsetY,
  ankleOffsetY,
  leftShulderOffsetX,
  leftChestOffsetX,
  leftWaistOffsetX,
  leftPelvisOffsetX,
  rightShulderOffsetX,
  rightChestOffsetX,
  rightWaistOffsetX,
  rightPelvisOffsetX,
  leftThighOffsetX,
  rightThighOffsetX,
  isMe,
}) {
  return {
    type: POST_SIZE_CARD_REQUESTING,
    gender,
    sizeCardName,
    age,
    height,
    weight,
    base64,
    headOffsetY,
    footOffsetY,
    bellyOffsetX,
    shoulderOffsetY,
    wristOffsetY,
    crotchOffsetY,
    pelvisOffsetY,
    ankleOffsetY,
    leftShulderOffsetX,
    leftChestOffsetX,
    leftWaistOffsetX,
    leftPelvisOffsetX,
    rightShulderOffsetX,
    rightChestOffsetX,
    rightWaistOffsetX,
    rightPelvisOffsetX,
    leftThighOffsetX,
    rightThighOffsetX,
    isMe,
  };
}
