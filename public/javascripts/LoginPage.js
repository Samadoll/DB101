let loginB = document.getElementById("loginBut");
let cancelB = document.getElementById("cancelBut");
function loginFn() {

    const accountID = document.getElementById("accountid").value;
    const password = document.getElementById("psw").value;
    if (accountID.length > 0 && password.length > 0) {
        let up = {};
        up['id'] = accountID;
        up['pw'] = password;
        let json = JSON.stringify(up);
        let prev = document.referrer;
        let des = prev.slice(prev.lastIndexOf("/")) + "=" + accountID;
        sendReq("POST", "/login", des, json);
    } else {
        alert("Invalid format.");
    }
}
function cancelFn() {
    window.history.back();
}
loginB.addEventListener("click", loginFn);
cancelB.addEventListener("click", cancelFn);