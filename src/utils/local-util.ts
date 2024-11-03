export class LocalUtils {
    static getLocalToken() {
        const token = localStorage.getItem("access_token");
        return token;
    }

    static setLocalToken(token: string) {
        localStorage.setItem("access_token", token);
    }

    static removeLocalToken() {
        localStorage.removeItem("access_token");
    }
}
