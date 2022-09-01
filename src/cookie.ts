
export const getCookie = (name: string) => {
    var arr, reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
    console.log(document.cookie)
    if (arr = document.cookie.match(reg))
        return (arr[2]);
    else
        return null;
}
export const setCookie = (name: string, value: any, expiredays: number) => {
    var exdate = new Date();
    exdate.setDate(exdate.getDate() + expiredays);
    document.cookie = name + "=" + encodeURIComponent(value) + ((expiredays == null) ? "" : ";expires=" + exdate.toUTCString());
}
export const delCookie = (name: string) => {
    var exp = new Date();
    exp.setTime(exp.getTime() - 1);
    var cval = getCookie(name);
    if (cval != null)
        document.cookie = name + "=" + cval + ";expires=" + exp.toUTCString();
};


