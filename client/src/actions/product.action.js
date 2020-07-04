import { toast } from 'react-toastify';
import { getProduct, postEditData, postAddData, onDeleteById } from '../api/product.api';

export const RETRIVELPRODUCT = 'RETRIVELPRODUCT';
export const RETRIVELADDDATA = 'RETRIVELADDDATA';
export const RETRIVELEDITATA = 'RETRIVELEDITATA';
export const RETRIVELDELETEDATA = 'RETRIVELDELETEDATA';

//call the function from api which returns the data from database
export const getProductData = function () {
  return function (dispatch) {
    const data = getProduct();
    data.then(function (data) {
      if (data.success) {
        let tdata = data.data;
        dispatch({ type: RETRIVELPRODUCT, data: tdata });
      } else {
        dispatch({ type: RETRIVELPRODUCT, data: [] });
      }
    });
  };
};

//edit the row data into product
export const editData = function (obj, fetchProduct) {
  return (dispatch) => {
    const data = postEditData(obj._id, obj);
    data.then(function (data) {
      fetchProduct();
      if (data.success === true) {
        toast.success('Product updated succesfully');
      } else {
        toast.success('Something went wrong while updating product');
      }
      dispatch({ type: RETRIVELEDITATA, data });
    });
  };
};

//add the row data into product
export const addData = function (obj, fetchProduct) {
  return (dispatch) => {
    const data = postAddData(obj);
    data.then(function (data) {
      fetchProduct();
      if (data.success === true) {
        toast.success('Product added succesfully');
      } else {
        toast.success('Something went wrong while creating product');
      }
      dispatch({ type: RETRIVELADDDATA, data });
    });
  };
};

//delete the row data from product
export const deleteData = function (id, fetchProduct, updateCount) {
  return (dispatch) => {
    const data = onDeleteById(id);
    data.then(function (data) {
      fetchProduct();
      updateCount();
      if (data.success === true) {
        toast.success('Product deleted succesfully');
      } else {
        toast.success('Something went wrong while delting product');
      }
      dispatch({ type: RETRIVELDELETEDATA, data });
    });
  };
};
