import {IComponentOptions} from "angular";

class AppComponent {
    public vm:AppComponent;

    constructor() {
    }
}

export var appComponent:IComponentOptions = {
    controller: AppComponent,
    templateUrl: 'app/templates/app.template.html'
};
