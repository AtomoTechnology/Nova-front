import { types } from '../types/types';

const initialState = {
  histories: [],
};

export const HistoriesReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.getAllHistories:
      return {
        ...state,
        histories: action.payload.works,
      };
    default:
      return state;
  }
};
