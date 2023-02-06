import { API as BaseAPI } from "yonius";

import { UserAPI } from "./user";

interface APIInterface extends UserAPI {
    ping(): Promise<object>;
}

export declare class API extends BaseAPI implements APIInterface {
    ping(): Promise<object>;
    selfUser(options: object): Promise<object>;
}
