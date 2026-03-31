function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
}

window.onload = function () {
    const authCookie = getCookie("auth");
    if (!authCookie) {
        window.location.href = "login.html";
    }
};
