import {IComponentOptions} from "angular";
import {ConfigurationService} from "../../../services/configuration.service";
import {ConfigurationObject} from "../../../objects/configuration.object";
import {DataBaseMessageInterface} from "../../../interfaces/server.message.interface";
import {DbMessagesConstants} from "../../../constants/db.messages.constants";
import {ToastService} from "../../../services/toast.service";


class SettingsTabComponent {

    public monitorActiveOrderHours:number;
    public monitorRefreshRateMinutes:number;
    public deliveriesRefreshRateMinutes:number;
    public commentsEnforcement:boolean;
    public chatMode:boolean;

    private configurationOrg:ConfigurationObject;
    public isSaveInProcess:boolean;

    constructor(private confService:ConfigurationService,
                private toastService:ToastService){
        this.configurationOrg = this.confService.configurationData;
        this.initView();
    }

    private initView():void {
        this.monitorActiveOrderHours = this.configurationOrg.monitorActiveOrderHours;
        this.monitorRefreshRateMinutes = this.configurationOrg.monitorRefreshRateMinutes;
        this.deliveriesRefreshRateMinutes = this.configurationOrg.deliveriesRefreshRateMinutes;
        this.commentsEnforcement = this.configurationOrg.commentsEnforcement;
        this.chatMode = this.configurationOrg.chatMode;
    }

    public save(valid:boolean):void {
        if(valid) {
            this.isSaveInProcess = true;
            let configurationEdtObj = new ConfigurationObject(this.monitorActiveOrderHours,
                this.monitorRefreshRateMinutes, this.deliveriesRefreshRateMinutes, this.commentsEnforcement,
                this.chatMode);
            this.confService.editConfiguration(this.configurationOrg,configurationEdtObj)
                .then( (dbMsg: DataBaseMessageInterface<any>) => {
                    this.isSaveInProcess = false;
                    if (dbMsg.code === DbMessagesConstants.CODE_OK) {
                        this.toastService.showSuccess('CHANGES_SAVED','SETTINGS');
                    }else {
                        this.toastService.showError('SAVE_ERROR','SAVE');
                    }
                });
        }
    }
}

export var settingsTabComponent:IComponentOptions = {
  controller: SettingsTabComponent,
  controllerAs: 'vm',
  templateUrl: 'app/templates/tabs/settings.tab.template.html'
};