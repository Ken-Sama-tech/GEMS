document.addEventListener('DOMContentLoaded', function () {

    //data send handler
    class SendData {
        constructor(url, data) {
            this.url = url;
            this.data = data;
        }

        async sendData() {
            try {
                const response = await fetch(this.url, {
                    method: 'POST',
                    body: this.data
                });

                if (!response.ok) {
                    throw new Error('Network status' + response.status);
                }

                const serverResponse = await response.json();
                console.log(serverResponse);

            } catch (error) {
                console.log(error);
            }
        }
    }

    const submitNewStudentFormBtn = document.getElementById('submit-new-std-info');

    submitNewStudentFormBtn.addEventListener('click', function (e) {
        const form = document.getElementById('add-std-form');

        if (!form.checkValidity()) {
            e.preventDefault();
            form.classList.add('was-validated');
        } else {
            const formData = new FormData(form);
            const newStudentData = new SendData('../../controller/sendNewStdForm.php', formData);
            newStudentData.sendData();
        }
    });
});