import {ITimeoutService} from "angular";

export class ChatScrollHandlerObject {

    private target:HTMLElement;
    private lastScrollPos:number;
    private scrollToBottomPromise:Promise<void>;

    constructor(private $timeout:ITimeoutService,
                target:HTMLElement) {
        this.target = target;
        this.lastScrollPos = 0;
        this.setHandlers();
    }

    public scrollToBottom():void {
        const scrollBottomEvent = new Event('scroll-to-bottom', {bubbles: false, cancelable: false});
        if(this.target) {
            this.target.dispatchEvent(scrollBottomEvent);
        }
    }

    private scrollToBottomHandler($event:Event):void {
        this.scrollToBottomPromise = this.$timeout( () => {
            const target:HTMLElement = <HTMLElement>$event.target;
            target.scrollTop = target.scrollHeight - target.offsetHeight;
            this.lastScrollPos = target.scrollTop;
        });
    }

    private onChatConversationScroll($event:Event):void {
        this.scrollToBottomPromise.then( () => {
            const target:HTMLElement = <HTMLElement>$event.target;
            const scrollPos = target.scrollTop;
            if( scrollPos >= this.lastScrollPos ) {
                this.onChatConversationScrollDown(target, scrollPos);
            }else {
                this.onChatConversationScrollUp(target, scrollPos);
            }
            this.lastScrollPos = scrollPos;
        });
    }

    private setHandlers():void {
        if(this.target) {
            this.target.addEventListener('scroll', this.onChatConversationScroll.bind(this));
            this.target.addEventListener('scroll-to-bottom', this.scrollToBottomHandler.bind(this) );
        }
    }

    private destroyHandlers():void {
        if(this.target) {
            this.target.removeEventListener('scroll', this.onChatConversationScroll );
            this.target.removeEventListener('scroll-to-bottom', this.scrollToBottomHandler );
        }
    }

    private onChatConversationScrollUp(target:HTMLElement, scrollPos:number):void {
        if(scrollPos === 0) {
            this.onChatConversationScrollTop();
        }
    }

    private onChatConversationScrollDown(target:HTMLElement, scrollPos:number):void {
        const bottomPos = (target.scrollHeight - target.offsetHeight)-1;    //SUB 1 for tolerance
        if(bottomPos <= scrollPos) {
            this.onChatConversationScrollBottom();
        }
    }

    private onChatConversationScrollTop():void {
        //
    }

    private onChatConversationScrollBottom():void {
        //
    }

    public onDestroy():void {
        this.destroyHandlers();
    }
}