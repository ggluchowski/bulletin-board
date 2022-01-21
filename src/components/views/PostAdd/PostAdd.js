import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { connect } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';

import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, Label, Input, Row, Col } from 'reactstrap';
import { FormGroup } from '@material-ui/core';

import styles from './PostAdd.module.scss';
import { getAll, postToDB } from '../../../redux/postsRedux';

class Component extends React.Component {

  submitForm = (e) => {
    e.preventDefault();
    const { addPost } = this.props;
    const data = {};

    for (let i = 0; i < (e.target.length - 1); i++) {
      const name = e.target[i].name;
      const value = e.target[i].value;

      if (name === 'title') data.title = value;
      if (name === 'content') data.content = value;
      if (name === 'email') data.email = value;
      if (name === 'status') data.status = value;
      if (name === 'price') data.price = value;
      if (name === 'phoneNumber') data.phoneNumber = value;
      if (name === 'localization') data.localization = value;
    }

    data.publicDate = new Date();
    data.modDate = new Date();
    data.id = uuidv4();
    addPost(data);
    e.target.reset();
  };

  render() {
    const { className } = this.props;

    return (
      <div className={clsx(className, styles.root)
      }>
        <div className={styles.container}>
          <h2>Post</h2>
          <form onSubmit={this.submitForm}>
            <Row className={styles.formRow}>
              <Col xs="12" md="6" className="order-2 order-md-1">
                <FormGroup className={styles.formGroup}>
                  <Label for="bulletinTitle">Tytuł ogłoszenia</Label>
                  <Input
                    minLength="10"
                    maxLength="50"
                    name="title"
                    placeholder="Type your title here">
                  </Input>
                </FormGroup>
                <FormGroup className={styles.formGroup}>
                  <Label for="bulletinContent">Treść ogłoszenia</Label>
                  <Input
                    minLength="20"
                    name="content"
                    placeholder="Type your bulletin here">
                  </Input>
                </FormGroup>
                <FormGroup className={styles.formGroup}>
                  <Label for="bulletinEmail">E-mail</Label>
                  <Input
                    id="bulletinEmail"
                    type="email"
                    name="email"
                    placeholder="Type your e-mail here"
                    required>
                  </Input>
                </FormGroup>
                <FormGroup className={styles.formGroup}>
                  <Label for="bulletinStatus">Status</Label>
                  <Input
                    id="bulletinStatus"
                    type="select"
                    name="status">
                    <option>
                      draft
                    </option>
                    <option>
                      published
                    </option>
                    <option>
                      closed
                    </option>
                  </Input>
                </FormGroup>
                <FormGroup className={styles.formGroup}>
                  <Label for="bulletinPrice">Cena</Label>
                  <Input
                    id="bulletinPrice"
                    type="number"
                    name="price"
                    placeholder="Type your price here"
                    required>
                  </Input>
                </FormGroup>
                <FormGroup className={styles.formGroup}>
                  <Label for="bulletinPhoneNumber">Numer telefonu</Label>
                  <Input
                    id="bulletinPhoneNumber"
                    type="text"
                    name="phoneNumber"
                    placeholder="Type your phone number here">
                  </Input>
                </FormGroup>
                <FormGroup className={styles.formGroup}>
                  <Label for="bulletinLocalization">Lokalizacja</Label>
                  <Input
                    id="bulletinLocalization"
                    type="text"
                    name="localization"
                    placeholder="Type your localization here">
                  </Input>
                </FormGroup>
                <Button
                  color="primary"
                  size="lg"
                  className="btn-pill mt-4"
                  type="submit"
                >
                  Send!
                </Button>
              </Col>
            </Row>
          </form>
        </div>
      </div >
    );
  }
}

Component.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  addPost: PropTypes.func,
};

const mapStateToProps = state => ({
  getData: getAll(state),
});

const mapDispatchToProps = dispatch => ({
  addPost: (data) => dispatch(postToDB(data)),
});

const Container = connect(mapStateToProps, mapDispatchToProps)(Component);

export {
  // Component as PostAdd,
  Container as PostAdd,
  Component as PostAddComponent,
};
