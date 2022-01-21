import React from 'react';
import PropTypes from 'prop-types';
import styles from './Post.module.scss';
import 'bootstrap/dist/css/bootstrap.min.css';

import { Link } from 'react-router-dom';
import { formatDate, ifAuthor } from '../../../utils/functions';
import { getEmailStatus } from '../../../redux/emailRedux';
import { fetchId, getAll } from '../../../redux/postsRedux';

import clsx from 'clsx';

import { connect } from 'react-redux';

class Component extends React.Component {

  componentDidMount() {
    const { fetchOnePost, match } = this.props;
    fetchOnePost(match.params.id);
  }

//   componentWillUnmount() {
//     // fix Warning: Can't perform a React state update on an unmounted component
//     this.setState = (state,callback)=>{
//         return;
//     };
// }

  render() {
    const { className, getEmail, getPost } = this.props;
    const param = getPost;

    return (

      <div className={clsx(className, styles.root)}>
        <div className={styles.container}>
          <div className={styles.id}>
            <h2>Post {param._id}</h2>
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
                  pathname: `/post/${param._id}/edit`,
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
};

Component.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  getEmail: PropTypes.string,
  getPost: PropTypes.array,
  fetchOnePost: PropTypes.func,
  match: PropTypes.object,
};

const mapStateToProps = state => ({
  getEmail: getEmailStatus(state),
  getPost: getAll(state),
});

const mapDispatchToProps = dispatch => ({
  fetchOnePost: (id) => dispatch(fetchId(id)),
});

const Container = connect(mapStateToProps, mapDispatchToProps)(Component);

export {
  Container as Post,
  Component as PostComponent,
};

