import {IComponentOptions} from "angular";
import {ChatRoomsInterface} from "./chat.rooms.component";
import {AuthenticationService} from "../../services/authentication.service";
import {ChatUserInterface} from "../../objects/chat/chat.msg.object";
import {ChatDepartmentObject} from "../../objects/chat/chat.department.object";
import {ChatService} from "../../services/chat.service";

export interface ChatBoxInterface {
    readonly handler:ChatRoomsInterface;
    readonly currUser:ChatUserInterface;
    readonly isChatOpened:boolean;
    registerChatRoomsHandler(handler:ChatRoomsInterface):boolean;
}

class ChatBoxComponent implements ChatBoxInterface{

    private _handler:ChatRoomsInterface;
    private _source:ChatUserInterface;
    private _isChatOpened:boolean;

    public chatRooms:ChatDepartmentObject[];
    public inputMsg:string;

    constructor(private authenticationService:AuthenticationService,
                private chatService:ChatService) {
        //TODO - code review
        this.getChatRoomsFromServer();
        const currUser = this.authenticationService.user;
        this._source = {
            id: currUser.id,
            name: currUser.username
        };

    }

    public get currUser():ChatUserInterface {
        return this._source;
    }

    public get isChatOpened():boolean {
        return this._isChatOpened;
    }

    public getChatRoomsFromServer():void {
        this.chatService.getChatRooms()
            .then( (data:ChatDepartmentObject[]) => {
                if(data) {
                    this.chatRooms = data;
                }
            });
    }

    public get handler():ChatRoomsInterface {
        return this._handler;
    }

    public registerChatRoomsHandler(handler:ChatRoomsInterface):boolean {
        if(!this._handler) {
            this._handler = handler;
        }
        return false;
    }

    public toggleVisibility():void {
        this._isChatOpened = !this._isChatOpened;
        this.onVisibilityStateChange(this._isChatOpened);
    }

    public sendMessage():void {
        if(this._handler && this.inputMsg && this.inputMsg.length > 0) {
            this._handler.sendMessage(this._source, this.inputMsg);
        }
    }

    public onChatInput($event:KeyboardEvent):void {
        const keyCode = $event.which || $event.keyCode;
        if (keyCode === 13) {   //Enter,Carriage return key
            this.sendMessage();
            this.inputMsg = '';
            $event.preventDefault();    //important for enter key to not appear in textarea
        }
    }

    public onVisibilityStateChange(newState:boolean):void {
        if(this._handler) {
            this._handler.onVisibilityStateChange(newState);
        }
    }

}

export var chatBoxComponent:IComponentOptions = {
    controller: ChatBoxComponent,
    controllerAs: 'vm',
    templateUrl: 'app/templates/chat/chat.box.template.html'
};