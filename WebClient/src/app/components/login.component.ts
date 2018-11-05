import {IComponentOptions} from "angular";
import {LoginService} from "../services/login.service";
import {UserObject} from "../objects/user/user.object";
import {ModalService} from "../services/modal.service";
import {IStateService} from "angular-ui-router";
import {ConfigurationService} from "../services/configuration.service";
import {RestrictedStateInterface, RouterStateConstants} from "../constants/router.state.constants";
import {PermissionsService} from "../services/permissions.service";
import {AccessLevelConstants} from "../constants/access.level.constants";

class LoginComponent {

    public vm:LoginComponent;
    public username:string;
    public password:string;
    public isLoginInProcess:boolean;

    constructor(private loginService:LoginService,
                private confService:ConfigurationService,
                private permService:PermissionsService,
                private modalService:ModalService,
                private $translate:angular.translate.ITranslateService,
                private $state:IStateService) {
    }

    public login():void {
        this.isLoginInProcess = true;
        let user:UserObject = new UserObject(null,this.username,this.password, null, false);
        this.loginService.login(user)
            .then( (status:boolean) => {
                if(status) {
                    this.loadConfigurationFromServer();
                }else {
                    this.isLoginInProcess = false;
                    this.showLoginErrorMessage();
                }
            });
    }

    private loadConfigurationFromServer():void {
        this.confService.loadConfiguration()
            .then( (status:boolean) => {
                this.isLoginInProcess = false;
                if(status) {
                    this.redirectToHomeView();
                }else {
                    //  Error getting configurations
                }
            });
    }

    private redirectToHomeView():void {
        let homeState:RestrictedStateInterface;     //homeState is the first accessible state
        const states = RouterStateConstants.STATES;

        for(let i=0; i<states.length; i++) {
            const state = states[i];
            if( this.permService.userHasPermission(state.permission,AccessLevelConstants.ACCESS_VIEW) ) {
                homeState = state;
                break;
            }
        }

        if( homeState ) {
            this.$state.go( homeState.name );
        }else {
            //TODO - add 'emptyHome' state to constants
            this.$state.go( 'emptyHome' );
        }
    }

    private showLoginErrorMessage():void {
        const title = this.$translate.instant('LOGIN_FAILED');
        const msg = this.$translate.instant('USER_OR_PASSWORD_INCORRECT');
        this.modalService.showErrorMessage(title,msg);
    }
}

export var loginComponent:IComponentOptions = {
    controller: LoginComponent,
    controllerAs: 'vm',
    templateUrl: 'app/templates/login.template.html'
};
