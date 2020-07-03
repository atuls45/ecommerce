import { toast } from 'react-toastify';
import { getCart, postEditData, getCount, onDeleteById } from '../api/cart.api';

export const RETRIVELCART = 'RETRIVELCART';
export const RETRIVELADDDATA = 'RETRIVELADDDATA';
export const RETRIVELCARTCOUNT = 'RETRIVELCARTCOUNT';
export const RETRIVELDELETEDATA = 'RETRIVELDELETEDATA';

//call the function from api which returns the data from database
export const getCartData = function () {
  return function (dispatch) {
    const data = getCart();
    data.then(function (data) {
      if (data.success) {
        dispatch({ type: RETRIVELCART, data });
      } else {
        dispatch({ type: RETRIVELCART, data: [] });
      }
    });
  };
};

// Get count of cart quantity
export const getCartCount = function () {
  return function (dispatch) {
    const data = getCount();
    data.then(function (data) {
      if (data.success) {
        let tdata = data.data;
        dispatch({ type: RETRIVELCARTCOUNT, data: tdata });
      } else {
        dispatch({ type: RETRIVELCARTCOUNT, data: 0 });
      }
    });
  };
};

//edit the row data into cart
export const editData = function (id, value, updateCount) {
  return (dispatch) => {
    const data = postEditData(id, value);
    data.then(function (data) {
      updateCount();
      if (data.success === false) {
        toast.error(data.data);
      } else {
        toast.success('Cart updated');
      }
      dispatch({ type: RETRIVELCART, data });
    });
  };
};

//delete the row data into cart
export const deleteData = function (row) {
  return (dispatch) => {
    const data = onDeleteById(row);
    data.then(function (data) {
      dispatch({ type: RETRIVELCART, data });
    });
  };
};

//get advance filter data(copy this)
// export const onSearchData = function (page, size, sort, str, disableSideBar) {
//   return async (dispatch) => {
//     await disableSideBar(true);
//     const data = requestData(page, size, sort, str);
//     data.then(function (data) {
//       disableSideBar(false);
//       if (data.success) {
//         let tdata = JSON.parse(JSON.stringify(data.data).replace(/\:null/gi, ':""'));
//         let paginate = data.paginate;
//         dispatch({ type: RETRIVELCART, tdata, data });
//         dispatch({ type: RETRIVELPAGINATIONDATA, paginate });
//       } else {
//         dispatch({ type: RETRIVELCART, tdata: [], data: [] });
//         dispatch({ type: RETRIVELPAGINATIONDATA, paginate: { perPage: 50, pageCount: 0, totalCount: 0, currentPage: 1 } });
//       }
//     });
//   };
// };
