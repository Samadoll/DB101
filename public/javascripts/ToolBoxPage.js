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
        const testPage = "/Settings/" +  account;
        sendReq("GET", testPage, testPage, json);
    });
    sign.href = "toolbox";
    document.getElementById("championInside").href = "champions=" + account;
}