import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import SuiteEach from './SuiteEach';
import { getSuites } from '../../actions/suiteActions';
import Spinner from '../common/Spinner'

class Suites extends Component {
  componentDidMount(){
    this.props.getSuites();
    // this.props.getProviders();
  }

  render() {
    const { suites, loading } = this.props.suite;

    let suiteItems;

    if (suites === null || loading){
      suiteItems = <Spinner />
    } else {
      if(suites.length > 0){
        
        suiteItems = 
        suites.map((suite) => (
          <SuiteEach key={suite._id} suite={suite} />
          
        ));
      } else {
        suiteItems = <h4>No suites found...</h4>
      }
    }

    return (
      <div className="card mb-5 shadow p-3 px-5" id="category-card">
        <div className="card-header my-auto shadow" id="suite-header">
          <h2>Suite Status</h2>
        </div>
        <div className="card-body">
          {suiteItems}
        </div>
      </div>
    )
  }
}

Suites.propTypes = {
  getSuites: PropTypes.func.isRequired,
  suite: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  suite: state.suite,
});

export default connect(mapStateToProps, { getSuites })(Suites);
