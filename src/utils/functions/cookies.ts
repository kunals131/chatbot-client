import Cookies from "js-cookie";

const cookies = {
  getCookie: async (cookiename: string, cookiestring: string = "") => {
    if (!cookiestring) return Cookies.get(cookiename);
    var name = cookiename + "=";
    var decodedCookie = decodeURIComponent(cookiestring);
    var ca = decodedCookie.split(";");
    for (var i = 0; i < ca.length; i++) {
      var c = ca[i];
      while (c.charAt(0) === " ") {
        c = c.substring(1);
      }
      if (c.indexOf(name) === 0) {
        return c.substring(name.length, c.length);
      }
    }
    return "";
  },
  setCookie: (cookiename: string, cookievalue: string) => {
    Cookies.set(cookiename, cookievalue, {
      expires: 365,
      secure: true,
      sameSite: "strict",
    });
  },
};

export default cookies;
