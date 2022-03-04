import { types } from '../types/types';

const initialState = {
  notRead: 0,
};

export const QueriesReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.queriesNotread:
      return {
        ...state,
        notRead: action.payload.quantityNotRead,
      };
    default:
      return state;
  }
};
