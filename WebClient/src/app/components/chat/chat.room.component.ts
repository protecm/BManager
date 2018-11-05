import {IComponentController, IComponentOptions} from "angular";
import {ChatRoomsInterface} from "./chat.rooms.component";
import {ChatMsgObject, ChatUserInterface} from "../../objects/chat/chat.msg.object";
import {ChatService} from "../../services/chat.service";
import {DataBaseMessageInterface} from "../../interfaces/server.message.interface";
import {DbMessagesConstants} from "../../constants/db.messages.constants";
import {ChatDepartmentObject} from "../../objects/chat/chat.department.object";

export interface ChatRoomInterface {
    department:ChatDepartmentObject;
    isSelected:boolean;
    readonly roomName:string;
    readonly roomConversation:ChatMsgObject[];
    readonly isConversationLoaded:boolean;
    readonly waitLoadConversation:Promise<void>;
    readonly lastMsgID:number;
    readonly isStickyBottom:boolean;
    sendMessage(source:ChatUserInterface, msg:string):void;
    addMessages(data:ChatMsgObject[]):void;
}

class ChatRoomComponent implements IComponentController,ChatRoomInterface {

    private parent:ChatRoomsInterface;          //From component require
    public department:ChatDepartmentObject;     //From bindings
    //TODO -check binding functionality, used ng-repeat $first as selected
    public isSelected:boolean;                  //From bindings

    private _unreadMessagesCount:number;
    private _roomConversation:ChatMsgObject[];
    private _isConversationLoaded:boolean;
    private _waitLoadConversation:Promise<void>;
    private _isStickyBottom:boolean;

    constructor(private chatService:ChatService) {
        this._unreadMessagesCount = 0;
        this._isStickyBottom = true;            //Default
    }

    public get roomName():string {
        return this.department.name;
    }

    public get unreadMessagesCount():number {
        return this._unreadMessagesCount;
    }

    public get roomConversation():ChatMsgObject[] {
        return this._roomConversation;
    }

    public get isConversationLoaded():boolean {
        return this._isConversationLoaded;
    }

    public get isStickyBottom():boolean {
        return this._isStickyBottom;
    }

    public get waitLoadConversation():Promise<void> {
        return this._waitLoadConversation;
    }

    public get msgCount():number {
        return this._roomConversation ? this._roomConversation.length : 0;
    }

    public get lastMsgID():number {
        const count = this.msgCount;
        if(count > 0) {
            let lastPos = count-1;
            //Need loop for case that conversation not synced
            while(lastPos >= 0) {
                if(this._roomConversation[lastPos].id !== null) {
                    return this._roomConversation[lastPos].id;
                }
                lastPos--;
            }
        }
        return 0;
    }

    public sendMessage(source:ChatUserInterface, msg:string):void {
        if(this._roomConversation) {
            const currDate = new Date();
            const chatMsg = new ChatMsgObject(null, currDate, source, this.department, msg);
            this.addMessage(chatMsg);   //with null id = not synced

            this.chatService.sendMessage(chatMsg)
                .then( (dbMsg: DataBaseMessageInterface<any>) => {
                    if(dbMsg.code === DbMessagesConstants.CODE_OK) {
                        chatMsg.id = dbMsg.data;
                        this.onMessageSendSuccess();
                    }
                });
        }
    }

    private addMessage(chatMsg:ChatMsgObject):void {
        this._roomConversation.push(chatMsg);
        this.onMessageAdded();
    }

    public addMessages(data:ChatMsgObject[]):void {
        data.forEach( (chatMsg, ind, arr) => {
            this.addMessage(chatMsg);
        });
    }

    private loadConversationFromServer():Promise<void>{
        return this.chatService.getConversation(this.department)
            .then( (data:ChatMsgObject[]) => {
                this._roomConversation = data;
                this._isConversationLoaded = true;
                this.onLoadConversationComplete();
            });
    }

    private onSelected():void {
        if(this.parent) {
            this._unreadMessagesCount = 0;
            this.parent.onSelected(this.roomName);
        }
    }

    private onLoadConversationComplete():void {
        //
    }

    private onMessageSendSuccess():void {
        //
    }

    private onMessageAdded():void {
        if( this.isSelected && this._isStickyBottom ) {
            this.scrollToBottom();
        }else {
            this._unreadMessagesCount++;
        }
    }

    private scrollToBottom():void {
        if(this.parent) {
            this.parent.scrollToBottom(this.roomName);
        }
    }

    public $onInit():void {
        this._waitLoadConversation = this.loadConversationFromServer();
        if(this.parent) {
            this.parent.registerRoom(this.roomName, this);
        }
        if(this.isSelected) {
            this.onSelected();
        }
    }

    public $onDestroy():void {
    }
}

export var chatRoomComponent:IComponentOptions = {
    controller: ChatRoomComponent,
    controllerAs: 'vm',
    require: {
        parent: '^chatRooms'
    },
    bindings: {
        isSelected: '<',
        department: '<'
    },
    template: `<div>
                    <button type="button" class="btn btn-default btn-block btn-tab-fix"
                            ng-class="{ 'chat-room-tab-selected' : vm.isSelected }"
                            ng-click="vm.onSelected()">
                        {{ vm.roomName | translate }}
                        <bm-badge msg="vm.unreadMessagesCount"></bm-badge>
                    </button>
                </div>`
};