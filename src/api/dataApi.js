class DataApi {
    static getInitialData() {
       return fetch('//localhost:5000/mostComplaints', {
           headers: new Headers({'X-Custom-Header': 'AK'})
       });
    }

    static getStateComplaintData(state) {
        return fetch('//localhost:5000/mostComplaints', {
           headers: new Headers({'X-Custom-Header': state})
       });
    }

    static getComplaintData(complaint) {
        return fetch('//localhost:5000/fastestGrowing', {
           headers: new Headers({'X-Custom-Header': complaint})
       });
    }

    static getBirthData(company) {
        return fetch('//localhost:5000/births', {
           headers: new Headers({'X-Custom-Header': company})
       });
    }
}

export default DataApi;