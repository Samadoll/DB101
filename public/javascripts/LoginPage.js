let loginB = document.getElementById("loginBut");
let cancelB = document.getElementById("cancelBut");
function loginFn() {

    const username = document.getElementById("uname").value;
    const password = document.getElementById("psw").value;
    if (username.length > 0 && password.length > 0) {
        let up = {};
        up['un'] = username;
        up['pw'] = password;
        let json = JSON.stringify(up);
        sendReq("POST", "/login", "/", json);
    } else {
        alert("Invalid format.");
    }
}
function cancelFn() {
    window.history.back();
}
loginB.addEventListener("click", loginFn);
cancelB.addEventListener("click", cancelFn);