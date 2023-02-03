import { API as BaseAPI } from "yonius";

import { UserAPI } from "./user";

interface APIInterface extends UserAPI {
    constructor(kwargs?: object);
    ping(): Promise<object>;
}

export declare class API extends BaseAPI implements APIInterface {}
