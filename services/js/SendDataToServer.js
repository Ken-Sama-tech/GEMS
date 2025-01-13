export default class SendDataToServer {
    constructor(url, data = null) {
        this.url = url;
        this.data = data;
    }

    async sendData() {
        try {
            const response = await fetch(this.url, {
                method: "POST",
                body: this.data,
            });

            if (!response.ok) {
                throw new Error(
                    "Network status" + response.status + " " + response.statusText
                );
            }

            const serverResponse = await response.json();
            return serverResponse;
        } catch (error) {
            console.log(error);
            return null;
        }
    }

    nonAsyncSendData() {
        fetch(this.url, {
                method: "POST",
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded",
                },
                body: JSON.stringify(this.data),
            })
            .then((response) => {
                if (!response.ok) {
                    throw new Error(
                        "Network Status" + response.status + " " + response.statusText
                    );
                }
                return response.json();
            })
            .then((data) => console.log(data))
            .catch((error) => console.error("Error" + error));
    }
}