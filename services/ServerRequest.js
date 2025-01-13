// ------------------- server async request handler -----------------

export default class ServerRequest{
    //sending data handler

    constructor(url, data = null){
        this.url = url;
        this.data = data;
    }

    sendData(){
        fetch(this.url, {
            method: 'POST',
            headers:{
                'Content-Type': 'application/x-www-form-urlencoded',
            }, 
            body: JSON.stringify(this.data),
        })
        .then(response => {
            if(!response.ok){
                throw new Error('Network Status' + response.status +' '+ response.statusText);
            }
            return response.json();
        })
        .then(data => console.log(data))
        .catch(error => console.error('Error' + error));
    }

    requestData(){
        fetch(this.url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(this.data),
        })
        .then(response => {
            if(!response.ok){
                throw new Error('Network Status' + response.status + ' ' + response.statusText);
            }
            return response.json();
        })
        .then(data => console.log(data))
        .catch(error => console.error('error'+ error));
    }
}