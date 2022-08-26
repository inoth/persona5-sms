class InoCookies {
    getCookie(name: string) {
        var arr, reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
        if (arr = document.cookie.match(reg))
            return (arr[2]);
        else
            return null;
    }
    setCookie(name: string, value: any, expiredays: number) {
        var exdate = new Date();
        exdate.setDate(exdate.getDate() + expiredays);
        document.cookie = name + "=" + encodeURIComponent(value) + ((expiredays == null) ? "" : ";expires=" + exdate.toUTCString());
    }
    delCookie(name: string) {
        var exp = new Date();
        exp.setTime(exp.getTime() - 1);
        var cval = this.getCookie(name);
        if (cval != null)
            document.cookie = name + "=" + cval + ";expires=" + exp.toUTCString();
    };
}

const cookies: InoCookies = new InoCookies;

export default cookies