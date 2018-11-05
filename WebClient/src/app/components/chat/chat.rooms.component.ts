import {IAngularStatic, IComponentController, IComponentOptions, ITimeoutService} from "angular";
import {ChatRoomInterface} from "./chat.room.component";
import {ChatBoxInterface} from "./chat.box.component";
import {ChatMsgObject, ChatUserInterface} from "../../objects/chat/chat.msg.object";
import {ChatPollRequestGroupObject} from "../../objects/chat/chat.poll.request.group.object";
import {ChatPollRequestObject} from "../../objects/chat/chat.poll.request.object";
import {ChatService} from "../../services/chat.service";
import {ChatPollResponseObject} from "../../objects/chat/chat.poll.response.object";
import {ChatScrollHandlerObject} from "../../objects/chat/chat.scroll.handler.object";

declare const angular:IAngularStatic;
declare const Promise; //ES5 issue

export interface ChatRoomsInterface {
    selectedRoom:ChatRoomInterface;
    onSelected(chatRoom:string):void;
    onVisibilityStateChange(newState:boolean):void;
    scrollToBottom(chatRoom:string):void;
    registerRoom(chatRoomName:string, chatRoom:ChatRoomInterface):boolean;
    sendMessage(source:ChatUserInterface, msg:string):void;
}

class ChatRoomsComponent implements ChatRoomsInterface, IComponentController{

    private parent:ChatBoxInterface;   //From component require
    private isPollingCycleRunning:boolean;
    public chatRooms:{ [key:string]:ChatRoomInterface };
    public selectedRoom:ChatRoomInterface;
    public chatConversation:ChatMsgObject[];
    private chatScrollHandler:ChatScrollHandlerObject;

    constructor(private chatService:ChatService,
                private $timeout:ITimeoutService) {
        this.chatRooms = {};
    }

    public get currUser():ChatUserInterface {
        return this.parent.currUser;
    }

    private loadConversation():void {
        if(this.selectedRoom) {
            this.selectedRoom.waitLoadConversation
                .then( () => {
                    this.chatConversation = this.selectedRoom.roomConversation;
                    this.onLoadConversationSuccess();
                });
        }
    }

    private startPollingUpdates():void {
        this.isPollingCycleRunning = true;
        this.pollUpdates();
    }

    private stopPollingUpdates():void {
        //TODO - cancel network request - via the chat service (resolve promise of timeout)
        this.isPollingCycleRunning = false;
    }

    private pollUpdates():void {
        const roomsPromises:Promise<void>[] = [];
        const groupPoll = new ChatPollRequestGroupObject();
        for(let roomName in this.chatRooms) {
            if(this.chatRooms.hasOwnProperty(roomName)) {
                let chRoom:ChatRoomInterface = this.chatRooms[roomName];
                let chPromise:Promise<void> = chRoom.waitLoadConversation
                    .then( () => {
                        groupPoll.data.push(new ChatPollRequestObject(chRoom.department,chRoom.lastMsgID));
                    });
                roomsPromises.push(chPromise);
            }
        }

        Promise.all(roomsPromises)
            .then( ()=> {
                this.chatService.longPoll(groupPoll)
                    .then( (data:ChatPollResponseObject[]) => {
                        this.onPollResponse(data);
                    });
            });
    }

    private onPollResponse(data:ChatPollResponseObject[]):void {
        if(data) {
            data.forEach( (chPollResponse, ind, arr) => {
                const roomName = chPollResponse.department.name;
                if(this.chatRooms[roomName]) {
                    this.chatRooms[roomName].addMessages(chPollResponse.msgs);
                }
            });
        }
        if(this.isPollingCycleRunning) {
            this.pollUpdates();
        }
    }

    public sendMessage(source:ChatUserInterface, msg:string):void {
        if(this.selectedRoom) {
            this.selectedRoom.sendMessage(source, msg);
        }
    }

    public onSelected(chatRoom:string):void {
        if(this.selectedRoom) {
            this.selectedRoom.isSelected =false;
        }
        if(this.chatRooms[chatRoom]) {
            this.selectedRoom = this.chatRooms[chatRoom];
            this.selectedRoom.isSelected = true;
        }
        this.loadConversation();
    }

    public onLoadConversationSuccess():void {
        if( this.parent && this.parent.isChatOpened && this.selectedRoom && this.selectedRoom.isStickyBottom) {
            this.scrollToBottom(this.selectedRoom.roomName);
        }
    }

    public onVisibilityStateChange(newState:boolean):void {
        if( newState && this.selectedRoom && this.selectedRoom.isStickyBottom ) {
            this.scrollToBottom(this.selectedRoom.roomName);
        }
    }

    private getChatConversationBoxElement():JQLite {
        return angular.element( document.querySelector('#divChatConversation') );
    }

    public scrollToBottom(chatRoom:string):void {
        this.chatScrollHandler.scrollToBottom();
    }

    public registerRoom(chatRoomName:string, chatRoom:ChatRoomInterface):boolean {
        if(!this.chatRooms[chatRoomName]) {
            this.chatRooms[chatRoomName] = chatRoom;
            return true;
        }
        return false;
    }

    public $onInit():void {
        if(this.parent) {
            this.parent.registerChatRoomsHandler(this);
        }
    }

    public $postLink():void {
        //TODO - code review, investigate hook with component children, notice templateUrl of children issue
        const target = this.getChatConversationBoxElement()[0];
        this.chatScrollHandler = new ChatScrollHandlerObject(this.$timeout,target);
        this.startPollingUpdates();
    }

    public $onDestroy():void {
        if(this.chatScrollHandler) {
            this.chatScrollHandler.onDestroy();
        }
        this.stopPollingUpdates();
    }
}

export var chatRoomsComponent:IComponentOptions = {
    controller: ChatRoomsComponent,
    controllerAs: 'vm',
    require: {
        parent: '^chatBox'
    },
    transclude: true,
    template: `<div id="divChatRooms" class="chat-room-tabs">
                    <div ng-transclude style="display: table-row;"></div>
               </div>
               <div id="divChatConversation" class="chat-room-conversation">
                   <chat-msg ng-repeat="msg in vm.chatConversation track by $index" msg="msg" curr-user="vm.currUser">
                   </chat-msg>
               </div>`
};