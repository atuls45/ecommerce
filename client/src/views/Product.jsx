import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Grid, Col, Table } from 'react-bootstrap';
import Button from 'components/CustomButton/CustomButton.jsx';
import AddComponent from './Add.jsx';
import { getProductData, addData, editData, deleteData } from '../actions/product.action';
import Card from 'components/Card/Card.jsx';

class ProductList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showAddLayer: false,
      header: '',
      productData: [],
      editData: {},
      columns: [
        {
          dataField: '_id',
          text: 'Product ID'
        },
        {
          dataField: 'Name',
          text: 'Name'
        },
        {
          dataField: 'Quantity',
          text: 'Quantity'
        },
        {
          dataField: 'Price',
          text: 'Price'
        },
        {
          dataField: 'Description',
          text: 'Description'
        }
      ]
    };
    this.fetchProduct = this.fetchProduct.bind(this);
    this.onAddClick = this.onAddClick.bind(this);
    this.onEditClick = this.onEditClick.bind(this);
    this.onDeleteClick = this.onDeleteClick.bind(this);
    this.onClose = this.onClose.bind(this);
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

  fetchProduct = () => {
    this.props.getProductData();
  };

  onAddClick = (data, header) => {
    if (header === 'Add') {
      this.props.onAdd(data, this.fetchProduct);
    } else {
      this.props.onEdit(data, this.fetchProduct);
    }
    this.onClose();
  };

  onClose = () => {
    this.setState({ showAddLayer: false });
  };

  onEditClick = (data) => {
    return () => {
      this.setState({ showAddLayer: true, header: 'Edit', editData: data });
    };
  };

  onDeleteClick = (data) => {
    return () => {
      this.props.onDelete(data._id, this.fetchProduct);
    };
  };

  render() {
    return (
      <div className="content">
        <Grid fluid>
          <Col md={12}>
            <Card
              title="List of products"
              ctTableFullWidth
              ctTableResponsive
              content={
                <div>
                  <Button
                    onClick={() => {
                      this.setState({ showAddLayer: true, header: 'Add' });
                    }}
                    bsStyle="success"
                    pullRight
                    fill
                    type="submit"
                  >
                    <span style={{ padding: '5px' }}>
                      <i className="fa fa-plus-circle" />
                    </span>
                    Add New Product
                  </Button>
                  <Table striped hover>
                    <thead>
                      <tr>
                        {this.state.columns.map((prop, key) => {
                          return <th>{prop.text}</th>;
                        })}
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {this.state.productData.map((pdata, key) => {
                        return (
                          <tr key={key}>
                            {this.state.columns.map((prop, key) => {
                              return <td key={key}>{pdata[prop.dataField]}</td>;
                            })}
                            <td style={{ 'min-width': '100px' }}>
                              <span onClick={this.onEditClick(pdata)} style={{ padding: '5px', color: 'orange', cursor: 'pointer' }}>
                                <i className="fa fa-pencil" />
                              </span>
                              <span onClick={this.onDeleteClick(pdata)} style={{ padding: '5px', color: 'red', cursor: 'pointer' }}>
                                <i className="fa fa-trash" />
                              </span>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </Table>
                </div>
              }
            />
          </Col>
        </Grid>
        {this.state.showAddLayer && (
          <AddComponent header={this.state.header} onAddClick={this.onAddClick} onClose={this.onClose} editData={this.state.editData} />
        )}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    productData: state.productReducer.productData,
    onAddResponse: state.productReducer.addData,
    onEditResponse: state.productReducer.editData
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    getProductData: () => {
      dispatch(getProductData());
    },
    onAdd: (post, fetchProduct) => {
      dispatch(addData(post, fetchProduct));
    },
    onEdit: (post, fetchProduct) => {
      dispatch(editData(post, fetchProduct));
    },
    onDelete: (id, fetchProduct) => {
      dispatch(deleteData(id, fetchProduct));
    }
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(ProductList);
