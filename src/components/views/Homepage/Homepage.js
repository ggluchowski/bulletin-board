import React from 'react';
import PropTypes from 'prop-types';
import styles from './Homepage.module.scss';
import { ifLogged } from '../../../utils/functions';

import clsx from 'clsx';
import { Link } from 'react-router-dom';

import { fetchFromAPI, getAllPublished } from '../../../redux/postsRedux';
import { getloginStatus } from '../../../redux/loggedUserRedux';
import { connect } from 'react-redux';

class Component extends React.Component {
  state = {
    time: 300,
    timer: null,
  }

  componentDidMount() {
    const { fetchData } = this.props;
    fetchData();
    this.startTimer();
  }

  componentWillUnmount(){
    return;
  }

  step = () => {
    const { fetchData } = this.props;

    this.setState({
      time: this.state.time - 1,
    });
    if(this.state.time === 0){
      fetchData();
      this.setState({
        time: 300,
      });
    }
  }

  startTimer = () => {
    this.setState({
      time: 300,
      timer: setInterval(() => this.step(), 1000)
    });
  }

  render() {
    const { className, getData, loggedUser, location } = this.props;
    const userData = location.state;

    return (
      <div className={clsx(className, styles.root)}>
        <div className={styles.container}>
          <h2>Lista ogłoszeń:</h2>
          <div className={styles.list}>
            {!userData ? (
              getData.map((data, i) => {
                return < Link to={{
                  pathname: `/post/${data._id}`,
                  state: data
                }}
                  className={styles.link} key={i} href="/" > {data.title}</Link>;
              })
            ) : (
              userData.map((data, i) => {
                return < Link to={{
                  pathname: `/post/${data._id}`,
                  state: data
                }}
                  className={styles.link} key={i} href="/" > {data.title}</Link>;
              })
            )
            }
          </div>
          {ifLogged(loggedUser) && (<div className={clsx(styles.editButton)}>
            <Link className={clsx(styles.linkStyle, styles.name, styles.noselect, className, styles.root)} to='/post/add'>Dodaj ogłoszenie</Link>
          </div>)}

        </div>
      </div >
    );
  }
}

Component.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  getData: PropTypes.array,
  loggedUser: PropTypes.string,
  fetchData: PropTypes.func,
};

const mapStateToProps = state => ({
  getData: getAllPublished(state),
  loggedUser: getloginStatus(state),
});

const mapDispatchToProps = dispatch => ({
  fetchData: () => dispatch(fetchFromAPI()),
});

const Container = connect(mapStateToProps, mapDispatchToProps)(Component);

export {
  // Component as Homepage,
  Container as Homepage,
  Component as HomepageComponent,
};
