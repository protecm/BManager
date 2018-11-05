import {AuthenticationService} from "./authentication.service";

export class PermissionsService {

    constructor(private authenticationService:AuthenticationService) {
    }

    public userHasPermission(permName:string, accessLevel:number):boolean {
        if( this.authenticationService.credentials.user.userAccess ) {
            return this.userHasPermissionImpl(permName, accessLevel);
        }
        return false;
    }

    private userHasPermissionImpl(permName:string, accessLevel:number):boolean {
        return this.authenticationService.credentials.user.userAccess[permName] ?
            (this.authenticationService.credentials.user.userAccess[permName] >= accessLevel):false;
    }
}