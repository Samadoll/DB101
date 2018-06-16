let cancelBut = document.getElementById("cancelB");
let signupBut = document.getElementById("signupB");
function signUp() {
    if (document.getElementById("userid").value.length > 0 &&
        document.getElementById("psw").value.length > 0 &&
        document.getElementById("psw-repeat").value.length > 0 &&
        document.getElementById("accountid").value.length > 0) {
        if (!isNaN(document.getElementById("userid").value) &&
            !isNaN(document.getElementById("accountid").value)) {
            const userID = document.getElementById("userid").value;
            const accID = document.getElementById("accountid").value;
            let username = "";
            if (document.getElementById("username").value.length > 0)
                username = document.getElementById("username").value;
            const psw = document.getElementById("psw").value;
            const pswRepeat = document.getElementById("psw-repeat").value;
            if (psw === pswRepeat) {
                // sendReq(userID, username, psw);
                let user = {};
                user['id'] = userID;
                user['accID'] = accID;
                user['name'] = username;
                user['pw'] = psw;
                let json = JSON.stringify(user);
                let prev = document.referrer;
                let des = prev.slice(prev.lastIndexOf("/")) + "=" + accID;
                sendReq("POST", "/signup", des, json);
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
signupBut.addEventListener("click", signUp);
cancelBut.addEventListener("click", () => {
    window.history.back();
});
