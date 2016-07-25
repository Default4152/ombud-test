import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as dataActions from '../../actions/dataActions';
import Dropdown from 'react-dropdown';

class HomePage extends React.Component {

  constructor(props, context) {
    super(props, context);

    this.state = {
      selectedState: 'AK'
    };

    this._onSelect = this._onSelect.bind(this);
  }

   _onSelect(e) {
     this.props.actions.getStateData(e.value);
     this.setState({
       selectedState: e.value
     });
   }

   render() {
     const options = [
        "AK","AL","AR","AZ",
        "CA","CO","CT","DC",
        "DE","FL","GA","GU",
        "HI","IA","ID","IL",
        "IN","KS","KY","LA",
        "MA","MD","ME","MH",
        "MI","MN","MO","MS",
        "MT","NC","ND","NE",
        "NH","NJ","NM","NV",
        "NY", "OH","OK","OR",
        "PA","PR","PW","RI",
        "SC","SD","TN","TX",
        "UT","VA","VI","VT",
        "WA","WI","WV","WY"
     ];

        return (
            <div>   
                <br />
                <br />
                <h3>Most product complaints <strong>in</strong>  <span className="label label-default">{this.state.selectedState}</span> <strong>is</strong> <span className="label label-danger">{this.props.data}</span></h3>
                <Dropdown options={options} onChange={this._onSelect} value={this.state.selectedState} placeholder="Select a state" />
            </div>
        );
    }
}

HomePage.propTypes = {
    // data: PropTypes.array.isRequired,
    actions: PropTypes.object.isRequired
};

function mapStateToProps(state, ownProps) {
  return {
    data: state.data
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(dataActions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);