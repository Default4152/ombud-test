import React, {PropTypes} from 'react';
import Dropdown from 'react-dropdown';

export default class BornComplaints extends React.Component {

    constructor(props, context) {
        super(props, context);

        this.state = {
            selectedCompany: 'Bank of America',
            dateOne: "2010",
            dateTwo: "2012"
        };

        this.showBirthData = this.showBirthData.bind(this);
        this._onCompanySelect = this._onCompanySelect.bind(this);
        this._onDateOneSelect = this._onDateOneSelect.bind(this);
        this._onDateTwoSelect = this._onDateTwoSelect.bind(this);
        this._onClick = this._onClick.bind(this);
    }

    componentDidMount() {
        this._onClick();
    }

    showBirthData() {
        return this.props.birthData.map((data, idx) => {
            function getBirths(dateOne, dateTwo) {
                let counter = 0;
                for (let key in data) {
                    if (parseInt(key) == dateOne) {
                        counter += parseInt(data[key]) || 0;
                    } else if (!(parseInt(key) > dateTwo) && !(parseInt(key) < dateOne)) {
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
            );
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

    

    render() {
        const dateOptions = [
            "2010", "2011", "2012", "2013", "2014", "2015"
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
        return (
            <div className="birth-complaints">
                <h4>Amount of people born between two dates in each state where an N complaint was made</h4>
                <div className="date-labels">
                <div>Date One</div>
                <div>Date Two</div>
                <div>Company</div>
                </div>
                <div className="dates">
                <Dropdown options={dateOptions} onChange={this._onDateOneSelect} value={this.state.dateOne} placeholder="Select a date" />
                <Dropdown options={dateOptions} onChange={this._onDateTwoSelect} value={this.state.dateTwo} placeholder="Select a date" />
                <Dropdown options={companyOptions} onChange={this._onCompanySelect} value={this.state.selectedCompany} placeholder="Select a company" />
                </div>
                <br />
                <div className="btn-container">
                <button className="btn btn-success" onClick={this._onClick}>Submit</button>
                </div>
                <div className="birth-table">
                <table className="table table-bordered header-fixed">
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

BornComplaints.propTypes = {
    actions: PropTypes.object.isRequired,
    birthData: PropTypes.array.isRequired
};