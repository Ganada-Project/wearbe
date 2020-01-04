import {
  GET_SIZE_CARD,
  SET_SIZE_CARD,
  GET_ITEMS,
  GET_SIZE_CARD_DETAIL,
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

export function getSizeCardDetailAction({ sizeCardId }) {
  return {
    type: GET_SIZE_CARD_DETAIL.REQUEST,
    sizeCardId,
  };
}

export function getItemsRequestAction({ sizeCard }) {
  return {
    type: GET_ITEMS.REQUEST,
    sizeCard,
  };
}
