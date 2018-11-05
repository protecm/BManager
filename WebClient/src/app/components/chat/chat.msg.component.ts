import {IComponentOptions} from "angular";
import {ChatMsgObject, ChatUserInterface} from "../../objects/chat/chat.msg.object";

class ChatMsgComponent {

    public currUser:ChatUserInterface;      //From binding
    public msg:ChatMsgObject;               //From binding
    constructor() {
    }

    public get username():string {
        return this.msg.source.name;
    }

    public get textMsg():string {
        return this.msg.msg;
    }

    public get isSent():boolean {
        return this.currUser.id === this.msg.source.id;
    }

    public get isReceived():boolean {
        return this.currUser.id !== this.msg.source.id;
    }

    public get isSynced():boolean {
        return this.msg.id !== null;
    }
}

export var chatMsgComponent:IComponentOptions = {
    controller: ChatMsgComponent,
    controllerAs: 'vm',
    bindings: {
        currUser: '<',
        msg: '<'
    },
    template: `<div>
                   <div class="chat-msg" 
                        ng-class="{'chat-msg-sent':vm.isSent,'chat-msg-received':vm.isReceived,'chat-msg-not-synced':!vm.isSynced}">
                        <span>
                            <b>
                                <small>{{ vm.username}}:</small>
                            </b>
                        </span>
                        <span>
                            {{ vm.textMsg }}
                        </span>
                    </div>
                </div>`
};