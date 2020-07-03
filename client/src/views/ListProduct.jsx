import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Grid, Col, Row } from 'react-bootstrap';
import Button from 'components/CustomButton/CustomButton.jsx';
import { getProductData } from '../actions/product.action';
import { editData } from '../actions/cart.action';
import Card from 'components/Card/Card.jsx';

class ListProduct extends Component {
  constructor(props) {
    super(props);
    this.state = {
      productData: []
    };
    this.updateCart = this.updateCart.bind(this);
  }

  componentWillMount() {
    this.props.getProductData();
  }

  componentWillReceiveProps(newProps) {
    if (this.props !== newProps) {
      if (newProps.productData) {
        this.setState({ productData: newProps.productData.data });
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
              title="Never Before Sale"
              ctAllIcons
              category={<span>Don't miss the deal</span>}
              content={
                <Row>
                  {this.state.productData.map((item, key) => {
                    return (
                      <Col md={4} className="font-icon-list" key={key}>
                        <div style={{ 'font-size': 'large' }} className="font-icon-detail">
                          {/* <i className={prop} /> */}
                          <img
                            style={{ width: '100%', height: '300px', overflow: 'hidden' }}
                            src={require('assets/img/uploads/' + item.file)}
                            alt={item.Name}
                          />
                          <br />
                          <br />
                          <span className="pad-10">
                            <b>Name:</b> {item.Name}
                          </span>
                          <br />
                          <span className="pad-10">
                            <b>Price:</b> ${item.Price}
                          </span>
                          <br />
                          <span className="pad-10">
                            <b>Description:</b> {item.Description}
                          </span>
                          <br />
                          <Button
                            style={{ margin: '8px' }}
                            onClick={() => {
                              this.updateCart(item._id, 1);
                            }}
                            bsStyle="success"
                            fill
                          >
                            <i className="fa fa-plus-circle" /> Add to cart
                          </Button>
                          <br />
                        </div>
                      </Col>
                    );
                  })}
                </Row>
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
    productData: state.productReducer.productData
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    getProductData: () => {
      dispatch(getProductData());
    },
    editData: (id, value, updateCount) => {
      dispatch(editData(id, value, updateCount));
    }
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(ListProduct);
