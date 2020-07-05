import ProductList from 'views/Product.jsx';
import ListProduct from 'views/ListProduct.jsx';
import Cart from 'views/Cart.jsx';
import UserProfile from 'views/UserProfile.jsx';

const dashboardRoutes = [
  {
    path: '/list',
    name: 'List Products',
    icon: 'pe-7s-albums',
    component: ListProduct,
    layout: '/admin'
  },
  {
    path: '/product',
    name: 'Manage Products',
    icon: 'pe-7s-albums',
    component: ProductList,
    layout: '/admin'
  },
  {
    path: '/cart',
    name: 'Cart',
    icon: 'pe-7s-cart',
    component: Cart,
    layout: '/admin'
  },
  {
    path: '/user',
    name: 'User Profile',
    icon: 'pe-7s-user',
    component: UserProfile,
    layout: '/admin'
  }
];

export default dashboardRoutes;
