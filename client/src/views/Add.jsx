import React, { Component } from 'react';
import { Grid, Row, Col, FormGroup, ControlLabel, FormControl } from 'react-bootstrap';

import { Card } from 'components/Card/Card.jsx';
import { FormInputs } from 'components/FormInputs/FormInputs.jsx';
import Button from 'components/CustomButton/CustomButton.jsx';

class AddProduct extends Component {
  constructor(props) {
    super(props);
    this.state = {
      columnData:
        this.props.header === 'Edit'
          ? Object.assign({}, this.props.editData)
          : {
              Quantity: 1,
              Price: 1
            },
      defaultalue:
        this.props.header === 'Edit'
          ? Object.assign({}, this.props.editData)
          : {
              Quantity: 1,
              Price: 1
            },
      onClose: this.props.hideEditLayer,
      header: this.props.editPageTitle
    };
    this.handleChange = this.handleChange.bind(this);
    this.onAddSubmit = this.onAddSubmit.bind(this);
    this.onReset = this.onReset.bind(this);
  }

  handleChange = (event) => {
    let values = this.state.columnData;
    let tname = event.target.name;
    let tval = event.target.value;
    let tfile = event.target.files;
    values[tname] = tname === 'file' ? tfile[0] : tval;
    this.setState({ columnData: values });
  };

  onAddSubmit = (event) => {
    event.preventDefault();
    this.props.onAddClick(this.state.columnData, this.props.header);
  };

  onReset = () => {
    this.setState({ columnData: this.state.defaultalue });
  };

  render() {
    return (
      <div className="content top-layer">
        <span
          className="btn btn-warning pull-right"
          onClick={this.props.onClose}
          style={{ color: '#b62a2a', backgroundColor: '#f7c276', borderColor: '#985f0d' }}
        >
          <i className="fa fa-close" />
          Close
        </span>
        <Grid fluid>
          <Row>
            <Col md={12}>
              <Card
                title={this.props.header + ' Product'}
                content={
                  <form onSubmit={this.onAddSubmit} onReset={this.onReset}>
                    <FormInputs
                      ncols={['col-md-8', 'col-md-2', 'col-md-2']}
                      properties={[
                        {
                          label: 'Product Name',
                          type: 'text',
                          name: 'Name',
                          bsClass: 'form-control',
                          placeholder: 'Product Name',
                          required: true,
                          value: this.state.columnData.Name,
                          onChange: (event) => this.handleChange(event)
                        },
                        {
                          label: 'Quantity',
                          type: 'number',
                          name: 'Quantity',
                          bsClass: 'form-control',
                          placeholder: 'Number of Product',
                          min: '0',
                          step: 1,
                          required: true,
                          value: this.state.columnData.Quantity,
                          onChange: (event) => this.handleChange(event)
                        },
                        {
                          label: 'Price ($)',
                          type: 'number',
                          name: 'Price',
                          bsClass: 'form-control',
                          placeholder: 'Number of Product',
                          min: '0',
                          step: 1,
                          required: true,
                          value: this.state.columnData.Price,
                          onChange: (event) => this.handleChange(event)
                        }
                      ]}
                    />
                    <FormInputs
                      ncols={['col-md-8', 'col-md-4']}
                      properties={[
                        {
                          label: 'Description',
                          type: 'text',
                          name: 'Description',
                          bsClass: 'form-control',
                          placeholder: 'About Product',
                          value: this.state.columnData.Description,
                          onChange: (event) => this.handleChange(event)
                        },
                        {
                          label: 'Product Image',
                          type: 'file',
                          name: 'file',
                          bsClass: 'form-control',
                          placeholder: 'Upload image',
                          required: true,
                          accept: '.jpg,.png,.jpeg',
                          hide: this.props.header === 'Add' ? false : true,
                          onChange: (event) => this.handleChange(event)
                        }
                      ]}
                    />
                    {this.props.header == 'Edit' && (
                      <div class="col-md-4">
                        <img class="prev-image" src={require('assets/img/uploads/' + this.state.columnData.file)} />
                      </div>
                    )}
                    <Button style={{ margin: '5px' }} bsStyle="info" pullRight fill type="submit">
                      {this.props.header === 'Add' ? 'Add' : 'Update'} Product
                    </Button>
                    <Button style={{ margin: '5px' }} bsStyle="warning" pullRight fill type="reset">
                      Reset
                    </Button>
                    <div className="clearfix" />
                  </form>
                }
              />
            </Col>
          </Row>
        </Grid>
      </div>
    );
  }
}

export default AddProduct;
