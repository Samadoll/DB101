let cancelBut = document.getElementById("cancelB");
let resetBut = document.getElementById("resetpwd");
function confirmReset() {
    if (document.getElementById("userid").value.length > 0 &&
        document.getElementById("psw").value.length > 0 &&
        document.getElementById("psw-repeat").value.length > 0 &&
        document.getElementById("accountid").value.length > 0 &&
        document.getElementById("old-psw").value.length > 0) {
        if (!isNaN(document.getElementById("userid").value) &&
            !isNaN(document.getElementById("accountid").value)) {
            const userID = document.getElementById("userid").value;
            const accID = document.getElementById("accountid").value;
            const oldPW = document.getElementById("old-psw").value;
            const psw = document.getElementById("psw").value;
            const pswRepeat = document.getElementById("psw-repeat").value;
            if (psw === pswRepeat) {
                let user = {};
                user['id'] = userID;
                user['accID'] = accID;
                user['oldPW'] = oldPW;
                user['newPW'] = psw;
                let json = JSON.stringify(user);
                sendReq("POST", "/resetPassword", document.referrer, json);
            } else {
                alert("Password does not match.");
            }
        } else {
            alert("UserID/AccountID must be numeric.");
        }
    } else {
        alert("Please fill correctly.");
    }
}
resetBut.addEventListener("click", confirmReset);
cancelBut.addEventListener("click", () => {
    window.history.back();
});
