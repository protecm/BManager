import {IAttributes, IDirective, IScope} from "angular";
import {PermissionsService} from "../services/permissions.service";
import {IDirectiveOptions} from "../interfaces/directive.options.interface";
import {AccessLevelConstants} from "../constants/access.level.constants";

class RestrictedDirective implements IDirective {

    public restrict:string = 'A';
    public scope:boolean = true;
    public bindToController = true;
    public controllerAs = "vm";

    constructor(private permService:PermissionsService) {
    }

    public link(scope: IScope, elem: JQLite, attrs: IAttributes): void {
        const myName = restrictedDirective.name;
        const permName = attrs[myName];

        const result = this.isViewRestricted(permName);
        if(result) {
            elem.remove();
        }

    }

    private isViewRestricted(permName:string):boolean {
        return !this.permService.userHasPermission(permName,AccessLevelConstants.ACCESS_VIEW);
    }
}

export var restrictedDirective:IDirectiveOptions = {
    name: 'restrictedView',
    directive:  (permService:PermissionsService) => {
        return new RestrictedDirective(permService);
    },
    $inject: ['permService']
};