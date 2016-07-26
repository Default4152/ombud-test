class DataApi {
    static getInitialData() {
       return fetch('http://localhost:3037/mostComplaints', {
           headers: new Headers({'X-Custom-Header': 'AK'})
       });
    }

    static getStateComplaintData(state) {
        return fetch('http://localhost:3037/mostComplaints', {
           headers: new Headers({'X-Custom-Header': state})
       });
    }

    static getComplaintData(complaint) {
        return fetch('http://localhost:3037/fastestGrowing', {
           headers: new Headers({'X-Custom-Header': complaint})
       });
    }
}

export default DataApi;