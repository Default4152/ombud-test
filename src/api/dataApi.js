class DataApi {
    static getInitialData() {
       return fetch('http://localhost:3036/mostComplaints', {
           headers: new Headers({'X-Custom-Header': 'AK'})
       });
    }

    static getStateComplaintData(state) {
        return fetch('http://localhost:3036/mostComplaints', {
           headers: new Headers({'X-Custom-Header': state})
       });
    }
}

export default DataApi;