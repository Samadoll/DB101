let button = document.getElementById("button");
let buttonJmp = document.getElementById("jump");
function testFn() {

    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;
    if (username.length > 0 && password.length > 0) {
        return new Promise((fulfill, reject) => {
            let up = {};
            up['un'] = username;
            up['pw'] = password;
            let json = JSON.stringify(up);
            console.log(json);
            let xmlReq = new XMLHttpRequest();
            xmlReq.open("POST", "/login", true);
            xmlReq.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
            console.log(json);
            xmlReq.onload = function () {
                if (this.status === 200) {
                    fulfill(this.response);
                    console.log("final");
                    location.href = "/";
                } else {
                    reject(this.response);
                    console.log("fail");
                    const responseError = JSON.parse(this.response);
                    alert(responseError["error"]);
                }
            };
            xmlReq.send(json);
        })
    } else {
        alert("Invalid format.");
    }
}
function testFn2() {
    location.href = "/";
}
button.addEventListener("click", testFn);
buttonJmp.addEventListener("click", testFn2);