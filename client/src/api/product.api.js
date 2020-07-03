//acess to back end api is done here
const baseURL = 'http://localhost:8080/api';
const header = '/product';
export const getProduct = function () {
  return fetch(baseURL + header + '/')
    .then((results) => {
      return results.json();
    })
    .then((data) => {
      return data;
    });
};

//Update the record
export const postEditData = function (id, obj) {
  return fetch(baseURL + header + '/' + id, {
    method: 'PUT',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify(obj).replace(/\:""/gi, ':null')
  })
    .then((results) => {
      return results.json();
    })
    .then((data) => {
      return data;
    });
};

//Add the new record
export const postAddData = function (obj) {
  let data = new FormData();

  data.append('file', obj.file);
  data.append('Name', obj.Name);
  data.append('Description', obj.Description);
  data.append('Price', obj.Price);
  data.append('Quantity', obj.Quantity);

  return fetch(baseURL + header, {
    method: 'POST',
    body: data
  })
    .then((results) => {
      return results.json();
    })
    .then((data) => {
      return data;
    });
};
//delete the record by id
export const onDeleteById = function (id) {
  return fetch(baseURL + header + '/' + id, {
    method: 'DELETE'
  })
    .then((results) => {
      return results.json();
    })
    .then((data) => {
      return data;
    });
};
