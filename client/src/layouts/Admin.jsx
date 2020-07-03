import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import NotificationSystem from 'react-notification-system';
import { connect } from 'react-redux';
import AdminNavbar from 'components/Navbars/AdminNavbar';
import Footer from 'components/Footer/Footer';
import Sidebar from 'components/Sidebar/Sidebar';

import { style } from 'variables/Variables.jsx';

import routes from 'routes.js';

import image from 'assets/img/sidebar-3.jpg';

import { getCartCount } from '../actions/cart.action';

class Admin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      _notificationSystem: null,
      image: image,
      color: 'black',
      hasImage: true,
      fixedClasses: 'dropdown show-dropdown open',
      cartCount: 0
    };
    this.updateCartCount = this.updateCartCount.bind(this);
  }

  componentWillMount() {
    this.props.getCartCount();
  }

  componentWillReceiveProps(newProps) {
    if (this.props !== newProps) {
      if (newProps.cartCount && newProps.cartCount.success) {
        this.setState({ cartCount: newProps.cartCount.data });
      }
    }
  }

  updateCartCount = (msg) => {
    this.props.getCartCount();
  };

  getRoutes = (routes) => {
    return routes.map((prop, key) => {
      if (prop.layout === '/admin') {
        return (
          <Route
            path={prop.layout + prop.path}
            render={(props) => <prop.component {...props} handleClick={this.handleNotificationClick} updateCartCount={this.updateCartCount} />}
            key={key}
          />
        );
      } else {
        return null;
      }
    });
  };
  getBrandText = (path) => {
    for (let i = 0; i < routes.length; i++) {
      if (this.props.location.pathname.indexOf(routes[i].layout + routes[i].path) !== -1) {
        return routes[i].name;
      }
    }
    return 'Brand';
  };

  componentDidUpdate(e) {
    if (e.history.action === 'PUSH') {
      document.documentElement.scrollTop = 0;
      document.scrollingElement.scrollTop = 0;
      this.refs.mainPanel.scrollTop = 0;
    }
  }
  render() {
    return (
      <div className="wrapper">
        {/* <NotificationSystem ref="notificationSystem" style={style} /> */}
        <Sidebar {...this.props} routes={routes} image={this.state.image} color={this.state.color} hasImage={this.state.hasImage} />
        <div id="main-panel" className="main-panel" ref="mainPanel">
          <AdminNavbar {...this.props} brandText={this.getBrandText(this.props.location.pathname)} cartCount={this.state.cartCount} />
          <Switch>{this.getRoutes(routes)}</Switch>
          <Footer />
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    cartCount: state.cartReducer.cartCountData
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    getCartCount: () => {
      dispatch(getCartCount());
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Admin);
