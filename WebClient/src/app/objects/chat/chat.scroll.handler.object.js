"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ChatScrollHandlerObject = /** @class */ (function () {
    function ChatScrollHandlerObject($timeout, target) {
        this.$timeout = $timeout;
        this.target = target;
        this.lastScrollPos = 0;
        this.setHandlers();
    }
    ChatScrollHandlerObject.prototype.scrollToBottom = function () {
        var scrollBottomEvent = new Event('scroll-to-bottom', { bubbles: false, cancelable: false });
        if (this.target) {
            this.target.dispatchEvent(scrollBottomEvent);
        }
    };
    ChatScrollHandlerObject.prototype.scrollToBottomHandler = function ($event) {
        var _this = this;
        this.scrollToBottomPromise = this.$timeout(function () {
            var target = $event.target;
            target.scrollTop = target.scrollHeight - target.offsetHeight;
            _this.lastScrollPos = target.scrollTop;
        });
    };
    ChatScrollHandlerObject.prototype.onChatConversationScroll = function ($event) {
        var _this = this;
        this.scrollToBottomPromise.then(function () {
            var target = $event.target;
            var scrollPos = target.scrollTop;
            if (scrollPos >= _this.lastScrollPos) {
                _this.onChatConversationScrollDown(target, scrollPos);
            }
            else {
                _this.onChatConversationScrollUp(target, scrollPos);
            }
            _this.lastScrollPos = scrollPos;
        });
    };
    ChatScrollHandlerObject.prototype.setHandlers = function () {
        if (this.target) {
            this.target.addEventListener('scroll', this.onChatConversationScroll.bind(this));
            this.target.addEventListener('scroll-to-bottom', this.scrollToBottomHandler.bind(this));
        }
    };
    ChatScrollHandlerObject.prototype.destroyHandlers = function () {
        if (this.target) {
            this.target.removeEventListener('scroll', this.onChatConversationScroll);
            this.target.removeEventListener('scroll-to-bottom', this.scrollToBottomHandler);
        }
    };
    ChatScrollHandlerObject.prototype.onChatConversationScrollUp = function (target, scrollPos) {
        if (scrollPos === 0) {
            this.onChatConversationScrollTop();
        }
    };
    ChatScrollHandlerObject.prototype.onChatConversationScrollDown = function (target, scrollPos) {
        var bottomPos = (target.scrollHeight - target.offsetHeight) - 1; //SUB 1 for tolerance
        if (bottomPos <= scrollPos) {
            this.onChatConversationScrollBottom();
        }
    };
    ChatScrollHandlerObject.prototype.onChatConversationScrollTop = function () {
        //
    };
    ChatScrollHandlerObject.prototype.onChatConversationScrollBottom = function () {
        //
    };
    ChatScrollHandlerObject.prototype.onDestroy = function () {
        this.destroyHandlers();
    };
    return ChatScrollHandlerObject;
}());
exports.ChatScrollHandlerObject = ChatScrollHandlerObject;
//# sourceMappingURL=chat.scroll.handler.object.js.map