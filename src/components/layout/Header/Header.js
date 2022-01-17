import React from 'react';
import PropTypes from 'prop-types';
import styles from './Header.module.scss';
import { Grid, Row, Col } from 'react-flexbox-grid';
import { ifLogged, setEmail } from '../../../utils/functions';

import clsx from 'clsx';
import { NavLink } from 'react-router-dom';

import { connect } from 'react-redux';
import { getloginStatus, actionChangeLoginStatus } from '../../../redux/loggedUserRedux';
import { actionChangeEmailStatus, filterBulletinByUser } from '../../../redux/emailRedux';

class Component extends React.Component {

  userAndEmail = (e) => {
    const { changeLoginStatus, changeEmailStatus } = this.props;
    const user = changeLoginStatus(e);
    const email = setEmail(user.payload);
    changeEmailStatus(email);
  }

  render() {
    const { loggedUser, userBulletinFilter, className } = this.props;
    return (
      <div className={clsx(className, styles.root)}>
        <header className={styles.container}>
          <Grid>
            <Row>
              <Col md={9}>
                <nav className={styles.navigation}>
                  <NavLink to='/' activeClassName='active'>Homepage</NavLink>
                  {ifLogged(loggedUser) ?
                    (<>
                      <NavLink
                        to={{
                          pathname: `/${loggedUser}`,
                          state: userBulletinFilter,
                        }}
                      >
                        Ogloszenia
                      </NavLink>

                      <NavLink to='/'>LogOUT</NavLink>
                    </>)
                    :
                    (<a href='https://google.com'>LogIN</a>)
                  }
                </nav>
              </Col>
              <Col md={3}>
                <select name='users' id='users' onChange={this.userAndEmail}>
                  <option value='not logged user' email=''>NOT logged USER</option>
                  <option value='administrator' email='admin@admin.com'>Administrator</option>
                  <option value='logged user' email='loggedUser@user.com'>Logged USER</option>
                </select>
              </Col>
            </Row>
          </Grid>
        </header>
      </div>
    );
  }
}

Component.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  changeLoginStatus: PropTypes.func,
  changeEmailStatus: PropTypes.func,
  userBulletinFilter: PropTypes.array,
  loggedUser: PropTypes.string,
};

const mapStateToProps = state => ({
  loggedUser: getloginStatus(state),
  userBulletinFilter: filterBulletinByUser(state),
});

const mapDispatchToProps = dispatch => ({
  changeLoginStatus: event => dispatch(actionChangeLoginStatus(event.target.value)),
  changeEmailStatus: email => dispatch(actionChangeEmailStatus(email)),
});

const Container = connect(mapStateToProps, mapDispatchToProps)(Component);

export {
  // Component as Header,
  Container as Header,
  Component as HeaderComponent,
};
