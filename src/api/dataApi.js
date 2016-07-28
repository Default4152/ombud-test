class DataApi {
    static getInitialData() {
       return fetch('https://sheltered-stream-12729.herokuapp.com/mostComplaints', {
           headers: new Headers({'X-Custom-Header': 'AK'})
       });
    }

    static getStateComplaintData(state) {
        return fetch('https://sheltered-stream-12729.herokuapp.com/mostComplaints', {
           headers: new Headers({'X-Custom-Header': state})
       });
    }

    static getComplaintData(complaint) {
        return fetch('https://sheltered-stream-12729.herokuapp.com/fastestGrowing', {
           headers: new Headers({'X-Custom-Header': complaint})
       });
    }

    static getBirthData(company) {
        return fetch('https://sheltered-stream-12729.herokuapp.com/births', {
           headers: new Headers({'X-Custom-Header': company})
       });
    }
}

export default DataApi;