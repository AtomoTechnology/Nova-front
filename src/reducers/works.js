import { types } from "../types/types";

const initialState = {
  works: [],
  worksState: [],
  work: null,
};

export const workReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.getAllWorks:
      return {
        ...state,
        works: action.payload,
      };
    case types.setOneWork:
      return {
        ...state,
        work: action.payload,
      };
    case types.filterWorksState:
      return {
        ...state,
        worksState: action.payload.works,
      };
    default:
      return state;
  }
};
