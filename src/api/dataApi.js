class DataApi {
    static getInitialData() {
       return fetch('//sheltered-stream-12729.herokuapp.com:5000/mostComplaints', {
           headers: new Headers({'X-Custom-Header': 'AK'})
       });
    }

    static getStateComplaintData(state) {
        return fetch('//sheltered-stream-12729.herokuapp.com:5000/mostComplaints', {
           headers: new Headers({'X-Custom-Header': state})
       });
    }

    static getComplaintData(complaint) {
        return fetch('//sheltered-stream-12729.herokuapp.com/fastestGrowing', {
           headers: new Headers({'X-Custom-Header': complaint})
       });
    }

    static getBirthData(company) {
        return fetch('//sheltered-stream-12729.herokuapp.com:5000/births', {
           headers: new Headers({'X-Custom-Header': company})
       });
    }
}

export default DataApi;