let cancelBut = document.getElementById("cancel");
let confirm = document.getElementById("confirm");
function confirmDelete() {
    if (document.getElementById("userid").value.length > 0 &&
        document.getElementById("psw").value.length > 0 &&
        document.getElementById("psw-repeat").value.length > 0 &&
        document.getElementById("accountid").value.length > 0) {
        if (!isNaN(document.getElementById("userid").value) &&
            !isNaN(document.getElementById("accountid").value)) {
            const userID = document.getElementById("userid").value;
            const accID = document.getElementById("accountid").value;
            const psw = document.getElementById("psw").value;
            const pswRepeat = document.getElementById("psw-repeat").value;
            if (psw === pswRepeat) {
                // sendReq(userID, username, psw);
                let user = {};
                user['id'] = userID;
                user['accID'] = accID;
                user['pw'] = psw;
                let json = JSON.stringify(user);
                // TODO;
                sendReq("POST", "/cancelAccount", "../../toolbox", json);
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
confirm.addEventListener("click", confirmDelete);
cancelBut.addEventListener("click", () => {
    window.history.back();
});
