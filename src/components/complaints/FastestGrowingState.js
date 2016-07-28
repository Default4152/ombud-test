import React, {PropTypes} from 'react';
import Dropdown from 'react-dropdown';

export default class FastestGrowingState extends React.Component {

    constructor(props, context) {
        super(props, context);

        this.state = {
            selectedComplaint: 'Bank account or service'
        };

        this._onComplaintSelect = this._onComplaintSelect.bind(this);
    }

    _onComplaintSelect(e) {
        this.props.actions.getComplaintData(e.value);
        this.setState({
            selectedComplaint: e.value
        });
    }

    render() {
        const complaintOptions = [
            'Bank account or service',
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
            <div className="fastest-growing">
                <h4>Fastest growing state with highest complaint count in product N </h4> <h4> </h4>
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
        );
    }
}

FastestGrowingState.propTypes = {
    actions: PropTypes.object.isRequired,
    complaintData: PropTypes.array.isRequired
};