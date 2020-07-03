import React, { Component } from 'react';
import { NavItem, Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { getCartCount } from '../../actions/cart.action';

class AdminNavbarLinks extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cartCount: this.props.cartCount
    };
    this.updateCartCount = this.updateCartCount.bind(this);
  }
  componentWillMount() {}

  componentWillReceiveProps(newProps) {
    if (this.props !== newProps) {
      this.setState({ cartCount: newProps.cartCount.data });
    }
  }

  updateCartCount = (msg) => {
    this.props.getCartCount();
  };

  render() {
    return (
      <div>
        <Nav pullRight>
          <NavItem eventKey={2} href="#">
            <Link to="/admin/cart">
              <i className="fa fa-shopping-cart" />
              {/* <b className="caret" /> */}
              {this.state.cartCount > 0 && <span className="notification">{this.state.cartCount}</span>}
            </Link>
          </NavItem>
        </Nav>
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
export default connect(mapStateToProps, mapDispatchToProps)(AdminNavbarLinks);
