import React from 'react';
import PropTypes from 'prop-types';
import styles from './PostEdit.module.scss';

import clsx from 'clsx';

import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, Label, Input, Row, Col } from 'reactstrap';
import { FormGroup } from '@material-ui/core';

import { connect } from 'react-redux';
import { putToAPI, getAll } from '../../../redux/postsRedux';

class Component extends React.Component {

  submitForm = (e) => {
    e.preventDefault();
    const { editPost } = this.props;
    const data = {};

    for (let i = 0; i < (e.target.length - 1); i++) {
      const name = e.target[i].name;
      const value = e.target[i].value;

      if (name === 'id') data.id = value;
      if (name === 'title') data.title = value;
      if (name === 'content') data.content = value;
      // if (name === 'email') data.email = value;
      if (name === 'status') data.status = value;
      if (name === 'price') data.price = value;
      if (name === 'phoneNumber') data.phoneNumber = value;
      if (name === 'localization') data.localization = value;
    }
    data.modDate = new Date();

    // console.log(data);

    editPost(data.id, data.title, data.content, data.status, data.price, data.phoneNumber, data.localization, data.modDate);
    e.target.reset();
  };

  render() {
    const { className, location } = this.props;
    const param = location.state;

    return (
      <div className={clsx(className, styles.root)
      }>
        <div className={styles.container}>
          <h2>Post {param.id}</h2>
          <form onSubmit={this.submitForm}>
            <Row className={styles.formRow}>
              <Col xs="12" md="6" className="order-2 order-md-1">
                <FormGroup className={styles.formGroupId}>
                  <Label for="bulletinId">ID</Label>
                  <Input
                    name="id"
                    defaultValue={param.id}
                    disabled
                  >
                  </Input>
                </FormGroup>
                <FormGroup className={styles.formGroup}>
                  <Label for="bulletinTitle">Tytuł ogłoszenia</Label>
                  <Input
                    minLength="10"
                    maxLength="50"
                    name="title"
                    placeholder="Type your title here"
                    defaultValue={param.title}>
                  </Input>
                </FormGroup>
                <FormGroup className={styles.formGroup}>
                  <Label for="bulletinContent">Treść ogłoszenia</Label>
                  <Input
                    minLength="20"
                    name="content"
                    placeholder="Type your bulletin here"
                    defaultValue={param.content}>
                  </Input>
                </FormGroup>
                <FormGroup className={styles.formGroup}>
                  <Label for="bulletinEmail">E-mail</Label>
                  <Input
                    id="bulletinEmail"
                    type="email"
                    name="email"
                    placeholder="Type your e-mail here"
                    defaultValue={param.email}
                    disabled>
                  </Input>
                </FormGroup>
                <FormGroup className={styles.formGroup}>
                  <Label for="bulletinStatus">Status</Label>
                  <Input
                    id="bulletinStatus"
                    type="select"
                    name="status"
                    defaultValue={param.status}>
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
                    defaultValue={param.price}
                    required>
                  </Input>
                </FormGroup>
                <FormGroup className={styles.formGroup}>
                  <Label for="bulletinPhoneNumber">Numer telefonu</Label>
                  <Input
                    id="bulletinPhoneNumber"
                    type="text"
                    name="phoneNumber"
                    placeholder="Type your phone number here"
                    defaultValue={param.phoneNumber}>
                  </Input>
                </FormGroup>
                <FormGroup className={styles.formGroup}>
                  <Label for="bulletinLocalization">Lokalizacja</Label>
                  <Input
                    id="bulletinLocalization"
                    type="text"
                    name="localization"
                    placeholder="Type your localization here"
                    defaultValue={param.localization}>
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
  location: PropTypes.node,
  editPost: PropTypes.func,
};

const mapStateToProps = state => ({
  getData: getAll(state),
});

const mapDispatchToProps = dispatch => ({
  editPost: (id, title, content, status, price, phoneNumber, localization, modDate) => dispatch(putToAPI(id, title, content, status, price, phoneNumber, localization, modDate)),
});

const Container = connect(mapStateToProps, mapDispatchToProps)(Component);

export {
  // Component as PostEdit,
  Container as PostEdit,
  Component as PostEditComponent,
};
