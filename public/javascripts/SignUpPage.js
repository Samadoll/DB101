let cancelBut = document.getElementById("cancelB");
let signupBut = document.getElementById("signupB");
function signUp() {
    if (document.getElementById("userid").value.length > 0 &&
        document.getElementById("psw").value.length > 0 &&
        document.getElementById("psw-repeat").value.length > 0) {
        if (!isNaN(document.getElementById("userid").value)) {
            const userID = document.getElementById("userid").value;
            let username = "";
            if (document.getElementById("username").hasAttribute("value"))
                username = document.getElementById("username");
            const psw = document.getElementById("psw").value;
            const pswRepeat = document.getElementById("psw-repeat").value;
            if (psw === pswRepeat) {
                // sendReq(userID, username, psw);
                let user = {};
                user['id'] = userID;
                user['name'] = username;
                user['pw'] = psw;
                let json = JSON.stringify(user);
                sendReq("POST", "/signup", "/", json);
            } else {
                alert("Password does not match.");
            }
        } else {
            alert("User ID must be numeric.");
        }
    } else {
        alert("Please fill correctly.");
    }
}
signupBut.addEventListener("click", signUp);
cancelBut.addEventListener("click", () => {
    window.history.back();
});
