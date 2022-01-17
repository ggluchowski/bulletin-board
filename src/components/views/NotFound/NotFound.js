import React from 'react';
import PropTypes from 'prop-types';
import styles from './NotFound.module.scss';

import clsx from 'clsx';
import { NavLink } from 'react-router-dom/cjs/react-router-dom.min';

// import { connect } from 'react-redux';
// import { reduxSelector, reduxActionCreator } from '../../../redux/exampleRedux.js';

const Component = ({ className, children }) => (
  <div className={clsx(className, styles.root)}>
    <h1 className={styles.head}>404</h1>
    <h1 className={styles.text}>Page not found</h1>
    <NavLink to='/'>Go to Homepage</NavLink>
  </div>
);

Component.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
};

// const mapStateToProps = state => ({
//   someProp: reduxSelector(state),
// });

// const mapDispatchToProps = dispatch => ({
//   someAction: arg => dispatch(reduxActionCreator(arg)),
// });

// const Container = connect(mapStateToProps, mapDispatchToProps)(Component);

export {
  Component as NotFound,
  // Container as NotFound,
  Component as NotFoundComponent,
};
