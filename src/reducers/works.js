import { types } from "../types/types";

const initialState = {
  works: [],
  worksState: [],
  work: null,
  total: 0,
  page: 1,
  results: 0,
};

export const workReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.getAllWorks:
      return {
        ...state,
        works: action.payload.works,
        total: action.payload.total,
        page: action.payload.page,
        results: action.payload.results,
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
