import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as dataActions from '../../actions/dataActions';
import Dropdown from 'react-dropdown';

class HomePage extends React.Component {

  constructor(props, context) {
    super(props, context);

    this.state = {
      selectedState: 'AK',
      selectedComplaint: 'Bank account or service'
    };

    this._onStateSelect = this._onStateSelect.bind(this);
    this._onComplaintSelect = this._onComplaintSelect.bind(this);

  }

   _onStateSelect(e) {
     this.props.actions.getStateData(e.value);
     this.setState({
       selectedState: e.value
     });
   }

   _onComplaintSelect(e) {
     this.props.actions.getComplaintData(e.value);
     this.setState({
       selectedComplaint: e.value
     });
   }
   
   render() {
     const stateOptions = [
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

     const complaintOptions = [
       'Bank account or service',
       'Consumer loan',
       'Credit card',
       'Credit reporting',
       'Debt collection',
       'Money transfers',
       'Mortgage',
       'Other financial service',
       'Payday loan',
       'Prepaid card',
       'Student loan'
     ];

        return (
            <div>
                <h3>
                  Most product complaints <strong>in </strong> 
                  <span className="label label-default">{this.state.selectedState}</span> <strong> is </strong> 
                  <span className="label label-danger">
                    {this.props.data.length > 0 ? this.props.data[0].value : 0 }
                  </span>
                </h3>
                <Dropdown options={stateOptions} onChange={this._onStateSelect} value={this.state.selectedState} placeholder="Select a state" />
                
                <br />
                <br />
                <div>
                <h3>Fastest growing state that <strong>also</strong> had the highest complaint count in                </h3> 
                  <br />
                  <br />
                  <Dropdown options={complaintOptions} onChange={this._onComplaintSelect} value={this.state.selectedComplaint} placeholder="Select a complaint" />
                  <br />
                  <table className="table table-bordered">
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>State</th>
                      <th>Complaint Count</th>
                    </tr>
                  </thead>
                  <tbody>
                      <tr className="success">
                        <td>1</td>
                        <td>{this.props.complaintData.length > 0 ? this.props.complaintData[0][0].state : 'CA' }</td>
                        <td>{this.props.complaintData.length > 0 ? this.props.complaintData[0][0].complaintCount : '9278'}</td>
                      </tr>
                      <tr>
                        <td>2</td>
                        <td>{this.props.complaintData.length > 0 ? this.props.complaintData[0][1].state : 'FL' }</td>
                        <td>{this.props.complaintData.length > 0 ? this.props.complaintData[0][1].complaintCount : '6257'}</td>
                      </tr>
                      <tr>
                        <td>3</td>
                        <td>{this.props.complaintData.length > 0 ? this.props.complaintData[0][2].state : 'NY' }</td>
                        <td>{this.props.complaintData.length > 0 ? this.props.complaintData[0][2].complaintCount : '6033'}</td>
                      </tr>
                      <tr>
                        <td>4</td>
                        <td>{this.props.complaintData.length > 0 ? this.props.complaintData[0][3].state : 'TX' }</td>
                        <td>{this.props.complaintData.length > 0 ? this.props.complaintData[0][3].complaintCount : '3980'}</td>
                      </tr>
                      <tr>
                        <td>5</td>
                        <td>{this.props.complaintData.length > 0 ? this.props.complaintData[0][4].state : 'GA' }</td>
                        <td>{this.props.complaintData.length > 0 ? this.props.complaintData[0][4].complaintCount : '2709'}</td>
                      </tr>
                    </tbody>
                  </table>
                  </div>

                
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
    data: state.data,
    complaintData: state.complaintData
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(dataActions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);