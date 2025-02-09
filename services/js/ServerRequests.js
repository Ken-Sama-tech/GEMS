export default class MakeServerRequest {
    constructor(url, params = null, data) {
        this.url = url;
        this.params = params;
        this.data = data;
    }

    //async send data also only works for forms and other stuff that doesn't require headers
    async sendDataForm(callback) {
        try {
            const response = await fetch(this.url, {
                method: 'POST',
                body: this.params,
            });

            if (!response.ok) {
                throw new Error(`Network status: ${response.status} ${response.statusText}`);
            }

            const data = await response.json();
            this.data = data;

            if (callback) {
                callback(this.data);
            }

        } catch (error) {
            console.error(`Error: ${error.message}`);
        }
    }

    //Async request data only accepts data in json format
    async requestData(callback) {
        try {
            const response = await fetch(this.url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: this.params,
            });

            if (!response.ok) {
                throw new Error(`Network status: ${response.status} ${response.statusText}`);
            }

            const data = await response.json();
            this.data = data;

            if (callback) {
                callback(this.data);
            }

        } catch (error) {
            console.error(`Error: ${error.message}`);
        }
    }

    async sendData(callback) {
        try {
            const response = await fetch(this.url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
                body: this.params,
            });

            if (!response.ok) {
                throw new Error(`Network status: ${response.status} ${response.statusText}`);
            }

            const data = await response.json();
            this.data = data;

            if (callback) {
                callback(this.data);
            }
        } catch (error) {
            console.error(`Error: ${error.message}`);
        }
    }
}