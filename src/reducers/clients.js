import { types } from "../types/types";

const initialState = {
  clients: [],
  client: null,
  clientWorks: [],
  clientSearch: [],
};

export const clientReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.getAllClients:
      return {
        ...state,
        clients: action.payload,
      };
    case types.setOneClient:
      return {
        ...state,
        client: action.payload,
      };
    case types.setWorksClient:
      return {
        ...state,
        clientWorks: action.payload,
      };
    case types.resetWorksClient:
      return {
        ...state,
        clientWorks: [],
      };
    case types.filtrarClient:
      return {
        ...state,
        clientSearch: action.payload,
      };
    default:
      return state;
  }
};
