import { fetchWithToken } from './fetchWithOutToken';

export const GetStates = async () => {
  const resp = await fetchWithToken('state');
  const states = await resp.json();
  return states;
};
