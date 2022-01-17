import React from 'react';
import PropTypes from 'prop-types';
import styles from './Post.module.scss';
import 'bootstrap/dist/css/bootstrap.min.css';

import { Link } from 'react-router-dom';
import { formatDate, ifAuthor } from '../../../utils/functions';
import { getEmailStatus } from '../../../redux/emailRedux';

import clsx from 'clsx';

import { connect } from 'react-redux';
// import { actionAddPost, getAll } from '../../../redux/postsRedux';

const Component = (props) => {

  const { className, location, getEmail } = props;
  const param = location.state;

  return (
    <div className={clsx(className, styles.root)}>
      <div className={styles.container}>
        <div className={styles.id}>
          <h2>Post {param.id}</h2>
        </div>

        <h4>Tytuł ogłoszenia:</h4> {param.title}
        <h4>Treść ogłoszenia:</h4> {param.content}
        <h4>E-mail:</h4> {param.email}
        <h4>Status:</h4> {param.status}
        <h4>Cena:</h4> {param.price}
        <h4>Numer telefonu:</h4> {param.phoneNumber}
        <h4>Lokalizacja:</h4> {param.localization}
        <h4>Data publikacji:</h4> {formatDate(param.publicDate)}
        <h4>Data modyfikacji:</h4> {formatDate(param.modDate)}

        {ifAuthor(getEmail, param.email) ? (
          <div className={styles.editButton}>
            <Link
              className={clsx(styles.linkStyle, styles.name, styles.noselect)}
              to={{
                pathname: `/post/${param.id}/edit`,
                state: param
              }}>
              EDIT
            </Link>
          </div>
        ) : (
          ''
        )}

      </div>
    </div >
  );
};

Component.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  location: PropTypes.node,
  getEmail: PropTypes.string,
};

const mapStateToProps = state => ({
  getEmail: getEmailStatus(state),
});

// const mapDispatchToProps = dispatch => ({
//   sendForm: (e, value) => {
//     e.preventDefault();
//     dispatch(actionAddPost(value));
//   },
// });

const Container = connect(mapStateToProps)(Component);

export {
  Container as Post,
  Component as PostComponent,
};

