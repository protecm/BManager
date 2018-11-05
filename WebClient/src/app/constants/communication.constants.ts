export class CommunicationConstants {
    public static readonly CODE_OK = 0;
    public static readonly CODE_NOT_OK = 1;
    public static readonly CODE_AUTHENTICATION_FAILED = 2;
    public static readonly LOGIN = '/rest/login.php';

    public static readonly ADD_CATEGORY = '/rest/categories/add.php';
    public static readonly GET_CATEGORIES = '/rest/categories/get.php';
    public static readonly EDIT_CATEGORY = '/rest/categories/edit.php';
    public static readonly DEL_CATEGORY = '/rest/categories/del.php';

    public static readonly ADD_PRODUCT = '/rest/products/add.php';
    public static readonly GET_PRODUCTS = '/rest/products/get.php';
    public static readonly EDIT_PRODUCT = '/rest/products/edit.php';
    public static readonly DEL_PRODUCT = '/rest/products/del.php';

    public static readonly ADD_ORDER = '/rest/orders/add.php';
    public static readonly GET_ORDERS = '/rest/orders/get.php';
    public static readonly GET_COMMON_PRODUCTS = '/rest/orders/getCommonProducts.php';
    public static readonly GET_PREVIOUS_ORDER_VERSION = '/rest/orders/getPreviousOrderVersion.php';
    public static readonly EDIT_ORDER = '/rest/orders/edit.php';
    public static readonly UPDATE_ORDER_STATUS = '/rest/orders/updateOrderStatus.php';
    public static readonly UPDATE_ORDER_ROW_STATUS = '/rest/orders/updateOrderRowStatus.php';
    public static readonly UPDATE_ORDER_NOTE = '/rest/orders/updateOrderNote.php';
    public static readonly UPDATE_ORDER_ROW_NOTE = '/rest/orders/updateOrderRowNote.php';

    public static readonly ADD_CUSTOMER = '/rest/customers/add.php';
    public static readonly GET_CUSTOMERS = '/rest/customers/get.php';
    public static readonly EDIT_CUSTOMER = '/rest/customers/edit.php';
    public static readonly DEL_CUSTOMER = '/rest/customers/del.php';

    public static readonly SEND_CHAT_MSG = '/rest/chat/send.php';
    public static readonly GET_CHAT = '/rest/chat/get.php';
    public static readonly GET_CHAT_ROOMS = '/rest/chat/rooms/get.php';
    public static readonly POLL_CHAT = '/rest/chat/poll.php';

    public static readonly GET_CONFIGURATIONS = '/rest/configuration/get.php';
    public static readonly EDIT_CONFIGURATIONS = '/rest/configuration/edit.php';

    public static readonly ADD_USER = '/rest/users/add.php';
    public static readonly GET_USERS = '/rest/users/get.php';
    public static readonly EDIT_USER = '/rest/users/edit.php';
    public static readonly DEL_USER = '/rest/users/del.php';

    public static readonly GET_STATISTICS = '/rest/statistics/get.php';
}