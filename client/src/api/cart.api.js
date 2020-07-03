//acess to back end api is done here
const baseURL = 'http://localhost:8080/api';
const header = '/cart';
export const getCart = function () {
  return fetch(baseURL + header + '/')
    .then((results) => {
      return results.json();
    })
    .then((data) => {
      return data;
    });
};

export const getCount = function () {
  return fetch(baseURL + header + 'count/')
    .then((results) => {
      return results.json();
    })
    .then((data) => {
      return data;
    });
};

//Update the record
export const postEditData = function (id, value) {
  let url = baseURL + header + '/' + id;
  return fetch(url, {
    method: 'PUT',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify({ Quantity: value })
  })
    .then((results) => {
      return results.json();
    })
    .then((data) => {
      return data;
    });
};
