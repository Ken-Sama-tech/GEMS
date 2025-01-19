export default class MakeServerRequest {
    constructor(url, params = null, data) {
        this.url = url;
        this.params = params;
        this.data = data;
    }

    //async send data also only works for forms and other stuff that doesn't require headers
    async sendData(callback) {
        try {
            const response = await fetch(this.url, {
                method: 'POST',
                body: this.params,
            });

            if (!response.ok) {
                throw new Error(`Network status ${response.status} ${response.statusText}`);
            }

            const data = await response.text();
            this.data = data;

            if (callback) {
                callback(this.data);
            }

        } catch (error) {
            console.error('error' + error.message);
        }
    }

    //Async request data only accepts json
    async requestData(callback, ) {
        try {
            const response = await fetch(this.url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: this.params,
            });

            if (!response.ok) {
                throw new Error(`Network status ${response.status} ${response.statusText}`);
            }

            const data = await response.json();
            this.data = data;

            if (callback) {
                callback(this.data);
            }

        } catch (error) {
            console.error('error' + error.message);
        }
    }
}