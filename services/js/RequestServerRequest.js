export default class RequestDataToServer {

    constructor(url, data = null, method = 'POST') {
        this.url = url;
        this.data = data;
    }

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

    nonAsyncRequestData() {
        fetch(this.url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(this.data),
            })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network Status' + response.status + ' ' + response.statusText);
                }
                return response.json();
            })
            .then(data => console.log(data))
            .catch(error => console.error('error' + error));
    }
}