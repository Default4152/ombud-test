import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as dataActions from '../../actions/dataActions';
import Dropdown from 'react-dropdown';
import MostComplaints from '../complaints/MostComplaints';
import FastestGrowingState from '../complaints/FastestGrowingState';
import BornComplaints from '../complaints/BornComplaints';

class HomePage extends React.Component {
   render() {
        return (
            <div>
                <MostComplaints {...this.props} />           
              <br />
                <FastestGrowingState {...this.props} />
              <br />
                <BornComplaints {...this.props} />
          </div>
        );
    }
}

function mapStateToProps(state, ownProps) {
  return {
    data: state.data,
    complaintData: state.complaintData,
    birthData: state.birthData
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(dataActions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);