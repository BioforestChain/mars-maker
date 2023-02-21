declare namespace BFMetaPcSdk {
    type HttpHelper = import("./network").HttpHelper;
    type WebsocketHelper = import("./network").WebsocketHelper;
    type NetworkHelper = HttpHelper | WebsocketHelper;

    interface ApiSuccessReturn {
        success: true;
        result: any;
    }
    interface ApiFailureReturn {
        success: false;
        error: {
            code?: string;
            message: string;
            description?: string;
        };
    }

    type ApiReturn = ApiSuccessReturn | ApiFailureReturn;
}
