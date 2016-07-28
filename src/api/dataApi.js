class DataApi {
    static getInitialData() {
       return fetch('http://localhost:3038/mostComplaints', {
           headers: new Headers({'X-Custom-Header': 'AK'})
       });
    }

    static getStateComplaintData(state) {
        return fetch('http://localhost:3038/mostComplaints', {
           headers: new Headers({'X-Custom-Header': state})
       });
    }

    static getComplaintData(complaint) {
        return fetch('http://localhost:3038/fastestGrowing', {
           headers: new Headers({'X-Custom-Header': complaint})
       });
    }

    static getBirthData(company) {
        return fetch('http://localhost:3038/births', {
           headers: new Headers({'X-Custom-Header': company})
       });
    }
}

export default DataApi;