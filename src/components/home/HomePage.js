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
      selectedComplaint: 'Bank account or service',
      selectedCompany: 'Bank of America',
      dateOne: "2010",
      dateTwo: "2012"
    };

    this._onStateSelect = this._onStateSelect.bind(this);
    this._onComplaintSelect = this._onComplaintSelect.bind(this);
    this._onCompanySelect = this._onCompanySelect.bind(this);
    this._onDateOneSelect = this._onDateOneSelect.bind(this);
    this._onDateTwoSelect = this._onDateTwoSelect.bind(this);
    this._onClick = this._onClick.bind(this);
    this.showBirthData = this.showBirthData.bind(this);
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

   _onCompanySelect(e) {
     this.setState({
       selectedCompany: e.value
     });
   }

   _onDateOneSelect(e) {
     if (parseInt(e.value) >= (parseInt(this.state.dateTwo))) {
       this._onClick();
       this.setState({
        dateOne: this.state.dateOne
       });
     } else {
       this.setState({
        dateOne: e.value
       });
     }
   }

   _onDateTwoSelect(e) {
     if (parseInt(e.value) <= (parseInt(this.state.dateOne))) {
       this._onClick();
       this.setState({
        dateTwo: this.state.dateTwo
       });
     } else {
       this.setState({
        dateTwo: e.value
       });
     }
     
   }

   _onClick(e) {
     this.props.actions.getBirthData(this.state.selectedCompany);
   }

   showBirthData() {
     return this.props.birthData.map((data, idx) => {
       function getBirths(dateOne, dateTwo) {
         let counter = 0;
         for (var key in data) {
          if (parseInt(key) == dateOne) {
            counter += parseInt(data[key]) || 0;
          } else if(!(parseInt(key) > dateTwo) && !(parseInt(key) < dateOne)) {
            counter += parseInt(data[key]) || 0;
          }
        }
        return counter;
       }
       return (
       <tr key={data.state}>
        <td>
        {data.state}
        </td>
        <td>
        {getBirths(this.state.dateOne, this.state.dateTwo)}
        </td>
       </tr>
     )
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

     const companyOptions = [
       'Bank of America',
       'Wells Fargo & Company',
       'NRA Group, LLC',
       'Citibank',
       'JPMorgan Chase & Co.',
       'Equifax',
       'Data Mortgage Inc.',
       'WR Starkey Mortgage, LLP'
     ];

     const dateOptions = [
       "2010", "2011", "2012", "2013", "2014", "2015"
     ];

        return (
            <div>
                <h3>
                  Most product complaints <strong>in </strong> 
                  <span className="label label-default">{this.state.selectedState}</span> <strong> is </strong> 
                  <span className="label label-danger">
                    {this.props.data.length > 0 ? this.props.data[0].value : 0}
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
                        <td>{this.props.complaintData.length > 0 ? this.props.complaintData[0][0].state : 'CA'}</td>
                        <td>{this.props.complaintData.length > 0 ? this.props.complaintData[0][0].complaintCount : '9278'}</td>
                      </tr>
                      <tr>
                        <td>2</td>
                        <td>{this.props.complaintData.length > 0 ? this.props.complaintData[0][1].state : 'FL'}</td>
                        <td>{this.props.complaintData.length > 0 ? this.props.complaintData[0][1].complaintCount : '6257'}</td>
                      </tr>
                      <tr>
                        <td>3</td>
                        <td>{this.props.complaintData.length > 0 ? this.props.complaintData[0][2].state : 'NY'}</td>
                        <td>{this.props.complaintData.length > 0 ? this.props.complaintData[0][2].complaintCount : '6033'}</td>
                      </tr>
                      <tr>
                        <td>4</td>
                        <td>{this.props.complaintData.length > 0 ? this.props.complaintData[0][3].state : 'TX'}</td>
                        <td>{this.props.complaintData.length > 0 ? this.props.complaintData[0][3].complaintCount : '3980'}</td>
                      </tr>
                      <tr>
                        <td>5</td>
                        <td>{this.props.complaintData.length > 0 ? this.props.complaintData[0][4].state : 'GA'}</td>
                        <td>{this.props.complaintData.length > 0 ? this.props.complaintData[0][4].complaintCount : '2709'}</td>
                      </tr>
                    </tbody>
                  </table>
                  </div>
                <div>
                <h3>             </h3> 
                  <br />
                  <br />
                  <Dropdown options={companyOptions} onChange={this._onCompanySelect} value={this.state.selectedCompany} placeholder="Select a company" />
                  <Dropdown options={dateOptions} onChange={this._onDateOneSelect} value={this.state.dateOne} placeholder="Select a date" />
                  between
                  <Dropdown options={dateOptions} onChange={this._onDateTwoSelect} value={this.state.dateTwo} placeholder="Select a date" />
                  <button onClick={this._onClick}>Submit</button>
                  <br />
                  <table className="table table-bordered">
                  <thead>
                    <tr>
                      <th>State</th>
                      <th>Births between {this.state.dateOne} and {this.state.dateTwo}</th>
                    </tr>
                  </thead>
                  <tbody>
                      {this.showBirthData()}
                  </tbody>
                </table>
                </div>
            </div>
        );
    }
}

HomePage.propTypes = {
    // data: PropTypes.array.isRequired,
    actions: PropTypes.object.isRequired,
    complaintData: PropTypes.array.isRequired,
    data: PropTypes.array.isRequired,
    birthData: PropTypes.array.isRequired
};

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