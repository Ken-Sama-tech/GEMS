    // ------------------- server async request handler -----------------
    export default class AsyncServerRequest {
        constructor(url, data = null) {
            this.url = url;
            this.data = data;
        }

        //sending data to server
        async sendData() {
            try {
                const response = await fetch(this.url, {
                    method: 'POST',
                    body: this.data
                });

                if (!response.ok) {
                    throw new Error('Network status' + response.status + " " + response.statusText);
                }

                const serverResponse = await response.json();
                return serverResponse;

            } catch (error) {
                console.log(error);
                return null;
            }
        }

        //requesting data to server
        async requestData() {
            try {
                const response = await fetch(this.url, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    }
                });
                if (!response.ok) {
                    throw new Error('Network Status ' + response.status + " " + response.statusText);
                }
                const data = await response.json();
                return data;

            } catch (error) {
                console.error(error);
                return null;
            }
        }
    }