document.addEventListener("DOMContentLoaded", function () {
    //datasendending handler (idk what you call this)
    const sendDataToServer = {
        sendData: async function (url, data) {
            try {
                const response = await fetch(url, {
                    method: "POST",
                    body: data,
                });

                if (!response.ok) {
                    throw new Error("Network status" + response.status);
                }

                const serverResponse = await JSON.parse(response);

                console.log(serverResponse)
            } catch (error) {
                console.log(error);
            }
        },
    };
    //data handler
    const data = {
        sendStudentForm: function () {
            const addStudentForm = document.getElementById("add-std-form");
            const submitBtn = document.getElementById('submit-new-std-info');
            submitBtn.addEventListener("click", function (e) {

                //validate important dataif empty
                if (!addStudentForm.checkValidity()) {
                    e.preventDefault();
                    addStudentForm.classList.add('was-validated');
                } else {
                    const formData = new FormData(addStudentForm);
                    sendDataToServer.sendData(
                        "../../config/database/send-new-student-form.php",
                        formData
                    );
                }
            });
        },
    };
    //send the student form data
    data.sendStudentForm();
});