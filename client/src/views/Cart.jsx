import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Grid, Col, Row } from 'react-bootstrap';
import Button from 'components/CustomButton/CustomButton.jsx';
import { getCartData, editData } from '../actions/cart.action';
import Card from 'components/Card/Card.jsx';

class ListCart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cartData: [],
      totalPrice: 0
    };
    this.updateCart = this.updateCart.bind(this);
  }

  componentWillMount() {
    this.props.getCartData();
  }

  componentWillReceiveProps(newProps) {
    if (this.props !== newProps) {
      if (newProps.cartData && newProps.cartData.data && newProps.cartData.data.success === true) {
        this.setState({ cartData: newProps.cartData.data.data.data, totalPrice: newProps.cartData.data.data.totalPrice });
      }
    }
  }

  updateCart = (id, value) => {
    this.props.editData(id, value, this.props.updateCartCount);
  };

  render() {
    return (
      <div className="content">
        <Grid fluid>
          <Col md={12}>
            <Card
              title="Your order details"
              ctAllIcons
              category={<span>Grab it, before it go off</span>}
              content={
                <div>
                  <Row>
                    {this.state.cartData.length ? (
                      this.state.cartData.map((item, key) => {
                        return (
                          <Col md={12} className="font-icon-list" key={key}>
                            <div className="font-icon-detail">
                              <Row>
                                <Col md={4}>
                                  <img style={{ width: '70%' }} src={require('assets/img/uploads/' + item.file)} alt={'...image'} className="" />
                                </Col>
                                <Col md={8}>
                                  <div style={{ 'margin-left': '-100px', 'margin-top': '-20px' }}>
                                    <h2>
                                      <b>{item.Name}</b>
                                    </h2>
                                    <p>
                                      <b>Price: {item.Price}$</b>
                                    </p>
                                    <p>
                                      <b>Quantity:</b>
                                      <i
                                        style={{ cursor: 'pointer' }}
                                        className="fa fa-minus"
                                        onClick={() => {
                                          this.updateCart(item.ProductId, -1);
                                        }}
                                      />
                                      <span style={{ padding: '5px' }}>{item.Quantity}</span>
                                      <i
                                        style={{ cursor: 'pointer' }}
                                        className="fa fa-plus "
                                        onClick={() => {
                                          this.updateCart(item.ProductId, 1);
                                        }}
                                      ></i>
                                    </p>
                                    <div className="add-remove"></div>
                                    <Button
                                      bsStyle="danger"
                                      fill
                                      onClick={() => {
                                        this.updateCart(item.ProductId, 0);
                                      }}
                                    >
                                      Remove
                                    </Button>
                                  </div>
                                </Col>
                              </Row>
                            </div>
                          </Col>
                        );
                      })
                    ) : (
                      <h4 style={{ padding: '15px' }}>Your cart is empty!</h4>
                    )}
                  </Row>
                  <Row>
                    <Col md={12} className="font-icon-list" key={1}>
                      <div className="font-icon-detail">
                        <h3>
                          <b>Total: {this.state.totalPrice}$ </b>
                        </h3>
                      </div>
                    </Col>
                  </Row>
                </div>
              }
            />
          </Col>
        </Grid>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    cartData: state.cartReducer.cartData
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    getCartData: () => {
      dispatch(getCartData());
    },
    editData: (id, value, updateCount) => {
      dispatch(editData(id, value, updateCount));
    }
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(ListCart);
