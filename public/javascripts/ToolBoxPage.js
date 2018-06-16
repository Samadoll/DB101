let current = window.location.href;
if (current.indexOf("=") !== -1) {
    let account = current.slice(current.indexOf("=") + 1);
    console.log(account);
    let log = document.getElementById("login");
    let sign = document.getElementById("signup");
    log.innerText = account;
    sign.innerText = "SignOut";
    log.removeAttribute("href");
    log.addEventListener("click", () => {
        const accID = {};
        accID['accID'] = account;
        let json = JSON.stringify(accID);
        sendReq("POST", "/getAccountInfo", "settings", json);
        // const testPage = "/testPage/" +  account + "/champion=null";
        // sendReq("GET", testPage, testPage, json);
    });
    sign.href = "toolbox";
}