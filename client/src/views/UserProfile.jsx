import React, { Component } from 'react';
import { Grid, Row, Col, FormGroup, ControlLabel, FormControl } from 'react-bootstrap';

import { Card } from 'components/Card/Card.jsx';
import { FormInputs } from 'components/FormInputs/FormInputs.jsx';
import { UserCard } from 'components/UserCard/UserCard.jsx';
import Button from 'components/CustomButton/CustomButton.jsx';

import avatar from 'assets/img/faces/004.jpg';

class UserProfile extends Component {
  render() {
    return (
      <div className="content">
        <Grid fluid>
          <Row>
            <Col md={8}>
              <Card
                title="Edit Profile"
                content={
                  <form>
                    <FormInputs
                      ncols={['col-md-5', 'col-md-3', 'col-md-4']}
                      properties={[
                        {
                          label: 'Company',
                          type: 'text',
                          bsClass: 'form-control',
                          placeholder: 'Company',
                          defaultValue: 'FreeLancer',
                          disabled: true
                        },
                        {
                          label: 'Username',
                          type: 'text',
                          bsClass: 'form-control',
                          placeholder: 'Username',
                          defaultValue: 'atuls45',
                          disabled: true
                        },
                        {
                          label: 'Email address',
                          type: 'email',
                          bsClass: 'form-control',
                          placeholder: 'Email',
                          defaultValue: 'atulssharma45@gmail.com',
                          disabled: true
                        }
                      ]}
                    />
                    <FormInputs
                      ncols={['col-md-6', 'col-md-6']}
                      properties={[
                        {
                          label: 'First name',
                          type: 'text',
                          bsClass: 'form-control',
                          placeholder: 'First name',
                          defaultValue: 'Atul',
                          disabled: true
                        },
                        {
                          label: 'Last name',
                          type: 'text',
                          bsClass: 'form-control',
                          placeholder: 'Last name',
                          defaultValue: 'Sharma',
                          disabled: true
                        }
                      ]}
                    />
                    <FormInputs
                      ncols={['col-md-4', 'col-md-4']}
                      properties={[
                        {
                          label: 'City',
                          type: 'text',
                          bsClass: 'form-control',
                          placeholder: 'City',
                          defaultValue: 'Bangalore',
                          disabled: true
                        },
                        {
                          label: 'Country',
                          type: 'text',
                          bsClass: 'form-control',
                          placeholder: 'Country',
                          defaultValue: 'India',
                          disabled: true
                        }
                      ]}
                    />

                    <Row>
                      <Col md={12}>
                        <FormGroup controlId="formControlsTextarea">
                          <ControlLabel>About Me</ControlLabel>
                          <FormControl
                            rows="5"
                            componentClass="textarea"
                            bsClass="form-control"
                            placeholder="Here can be your description"
                            defaultValue="I'm full stack software developer! Have an experience in leading the team of 5."
                            disabled="true"
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                    <div className="clearfix" />
                  </form>
                }
              />
            </Col>
            <Col md={4}>
              <UserCard
                avatar={avatar}
                name="Atul Sharma"
                userName="atuls45"
                description={
                  <span>
                    "Atul Sharma"
                    <br />
                    Full Stack Software Developer
                  </span>
                }
                socials={
                  <div>
                    <Button href="https://github.com/atuls45" simple>
                      <i className="fa fa-github" />
                    </Button>
                    <Button href="https://www.linkedin.com/in/atul45/" simple>
                      <i className="fa fa-linkedin" />
                    </Button>
                  </div>
                }
              />
            </Col>
          </Row>
        </Grid>
      </div>
    );
  }
}

export default UserProfile;
