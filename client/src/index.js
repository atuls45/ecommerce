import React from 'react';
import ReactDOM from 'react-dom';

import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import { Provider } from 'react-redux';
import { syncHistoryWithStore } from 'react-router-redux';

import productReducer from './reducers/product.reducer';
import cartReducer from './reducers/cart.reducer';

import { store, historys, Init as storeInit } from './utils/store';
import 'react-toastify/dist/ReactToastify.min.css';
import { toast } from 'react-toastify';

import 'bootstrap/dist/css/bootstrap.min.css';
import './assets/css/animate.min.css';
import './assets/sass/bootstrap-dashboard-react.scss?v=1.3.0';
import './assets/css/demo.css';
import './assets/css/pe-icon-7-stroke.css';

import AdminLayout from 'layouts/Admin.jsx';

storeInit({
  productReducer,
  cartReducer
});
const storeHistory = syncHistoryWithStore(historys, store);
storeHistory.listen(function (location) {});

toast.configure({
  autoClose: 3000,
  hideProgressBar: true
});

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter history={storeHistory}>
      <Switch>
        <Route path="/admin" render={(props) => <AdminLayout {...props} />} />
        <Redirect from="/" to="/admin/list" />
      </Switch>
    </BrowserRouter>
  </Provider>,
  document.getElementById('root')
);
