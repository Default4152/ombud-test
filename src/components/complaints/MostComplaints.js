import React, {PropTypes} from 'react';
import Dropdown from 'react-dropdown';

export default class MostComplaints extends React.Component {

    constructor(props, context) {
        super(props, context);

        this.state = {
            selectedState: 'AK'
        };

        this._onStateSelect = this._onStateSelect.bind(this);
    }

    _onStateSelect(e) {
      this.props.actions.getStateData(e.value);
      this.setState({
        selectedState: e.value
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

        return (
            <div className="most-complaints">
                <h4>Most product complaints in state N</h4>
                <Dropdown className="states-dropdown" options={stateOptions} onChange={this._onStateSelect} value={this.state.selectedState} placeholder="Select a state" />
                <h1><span className="label label-success">{this.props.data.length > 0 ? this.props.data[0].value : "Mortgage"}</span></h1>
            </div>
        );
    }
}

MostComplaints.propTypes = {
    actions: PropTypes.object.isRequired,
    data: PropTypes.array.isRequired
};