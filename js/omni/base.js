import { API as YoniusAPI, mix, load, conf } from "yonius";
import { DatabaseAPI } from "./database.js";

const BASE_URL = "http://localhost/api/admin/";

export class APIAdmin extends mix(YoniusAPI).with(DatabaseAPI) {
    constructor(kwargs = {}) {
        super(kwargs);
        this.baseUrl = conf("ADMIN_URL", BASE_URL);
        this.username = conf("ADMIN_USERNAME", null);
        this.password = conf("ADMIN_PASSWORD", null);
        this.secretKey = conf("ADMIN_SECRET_KEY", null);
        this.baseUrl = kwargs.base_url === undefined ? this.baseUrl : kwargs.base_url;
        this.username = kwargs.username === undefined ? this.username : kwargs.username;
        this.password = kwargs.password === undefined ? this.password : kwargs.password;
        this.secretKey = kwargs.secret_key === undefined ? this.secretKey : kwargs.secret_key;
        this.sessionId = kwargs.session_id === undefined ? this.sessionId : kwargs.session_id;
    }

    static async load() {
        await load();
    }

    async build(method, url, options = {}) {
        await super.build(method, url, options);
        options.params = options.params !== undefined ? options.params : {};
        options.kwargs = options.kwargs !== undefined ? options.kwargs : {};
        options.headers = options.headers !== undefined ? options.headers : {};
        const auth = options.kwargs.auth === undefined ? true : options.kwargs.auth;
        delete options.kwargs.auth;
        if (auth && this.secretKey) options.headers["X-Secret-Key"] = this.secretKey;
        if (auth && !this.secretKey) options.params.sid = await this.getSessionId();
    }

    async getSessionId() {
        if (this.sessionId) return this.sessionId;
        await this.login();
        return this.sessionId;
    }

    async authCallback(params, headers) {
        this.sessionId = null;
        const sessionId = await this.getSessionId();
        params.sid = sessionId;
    }

    async login(username = undefined, password = undefined) {
        username = username !== undefined ? username : this.username;
        password = password !== undefined ? password : this.password;
        const url = this.baseUrl + "login";
        const contents = await this.post(url, {
            callback: false,
            auth: false,
            username: username,
            password: password
        });
        this.username = contents.username || null;
        this.sessionId = contents.session_id || null;
        this.tokens = contents.tokens || null;
        this.trigger("auth", contents);
        return this.sessionId;
    }

    isAuth() {
        if (!this.username || !this.password) return false;
        return true;
    }

    async ping() {
        const url = this.baseUrl + "ping";
        const contents = await this.get(url, { auth: false });
        return contents;
    }
}

export default APIAdmin;
