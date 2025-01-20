import MakeServerRequest from "../../services/js/ServerRequests";
import {
    Selector,
} from "../../includes/utils/js/domHelper";


document.addEventListener('DOMContentLoaded', () => {

    const selector = new Selector();

    const displayEditableStudentsData = () => {

        const reqData = new MakeServerRequest('../../services/php/all-std-data.php');

        reqData.requestData(() => {

        });
    }

});