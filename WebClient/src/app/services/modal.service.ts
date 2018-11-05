import {IModalInstanceService, IModalService, IModalSettings} from "angular-ui-bootstrap";
import {errorModalComponent} from "../components/modals/error.modal.component";
import {IPromise} from "angular";

export class ModalService {
    constructor(private $uibModal:IModalService) {

    }

    public showModal<T>(options:IModalSettings):IPromise<T> {
        let modalInstance:IModalInstanceService = this.$uibModal.open(options);
        return modalInstance.result;
    }

    public showErrorMessage(title:string,msg:string) {
        let options = new errorModalComponent(title,msg);
        let modalInstance:IModalInstanceService = this.$uibModal.open(options);
        modalInstance.result
            .then((data) => {
                //handle result
            }, (error) => {
                //handla error
            });
    }
}