import {
  GET_SIZE_CARD,
  SET_SIZE_CARD,
  GET_ITEMS,
} from '../constants/homeConstants';

export function setSizeCardRequestAction({ sizeCard, cId }) {
  return {
    type: SET_SIZE_CARD.REQUEST,
    sizeCard,
    cId,
  };
}

export function getSizeCardRequestAction() {
  return {
    type: GET_SIZE_CARD.REQUEST,
  };
}

export function getItemsRequestAction() {
  return {
    type: GET_ITEMS.REQUEST,
  };
}
