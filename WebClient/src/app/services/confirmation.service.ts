import {confirmModalComponent} from "../components/modals/confirm.modal.component";
import {ModalService} from "./modal.service";

export class ConfirmationService {

    constructor(private modalService:ModalService) {
    }

    public getDefaultBodyTemplate(msg:string, objName:string):string {
        return [
            msg,
            '<b>',
            objName,
            '</b>'
        ].join('');
    }

    public confirm(title:string, msg:string):Promise<boolean> {
        let options = new confirmModalComponent(title,msg);
        return this.modalService.showModal<boolean>(options);
    }
}