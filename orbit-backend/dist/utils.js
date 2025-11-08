export function random(len) {
    let options = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let length = options.length;
    let ans = "";
    for (let i = 0; i < len; i++) {
        ans += options.charAt(Math.floor(Math.random() * length));
    }
    return ans;
}
//# sourceMappingURL=utils.js.map