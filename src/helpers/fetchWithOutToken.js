export const fetchWithOutToken = (endpoint, data, method = 'GET') => {
  let url = `${process.env.REACT_APP_URL}${endpoint}`;
  if (method === 'GET') {
    return fetch(url);
  } else {
    return fetch(url, {
      method,
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify(data),
    });
  }
};
export const fetchWithToken = (endpoint, data, method = 'GET') => {
  let url = `${process.env.REACT_APP_URL}${endpoint}`;
  const tok = localStorage.getItem('token') || '';
  const token = 'Bearer ' + tok;
  if (method === 'GET') {
    return fetch(url, {
      headers: {
        authorization: token,
      },
    });
  } else {
    return fetch(url, {
      method,
      headers: {
        'Content-type': 'application/json',
        authorization: token,
      },
      body: JSON.stringify(data),
    });
  }
};
