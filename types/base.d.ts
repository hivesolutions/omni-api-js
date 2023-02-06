import { API as BaseAPI } from "yonius";

import { UserAPI } from "./user";
import { StoreAPI } from "./store";
import { SaleSnapshotAPI } from "./sale-snapshot";

interface APIInterface extends UserAPI, StoreAPI, SaleSnapshotAPI {
    ping(): Promise<object>;
}

export declare class API extends BaseAPI implements APIInterface {
    ping(): Promise<object>;
    selfUser(options: object): Promise<object>;
    listStores(options: object): Promise<object[]>;
    statsSaleSnapshot(options: object): Promise<object[]>;
}
