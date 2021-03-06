import React, { Component } from 'react';
import letterhead from '../../img/whosinlogo.png'
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { logoutProvider } from '../../actions/authActions';

class Header extends Component {

  onLogoutClick(e){
    e.preventDefault();
    this.props.logoutProvider();
  }

  

  render() {
    const {isAuthenticated} = this.props.auth;
    const path = this.props.location.pathname;
    let main;
    let duo;

    if(path === '/'){
      main = true;
    } else {
      main = false;
    }

    if(path=== '/register' || '/changepw'){
      duo = true;
    } else {
      duo = false;
    }

    if (path=== '/dashboard' || '/'){
      duo = false;
    }

    const logoutButton = (
      <div id ="return-button" className="mt-3 d-flex " onClick={this.onLogoutClick.bind(this)}>
        <div className="col-8 col-md-2 btn btn-outline-secondary col-2">
        Log Out
        </div>
      </div>  
    )

    const mainPageButton = (
      <div id ="return-button" className="mt-3 d-flex">
        <Link to="/" className="btn btn-outline-secondary col-8 col-md-2">Back to Main Page</Link>
      </div>
    )

    const dashboardButton = (
      <div id ="return-button" className="mt-3 d-flex">
        <Link to="/login" className="btn btn-outline-secondary col-8 col-md-2">Provider Dashboard</Link>
      </div>
    )

    


    return (
      <div>
        <div id="birth-cottage-letterhead" className="mb-3 mt-4 mx-auto img-fluid">
          <img src={letterhead} alt="Birth Cottage letterhead" className="mx-auto"/>
          <div id="d-flex row">
            {main?  dashboardButton : mainPageButton}
            {duo? dashboardButton : null}
            {isAuthenticated? logoutButton : null}
          </div>
        </div>
      </div>
    )
  }
}

Header.propTypes = {
  logoutProvider: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});


export default connect(mapStateToProps, {logoutProvider})(Header);