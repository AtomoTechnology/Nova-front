import { fetchWithToken } from '../helpers/fetchWithOutToken';
import { types } from '../types/types';

export const GetTotalQueriesNotRead = () => {
  return async (dispatch) => {
    try {
      const resp = await fetchWithToken('queries?read=false');
      const queries = await resp.json();
      if (queries.status === types.statusSuccess) {
        dispatch(SetQuantitiesNotRead(queries.results));
      }
    } catch (error) {
      throw error;
    }
  };
};
const SetQuantitiesNotRead = (quant) => ({
  type: types.queriesNotread,
  payload: {
    quantityNotRead: quant,
  },
});
